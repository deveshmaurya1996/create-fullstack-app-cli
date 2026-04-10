import type { PackageManager } from '../../shared/types.js';
import { sortKeys } from '../../shared/utils.js';

export interface PackageJsonOptions {
  name: string;
  version?: string;
  private?: boolean;
  type?: 'module' | 'commonjs';
  main?: string;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  workspaces?: string[];
  engines?: Record<string, string>;
}

export function buildPackageJson(options: PackageJsonOptions): string {
  const pkg: Record<string, unknown> = {
    name: options.name,
    version: options.version || '0.1.0',
    private: options.private ?? true,
  };

  if (options.type) pkg.type = options.type;
  if (options.main) pkg.main = options.main;

  if (options.scripts && Object.keys(options.scripts).length > 0) {
    pkg.scripts = options.scripts;
  }

  if (options.dependencies && Object.keys(options.dependencies).length > 0) {
    pkg.dependencies = sortKeys(options.dependencies);
  }

  if (options.devDependencies && Object.keys(options.devDependencies).length > 0) {
    pkg.devDependencies = sortKeys(options.devDependencies);
  }

  if (options.workspaces && options.workspaces.length > 0) {
    pkg.workspaces = options.workspaces;
  }

  if (options.engines) {
    pkg.engines = options.engines;
  }

  return JSON.stringify(pkg, null, 2) + '\n';
}

export function getRunCommand(packageManager: PackageManager, script: string): string {
  switch (packageManager) {
    case 'npm':
      return script === 'start' ? 'npm start' : `npm run ${script}`;
    case 'yarn':
      return `yarn ${script}`;
    case 'pnpm':
      return `pnpm ${script}`;
    case 'bun':
      return `bun run ${script}`;
    default:
      return `npm run ${script}`;
  }
}

export function getInstallCommand(packageManager: PackageManager): string {
  switch (packageManager) {
    case 'npm':
      return 'npm install';
    case 'yarn':
      return 'yarn';
    case 'pnpm':
      return 'pnpm install';
    case 'bun':
      return 'bun install';
    default:
      return 'npm install';
  }
}