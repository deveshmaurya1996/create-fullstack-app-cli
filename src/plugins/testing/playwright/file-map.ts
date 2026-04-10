import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'playwright.config.ts.hbs', outputPath: 'src/playwright.config.ts', target: 'frontend' },
    { template: 'e2e/home.spec.ts.hbs', outputPath: 'src/e2e/home.spec.ts', target: 'frontend' },
    { template: 'e2e/auth.spec.ts.hbs', outputPath: 'src/e2e/auth.spec.ts', target: 'frontend' },
  ],
  injections: [],
};

export default fileMap;
