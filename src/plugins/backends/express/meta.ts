import type { PluginMeta } from '../../../shared/types.js';

const meta: PluginMeta = {
  id: 'express',
  label: 'Express',
  description: 'Minimal and flexible Node.js web framework',
  category: 'backend',
  platformSupport: 'backend-only',
  deps: [
    { name: 'express', version: '^4.21.0' },
    { name: 'cors', version: '^2.8.5' },
    { name: 'helmet', version: '^8.0.0' },
    { name: 'dotenv', version: '^16.4.0' },
    { name: 'zod', version: '^3.23.0' },
  ],
  devDeps: [
    { name: 'typescript', version: '^5.7.2' },
    { name: '@types/express', version: '^5.0.0' },
    { name: '@types/cors', version: '^2.8.17' },
    { name: '@types/node', version: '^22.10.0' },
    { name: 'tsx', version: '^4.19.0' },
  ],
  envVars: [
    { key: 'PORT', defaultValue: '3000', comment: 'Server port', target: 'backend' },
    { key: 'NODE_ENV', defaultValue: 'development', comment: 'Environment', target: 'backend' },
    { key: 'CORS_ORIGIN', defaultValue: 'http://localhost:5173', comment: 'Allowed CORS origin', target: 'backend' },
  ],
  scripts: [
    { name: 'dev', command: 'tsx watch src/server.ts', target: 'backend', description: 'Start dev server' },
    { name: 'build', command: 'tsc', target: 'backend', description: 'Build' },
    { name: 'start', command: 'node dist/server.js', target: 'backend', description: 'Start production' },
  ],
  conflicts: ['fastify', 'nestjs', 'hono', 'django', 'fastapi'],
  requires: [],
  showWhen: (_draft) => true,
  order: 1,
};

export default meta;