import type { Plugin } from '../shared/types.js';
import { PluginConflictError } from '../shared/errors.js';

export interface ConflictResult {
  hasConflicts: boolean;
  conflicts: Array<{
    pluginA: string;
    pluginB: string;
    reason: string;
  }>;
}

export function checkConflicts(activePlugins: Plugin[]): ConflictResult {
  const conflicts: ConflictResult['conflicts'] = [];
  const activeById = new Map(activePlugins.map((p) => [p.meta.id, p]));

  for (const plugin of activePlugins) {
    for (const conflictId of plugin.meta.conflicts) {
      const conflictingPlugin = activeById.get(conflictId);
      if (conflictingPlugin) {
        if (isCrossPlatformFrontendPair(plugin, conflictingPlugin)) {
          continue;
        }

        const existing = conflicts.find(
          (c) =>
            (c.pluginA === plugin.meta.id && c.pluginB === conflictId) ||
            (c.pluginA === conflictId && c.pluginB === plugin.meta.id)
        );

        if (!existing) {
          conflicts.push({
            pluginA: plugin.meta.id,
            pluginB: conflictId,
            reason: `"${plugin.meta.label}" conflicts with "${conflictingPlugin.meta.label}"`,
          });
        }
      }
    }
  }

  return {
    hasConflicts: conflicts.length > 0,
    conflicts,
  };
}

function isCrossPlatformFrontendPair(pluginA: Plugin, pluginB: Plugin): boolean {
  const a = pluginA.meta.category;
  const b = pluginB.meta.category;
  return (
    (a === 'frontend-web' && b === 'frontend-mobile') ||
    (a === 'frontend-mobile' && b === 'frontend-web')
  );
}

export function assertNoConflicts(activePlugins: Plugin[]): void {
  const result = checkConflicts(activePlugins);

  if (result.hasConflicts) {
    const first = result.conflicts[0];
    throw new PluginConflictError(first.pluginA, first.pluginB);
  }
}