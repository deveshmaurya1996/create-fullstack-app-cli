import type { PluginFileMap } from '../../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'App.vue.hbs', outputPath: 'src/App.vue', target: 'frontend' },
    { template: 'main.ts.hbs', outputPath: 'src/main.ts', target: 'frontend' },
    { template: 'vite.config.ts.hbs', outputPath: 'vite.config.ts', target: 'frontend' },
    { template: 'tsconfig.json.hbs', outputPath: 'tsconfig.json', target: 'frontend' },
    { template: 'env.d.ts.hbs', outputPath: 'src/env.d.ts', target: 'frontend' },
    { template: 'index.html.hbs', outputPath: 'index.html', target: 'frontend' },

    { template: 'router/index.ts.hbs', outputPath: 'src/router/index.ts', target: 'frontend' },
    { template: 'pages/Home.vue.hbs', outputPath: 'src/pages/Home.vue', target: 'frontend' },
    { template: 'pages/About.vue.hbs', outputPath: 'src/pages/About.vue', target: 'frontend' },
    { template: 'pages/NotFound.vue.hbs', outputPath: 'src/pages/NotFound.vue', target: 'frontend' },
    { template: 'pages/Login.vue.hbs', outputPath: 'src/pages/Login.vue', target: 'frontend', when: (ctx) => ctx.hasAuth },
    { template: 'pages/Dashboard.vue.hbs', outputPath: 'src/pages/Dashboard.vue', target: 'frontend', when: (ctx) => ctx.hasAuth },

    { template: 'components/Layout.vue.hbs', outputPath: 'src/components/Layout.vue', target: 'frontend' },
    { template: 'components/Navbar.vue.hbs', outputPath: 'src/components/Navbar.vue', target: 'frontend' },
    { template: 'components/LoadingSpinner.vue.hbs', outputPath: 'src/components/LoadingSpinner.vue', target: 'frontend' },

    { template: 'composables/useApi.ts.hbs', outputPath: 'src/composables/useApi.ts', target: 'frontend', when: (ctx) => ctx.hasBackend },
    { template: 'composables/useAuth.ts.hbs', outputPath: 'src/composables/useAuth.ts', target: 'frontend', when: (ctx) => ctx.hasAuth },

    { template: 'stores/app.ts.hbs', outputPath: 'src/stores/app.ts', target: 'frontend' },

    { template: 'lib/config.ts.hbs', outputPath: 'src/lib/config.ts', target: 'frontend' },
  ],
  injections: [],
};

export default fileMap;