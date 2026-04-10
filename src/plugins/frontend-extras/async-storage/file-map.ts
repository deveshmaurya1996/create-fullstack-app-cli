import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    {
      template: 'lib/storage.ts.hbs',
      outputPath: 'src/lib/storage.ts',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'lib/storage.ts.hbs',
      outputPath: 'lib/storage.ts',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
  ],
  injections: [],
};

export default fileMap;
