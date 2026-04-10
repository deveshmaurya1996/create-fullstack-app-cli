import type { PluginFileMap } from '../../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
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
    {
      template: 'styles/Layout.module.css.hbs',
      outputPath: 'src/styles/Layout.module.css',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'styles/Layout.module.css.hbs',
      outputPath: 'styles/Layout.module.css',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
    {
      template: 'styles/Navbar.module.css.hbs',
      outputPath: 'src/styles/Navbar.module.css',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'styles/Navbar.module.css.hbs',
      outputPath: 'styles/Navbar.module.css',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
  ],
  injections: [],
};

export default fileMap;
