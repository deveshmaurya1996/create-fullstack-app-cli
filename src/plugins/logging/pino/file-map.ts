import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [{ template: 'logger.ts.hbs', outputPath: 'src/lib/logger.ts', target: 'backend' }],
  injections: [],
};

export default fileMap;
