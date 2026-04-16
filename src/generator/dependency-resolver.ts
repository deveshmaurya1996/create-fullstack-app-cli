import type {
  Plugin,
  TemplateContext,
  Target,
  PackageJsonLocation,
  MergedDependencies,
} from '../shared/types.js';
import { TARGETS } from '../shared/constants.js';
import { sortKeys } from '../shared/utils.js';
import { logger } from '../shared/logger.js';

const CATEGORY_TARGET_MAP: Record<string, Target> = {
  'frontend-web': TARGETS.FRONTEND,
  'frontend-mobile': TARGETS.FRONTEND,
  'styling-web': TARGETS.FRONTEND,
  'styling-mobile': TARGETS.FRONTEND,
  'state': TARGETS.FRONTEND,
  'forms': TARGETS.FRONTEND,
  'ui-library': TARGETS.FRONTEND,
  'api-client': TARGETS.FRONTEND,
  'mobile-navigation': TARGETS.FRONTEND,
  'frontend-extras': TARGETS.FRONTEND,
  'backend': TARGETS.BACKEND,
  'api-style': TARGETS.BACKEND,
  'database': TARGETS.BACKEND,
  'orm': TARGETS.BACKEND,
  'auth': TARGETS.BACKEND,
  'backend-extras': TARGETS.BACKEND,
  'logging': TARGETS.BACKEND,
  'monitoring': TARGETS.ROOT,
  'testing': TARGETS.ROOT,
  'devtools': TARGETS.ROOT,
  'devops': TARGETS.ROOT,
  'deployment': TARGETS.ROOT,
};

export function resolveDependencies(
  plugins: Plugin[],
  packageJsonTargets: PackageJsonLocation[],
  context: TemplateContext
): Map<string, MergedDependencies> {
  const result = new Map<string, MergedDependencies>();

  for (const target of packageJsonTargets) {
    result.set(target.path, {
      dependencies: {},
      devDependencies: {},
    });
  }

  for (const plugin of plugins) {
    const targetKeys = resolveTargetsForPlugin(plugin, packageJsonTargets, context);

    if (targetKeys.length === 0) {
      logger.warn(
        `Could not resolve target package.json for plugin "${plugin.meta.id}" (category: ${plugin.meta.category})`
      );
      continue;
    }

    for (const targetKey of targetKeys) {
      const merged = result.get(targetKey);
      if (!merged) continue;

      for (const dep of plugin.meta.deps) {
        if (merged.dependencies[dep.name]) {
          if (merged.dependencies[dep.name] !== dep.version) {
            logger.warn(
              `Dependency version conflict for "${dep.name}": ` +
              `"${merged.dependencies[dep.name]}" vs "${dep.version}" (from ${plugin.meta.id})`
            );
          }
        }
        merged.dependencies[dep.name] = dep.version;
      }

      for (const dep of plugin.meta.devDeps) {
        if (merged.devDependencies[dep.name]) {
          if (merged.devDependencies[dep.name] !== dep.version) {
            logger.warn(
              `Dev dependency version conflict for "${dep.name}": ` +
              `"${merged.devDependencies[dep.name]}" vs "${dep.version}" (from ${plugin.meta.id})`
            );
          }
        }
        merged.devDependencies[dep.name] = dep.version;
      }
    }
  }

  for (const [key, merged] of result) {
    result.set(key, {
      dependencies: sortKeys(merged.dependencies),
      devDependencies: sortKeys(merged.devDependencies),
    });
  }

  return result;
}

function resolveTargetsForPlugin(
  plugin: Plugin,
  packageJsonTargets: PackageJsonLocation[],
  context: TemplateContext
): string[] {
  if (context.isSingleApp && context.isFullstack && context.hasBothPlatforms) {
    const clientPath = packageJsonTargets.find((t) => t.path === 'client/package.json')?.path;
    const mobilePath = packageJsonTargets.find((t) => t.path === 'mobile/package.json')?.path;
    const frontendCategories = new Set([
      'frontend-web',
      'frontend-mobile',
      'styling-web',
      'styling-mobile',
      'state',
      'forms',
      'ui-library',
      'api-client',
      'mobile-navigation',
      'frontend-extras',
    ]);

    if (frontendCategories.has(plugin.meta.category)) {
      if (plugin.meta.category === 'frontend-mobile' || plugin.meta.category === 'styling-mobile' || plugin.meta.category === 'mobile-navigation' || plugin.meta.platformSupport === 'mobile-only') {
        return mobilePath ? [mobilePath] : [];
      }
      if (plugin.meta.category === 'frontend-web' || plugin.meta.category === 'styling-web' || plugin.meta.platformSupport === 'web-only') {
        return clientPath ? [clientPath] : [];
      }
      return [clientPath, mobilePath].filter((p): p is string => Boolean(p));
    }
  }

  if (plugin.meta.category === 'devtools' && context.isSingleApp && context.isFullstack) {
    const frontendTargets = packageJsonTargets.filter((t) => t.target === TARGETS.FRONTEND).map((t) => t.path);
    const backendTarget = packageJsonTargets.find((t) => t.target === TARGETS.BACKEND)?.path;
    return [...frontendTargets, backendTarget].filter((p): p is string => Boolean(p));
  }

  const single = resolveTargetForPlugin(plugin, packageJsonTargets, context);
  return single ? [single] : [];
}

function resolveTargetForPlugin(
  plugin: Plugin,
  packageJsonTargets: PackageJsonLocation[],
  context: TemplateContext
): string | null {
  const inferredTarget = inferTargetFromPluginOutputs(plugin, context);
  if (inferredTarget) {
    const inferredPackage = packageJsonTargets.find((t) => t.target === inferredTarget);
    if (inferredPackage) return inferredPackage.path;
  }

  const categoryTarget = CATEGORY_TARGET_MAP[plugin.meta.category];

  if (!categoryTarget) {
    const rootTarget = packageJsonTargets.find((t) => t.target === TARGETS.ROOT);
    return rootTarget?.path || null;
  }

  if (plugin.meta.category === 'monitoring' || plugin.meta.category === 'testing') {
    const rootTarget = packageJsonTargets.find((t) => t.target === TARGETS.ROOT);
    return rootTarget?.path || null;
  }

  if (plugin.meta.category === 'auth') {
    const backendTarget = packageJsonTargets.find((t) => t.target === TARGETS.BACKEND);
    if (backendTarget) return backendTarget.path;
    const rootTarget = packageJsonTargets.find((t) => t.target === TARGETS.ROOT);
    return rootTarget?.path || null;
  }

  const target = packageJsonTargets.find((t) => t.target === categoryTarget);
  if (target) return target.path;

  const rootTarget = packageJsonTargets.find((t) => t.target === TARGETS.ROOT);
  return rootTarget?.path || packageJsonTargets[0]?.path || null;
}

function inferTargetFromPluginOutputs(plugin: Plugin, context: TemplateContext): Target | null {
  const targets = new Set<Target>();

  for (const entry of plugin.fileMap.files) {
    if (!entry.when || entry.when(context)) {
      targets.add(entry.target);
    }
  }

  for (const injection of plugin.fileMap.injections) {
    if (!injection.when || injection.when(context)) {
      targets.add(injection.target);
    }
  }

  if (targets.size === 1) {
    return [...targets][0];
  }

  return null;
}