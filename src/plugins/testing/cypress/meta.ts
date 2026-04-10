import type { PluginMeta } from '../../../shared/types.js';
import { showWhenWebFrontend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'cypress',
  label: 'Cypress',
  description: 'Browser end-to-end testing setup with Cypress and starter specs.',
  category: 'testing',
  platformSupport: 'all',
  deps: [],
  devDeps: [{ name: 'cypress', version: '^13.16.0' }],
  envVars: [],
  scripts: [{ name: 'test:e2e', command: 'cypress run', target: 'root' }],
  conflicts: ['playwright'],
  requires: [],
  showWhen: showWhenWebFrontend,
  order: 4,
};

export default meta;
