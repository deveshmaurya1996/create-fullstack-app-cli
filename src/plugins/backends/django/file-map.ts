import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'manage.py.hbs', outputPath: 'manage.py', target: 'backend' },
    { template: 'requirements.txt.hbs', outputPath: 'requirements.txt', target: 'backend' },

    { template: 'config/__init__.py.hbs', outputPath: 'config/__init__.py', target: 'backend' },
    { template: 'config/settings.py.hbs', outputPath: 'config/settings.py', target: 'backend' },
    { template: 'config/urls.py.hbs', outputPath: 'config/urls.py', target: 'backend' },
    { template: 'config/wsgi.py.hbs', outputPath: 'config/wsgi.py', target: 'backend' },
    { template: 'config/asgi.py.hbs', outputPath: 'config/asgi.py', target: 'backend' },

    { template: 'core/__init__.py.hbs', outputPath: 'core/__init__.py', target: 'backend' },
    { template: 'core/pagination.py.hbs', outputPath: 'core/pagination.py', target: 'backend' },
    { template: 'core/permissions.py.hbs', outputPath: 'core/permissions.py', target: 'backend' },

    { template: 'users/__init__.py.hbs', outputPath: 'users/__init__.py', target: 'backend' },
    { template: 'users/models.py.hbs', outputPath: 'users/models.py', target: 'backend' },
    { template: 'users/serializers.py.hbs', outputPath: 'users/serializers.py', target: 'backend' },
    { template: 'users/views.py.hbs', outputPath: 'users/views.py', target: 'backend' },
    { template: 'users/urls.py.hbs', outputPath: 'users/urls.py', target: 'backend' },
    { template: 'users/admin.py.hbs', outputPath: 'users/admin.py', target: 'backend' },
    { template: 'users/tests.py.hbs', outputPath: 'users/tests.py', target: 'backend' },
  ],
  injections: [],
};

export default fileMap;
