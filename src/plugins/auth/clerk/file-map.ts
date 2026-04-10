import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    {
      template: 'web/providers/ClerkProvider.tsx.hbs',
      outputPath: 'src/providers/ClerkProvider.tsx',
      target: 'frontend',
      when: (ctx) => ctx.hasWeb && !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'web/providers/ClerkProvider.tsx.hbs',
      outputPath: 'providers/ClerkProvider.tsx',
      target: 'frontend',
      when: (ctx) => ctx.hasWeb && ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
    { template: 'web/middleware.ts.hbs', outputPath: 'middleware.ts', target: 'frontend', when: (ctx) => ctx.hasWeb },
    {
      template: 'mobile/providers/ClerkProvider.tsx.hbs',
      outputPath: 'src/providers/ClerkProvider.tsx',
      target: 'frontend',
      when: (ctx) => ctx.hasMobile && !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'mobile/providers/ClerkProvider.tsx.hbs',
      outputPath: 'providers/ClerkProvider.tsx',
      target: 'frontend',
      when: (ctx) => ctx.hasMobile && ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
  ],
  injections: [],
};

export default fileMap;
