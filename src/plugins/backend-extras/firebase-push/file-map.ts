import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'firebase.ts.hbs', outputPath: 'src/lib/firebase.ts', target: 'backend' },
    { template: 'push.service.ts.hbs', outputPath: 'src/services/push.service.ts', target: 'backend' },
    { template: 'push.routes.ts.hbs', outputPath: 'src/routes/push.routes.ts', target: 'backend' },
    { template: 'route-import.hbs', outputPath: 'src/routes/fragments/push.route-import.ts', target: 'backend' },
    { template: 'route-register.hbs', outputPath: 'src/routes/fragments/push.route-register.ts', target: 'backend' },
  ],
  injections: [],
};

export default fileMap;
