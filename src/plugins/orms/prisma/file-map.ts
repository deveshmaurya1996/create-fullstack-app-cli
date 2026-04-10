import type { PluginFileMap, TemplateContext } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'schema.prisma.hbs', outputPath: 'prisma/schema.prisma', target: 'backend' },
    { template: 'seed.ts.hbs', outputPath: 'prisma/seed.ts', target: 'backend' },
    { template: 'db-client.ts.hbs', outputPath: 'src/lib/db.ts', target: 'backend' },
    { template: 'models/user.ts.hbs', outputPath: 'src/models/user.ts', target: 'backend' },
    {
      template: 'services/user.service.ts.hbs',
      outputPath: 'src/services/user.service.ts',
      target: 'backend',
      when: (ctx: TemplateContext) => ctx.answers.backend !== 'nestjs',
    },
    {
      template: 'services/user.service.nestjs.ts.hbs',
      outputPath: 'src/users/users.prisma-service.ts',
      target: 'backend',
      when: (ctx: TemplateContext) => ctx.answers.backend === 'nestjs',
    },
    {
      template: 'prisma.module.ts.hbs',
      outputPath: 'src/prisma/prisma.module.ts',
      target: 'backend',
      when: (ctx: TemplateContext) => ctx.answers.backend === 'nestjs',
    },
    {
      template: 'prisma.service.ts.hbs',
      outputPath: 'src/prisma/prisma.service.ts',
      target: 'backend',
      when: (ctx: TemplateContext) => ctx.answers.backend === 'nestjs',
    },
  ],
  injections: [
    {
      template: 'injection-module-import.hbs',
      targetFile: 'src/app.module.ts',
      marker: '// MODULE_IMPORTS',
      target: 'backend',
      when: (ctx: TemplateContext) => ctx.answers.backend === 'nestjs',
    },
    {
      template: 'injection-module-register.hbs',
      targetFile: 'src/app.module.ts',
      marker: '// MODULE_REGISTRATIONS',
      target: 'backend',
      when: (ctx: TemplateContext) => ctx.answers.backend === 'nestjs',
    },
  ],
};

export default fileMap;
