import type {
  TemplateContext,
  PackageJsonLocation,
  MergedDependencies,
} from '../shared/types.js';
import { buildPackageJson, type PackageJsonOptions } from '../layouts/helpers/package-json-builder.js';

export function generatePackageJsonFiles(
  targets: PackageJsonLocation[],
  dependencies: Map<string, MergedDependencies>,
  scripts: Map<string, Record<string, string>>,
  context: TemplateContext
): Map<string, string> {
  const result = new Map<string, string>();

  for (const target of targets) {
    const deps = dependencies.get(target.path) || {
      dependencies: {},
      devDependencies: {},
    };
    const targetScripts = scripts.get(target.path) || {};

    const options: PackageJsonOptions = {
      name: target.name,
      version: '0.1.0',
      private: true,
      scripts: targetScripts,
      dependencies: deps.dependencies,
      devDependencies: deps.devDependencies,
    };

    if (target.target === 'backend' && context.backendTs) {
      options.type = 'module';
    }

    if (target.target === 'frontend' && (context.hasReactVite || context.hasVue || context.hasSvelte)) {
      options.type = 'module';
    }

    if (target.target === 'frontend' && context.hasExpo && context.hasExpoRouter) {
      options.main = 'expo-router/entry';
    }

    options.engines = { node: '>=18.0.0' };

    if (target.target === 'root' && context.hasMonorepo) {
      options.workspaces = ['apps/*', 'packages/*'];
    }

    result.set(target.path, buildPackageJson(options));
  }

  return result;
}