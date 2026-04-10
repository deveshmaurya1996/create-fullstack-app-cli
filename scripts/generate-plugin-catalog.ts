import fs from 'fs-extra';
import path from 'node:path';
import { pluginRegistry } from '../src/plugins/registry.js';
import { CATEGORY_LABELS } from '../src/shared/constants.js';
import { logger } from '../src/shared/logger.js';

async function main() {
  await pluginRegistry.initialize();

  const allPlugins = pluginRegistry.getAllPlugins();
  const categories = pluginRegistry.getCategories();

  let catalog = '# Plugin Catalog\n\n';
  catalog += `> Auto-generated. Total plugins: **${allPlugins.length}**\n\n`;
  catalog += '## Table of Contents\n\n';

  for (const category of categories) {
    const label = CATEGORY_LABELS[category] || category;
    const anchor = label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    catalog += `- [${label}](#${anchor})\n`;
  }

  catalog += '\n---\n\n';

  for (const category of categories) {
    const label = CATEGORY_LABELS[category] || category;
    const plugins = pluginRegistry.getPluginsByCategory(category as any);

    catalog += `## ${label}\n\n`;
    catalog += '| Plugin | Description | Platform | Dependencies | Conflicts | Requires |\n';
    catalog += '|--------|-------------|----------|-------------|-----------|----------|\n';

    for (const plugin of plugins) {
      const deps = plugin.meta.deps.map((d) => `\`${d.name}\``).join(', ') || '-';
      const conflicts = plugin.meta.conflicts.map((c) => `\`${c}\``).join(', ') || '-';
      const requires = plugin.meta.requires.map((r) => `\`${r}\``).join(', ') || '-';

      catalog += `| **${plugin.meta.label}** (\`${plugin.meta.id}\`) `;
      catalog += `| ${plugin.meta.description} `;
      catalog += `| ${plugin.meta.platformSupport} `;
      catalog += `| ${deps} `;
      catalog += `| ${conflicts} `;
      catalog += `| ${requires} |\n`;
    }

    catalog += '\n';
  }

  const outputPath = path.resolve(process.cwd(), 'docs', 'PLUGIN-CATALOG.md');
  await fs.ensureDir(path.dirname(outputPath));
  await fs.writeFile(outputPath, catalog);

  logger.success(`Plugin catalog written to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});