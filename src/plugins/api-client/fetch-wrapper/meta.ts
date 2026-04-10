import type { PluginMeta } from '../../../shared/types.js';
import { showWhenApiClient } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'fetch-wrapper',
  label: 'Fetch Wrapper',
  description:
    'Lightweight fetch wrapper with centralized JSON handling and consistent error flow.',
  category: 'api-client',
  platformSupport: 'all',
  deps: [],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: ['axios', 'trpc-client'],
  requires: [],
  showWhen: showWhenApiClient,
  order: 2,
};

export default meta;
