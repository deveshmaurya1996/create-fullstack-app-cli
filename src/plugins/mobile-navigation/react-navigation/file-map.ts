import type { PluginFileMap } from '../../../shared/types.js';

const nav = (ctx: { hasReactNavigation: boolean }) => ctx.hasReactNavigation;
const srcPath = (ctx: { isSingleApp: boolean; hasFrontend: boolean; hasBackend: boolean }) =>
  !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend);
const rootPath = (ctx: { isSingleApp: boolean; hasFrontend: boolean; hasBackend: boolean }) =>
  ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend;

const fileMap: PluginFileMap = {
  files: [
    {
      template: 'types.ts.hbs',
      outputPath: 'src/navigation/types.ts',
      target: 'frontend',
      when: (ctx) => nav(ctx) && srcPath(ctx),
    },
    {
      template: 'types.ts.hbs',
      outputPath: 'navigation/types.ts',
      target: 'frontend',
      when: (ctx) => nav(ctx) && rootPath(ctx),
    },
    {
      template: 'linking.ts.hbs',
      outputPath: 'src/navigation/linking.ts',
      target: 'frontend',
      when: (ctx) => nav(ctx) && srcPath(ctx),
    },
    {
      template: 'linking.ts.hbs',
      outputPath: 'navigation/linking.ts',
      target: 'frontend',
      when: (ctx) => nav(ctx) && rootPath(ctx),
    },
    {
      template: 'RootNavigator.tsx.hbs',
      outputPath: 'src/navigation/RootNavigator.tsx',
      target: 'frontend',
      when: (ctx) => nav(ctx) && srcPath(ctx),
    },
    {
      template: 'RootNavigator.tsx.hbs',
      outputPath: 'navigation/RootNavigator.tsx',
      target: 'frontend',
      when: (ctx) => nav(ctx) && rootPath(ctx),
    },
    {
      template: 'TabNavigator.tsx.hbs',
      outputPath: 'src/navigation/TabNavigator.tsx',
      target: 'frontend',
      when: (ctx) => nav(ctx) && srcPath(ctx),
    },
    {
      template: 'TabNavigator.tsx.hbs',
      outputPath: 'navigation/TabNavigator.tsx',
      target: 'frontend',
      when: (ctx) => nav(ctx) && rootPath(ctx),
    },
  ],
  injections: [],
};

export default fileMap;
