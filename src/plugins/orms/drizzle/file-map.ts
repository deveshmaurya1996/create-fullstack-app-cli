import type { PluginFileMap, TemplateContext } from '../../../shared/types.js';

const nodeBackend = (ctx: TemplateContext) =>
  ctx.answers.backend !== 'django' && ctx.answers.backend !== 'fastapi';

const fileMap: PluginFileMap = {
  files: [
    { template: 'drizzle.config.ts.hbs', outputPath: 'drizzle.config.ts', target: 'backend', when: nodeBackend },
    { template: 'schema.ts.hbs', outputPath: 'src/db/schema.ts', target: 'backend', when: nodeBackend },
    { template: 'db-client.ts.hbs', outputPath: 'src/db/index.ts', target: 'backend', when: nodeBackend },
    { template: 'migrate.ts.hbs', outputPath: 'src/db/migrate.ts', target: 'backend', when: nodeBackend },
    { template: 'seed.ts.hbs', outputPath: 'src/db/seed.ts', target: 'backend', when: nodeBackend },
  ],
  injections: [],
};

export default fileMap;
