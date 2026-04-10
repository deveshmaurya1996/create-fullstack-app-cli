import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'email.service.ts.hbs', outputPath: 'src/services/email.service.ts', target: 'backend' },
    { template: 'email.routes.ts.hbs', outputPath: 'src/routes/email.routes.ts', target: 'backend' },
    {
      template: 'templates/welcome.hbs.hbs',
      outputPath: 'src/templates/email/welcome.hbs',
      target: 'backend',
    },
    {
      template: 'templates/reset-password.hbs.hbs',
      outputPath: 'src/templates/email/reset-password.hbs',
      target: 'backend',
    },
  ],
  injections: [],
};

export default fileMap;
