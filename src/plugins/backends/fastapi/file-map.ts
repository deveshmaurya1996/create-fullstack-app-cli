import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'requirements.txt.hbs', outputPath: 'requirements.txt', target: 'backend' },
    { template: 'app/__init__.py.hbs', outputPath: 'app/__init__.py', target: 'backend' },
    { template: 'app/main.py.hbs', outputPath: 'app/main.py', target: 'backend' },
    { template: 'app/core/__init__.py.hbs', outputPath: 'app/core/__init__.py', target: 'backend' },
    { template: 'app/core/config.py.hbs', outputPath: 'app/core/config.py', target: 'backend' },
    { template: 'app/routers/__init__.py.hbs', outputPath: 'app/routers/__init__.py', target: 'backend' },
    { template: 'app/routers/health.py.hbs', outputPath: 'app/routers/health.py', target: 'backend' },
    { template: 'app/routers/users.py.hbs', outputPath: 'app/routers/users.py', target: 'backend' },
    { template: 'app/schemas/__init__.py.hbs', outputPath: 'app/schemas/__init__.py', target: 'backend' },
    { template: 'app/schemas/user.py.hbs', outputPath: 'app/schemas/user.py', target: 'backend' },
  ],
  injections: [],
};

export default fileMap;
