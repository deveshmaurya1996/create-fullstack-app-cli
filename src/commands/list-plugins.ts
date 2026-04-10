import { pluginRegistry } from '../plugins/registry.js';
import { logger } from '../shared/logger.js';
import { colors } from '../cli/ui/colors.js';
import { CATEGORY_LABELS } from '../shared/constants.js';
import type { PluginCategory } from '../shared/types.js';

export async function listPluginsCommand(
  options: Record<string, unknown>
): Promise<void> {
  await pluginRegistry.initialize();

  const filterCategory = options.category as string | undefined;
  const asJson = options.json as boolean | undefined;

  const allPlugins = pluginRegistry.getAllPlugins();

  if (asJson) {
    const data = allPlugins
      .filter((p) => !filterCategory || p.meta.category === filterCategory)
      .map((p) => ({
        id: p.meta.id,
        label: p.meta.label,
        category: p.meta.category,
        description: p.meta.description,
        platformSupport: p.meta.platformSupport,
        deps: p.meta.deps.map((d) => d.name),
        conflicts: p.meta.conflicts,
        requires: p.meta.requires,
      }));

    logger.info(JSON.stringify(data, null, 2));
    return;
  }

  const categories = pluginRegistry.getCategories();

  logger.blank();
  logger.info(colors.heading(`Available plugins (${allPlugins.length} total)`));
  logger.blank();

  for (const category of categories) {
    if (filterCategory && category !== filterCategory) continue;

    const plugins = pluginRegistry.getPluginsByCategory(category as PluginCategory);
    const label = CATEGORY_LABELS[category] || category;

    logger.info(colors.category(`  ${label}`));

    for (const plugin of plugins) {
      const conflicts =
        plugin.meta.conflicts.length > 0
          ? colors.warning(` (conflicts: ${plugin.meta.conflicts.join(', ')})`)
          : '';
      const requires =
        plugin.meta.requires.length > 0
          ? colors.muted(` -> requires: ${plugin.meta.requires.join(', ')}`)
          : '';

      logger.info(
        `    ${colors.label(plugin.meta.id.padEnd(30))} ` +
          `${colors.muted(plugin.meta.description)}` +
          `${conflicts}${requires}`
      );
    }
    logger.blank();
  }
}
