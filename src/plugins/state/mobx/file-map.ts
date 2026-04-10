import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    {
      template: 'stores/AppStore.ts.hbs',
      outputPath: 'src/stores/AppStore.ts',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'stores/AppStore.ts.hbs',
      outputPath: 'stores/AppStore.ts',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
    {
      template: 'stores/AuthStore.ts.hbs',
      outputPath: 'src/stores/AuthStore.ts',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'stores/AuthStore.ts.hbs',
      outputPath: 'stores/AuthStore.ts',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
    {
      template: 'stores/RootStore.ts.hbs',
      outputPath: 'src/stores/RootStore.ts',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'stores/RootStore.ts.hbs',
      outputPath: 'stores/RootStore.ts',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
    {
      template: 'providers/StoreProvider.tsx.hbs',
      outputPath: 'src/providers/StoreProvider.tsx',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'providers/StoreProvider.tsx.hbs',
      outputPath: 'providers/StoreProvider.tsx',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
  ],
  injections: [],
};

export default fileMap;
