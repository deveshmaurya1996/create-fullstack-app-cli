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
  _context: TemplateContext
): Map<string, Record<string, string>> {
  const result = new Map<string, Record<string, string>>();

  for (const target of packageJsonTargets) {
    result.set(target.path, {});
  }

  for (const plugin of plugins) {
    for (const scriptEntry of plugin.meta.scripts) {
      const targetPath = findTargetPath(scriptEntry.target, packageJsonTargets);

      if (!targetPath) {
        logger.warn(
          `Could not resolve target for script "${scriptEntry.name}" ` +
          `from plugin "${plugin.meta.id}" (target: ${scriptEntry.target})`
        );
        continue;
      }

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

  return result;
}

function findTargetPath(
  target: Target,
  packageJsonTargets: PackageJsonLocation[]
): string | null {
  const match = packageJsonTargets.find((t) => t.target === target);
  if (match) return match.path;

  const root = packageJsonTargets.find((t) => t.target === TARGETS.ROOT);
  return root?.path || null;
}