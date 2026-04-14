import { execa } from 'execa';
import { readFile } from 'node:fs/promises';
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
    const installTargets = getInstallTargets(outputDir, context);

    try {
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
      }

      installed = true;
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

  steps.push(`Start development: ${pm} run dev`);

  if (context.hasMobile) {
    steps.push("Run on device: Press 'i' for iOS, 'a' for Android, or scan QR code");
  }

  return steps;
}

function getInstallTargets(outputDir: string, context: TemplateContext): InstallTarget[] {
  if (context.isSingleApp && context.isFullstack) {
    const feDir = context.hasMobile ? 'mobile' : 'client';
    return [
      { label: 'root', cwd: outputDir },
      { label: feDir, cwd: join(outputDir, feDir) },
      { label: 'server', cwd: join(outputDir, 'server') },
    ];
  }

  return [{ label: 'project', cwd: outputDir }];
}

async function runBootstrapScripts(outputDir: string, context: TemplateContext): Promise<void> {
  const pm = context.packageManager;
  const installTargets = getInstallTargets(outputDir, context);
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