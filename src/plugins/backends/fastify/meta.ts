import type { PluginMeta } from '../../../shared/types.js';

const meta: PluginMeta = {
  id: 'fastify',
  label: 'Fastify',
  description: 'Fast and low overhead Node.js framework with schema validation',
  category: 'backend',
  platformSupport: 'backend-only',
  deps: [
    { name: 'fastify', version: '^5.1.0' },
    { name: '@fastify/cors', version: '^10.0.0' },
    { name: '@fastify/helmet', version: '^12.0.0' },
    { name: '@fastify/sensible', version: '^6.0.0' },
    { name: 'dotenv', version: '^16.4.0' },
    { name: 'zod', version: '^3.23.0' },
  ],
  devDeps: [
    { name: 'typescript', version: '^5.7.2' },
    { name: '@types/node', version: '^22.10.0' },
    { name: 'tsx', version: '^4.19.0' },
  ],
  envVars: [
    { key: 'PORT', defaultValue: '3000', comment: 'Server port', target: 'backend' },
    { key: 'NODE_ENV', defaultValue: 'development', comment: 'Environment', target: 'backend' },
    { key: 'CORS_ORIGIN', defaultValue: 'http://localhost:5173', comment: 'CORS origin', target: 'backend' },
  ],
  scripts: [
    { name: 'dev', command: 'tsx watch src/server.ts', target: 'backend', description: 'Start dev server' },
    { name: 'build', command: 'tsc', target: 'backend', description: 'Build' },
    { name: 'start', command: 'node dist/server.js', target: 'backend', description: 'Start production' },
  ],
  conflicts: ['express', 'nestjs', 'hono', 'django', 'fastapi'],
  requires: [],
  showWhen: (_draft) => true,
  order: 2,
};

export default meta;