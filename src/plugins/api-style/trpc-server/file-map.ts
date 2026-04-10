import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'trpc.ts.hbs', outputPath: 'src/trpc/trpc.ts', target: 'backend' },
    { template: 'server-plugin.ts.hbs', outputPath: 'src/trpc/server-plugin.ts', target: 'backend' },
    { template: 'routers/index.ts.hbs', outputPath: 'src/trpc/routers/index.ts', target: 'backend' },
    { template: 'routers/user.router.ts.hbs', outputPath: 'src/trpc/routers/user.router.ts', target: 'backend' },
    { template: 'route-import.hbs', outputPath: 'src/routes/fragments/trpc.route-import.ts', target: 'backend' },
    { template: 'route-register.hbs', outputPath: 'src/routes/fragments/trpc.route-register.ts', target: 'backend' },
  ],
  injections: [],
};

export default fileMap;
