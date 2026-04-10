import type { PluginFileMap } from '../../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'angular.json.hbs', outputPath: 'angular.json', target: 'frontend' },
    { template: 'tsconfig.json.hbs', outputPath: 'tsconfig.json', target: 'frontend' },
    { template: 'tsconfig.app.json.hbs', outputPath: 'tsconfig.app.json', target: 'frontend' },
    { template: 'index.html.hbs', outputPath: 'src/index.html', target: 'frontend' },
    { template: 'main.ts.hbs', outputPath: 'src/main.ts', target: 'frontend' },
    { template: 'styles.css.hbs', outputPath: 'src/styles.css', target: 'frontend' },

    { template: 'app/app.component.ts.hbs', outputPath: 'src/app/app.component.ts', target: 'frontend' },
    { template: 'app/app.component.html.hbs', outputPath: 'src/app/app.component.html', target: 'frontend' },
    { template: 'app/app.config.ts.hbs', outputPath: 'src/app/app.config.ts', target: 'frontend' },
    { template: 'app/app.routes.ts.hbs', outputPath: 'src/app/app.routes.ts', target: 'frontend' },

    { template: 'pages/home/home.component.ts.hbs', outputPath: 'src/app/pages/home/home.component.ts', target: 'frontend' },
    { template: 'pages/home/home.component.html.hbs', outputPath: 'src/app/pages/home/home.component.html', target: 'frontend' },
    { template: 'pages/about/about.component.ts.hbs', outputPath: 'src/app/pages/about/about.component.ts', target: 'frontend' },
    { template: 'pages/about/about.component.html.hbs', outputPath: 'src/app/pages/about/about.component.html', target: 'frontend' },
    { template: 'pages/login/login.component.ts.hbs', outputPath: 'src/app/pages/login/login.component.ts', target: 'frontend', when: (ctx) => ctx.hasAuth },
    { template: 'pages/login/login.component.html.hbs', outputPath: 'src/app/pages/login/login.component.html', target: 'frontend', when: (ctx) => ctx.hasAuth },
    {
      template: 'pages/dashboard/dashboard.component.ts.hbs',
      outputPath: 'src/app/pages/dashboard/dashboard.component.ts',
      target: 'frontend',
      when: (ctx) => ctx.hasAuth,
    },
    {
      template: 'pages/dashboard/dashboard.component.html.hbs',
      outputPath: 'src/app/pages/dashboard/dashboard.component.html',
      target: 'frontend',
      when: (ctx) => ctx.hasAuth,
    },
    { template: 'pages/not-found/not-found.component.ts.hbs', outputPath: 'src/app/pages/not-found/not-found.component.ts', target: 'frontend' },
    { template: 'pages/not-found/not-found.component.html.hbs', outputPath: 'src/app/pages/not-found/not-found.component.html', target: 'frontend' },

    { template: 'components/navbar/navbar.component.ts.hbs', outputPath: 'src/app/components/navbar/navbar.component.ts', target: 'frontend' },
    { template: 'components/navbar/navbar.component.html.hbs', outputPath: 'src/app/components/navbar/navbar.component.html', target: 'frontend' },
    { template: 'components/loading-spinner/loading-spinner.component.ts.hbs', outputPath: 'src/app/components/loading-spinner/loading-spinner.component.ts', target: 'frontend' },
    { template: 'components/loading-spinner/loading-spinner.component.html.hbs', outputPath: 'src/app/components/loading-spinner/loading-spinner.component.html', target: 'frontend' },

    { template: 'services/api.service.ts.hbs', outputPath: 'src/app/services/api.service.ts', target: 'frontend', when: (ctx) => ctx.hasBackend },
    { template: 'services/auth.service.ts.hbs', outputPath: 'src/app/services/auth.service.ts', target: 'frontend', when: (ctx) => ctx.hasAuth },
    { template: 'guards/auth.guard.ts.hbs', outputPath: 'src/app/guards/auth.guard.ts', target: 'frontend', when: (ctx) => ctx.hasAuth },

    { template: 'environments/environment.ts.hbs', outputPath: 'src/environments/environment.ts', target: 'frontend' },
    { template: 'environments/environment.prod.ts.hbs', outputPath: 'src/environments/environment.prod.ts', target: 'frontend' },
  ],
  injections: [],
};

export default fileMap;