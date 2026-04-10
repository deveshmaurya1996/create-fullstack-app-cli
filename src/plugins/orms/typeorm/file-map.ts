import type { PluginFileMap, TemplateContext } from '../../../shared/types.js';

const nodeBackend = (ctx: TemplateContext) =>
  ctx.answers.backend !== 'django' && ctx.answers.backend !== 'fastapi';

const fileMap: PluginFileMap = {
  files: [
    { template: 'data-source.ts.hbs', outputPath: 'src/db/data-source.ts', target: 'backend', when: nodeBackend },
    { template: 'entities/user.entity.ts.hbs', outputPath: 'src/db/entities/user.entity.ts', target: 'backend', when: nodeBackend },
    { template: 'seed.ts.hbs', outputPath: 'src/db/seed-typeorm.ts', target: 'backend', when: nodeBackend },
  ],
  injections: [],
};

export default fileMap;
