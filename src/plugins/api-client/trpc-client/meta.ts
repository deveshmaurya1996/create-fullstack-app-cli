import type { PluginMeta } from '../../../shared/types.js';
import { showWhenApiClient } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'trpc-client',
  label: 'tRPC Client',
  description:
    'End-to-end typed API client for tRPC with React Query integration and provider setup.',
  category: 'api-client',
  platformSupport: 'all',
  deps: [
    { name: '@trpc/client', version: '^11.0.0' },
    { name: '@trpc/react-query', version: '^11.0.0' },
    { name: '@tanstack/react-query', version: '^5.62.9' },
    { name: 'superjson', version: '^2.2.2' },
  ],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: ['axios', 'fetch-wrapper'],
  requires: [],
  showWhen: showWhenApiClient,
  order: 3,
};

export default meta;
