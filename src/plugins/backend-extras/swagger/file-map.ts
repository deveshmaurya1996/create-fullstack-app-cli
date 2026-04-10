import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    {
      template: 'swagger.express.ts.hbs',
      outputPath: 'src/lib/swagger.ts',
      target: 'backend',
      when: (ctx) => ctx.answers.backend === 'express',
    },
    {
      template: 'swagger.fastify.ts.hbs',
      outputPath: 'src/lib/swagger.ts',
      target: 'backend',
      when: (ctx) => ctx.answers.backend === 'fastify',
    },
    {
      template: 'swagger.nestjs.ts.hbs',
      outputPath: 'src/lib/swagger.ts',
      target: 'backend',
      when: (ctx) => ctx.answers.backend === 'nestjs',
    },
  ],
  injections: [],
};

export default fileMap;
