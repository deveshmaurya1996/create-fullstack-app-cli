import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    {
      template: 'datadog.ts.hbs',
      outputPath: 'src/lib/datadog.ts',
      target: 'backend',
      when: (ctx) => ctx.hasBackend,
    },
    {
      template: 'datadog.mobile.ts.hbs',
      outputPath: 'src/lib/datadog.mobile.ts',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'datadog.mobile.ts.hbs',
      outputPath: 'lib/datadog.mobile.ts',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
  ],
  injections: [],
};

export default fileMap;
