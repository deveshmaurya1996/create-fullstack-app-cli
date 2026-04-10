import type { Plugin } from '../../shared/types.js';
import { checkConflicts } from '../../plugins/conflict-checker.js';
import { checkDependencies } from '../../plugins/dependency-checker.js';

export interface CompatibilityResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validatePluginCompatibility(
  activePlugins: Plugin[]
): CompatibilityResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const conflicts = checkConflicts(activePlugins);
  if (conflicts.hasConflicts) {
    for (const conflict of conflicts.conflicts) {
      errors.push(conflict.reason);
    }
  }
  
  const deps = checkDependencies(activePlugins);
  if (!deps.satisfied) {
    for (const missing of deps.missingDeps) {
      errors.push(
        `Plugin "${missing.plugin}" requires at least one of: ${missing.missing.join(', ')}`
      );
    }
  }

  for (const suggestion of deps.suggestions) {
    warnings.push(suggestion.reason);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}