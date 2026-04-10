import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'main.ts.hbs', outputPath: 'src/main.ts', target: 'backend' },
    { template: 'app.module.ts.hbs', outputPath: 'src/app.module.ts', target: 'backend' },
    { template: 'app.controller.ts.hbs', outputPath: 'src/app.controller.ts', target: 'backend' },
    { template: 'app.service.ts.hbs', outputPath: 'src/app.service.ts', target: 'backend' },
    { template: 'tsconfig.json.hbs', outputPath: 'tsconfig.json', target: 'backend' },
    { template: 'tsconfig.build.json.hbs', outputPath: 'tsconfig.build.json', target: 'backend' },
    { template: 'nest-cli.json.hbs', outputPath: 'nest-cli.json', target: 'backend' },

    { template: 'common/filters/http-exception.filter.ts.hbs', outputPath: 'src/common/filters/http-exception.filter.ts', target: 'backend' },
    { template: 'common/interceptors/logging.interceptor.ts.hbs', outputPath: 'src/common/interceptors/logging.interceptor.ts', target: 'backend' },
    { template: 'common/guards/auth.guard.ts.hbs', outputPath: 'src/common/guards/auth.guard.ts', target: 'backend', when: (ctx) => ctx.hasAuth },
    { template: 'common/decorators/current-user.decorator.ts.hbs', outputPath: 'src/common/decorators/current-user.decorator.ts', target: 'backend', when: (ctx) => ctx.hasAuth },
    { template: 'config/configuration.ts.hbs', outputPath: 'src/config/configuration.ts', target: 'backend' },

    { template: 'users/users.module.ts.hbs', outputPath: 'src/users/users.module.ts', target: 'backend' },
    { template: 'users/users.controller.ts.hbs', outputPath: 'src/users/users.controller.ts', target: 'backend' },
    { template: 'users/users.service.ts.hbs', outputPath: 'src/users/users.service.ts', target: 'backend' },
    { template: 'users/entities/user.entity.ts.hbs', outputPath: 'src/users/entities/user.entity.ts', target: 'backend' },
    { template: 'users/dto/create-user.dto.ts.hbs', outputPath: 'src/users/dto/create-user.dto.ts', target: 'backend' },
    { template: 'users/dto/update-user.dto.ts.hbs', outputPath: 'src/users/dto/update-user.dto.ts', target: 'backend' },
  ],
  injections: [],
};

export default fileMap;