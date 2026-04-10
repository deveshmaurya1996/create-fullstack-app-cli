import type { PluginFileMap } from '../../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'theme.ts.hbs', outputPath: 'src/theme.ts', target: 'frontend' },
    { template: 'styles/common.ts.hbs', outputPath: 'src/styles/common.ts', target: 'frontend' },
  ],
  injections: [],
};

export default fileMap;
