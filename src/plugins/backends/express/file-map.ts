import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'server.ts.hbs', outputPath: 'src/server.ts', target: 'backend' },
    { template: 'tsconfig.json.hbs', outputPath: 'tsconfig.json', target: 'backend' },
    { template: 'routes/index.ts.hbs', outputPath: 'src/routes/index.ts', target: 'backend' },
    { template: 'routes/health.ts.hbs', outputPath: 'src/routes/health.ts', target: 'backend' },
    { template: 'routes/users.ts.hbs', outputPath: 'src/routes/users.ts', target: 'backend' },
    { template: 'controllers/user.controller.ts.hbs', outputPath: 'src/controllers/user.controller.ts', target: 'backend' },
    { template: 'services/user.service.ts.hbs', outputPath: 'src/services/user.service.ts', target: 'backend' },
    { template: 'middleware/error-handler.ts.hbs', outputPath: 'src/middleware/error-handler.ts', target: 'backend' },
    { template: 'middleware/not-found.ts.hbs', outputPath: 'src/middleware/not-found.ts', target: 'backend' },
    { template: 'middleware/validate.ts.hbs', outputPath: 'src/middleware/validate.ts', target: 'backend' },
    { template: 'lib/config.ts.hbs', outputPath: 'src/lib/config.ts', target: 'backend' },
    { template: 'lib/utils.ts.hbs', outputPath: 'src/lib/utils.ts', target: 'backend' },
    { template: 'types/index.ts.hbs', outputPath: 'src/types/index.ts', target: 'backend' },
  ],
  injections: [],
};

export default fileMap;