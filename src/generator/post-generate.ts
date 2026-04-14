import { execa } from 'execa';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import type { TemplateContext } from '../shared/types.js';
import { logger } from '../shared/logger.js';
import { withSpinner } from '../cli/ui/spinner.js';
import { getInstallCommand } from '../layouts/helpers/package-json-builder.js';
import { printPostGeneration } from '../cli/ui/banner.js';

type InstallTarget = {
  label: string;
  cwd: string;
};

export async function runPostGenerate(
  outputDir: string,
  context: TemplateContext,
  options: {
    skipInstall?: boolean;
    skipGit?: boolean;
  }
): Promise<{ installed: boolean; gitInitialized: boolean }> {
  let installed = false;
  let gitInitialized = false;

  if (!options.skipGit) {
    try {
      await withSpinner(
        'Initializing git repository...',
        async () => {
          await execa('git', ['init'], { cwd: outputDir });
          await execa('git', ['add', '.'], { cwd: outputDir });
          await execa('git', ['commit', '-m', 'Initial commit from create-fullstack-app'], {
            cwd: outputDir,
          });
        },
        'Git repository initialized'
      );
      gitInitialized = true;
    } catch (error) {
      logger.warn('Failed to initialize git repository');
      logger.debug(`Git init error: ${(error as Error).message}`);
    }
  }

  if (!options.skipInstall) {
    const installCmd = getInstallCommand(context.packageManager);
    const [cmd, ...args] = installCmd.split(' ');
    const installTargets = await getInstallTargets(outputDir, context);

    try {
      let installCount = 0;
      for (const target of installTargets) {
        await withSpinner(
          `Installing ${target.label} dependencies with ${context.packageManager}...`,
          async () => {
            await execa(cmd, args, {
              cwd: target.cwd,
              stdio: 'pipe',
            });
          },
          `${target.label} dependencies installed`
        );
        installCount += 1;
      }

      installed = installCount > 0;
    } catch (error) {
      logger.warn(`Failed to install dependencies: ${(error as Error).message}`);
      logger.info(`You can run "${installCmd}" manually`);
    }
  }

  if (installed) {
    await runBootstrapScripts(outputDir, context);
  }

  const steps = buildNextSteps(context, installed);
  printPostGeneration(context.projectName, outputDir, context.packageManager, steps);

  return { installed, gitInitialized };
}

function buildNextSteps(context: TemplateContext, installed: boolean): string[] {
  const steps: string[] = [];
  const pm = context.packageManager;

  if (!installed) {
    steps.push(`Install dependencies: ${getInstallCommand(pm)}`);
  }

  if (context.isFullstack) {
    const feDir = context.hasMobile ? 'mobile' : 'client';
    steps.push(`Set up environment: cp ${feDir}/.env.example ${feDir}/.env && cp server/.env.example server/.env`);
  } else {
    steps.push('Set up environment: cp .env.example .env');
  }
  steps.push('Fill in your environment variable values');

  if (context.hasDatabase && context.hasPrisma) {
    if (context.isFullstack) {
      steps.push(`Set up database: cd server && ${pm} run db:migrate && ${pm} run db:seed`);
    } else {
      steps.push(`Set up database: ${pm} run db:migrate && ${pm} run db:seed`);
    }
  }

  if (context.isFullstack) {
    const feDir = context.hasMobile ? 'mobile' : 'client';
    steps.push(`Start frontend: ${pm} run dev --prefix ${feDir}`);
    steps.push(`Start backend: ${pm} run dev --prefix server`);
  } else {
    steps.push(`Start development: ${pm} run dev`);
  }

  if (context.hasMobile) {
    steps.push("Run on device: Press 'i' for iOS, 'a' for Android, or scan QR code");
  }

  return steps;
}

async function getInstallTargets(outputDir: string, context: TemplateContext): Promise<InstallTarget[]> {
  const packageDirs = await discoverPackageDirs(outputDir);
  const targets: InstallTarget[] = [];

  for (const dir of packageDirs) {
    if (!(await hasInstallableDependencies(dir))) continue;
    targets.push({
      label: labelForInstallTarget(dir, outputDir, context),
      cwd: dir,
    });
  }

  return targets;
}

async function runBootstrapScripts(outputDir: string, context: TemplateContext): Promise<void> {
  const pm = context.packageManager;
  const installTargets = await getInstallTargets(outputDir, context);
  const safeBootstrapScripts = ['db:generate', 'generate', 'codegen', 'graphql:codegen', 'types:generate'];

  for (const target of installTargets) {
    try {
      const packageJsonPath = join(target.cwd, 'package.json');
      const raw = await readFile(packageJsonPath, 'utf8');
      const pkg = JSON.parse(raw) as { scripts?: Record<string, string> };
      const scripts = pkg.scripts ?? {};

      for (const scriptName of safeBootstrapScripts) {
        if (!scripts[scriptName]) continue;

        const [cmd, ...args] = `${pm} run ${scriptName}`.split(' ');

        await withSpinner(
          `Running ${target.label}:${scriptName}...`,
          async () => {
            await execa(cmd, args, {
              cwd: target.cwd,
              stdio: 'pipe',
            });
          },
          `${target.label}:${scriptName} completed`
        );
      }
    } catch (error) {
      logger.debug(`Bootstrap scripts skipped for ${target.label}: ${(error as Error).message}`);
    }
  }
}

async function discoverPackageDirs(outputDir: string): Promise<string[]> {
  const dirs: string[] = [];
  await walkForPackageJson(outputDir, outputDir, dirs);

  // Ensure root is first to keep deterministic order
  const unique = [...new Set(dirs)];
  unique.sort((a, b) => {
    if (a === outputDir) return -1;
    if (b === outputDir) return 1;
    return a.localeCompare(b);
  });
  return unique;
}

async function walkForPackageJson(root: string, current: string, dirs: string[]): Promise<void> {
  const entries = await readdir(current, { withFileTypes: true });
  let hasPackageJson = false;

  for (const entry of entries) {
    if (entry.isFile() && entry.name === 'package.json') {
      hasPackageJson = true;
      break;
    }
  }

  if (hasPackageJson) {
    dirs.push(current);
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    await walkForPackageJson(root, join(current, entry.name), dirs);
  }
}

function labelForInstallTarget(targetDir: string, outputDir: string, context: TemplateContext): string {
  if (targetDir === outputDir) return 'root';
  if (targetDir === join(outputDir, 'server')) return 'server';
  if (targetDir === join(outputDir, 'client')) return 'client';
  if (targetDir === join(outputDir, 'mobile')) return 'mobile';

  const relative = targetDir.slice(outputDir.length + 1).replace(/\\/g, '/');
  if (relative) return relative;

  return context.projectName;
}

async function hasInstallableDependencies(cwd: string): Promise<boolean> {
  try {
    const packageJsonPath = join(cwd, 'package.json');
    const raw = await readFile(packageJsonPath, 'utf8');
    const pkg = JSON.parse(raw) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    const depsCount = Object.keys(pkg.dependencies ?? {}).length;
    const devDepsCount = Object.keys(pkg.devDependencies ?? {}).length;
    return depsCount > 0 || devDepsCount > 0;
  } catch {
    return false;
  }
}