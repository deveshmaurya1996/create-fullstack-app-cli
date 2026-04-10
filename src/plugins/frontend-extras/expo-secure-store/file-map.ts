import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [{ template: 'lib/secure-storage.ts.hbs', outputPath: 'src/lib/secure-storage.ts', target: 'frontend' }],
  injections: [],
};

export default fileMap;
