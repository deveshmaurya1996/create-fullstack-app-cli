import type { PluginMeta } from '../../../shared/types.js';

const meta: PluginMeta = {
  id: 'django',
  label: 'Django',
  description: 'Batteries-included Python web framework with Django REST Framework APIs',
  category: 'backend',
  platformSupport: 'backend-only',
  deps: [],
  devDeps: [],
  pythonDeps: [
    { name: 'Django', version: '>=5.0,<6.0' },
    { name: 'djangorestframework', version: '>=3.15.0' },
    { name: 'django-cors-headers', version: '>=4.6.0' },
    { name: 'python-dotenv', version: '>=1.0.0' },
    { name: 'dj-database-url', version: '>=2.3.0' },
    { name: 'gunicorn', version: '>=23.0.0' },
  ],
  envVars: [
    { key: 'SECRET_KEY', defaultValue: 'change-me-in-production', comment: 'Django secret key', target: 'backend' },
    { key: 'DEBUG', defaultValue: 'True', comment: 'Debug mode (False in production)', target: 'backend' },
    { key: 'ALLOWED_HOSTS', defaultValue: 'localhost,127.0.0.1', comment: 'Comma-separated allowed hosts', target: 'backend' },
    { key: 'DATABASE_URL', defaultValue: 'sqlite:///db.sqlite3', comment: 'Database URL (e.g. postgres://...)', target: 'backend' },
    { key: 'CORS_ORIGIN', defaultValue: 'http://localhost:5173', comment: 'Allowed CORS origin for the API', target: 'backend' },
  ],
  scripts: [
    { name: 'dev', command: 'python manage.py runserver 0.0.0.0:8000', target: 'backend', description: 'Start dev server' },
    { name: 'migrate', command: 'python manage.py migrate', target: 'backend', description: 'Apply database migrations' },
    { name: 'makemigrations', command: 'python manage.py makemigrations', target: 'backend', description: 'Create new migrations' },
    { name: 'shell', command: 'python manage.py shell', target: 'backend', description: 'Django shell' },
    { name: 'test', command: 'python manage.py test', target: 'backend', description: 'Run tests' },
    { name: 'collectstatic', command: 'python manage.py collectstatic --noinput', target: 'backend', description: 'Collect static files' },
    {
      name: 'start:prod',
      command: 'gunicorn config.wsgi:application --bind 0.0.0.0:8000',
      target: 'backend',
      description: 'Start production server',
    },
  ],
  conflicts: ['express', 'fastify', 'nestjs', 'hono', 'fastapi'],
  requires: [],
  showWhen: (_draft) => true,
  order: 5,
};

export default meta;
