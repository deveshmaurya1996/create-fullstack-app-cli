import type { PluginFileMap, TemplateContext } from '../../../shared/types.js';

const nodeBackend = (ctx: TemplateContext) =>
  ctx.answers.backend !== 'django' && ctx.answers.backend !== 'fastapi';

const fileMap: PluginFileMap = {
  files: [
    { template: 'connection.ts.hbs', outputPath: 'src/db/mongoose.ts', target: 'backend', when: nodeBackend },
    { template: 'models/user.model.ts.hbs', outputPath: 'src/db/models/user.model.ts', target: 'backend', when: nodeBackend },
    { template: 'seed.ts.hbs', outputPath: 'src/db/seed-mongoose.ts', target: 'backend', when: nodeBackend },
  ],
  injections: [],
};

export default fileMap;
