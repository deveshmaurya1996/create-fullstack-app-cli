import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'setup.ts.hbs', outputPath: 'src/test/setup.ts', target: 'frontend' },
    { template: '__tests__/Home.test.tsx.hbs', outputPath: 'src/test/Home.test.tsx', target: 'frontend' },
  ],
  injections: [],
};

export default fileMap;
