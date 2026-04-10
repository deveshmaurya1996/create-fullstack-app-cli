import type { PluginFileMap } from '../../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'svelte.config.js.hbs', outputPath: 'svelte.config.js', target: 'frontend' },
    { template: 'vite.config.ts.hbs', outputPath: 'vite.config.ts', target: 'frontend' },
    { template: 'tsconfig.json.hbs', outputPath: 'tsconfig.json', target: 'frontend' },
    { template: 'app.html.hbs', outputPath: 'src/app.html', target: 'frontend' },
    { template: 'app.d.ts.hbs', outputPath: 'src/app.d.ts', target: 'frontend' },

    { template: 'routes/+layout.svelte.hbs', outputPath: 'src/routes/+layout.svelte', target: 'frontend' },
    { template: 'routes/+page.svelte.hbs', outputPath: 'src/routes/+page.svelte', target: 'frontend' },
    { template: 'routes/+error.svelte.hbs', outputPath: 'src/routes/+error.svelte', target: 'frontend' },
    { template: 'routes/about/+page.svelte.hbs', outputPath: 'src/routes/about/+page.svelte', target: 'frontend' },
    { template: 'routes/login/+page.svelte.hbs', outputPath: 'src/routes/login/+page.svelte', target: 'frontend', when: (ctx) => ctx.hasAuth },
    { template: 'routes/dashboard/+page.svelte.hbs', outputPath: 'src/routes/dashboard/+page.svelte', target: 'frontend', when: (ctx) => ctx.hasAuth },

    { template: 'components/Layout.svelte.hbs', outputPath: 'src/lib/components/Layout.svelte', target: 'frontend' },
    { template: 'components/Navbar.svelte.hbs', outputPath: 'src/lib/components/Navbar.svelte', target: 'frontend' },
    { template: 'components/LoadingSpinner.svelte.hbs', outputPath: 'src/lib/components/LoadingSpinner.svelte', target: 'frontend' },

    { template: 'lib/config.ts.hbs', outputPath: 'src/lib/config.ts', target: 'frontend' },
    { template: 'lib/utils.ts.hbs', outputPath: 'src/lib/utils.ts', target: 'frontend' },
  ],
  injections: [],
};

export default fileMap;