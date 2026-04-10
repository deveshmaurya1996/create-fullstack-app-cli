import type { Plugin } from '../shared/types.js';
import { MissingDependencyError } from '../shared/errors.js';

export interface DependencyCheckResult {
  satisfied: boolean;
  missingDeps: Array<{
    plugin: string;
    missing: string[];
  }>;
  suggestions: Array<{
    plugin: string;
    suggestedPlugins: string[];
    reason: string;
  }>;
}

export function checkDependencies(activePlugins: Plugin[]): DependencyCheckResult {
  const activeIds = new Set(activePlugins.map((p) => p.meta.id));
  const missingDeps: DependencyCheckResult['missingDeps'] = [];
  const suggestions: DependencyCheckResult['suggestions'] = [];

  for (const plugin of activePlugins) {
    if (plugin.meta.requires.length === 0) continue;
    const missing = plugin.meta.requires.filter((req) => !activeIds.has(req));

    if (missing.length === plugin.meta.requires.length) {
      missingDeps.push({
        plugin: plugin.meta.id,
        missing: plugin.meta.requires,
      });
    } else if (missing.length > 0) {
      suggestions.push({
        plugin: plugin.meta.id,
        suggestedPlugins: missing,
        reason: `"${plugin.meta.label}" works best with: ${missing.join(', ')}`,
      });
    }
  }

  return {
    satisfied: missingDeps.length === 0,
    missingDeps,
    suggestions,
  };
}

export function assertDependenciesSatisfied(activePlugins: Plugin[]): void {
  const result = checkDependencies(activePlugins);

  if (!result.satisfied) {
    const first = result.missingDeps[0];
    throw new MissingDependencyError(first.plugin, first.missing);
  }
}