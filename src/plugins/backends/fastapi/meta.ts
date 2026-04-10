import type { PluginMeta } from '../../../shared/types.js';

const meta: PluginMeta = {
  id: 'fastapi',
  label: 'FastAPI',
  description: 'High-performance Python API framework with automatic OpenAPI docs',
  category: 'backend',
  platformSupport: 'backend-only',
  deps: [],
  devDeps: [],
  pythonDeps: [
    { name: 'fastapi', version: '>=0.115.0' },
    { name: 'uvicorn[standard]', version: '>=0.32.0' },
    { name: 'pydantic-settings', version: '>=2.6.0' },
    { name: 'python-dotenv', version: '>=1.0.0' },
    { name: 'gunicorn', version: '>=23.0.0' },
    { name: 'email-validator', version: '>=2.2.0' },
  ],
  envVars: [
    { key: 'PORT', defaultValue: '8000', comment: 'API port (uvicorn)', target: 'backend' },
    { key: 'CORS_ORIGIN', defaultValue: 'http://localhost:5173', comment: 'Allowed CORS origin', target: 'backend' },
    { key: 'DEBUG', defaultValue: 'true', comment: 'Enable debug / docs in development', target: 'backend' },
  ],
  scripts: [
    {
      name: 'dev',
      command: 'uvicorn app.main:app --reload --host 0.0.0.0 --port 8000',
      target: 'backend',
      description: 'Start dev server with reload',
    },
    {
      name: 'start:prod',
      command: 'gunicorn app.main:app -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000',
      target: 'backend',
      description: 'Start production server',
    },
  ],
  conflicts: ['express', 'fastify', 'nestjs', 'hono', 'django'],
  requires: [],
  showWhen: (_draft) => true,
  order: 6,
};

export default meta;
