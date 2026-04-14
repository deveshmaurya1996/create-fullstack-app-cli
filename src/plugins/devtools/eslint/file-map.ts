import type { PluginFileMap, TemplateContext } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    {
      template: 'eslint.config.js.hbs',
      outputPath: 'eslint.config.js',
      target: 'root',
      when: (ctx: TemplateContext) => !(ctx.isSingleApp && ctx.isFullstack),
    },
    {
      template: '.eslintignore.hbs',
      outputPath: '.eslintignore',
      target: 'root',
      when: (ctx: TemplateContext) => !(ctx.isSingleApp && ctx.isFullstack),
    },
    {
      template: 'eslint.config.js.hbs',
      outputPath: 'eslint.config.js',
      target: 'frontend',
      when: (ctx: TemplateContext) => ctx.isSingleApp && ctx.isFullstack,
    },
    {
      template: '.eslintignore.hbs',
      outputPath: '.eslintignore',
      target: 'frontend',
      when: (ctx: TemplateContext) => ctx.isSingleApp && ctx.isFullstack,
    },
    {
      template: 'eslint.config.js.hbs',
      outputPath: 'eslint.config.js',
      target: 'backend',
      when: (ctx: TemplateContext) => ctx.isSingleApp && ctx.isFullstack,
    },
    {
      template: '.eslintignore.hbs',
      outputPath: '.eslintignore',
      target: 'backend',
      when: (ctx: TemplateContext) => ctx.isSingleApp && ctx.isFullstack,
    },
  ],
  injections: [],
};

export default fileMap;
