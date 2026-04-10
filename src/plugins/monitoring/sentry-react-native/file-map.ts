import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    {
      template: 'sentry.mobile.ts.hbs',
      outputPath: 'src/lib/sentry.mobile.ts',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'sentry.mobile.ts.hbs',
      outputPath: 'lib/sentry.mobile.ts',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
    {
      template: 'sentry.server.ts.hbs',
      outputPath: 'src/lib/sentry.server.ts',
      target: 'backend',
      when: (ctx) => ctx.hasBackend,
    },
    {
      template: 'sentry.wrap.hbs',
      outputPath: 'src/lib/sentry.wrap.ts',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'sentry.wrap.hbs',
      outputPath: 'lib/sentry.wrap.ts',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
  ],
  injections: [],
};

export default fileMap;
