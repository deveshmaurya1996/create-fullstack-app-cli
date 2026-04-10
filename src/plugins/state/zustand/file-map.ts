import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    {
      template: 'stores/useAuthStore.ts.hbs',
      outputPath: 'src/stores/useAuthStore.ts',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'stores/useAuthStore.ts.hbs',
      outputPath: 'stores/useAuthStore.ts',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
    {
      template: 'stores/useAppStore.ts.hbs',
      outputPath: 'src/stores/useAppStore.ts',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'stores/useAppStore.ts.hbs',
      outputPath: 'stores/useAppStore.ts',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
  ],
  injections: [],
};

export default fileMap;
