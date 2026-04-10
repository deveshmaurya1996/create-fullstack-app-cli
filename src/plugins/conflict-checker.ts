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
  const activeIds = new Set(activePlugins.map((p) => p.meta.id));

  for (const plugin of activePlugins) {
    for (const conflictId of plugin.meta.conflicts) {
      if (activeIds.has(conflictId)) {
        const existing = conflicts.find(
          (c) =>
            (c.pluginA === plugin.meta.id && c.pluginB === conflictId) ||
            (c.pluginA === conflictId && c.pluginB === plugin.meta.id)
        );

        if (!existing) {
          conflicts.push({
            pluginA: plugin.meta.id,
            pluginB: conflictId,
            reason: `"${plugin.meta.label}" conflicts with "${conflictId}"`,
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

export function assertNoConflicts(activePlugins: Plugin[]): void {
  const result = checkConflicts(activePlugins);

  if (result.hasConflicts) {
    const first = result.conflicts[0];
    throw new PluginConflictError(first.pluginA, first.pluginB);
  }
}