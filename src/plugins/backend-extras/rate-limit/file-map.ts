import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    {
      template: 'rate-limit.express.ts.hbs',
      outputPath: 'src/lib/rate-limit.ts',
      target: 'backend',
      when: (ctx) => ctx.answers.backend === 'express',
    },
    {
      template: 'rate-limit.fastify.ts.hbs',
      outputPath: 'src/lib/rate-limit.ts',
      target: 'backend',
      when: (ctx) => ctx.answers.backend === 'fastify',
    },
    {
      template: 'rate-limit.hono.ts.hbs',
      outputPath: 'src/lib/rate-limit.ts',
      target: 'backend',
      when: (ctx) => ctx.answers.backend === 'hono',
    },
    {
      template: 'rate-limit.nestjs.ts.hbs',
      outputPath: 'src/lib/rate-limit.ts',
      target: 'backend',
      when: (ctx) => ctx.answers.backend === 'nestjs',
    },
  ],
  injections: [],
};

export default fileMap;
