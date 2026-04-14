import type { PluginFileMap } from '../../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'next.config.ts.hbs', outputPath: 'next.config.ts', target: 'frontend' },
    { template: 'tsconfig.json.hbs', outputPath: 'tsconfig.json', target: 'frontend' },
    {
      template: 'middleware.ts.hbs',
      outputPath: 'middleware.ts',
      target: 'frontend',
      when: (ctx) => ctx.hasAuth && ctx.hasJwtCustom,
    },

    { template: 'app/layout.tsx.hbs', outputPath: 'app/layout.tsx', target: 'frontend' },
    { template: 'app/page.tsx.hbs', outputPath: 'app/page.tsx', target: 'frontend' },
    { template: 'app/loading.tsx.hbs', outputPath: 'app/loading.tsx', target: 'frontend' },
    { template: 'app/error.tsx.hbs', outputPath: 'app/error.tsx', target: 'frontend' },
    { template: 'app/globals.css.hbs', outputPath: 'app/globals.css', target: 'frontend' },
    { template: 'app/not-found.tsx.hbs', outputPath: 'app/not-found.tsx', target: 'frontend' },
    { template: 'app/about/page.tsx.hbs', outputPath: 'app/about/page.tsx', target: 'frontend' },
    { template: 'app/login/page.tsx.hbs', outputPath: 'app/login/page.tsx', target: 'frontend', when: (ctx) => ctx.hasAuth },
    { template: 'app/register/page.tsx.hbs', outputPath: 'app/register/page.tsx', target: 'frontend', when: (ctx) => ctx.hasAuth },
    { template: 'app/dashboard/page.tsx.hbs', outputPath: 'app/dashboard/page.tsx', target: 'frontend', when: (ctx) => ctx.hasAuth },
    { template: 'app/api/health/route.ts.hbs', outputPath: 'app/api/health/route.ts', target: 'frontend' },

    { template: 'components/Navbar.tsx.hbs', outputPath: 'components/Navbar.tsx', target: 'frontend' },
    { template: 'components/Footer.tsx.hbs', outputPath: 'components/Footer.tsx', target: 'frontend' },
    { template: 'components/LoadingSpinner.tsx.hbs', outputPath: 'components/LoadingSpinner.tsx', target: 'frontend' },

    { template: 'lib/config.ts.hbs', outputPath: 'lib/config.ts', target: 'frontend' },
    { template: 'lib/utils.ts.hbs', outputPath: 'lib/utils.ts', target: 'frontend' },

    { template: 'types/index.ts.hbs', outputPath: 'types/index.ts', target: 'frontend' },
  ],
  injections: [],
};

export default fileMap;