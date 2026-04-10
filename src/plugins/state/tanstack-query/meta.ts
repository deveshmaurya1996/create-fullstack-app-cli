import type { PluginMeta } from '../../../shared/types.js';
import { showWhenFrontend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'tanstack-query',
  label: 'TanStack Query',
  description:
    'Server-state data fetching and caching with TanStack Query, including a query client, provider, and starter hooks.',
  category: 'state',
  platformSupport: 'all',
  deps: [{ name: '@tanstack/react-query', version: '^5.62.9' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenFrontend,
  order: 3,
};

export default meta;
