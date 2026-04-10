import type { PluginMeta } from '../../../shared/types.js';

const meta: PluginMeta = {
  id: 'hono',
  label: 'Hono',
  description: 'Ultrafast web framework for the edge, Cloudflare Workers, Deno, Bun',
  category: 'backend',
  platformSupport: 'backend-only',
  deps: [
    { name: 'hono', version: '^4.6.0' },
    { name: '@hono/node-server', version: '^1.13.0' },
    { name: '@hono/zod-validator', version: '^0.4.0' },
    { name: 'zod', version: '^3.23.0' },
    { name: 'dotenv', version: '^16.4.0' },
  ],
  devDeps: [
    { name: 'typescript', version: '^5.7.2' },
    { name: '@types/node', version: '^22.10.0' },
    { name: 'tsx', version: '^4.19.0' },
  ],
  envVars: [
    { key: 'PORT', defaultValue: '3000', comment: 'Server port', target: 'backend' },
  ],
  scripts: [
    { name: 'dev', command: 'tsx watch src/server.ts', target: 'backend', description: 'Start dev' },
    { name: 'build', command: 'tsc', target: 'backend', description: 'Build' },
    { name: 'start', command: 'node dist/server.js', target: 'backend', description: 'Start production' },
  ],
  conflicts: ['express', 'fastify', 'nestjs', 'django', 'fastapi'],
  requires: [],
  showWhen: (_draft) => true,
  order: 4,
};

export default meta;