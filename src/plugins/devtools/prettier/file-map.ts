import type { PluginFileMap, TemplateContext } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    {
      template: '.prettierrc.hbs',
      outputPath: '.prettierrc',
      target: 'root',
      when: (ctx: TemplateContext) => !(ctx.isSingleApp && ctx.isFullstack),
    },
    {
      template: '.prettierignore.hbs',
      outputPath: '.prettierignore',
      target: 'root',
      when: (ctx: TemplateContext) => !(ctx.isSingleApp && ctx.isFullstack),
    },
    {
      template: '.prettierrc.hbs',
      outputPath: '.prettierrc',
      target: 'frontend',
      when: (ctx: TemplateContext) => ctx.isSingleApp && ctx.isFullstack,
    },
    {
      template: '.prettierignore.hbs',
      outputPath: '.prettierignore',
      target: 'frontend',
      when: (ctx: TemplateContext) => ctx.isSingleApp && ctx.isFullstack,
    },
    {
      template: '.prettierrc.hbs',
      outputPath: '.prettierrc',
      target: 'backend',
      when: (ctx: TemplateContext) => ctx.isSingleApp && ctx.isFullstack,
    },
    {
      template: '.prettierignore.hbs',
      outputPath: '.prettierignore',
      target: 'backend',
      when: (ctx: TemplateContext) => ctx.isSingleApp && ctx.isFullstack,
    },
  ],
  injections: [],
};

export default fileMap;
