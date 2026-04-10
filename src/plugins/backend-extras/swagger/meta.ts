import type { PluginMeta } from '../../../shared/types.js';
import { showWhenNodeBackend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'swagger',
  label: 'Swagger',
  description: 'OpenAPI/Swagger documentation setup for Express, Fastify, and NestJS.',
  category: 'backend-extras',
  platformSupport: 'backend-only',
  deps: [
    { name: 'swagger-ui-express', version: '^5.0.1' },
    { name: 'swagger-jsdoc', version: '^6.2.8' },
  ],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenNodeBackend,
  order: 10,
};

export default meta;
