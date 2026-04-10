import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'vitest.config.ts.hbs', outputPath: 'src/vitest.config.ts', target: 'frontend' },
    { template: 'setup.ts.hbs', outputPath: 'src/test/setup.ts', target: 'frontend' },
    { template: '__tests__/sample.test.ts.hbs', outputPath: 'src/test/sample.test.ts', target: 'frontend' },
  ],
  injections: [],
};

export default fileMap;
