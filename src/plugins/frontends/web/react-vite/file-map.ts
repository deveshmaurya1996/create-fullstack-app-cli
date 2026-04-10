import type { PluginFileMap } from '../../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'index.html.hbs', outputPath: 'index.html', target: 'frontend' },
    { template: 'main.tsx.hbs', outputPath: 'src/main.tsx', target: 'frontend' },
    { template: 'App.tsx.hbs', outputPath: 'src/App.tsx', target: 'frontend' },
    { template: 'vite.config.ts.hbs', outputPath: 'vite.config.ts', target: 'frontend' },
    { template: 'tsconfig.json.hbs', outputPath: 'tsconfig.json', target: 'frontend' },
    { template: 'tsconfig.node.json.hbs', outputPath: 'tsconfig.node.json', target: 'frontend' },
    { template: 'router/index.tsx.hbs', outputPath: 'src/router/index.tsx', target: 'frontend' },

    { template: 'pages/Home.tsx.hbs', outputPath: 'src/pages/Home.tsx', target: 'frontend' },
    { template: 'pages/About.tsx.hbs', outputPath: 'src/pages/About.tsx', target: 'frontend' },
    { template: 'pages/NotFound.tsx.hbs', outputPath: 'src/pages/NotFound.tsx', target: 'frontend' },
    {
      template: 'pages/Login.tsx.hbs',
      outputPath: 'src/pages/Login.tsx',
      target: 'frontend',
      when: (ctx) => ctx.hasAuth,
    },
    {
      template: 'pages/Register.tsx.hbs',
      outputPath: 'src/pages/Register.tsx',
      target: 'frontend',
      when: (ctx) => ctx.hasAuth,
    },
    {
      template: 'pages/Dashboard.tsx.hbs',
      outputPath: 'src/pages/Dashboard.tsx',
      target: 'frontend',
      when: (ctx) => ctx.hasAuth,
    },

    { template: 'components/Layout.tsx.hbs', outputPath: 'src/components/Layout.tsx', target: 'frontend' },
    { template: 'components/Navbar.tsx.hbs', outputPath: 'src/components/Navbar.tsx', target: 'frontend' },
    { template: 'components/Footer.tsx.hbs', outputPath: 'src/components/Footer.tsx', target: 'frontend' },
    { template: 'components/ErrorBoundary.tsx.hbs', outputPath: 'src/components/ErrorBoundary.tsx', target: 'frontend' },
    { template: 'components/LoadingSpinner.tsx.hbs', outputPath: 'src/components/LoadingSpinner.tsx', target: 'frontend' },
    {
      template: 'components/ProtectedRoute.tsx.hbs',
      outputPath: 'src/components/ProtectedRoute.tsx',
      target: 'frontend',
      when: (ctx) => ctx.hasAuth,
    },

    {
      template: 'hooks/useApi.ts.hbs',
      outputPath: 'src/hooks/useApi.ts',
      target: 'frontend',
      when: (ctx) => ctx.hasBackend,
    },
    {
      template: 'hooks/useAuth.ts.hbs',
      outputPath: 'src/hooks/useAuth.ts',
      target: 'frontend',
      when: (ctx) => ctx.hasAuth,
    },

    { template: 'lib/config.ts.hbs', outputPath: 'src/lib/config.ts', target: 'frontend' },
    { template: 'lib/utils.ts.hbs', outputPath: 'src/lib/utils.ts', target: 'frontend' },

    { template: 'types/index.ts.hbs', outputPath: 'src/types/index.ts', target: 'frontend' },
  ],
  injections: [],
};

export default fileMap;