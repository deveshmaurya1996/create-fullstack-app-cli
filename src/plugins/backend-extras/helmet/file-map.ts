import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [{ template: 'security.ts.hbs', outputPath: 'src/lib/security.ts', target: 'backend' }],
  injections: [],
};

export default fileMap;
