import type { Plugin } from '../../shared/types.js';

export interface EnvCompletenessResult {
  complete: boolean;
  missingDefaults: Array<{
    key: string;
    plugin: string;
  }>;
}

export function checkEnvCompleteness(
  activePlugins: Plugin[]
): EnvCompletenessResult {
  const missingDefaults: EnvCompletenessResult['missingDefaults'] = [];

  for (const plugin of activePlugins) {
    for (const envVar of plugin.meta.envVars) {
      if (!envVar.defaultValue && envVar.defaultValue !== '') {
        missingDefaults.push({
          key: envVar.key,
          plugin: plugin.meta.id,
        });
      }
    }
  }

  return {
    complete: missingDefaults.length === 0,
    missingDefaults,
  };
}