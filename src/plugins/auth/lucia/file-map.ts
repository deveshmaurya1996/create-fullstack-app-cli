import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'auth.ts.hbs', outputPath: 'src/lib/auth.ts', target: 'backend' },
    { template: 'auth.middleware.ts.hbs', outputPath: 'src/middleware/auth.middleware.ts', target: 'backend' },
    { template: 'auth.routes.ts.hbs', outputPath: 'src/routes/auth.routes.ts', target: 'backend' },
    { template: 'route-import.hbs', outputPath: 'src/routes/fragments/auth.route-import.ts', target: 'backend' },
    { template: 'route-register.hbs', outputPath: 'src/routes/fragments/auth.route-register.ts', target: 'backend' },
  ],
  injections: [],
};

export default fileMap;
