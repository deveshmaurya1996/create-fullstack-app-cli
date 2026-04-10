import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'upload.middleware.ts.hbs', outputPath: 'src/middleware/upload.middleware.ts', target: 'backend' },
    { template: 'upload.routes.ts.hbs', outputPath: 'src/routes/upload.routes.ts', target: 'backend' },
    { template: 'route-import.hbs', outputPath: 'src/routes/fragments/upload.route-import.ts', target: 'backend' },
    {
      template: 'route-register.hbs',
      outputPath: 'src/routes/fragments/upload.route-register.ts',
      target: 'backend',
    },
  ],
  injections: [],
};

export default fileMap;
