import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [{ template: 'compression.ts.hbs', outputPath: 'src/lib/compression.ts', target: 'backend' }],
  injections: [],
};

export default fileMap;
