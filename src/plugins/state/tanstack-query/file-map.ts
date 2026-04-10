import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    {
      template: 'query-client.ts.hbs',
      outputPath: 'src/query-client.ts',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'query-client.ts.hbs',
      outputPath: 'query-client.ts',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
    {
      template: 'providers/QueryProvider.tsx.hbs',
      outputPath: 'src/providers/QueryProvider.tsx',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'providers/QueryProvider.tsx.hbs',
      outputPath: 'providers/QueryProvider.tsx',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
    {
      template: 'hooks/useUsers.ts.hbs',
      outputPath: 'src/hooks/useUsers.ts',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'hooks/useUsers.ts.hbs',
      outputPath: 'hooks/useUsers.ts',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
    {
      template: 'hooks/useAuth.ts.hbs',
      outputPath: 'src/hooks/useAuth.ts',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'hooks/useAuth.ts.hbs',
      outputPath: 'hooks/useAuth.ts',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
  ],
  injections: [],
};

export default fileMap;
