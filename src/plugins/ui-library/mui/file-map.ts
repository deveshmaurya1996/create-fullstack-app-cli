import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    {
      template: 'theme.ts.hbs',
      outputPath: 'src/theme.ts',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'theme.ts.hbs',
      outputPath: 'theme.ts',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
    {
      template: 'emotion-cache.ts.hbs',
      outputPath: 'src/emotion-cache.ts',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'emotion-cache.ts.hbs',
      outputPath: 'emotion-cache.ts',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
    {
      template: 'providers/ThemeProvider.tsx.hbs',
      outputPath: 'src/providers/ThemeProvider.tsx',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'providers/ThemeProvider.tsx.hbs',
      outputPath: 'providers/ThemeProvider.tsx',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
  ],
  injections: [],
};

export default fileMap;
