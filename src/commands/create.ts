import path from 'node:path';
import fs from 'fs-extra';
import { runWizard } from '../cli/run-wizard.js';
import { generate } from '../generator/index.js';
import { logger } from '../shared/logger.js';
import { colors } from '../cli/ui/colors.js';

export async function createCommand(
  projectName: string | undefined,
  options: Record<string, unknown>
): Promise<void> {
  try {
    const wizardResult = await runWizard(projectName);

    if (wizardResult.cancelled) {
      logger.info('Project creation cancelled.');
      process.exit(0);
    }

    const { answers, activePlugins } = wizardResult;

    const outputDir = path.resolve(process.cwd(), answers.projectName);
    if (await fs.pathExists(outputDir)) {
      const files = await fs.readdir(outputDir);
      if (files.length > 0) {
        logger.error(
          `Directory "${answers.projectName}" already exists and is not empty.`
        );
        process.exit(1);
      }
    }

    const result = await generate(answers, activePlugins, {
      outputDir,
      dryRun: options.dryRun as boolean | undefined,
      skipInstall: options.install === false,
      skipGit: options.git === false,
    });

    if (result.errors.length > 0) {
      logger.error('Generation completed with errors:');
      for (const error of result.errors) {
        logger.error(`  - ${error}`);
      }
      process.exit(1);
    }

    if (result.warnings.length > 0) {
      for (const warning of result.warnings) {
        logger.warn(warning);
      }
    }

    logger.info(colors.success(`\nProject ready at ${colors.path(outputDir)}`));
  } catch (error) {
    logger.error(`Fatal error: ${(error as Error).message}`);
    logger.debug((error as Error).stack || '');
    process.exit(1);
  }
}
