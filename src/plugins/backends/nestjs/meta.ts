import type { PluginMeta } from '../../../shared/types.js';

const meta: PluginMeta = {
  id: 'nestjs',
  label: 'NestJS',
  description: 'Progressive Node.js framework with decorators, DI, and modules',
  category: 'backend',
  platformSupport: 'backend-only',
  deps: [
    { name: '@nestjs/core', version: '^10.4.0' },
    { name: '@nestjs/common', version: '^10.4.0' },
    { name: '@nestjs/platform-express', version: '^10.4.0' },
    { name: '@nestjs/config', version: '^3.3.0' },
    { name: 'class-validator', version: '^0.14.0' },
    { name: 'class-transformer', version: '^0.5.1' },
    { name: 'reflect-metadata', version: '^0.2.0' },
    { name: 'rxjs', version: '^7.8.0' },
  ],
  devDeps: [
    { name: 'typescript', version: '^5.7.2' },
    { name: '@nestjs/cli', version: '^10.4.0' },
    { name: '@nestjs/schematics', version: '^10.2.0' },
    { name: '@nestjs/testing', version: '^10.4.0' },
    { name: '@types/node', version: '^22.10.0' },
    { name: 'ts-loader', version: '^9.5.0' },
    { name: 'tsconfig-paths', version: '^4.2.0' },
  ],
  envVars: [
    { key: 'PORT', defaultValue: '3000', comment: 'Server port', target: 'backend' },
    { key: 'NODE_ENV', defaultValue: 'development', comment: 'Environment', target: 'backend' },
  ],
  scripts: [
    { name: 'dev', command: 'nest start --watch', target: 'backend', description: 'Start dev' },
    { name: 'build', command: 'nest build', target: 'backend', description: 'Build' },
    { name: 'start', command: 'node dist/main.js', target: 'backend', description: 'Start production' },
    { name: 'start:debug', command: 'nest start --debug --watch', target: 'backend', description: 'Start with debugger' },
  ],
  conflicts: ['express', 'fastify', 'hono', 'django', 'fastapi'],
  requires: [],
  showWhen: (_draft) => true,
  order: 3,
};

export default meta;