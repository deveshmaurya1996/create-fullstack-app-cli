import type { PluginMeta } from '../../../shared/types.js';
import { showWhenWebFrontend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'playwright',
  label: 'Playwright',
  description: 'Cross-browser end-to-end testing setup using Playwright.',
  category: 'testing',
  platformSupport: 'all',
  deps: [],
  devDeps: [{ name: '@playwright/test', version: '^1.49.0' }],
  envVars: [],
  scripts: [{ name: 'test:e2e', command: 'playwright test', target: 'root' }],
  conflicts: ['cypress'],
  requires: [],
  showWhen: showWhenWebFrontend,
  order: 3,
};

export default meta;
