import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [{ template: 'lib/haptics.ts.hbs', outputPath: 'src/lib/haptics.ts', target: 'frontend' }],
  injections: [],
};

export default fileMap;
