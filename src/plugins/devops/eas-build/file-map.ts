import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [{ template: 'eas.json.hbs', outputPath: 'eas.json', target: 'root' }],
  injections: [],
};

export default fileMap;
