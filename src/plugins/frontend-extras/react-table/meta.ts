import type { PluginMeta } from '../../../shared/types.js';
import { showWhenWebFrontend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'react-table',
  label: 'React Table',
  description: 'Headless table utilities with starter data and sample table component for web apps.',
  category: 'frontend-extras',
  platformSupport: 'all',
  deps: [{ name: '@tanstack/react-table', version: '^8.20.5' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenWebFrontend,
  order: 2,
};

export default meta;
