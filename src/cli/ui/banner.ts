import chalk from 'chalk';
import { VERSION } from '../../shared/constants.js';
import { colors } from './colors.js';

export async function printBanner(): Promise<void> {
  const banner = `
  ${colors.primary('╔══════════════════════════════════════════════╗')}
  ${colors.primary('║')}                                              ${colors.primary('║')}
  ${colors.primary('║')}   ${chalk.bold.white('create-fullstack-app')}                       ${colors.primary('║')}
  ${colors.primary('║')}   ${colors.muted(`v${VERSION}`)}                                      ${colors.primary('║')}
  ${colors.primary('║')}                                              ${colors.primary('║')}
  ${colors.primary('║')}   ${colors.secondary('Scaffold production-ready full-stack')}       ${colors.primary('║')}
  ${colors.primary('║')}   ${colors.secondary('applications with your preferred stack')}     ${colors.primary('║')}
  ${colors.primary('║')}                                              ${colors.primary('║')}
  ${colors.primary('╚══════════════════════════════════════════════╝')}
  `;

  console.log(banner);
}

export function printPostGeneration(
  projectName: string,
  _outputDir: string,
  _packageManager: string,
  steps: string[]
): void {
  console.log();
  console.log(colors.success(`✅ Project "${projectName}" created successfully!`));
  console.log();
  console.log(colors.heading('Next steps:'));
  console.log();
  console.log(`  ${colors.command(`cd ${projectName}`)}`);
  console.log();

  for (let i = 0; i < steps.length; i++) {
    console.log(`  ${colors.muted(`${i + 1}.`)} ${steps[i]}`);
  }

  console.log();
  console.log(colors.muted('  📖 See README.md for full documentation'));
  console.log();
}