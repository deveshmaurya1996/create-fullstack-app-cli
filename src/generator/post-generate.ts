import { execa } from 'execa';
import type { TemplateContext } from '../shared/types.js';
import { logger } from '../shared/logger.js';
import { withSpinner } from '../cli/ui/spinner.js';
import { getInstallCommand } from '../layouts/helpers/package-json-builder.js';
import { printPostGeneration } from '../cli/ui/banner.js';

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

    try {
      await withSpinner(
        `Installing dependencies with ${context.packageManager}...`,
        async () => {
          await execa(cmd, args, {
            cwd: outputDir,
            stdio: 'pipe',
          });
        },
        'Dependencies installed'
      );
      installed = true;
    } catch (error) {
      logger.warn(`Failed to install dependencies: ${(error as Error).message}`);
      logger.info(`You can run "${installCmd}" manually`);
    }
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
    steps.push(`Set up database: ${pm} run db:migrate && ${pm} run db:seed`);
  }

  steps.push(`Start development: ${pm} run dev`);

  if (context.hasMobile) {
    steps.push("Run on device: Press 'i' for iOS, 'a' for Android, or scan QR code");
  }

  return steps;
}