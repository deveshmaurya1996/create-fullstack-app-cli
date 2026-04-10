import type { PluginFileMap, TemplateContext } from '../../../shared/types.js';

const nodeBackend = (ctx: TemplateContext) =>
  ctx.answers.backend !== 'django' && ctx.answers.backend !== 'fastapi';

const fileMap: PluginFileMap = {
  files: [
    {
      template: 'connection.ts.hbs',
      outputPath: 'src/lib/redis-connection.ts',
      target: 'backend',
      when: nodeBackend,
    },
    {
      template: 'health-check.ts.hbs',
      outputPath: 'src/lib/redis-health.ts',
      target: 'backend',
      when: nodeBackend,
    },
  ],
  injections: [],
};

export default fileMap;
