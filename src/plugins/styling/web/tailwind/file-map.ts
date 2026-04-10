import type { PluginFileMap } from '../../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'tailwind.config.ts.hbs', outputPath: 'tailwind.config.ts', target: 'frontend' },
    { template: 'postcss.config.js.hbs', outputPath: 'postcss.config.js', target: 'frontend' },
    {
      template: 'globals.css.hbs',
      outputPath: 'src/styles/globals.css',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'globals.css.hbs',
      outputPath: 'styles/globals.css',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
  ],
  injections: [],
};

export default fileMap;
