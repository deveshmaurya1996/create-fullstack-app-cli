#!/usr/bin/env tsx
import { addPluginCommand } from '../src/commands/add-plugin.js';

const [, , pluginName, ...rest] = process.argv;

if (!pluginName) {
  console.error('Usage: tsx scripts/scaffold-plugin.ts <plugin-name> [--category <category>]');
  process.exit(1);
}

const categoryIdx = rest.indexOf('--category');
const category = categoryIdx !== -1 ? rest[categoryIdx + 1] : 'frontend-extras';

addPluginCommand(pluginName, { category }).catch((error) => {
  console.error(error);
  process.exit(1);
});