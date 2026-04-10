import type { PluginMeta } from '../../../shared/types.js';
import { showWhenNodeBackend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'graphql-server',
  label: 'GraphQL Server',
  description: 'GraphQL API setup with schema, resolvers, and server registration fragments.',
  category: 'api-style',
  platformSupport: 'backend-only',
  deps: [
    { name: 'graphql', version: '^16.9.0' },
    { name: 'graphql-yoga', version: '^5.10.0' },
  ],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenNodeBackend,
  order: 1,
};

export default meta;
