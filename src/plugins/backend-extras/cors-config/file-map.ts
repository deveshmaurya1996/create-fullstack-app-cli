import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [{ template: 'cors.ts.hbs', outputPath: 'src/lib/cors.ts', target: 'backend' }],
  injections: [],
};

export default fileMap;
