import type { Plugin, TemplateContext } from '../../shared/types.js';

export interface CollisionResult {
  hasCollisions: boolean;
  collisions: Array<{
    path: string;
    plugins: string[];
  }>;
}

export function detectFileCollisions(
  activePlugins: Plugin[],
  context: TemplateContext,
  pathResolver: (
    relativePath: string,
    target: string,
    options?: { pluginCategory?: string; platformSupport?: 'all' | 'web-only' | 'mobile-only' | 'backend-only'; templatePath?: string }
  ) => string
): CollisionResult {
  const fileMap = new Map<string, string[]>();

  for (const plugin of activePlugins) {
    for (const entry of plugin.fileMap.files) {
      // Check when condition
      if (entry.when && !entry.when(context)) continue;

      const resolvedPath = pathResolver(entry.outputPath, entry.target, {
        pluginCategory: plugin.meta.category,
        platformSupport: plugin.meta.platformSupport,
        templatePath: entry.template,
      });

      if (!fileMap.has(resolvedPath)) {
        fileMap.set(resolvedPath, []);
      }
      fileMap.get(resolvedPath)!.push(plugin.meta.id);
    }
  }

  const collisions: CollisionResult['collisions'] = [];

  for (const [path, plugins] of fileMap) {
    if (plugins.length > 1) {
      collisions.push({ path, plugins });
    }
  }

  return {
    hasCollisions: collisions.length > 0,
    collisions,
  };
}