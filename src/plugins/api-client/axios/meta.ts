import type { PluginMeta } from '../../../shared/types.js';
import { showWhenApiClient } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'axios',
  label: 'Axios',
  description:
    'Promise-based HTTP client with shared axios instance and typed helper methods.',
  category: 'api-client',
  platformSupport: 'all',
  deps: [{ name: 'axios', version: '^1.7.9' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: ['fetch-wrapper', 'trpc-client'],
  requires: [],
  showWhen: showWhenApiClient,
  order: 1,
};

export default meta;
