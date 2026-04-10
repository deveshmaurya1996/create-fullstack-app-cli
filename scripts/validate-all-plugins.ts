import { pluginRegistry } from '../src/plugins/registry.js';
import { assertAllPluginsValid } from '../src/plugins/validator.js';
import { logger } from '../src/shared/logger.js';

async function main() {
  logger.info('Loading plugin registry...');
  await pluginRegistry.initialize();

  const allPlugins = pluginRegistry.getAllPlugins();
  logger.info(`Found ${allPlugins.length} plugins`);

  logger.info('Validating all plugins...');

  try {
    assertAllPluginsValid(allPlugins);
    logger.success(`All ${allPlugins.length} plugins passed validation!`);
  } catch (error) {
    logger.error(`Validation failed: ${(error as Error).message}`);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});