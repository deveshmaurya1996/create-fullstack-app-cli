import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: '__tests__/health.test.ts.hbs', outputPath: 'src/test/health.test.ts', target: 'backend' },
    { template: '__tests__/users.test.ts.hbs', outputPath: 'src/test/users.test.ts', target: 'backend' },
  ],
  injections: [],
};

export default fileMap;
