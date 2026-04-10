import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [{ template: 'lib/storage.ts.hbs', outputPath: 'src/lib/storage.ts', target: 'frontend' }],
  injections: [],
};

export default fileMap;
