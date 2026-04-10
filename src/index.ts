import { Command } from 'commander';
import { createCommand } from './commands/create.js';
import { addPluginCommand } from './commands/add-plugin.js';
import { listPluginsCommand } from './commands/list-plugins.js';
import { VERSION, CLI_NAME } from './shared/constants.js';
import { printBanner } from './cli/ui/banner.js';

export async function main(): Promise<void> {
  const program = new Command();

  program
    .name(CLI_NAME)
    .description('Scaffold a complete full-stack application with your preferred tech stack')
    .version(VERSION, '-v, --version');

  program
    .command('create', { isDefault: true })
    .description('Create a new full-stack project')
    .argument('[project-name]', 'Name of the project')
    .option('-t, --template <template>', 'Use a predefined template')
    .option('--no-install', 'Skip dependency installation')
    .option('--no-git', 'Skip git initialization')
    .option('-y, --yes', 'Accept all defaults')
    .option('--dry-run', 'Preview without writing files')
    .action(async (projectName: string | undefined, options: Record<string, unknown>) => {
      await printBanner();
      await createCommand(projectName, options);
    });

  program
    .command('add-plugin')
    .description('Scaffold a new plugin structure')
    .argument('<plugin-name>', 'Name of the plugin')
    .option('-c, --category <category>', 'Plugin category')
    .action(async (pluginName: string, options: Record<string, unknown>) => {
      await addPluginCommand(pluginName, options);
    });

  program
    .command('list-plugins')
    .description('List all available plugins')
    .option('-c, --category <category>', 'Filter by category')
    .option('--json', 'Output as JSON')
    .action(async (options: Record<string, unknown>) => {
      await listPluginsCommand(options);
    });

  await program.parseAsync(process.argv);
}