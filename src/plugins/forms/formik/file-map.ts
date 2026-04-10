import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    {
      template: 'components/SampleForm.tsx.hbs',
      outputPath: 'src/components/forms/SampleForm.tsx',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'components/SampleForm.tsx.hbs',
      outputPath: 'components/forms/SampleForm.tsx',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
    {
      template: 'lib/validators.ts.hbs',
      outputPath: 'src/lib/validators.ts',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'lib/validators.ts.hbs',
      outputPath: 'lib/validators.ts',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
  ],
  injections: [],
};

export default fileMap;
