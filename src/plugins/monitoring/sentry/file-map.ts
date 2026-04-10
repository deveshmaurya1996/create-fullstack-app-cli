import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    {
      template: 'sentry.server.ts.hbs',
      outputPath: 'src/lib/sentry.server.ts',
      target: 'backend',
      when: (ctx) => ctx.hasBackend,
    },
    {
      template: 'sentry.client.ts.hbs',
      outputPath: 'src/lib/sentry.client.ts',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'sentry.client.ts.hbs',
      outputPath: 'lib/sentry.client.ts',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
  ],
  injections: [],
};

export default fileMap;
