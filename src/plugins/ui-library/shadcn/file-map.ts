import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    {
      template: 'components.json.hbs',
      outputPath: 'components.json',
      target: 'frontend',
    },
    {
      template: 'lib/utils.ts.hbs',
      outputPath: 'src/lib/utils.ts',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'lib/utils.ts.hbs',
      outputPath: 'lib/utils.ts',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
    {
      template: 'components/ui/button.tsx.hbs',
      outputPath: 'src/components/ui/button.tsx',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'components/ui/button.tsx.hbs',
      outputPath: 'components/ui/button.tsx',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
    {
      template: 'components/ui/card.tsx.hbs',
      outputPath: 'src/components/ui/card.tsx',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'components/ui/card.tsx.hbs',
      outputPath: 'components/ui/card.tsx',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
    {
      template: 'components/ui/input.tsx.hbs',
      outputPath: 'src/components/ui/input.tsx',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'components/ui/input.tsx.hbs',
      outputPath: 'components/ui/input.tsx',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
    {
      template: 'components/ui/dialog.tsx.hbs',
      outputPath: 'src/components/ui/dialog.tsx',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'components/ui/dialog.tsx.hbs',
      outputPath: 'components/ui/dialog.tsx',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
    {
      template: 'components/ui/dropdown-menu.tsx.hbs',
      outputPath: 'src/components/ui/dropdown-menu.tsx',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'components/ui/dropdown-menu.tsx.hbs',
      outputPath: 'components/ui/dropdown-menu.tsx',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
    {
      template: 'components/ui/toast.tsx.hbs',
      outputPath: 'src/components/ui/toast.tsx',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'components/ui/toast.tsx.hbs',
      outputPath: 'components/ui/toast.tsx',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
  ],
  injections: [],
};

export default fileMap;
