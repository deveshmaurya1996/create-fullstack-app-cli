import chalk from 'chalk';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  SILENT = 4,
}

let currentLevel: LogLevel = LogLevel.INFO;

export function setLogLevel(level: LogLevel): void {
  currentLevel = level;
}

export function getLogLevel(): LogLevel {
  return currentLevel;
}

export const logger = {
  debug(message: string, ...args: unknown[]): void {
    if (currentLevel <= LogLevel.DEBUG) {
      console.log(chalk.gray(`[debug] ${message}`), ...args);
    }
  },

  info(message: string, ...args: unknown[]): void {
    if (currentLevel <= LogLevel.INFO) {
      console.log(chalk.blue(`ℹ ${message}`), ...args);
    }
  },

  success(message: string, ...args: unknown[]): void {
    if (currentLevel <= LogLevel.INFO) {
      console.log(chalk.green(`✅ ${message}`), ...args);
    }
  },

  warn(message: string, ...args: unknown[]): void {
    if (currentLevel <= LogLevel.WARN) {
      console.log(chalk.yellow(`⚠ ${message}`), ...args);
    }
  },

  error(message: string, ...args: unknown[]): void {
    if (currentLevel <= LogLevel.ERROR) {
      console.error(chalk.red(`✖ ${message}`), ...args);
    }
  },

  step(step: number, total: number, message: string): void {
    if (currentLevel <= LogLevel.INFO) {
      const progress = chalk.dim(`[${step}/${total}]`);
      console.log(`  ${progress} ${message}`);
    }
  },

  blank(): void {
    if (currentLevel <= LogLevel.INFO) {
      console.log();
    }
  },

  divider(): void {
    if (currentLevel <= LogLevel.INFO) {
      console.log(chalk.dim('─'.repeat(60)));
    }
  },

  box(title: string, lines: string[]): void {
    if (currentLevel <= LogLevel.INFO) {
      const maxLen = Math.max(title.length, ...lines.map((l) => l.length));
      const width = maxLen + 4;
      const top = `╭${'─'.repeat(width)}╮`;
      const bottom = `╰${'─'.repeat(width)}╯`;

      console.log(chalk.dim(top));
      console.log(chalk.dim('│') + chalk.bold(` ${title}`) + ' '.repeat(width - title.length - 1) + chalk.dim('│'));
      console.log(chalk.dim(`├${'─'.repeat(width)}┤`));
      for (const line of lines) {
        console.log(chalk.dim('│') + `  ${line}` + ' '.repeat(width - line.length - 2) + chalk.dim('│'));
      }
      console.log(chalk.dim(bottom));
    }
  },
};