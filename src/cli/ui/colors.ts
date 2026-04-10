import chalk from 'chalk';

export const colors = {
  // Primary    
  primary: chalk.hex('#6C63FF'),
  secondary: chalk.hex('#00D9FF'),
  accent: chalk.hex('#FF6B6B'),

  // Status
  success: chalk.green,
  warning: chalk.yellow,
  error: chalk.red,
  info: chalk.blue,

  // Text
  heading: chalk.bold.white,
  subheading: chalk.bold.gray,
  label: chalk.cyan,
  value: chalk.white,
  muted: chalk.dim,
  highlight: chalk.bold.yellow,

  // Sections
  sectionTitle: chalk.bold.underline.cyan,
  category: chalk.bold.magenta,

  // Code
  code: chalk.gray,
  path: chalk.italic.gray,
  command: chalk.bold.green,
  pkg: chalk.yellow,

  // Decorative
  border: chalk.dim,
  bullet: chalk.dim.cyan,
  arrow: chalk.dim.green,
};

export function badge(text: string, color: 'success' | 'warning' | 'error' | 'info'): string {
  const colorMap = {
    success: chalk.bgGreen.black,
    warning: chalk.bgYellow.black,
    error: chalk.bgRed.white,
    info: chalk.bgBlue.white,
  };
  return colorMap[color](` ${text} `);
}

export function keyValue(key: string, value: string, keyWidth = 16): string {
  const paddedKey = key.padEnd(keyWidth);
  return `${colors.label(paddedKey)} ${colors.value(value)}`;
}