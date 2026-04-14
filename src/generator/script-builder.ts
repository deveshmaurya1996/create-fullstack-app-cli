import type {
  Plugin,
  TemplateContext,
  PackageJsonLocation,
  Target,
} from '../shared/types.js';
import { TARGETS } from '../shared/constants.js';
import { logger } from '../shared/logger.js';

export function buildScripts(
  plugins: Plugin[],
  packageJsonTargets: PackageJsonLocation[],
  context: TemplateContext
): Map<string, Record<string, string>> {
  const result = new Map<string, Record<string, string>>();

  for (const target of packageJsonTargets) {
    result.set(target.path, {});
  }

  for (const plugin of plugins) {
    for (const scriptEntry of plugin.meta.scripts) {
      const targetPaths = findTargetPaths(scriptEntry.target, packageJsonTargets, context);

      if (targetPaths.length === 0) {
        logger.warn(
          `Could not resolve target for script "${scriptEntry.name}" ` +
          `from plugin "${plugin.meta.id}" (target: ${scriptEntry.target})`
        );
        continue;
      }

      for (const targetPath of targetPaths) {
        const scripts = result.get(targetPath);
        if (!scripts) continue;

        if (scripts[scriptEntry.name]) {
          logger.warn(
            `Script name collision: "${scriptEntry.name}" in ${targetPath} ` +
            `(existing from another plugin, overwriting with ${plugin.meta.id})`
          );
        }

        scripts[scriptEntry.name] = scriptEntry.command;
      }
    }
  }

  return result;
}

function findTargetPaths(
  target: Target,
  packageJsonTargets: PackageJsonLocation[],
  context: TemplateContext
): string[] {
  const match = packageJsonTargets.find((t) => t.target === target);
  if (match) return [match.path];

  if (target === TARGETS.ROOT && context.isSingleApp && context.isFullstack) {
    const frontend = packageJsonTargets.find((t) => t.target === TARGETS.FRONTEND)?.path;
    const backend = packageJsonTargets.find((t) => t.target === TARGETS.BACKEND)?.path;
    return [frontend, backend].filter((p): p is string => Boolean(p));
  }

  const root = packageJsonTargets.find((t) => t.target === TARGETS.ROOT);
  return root ? [root.path] : [];
}