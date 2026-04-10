import ora, { type Ora } from 'ora';
import { colors } from './colors.js';

let currentSpinner: Ora | null = null;

export function startSpinner(text: string): Ora {
  if (currentSpinner) {
    currentSpinner.stop();
  }
  currentSpinner = ora({
    text,
    color: 'cyan',
    spinner: 'dots',
  }).start();
  return currentSpinner;
}

export function updateSpinner(text: string): void {
  if (currentSpinner) {
    currentSpinner.text = text;
  }
}

export function succeedSpinner(text: string): void {
  if (currentSpinner) {
    currentSpinner.succeed(colors.success(text));
    currentSpinner = null;
  }
}

export function failSpinner(text: string): void {
  if (currentSpinner) {
    currentSpinner.fail(colors.error(text));
    currentSpinner = null;
  }
}

export function stopSpinner(): void {
  if (currentSpinner) {
    currentSpinner.stop();
    currentSpinner = null;
  }
}

export async function withSpinner<T>(
  text: string,
  fn: (spinner: Ora) => Promise<T>,
  successText?: string
): Promise<T> {
  const spinner = startSpinner(text);
  try {
    const result = await fn(spinner);
    succeedSpinner(successText || text);
    return result;
  } catch (error) {
    failSpinner(text);
    throw error;
  }
}