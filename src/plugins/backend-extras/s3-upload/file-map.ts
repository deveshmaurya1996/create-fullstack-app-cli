import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 's3.service.ts.hbs', outputPath: 'src/services/s3.service.ts', target: 'backend' },
    { template: 'upload.routes.ts.hbs', outputPath: 'src/routes/s3-upload.routes.ts', target: 'backend' },
    { template: 'route-import.hbs', outputPath: 'src/routes/fragments/s3.route-import.ts', target: 'backend' },
    { template: 'route-register.hbs', outputPath: 'src/routes/fragments/s3.route-register.ts', target: 'backend' },
  ],
  injections: [],
};

export default fileMap;
