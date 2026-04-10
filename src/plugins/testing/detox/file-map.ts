import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: '.detoxrc.js.hbs', outputPath: '.detoxrc.js', target: 'frontend' },
    { template: 'e2e/setup.ts.hbs', outputPath: 'e2e/setup.ts', target: 'frontend' },
    { template: 'e2e/home.test.ts.hbs', outputPath: 'e2e/home.test.ts', target: 'frontend' },
    { template: 'e2e/auth.test.ts.hbs', outputPath: 'e2e/auth.test.ts', target: 'frontend' },
  ],
  injections: [],
};

export default fileMap;
