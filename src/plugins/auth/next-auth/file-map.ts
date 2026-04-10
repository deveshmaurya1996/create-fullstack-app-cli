import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'auth.config.ts.hbs', outputPath: 'auth.config.ts', target: 'frontend' },
    { template: 'auth.ts.hbs', outputPath: 'auth.ts', target: 'frontend' },
    { template: 'middleware.ts.hbs', outputPath: 'middleware.ts', target: 'frontend' },
    {
      template: 'providers/SessionProvider.tsx.hbs',
      outputPath: 'src/providers/SessionProvider.tsx',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'providers/SessionProvider.tsx.hbs',
      outputPath: 'providers/SessionProvider.tsx',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
  ],
  injections: [],
};

export default fileMap;
