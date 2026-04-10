import type { PluginMeta } from '../../../shared/types.js';
import { showWhenNodeBackend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'trpc-server',
  label: 'tRPC Server',
  description: 'End-to-end typed backend API routers and server plugin setup using tRPC.',
  category: 'api-style',
  platformSupport: 'backend-only',
  deps: [
    { name: '@trpc/server', version: '^11.0.0' },
    { name: 'zod', version: '^3.23.8' },
  ],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenNodeBackend,
  order: 2,
};

export default meta;
