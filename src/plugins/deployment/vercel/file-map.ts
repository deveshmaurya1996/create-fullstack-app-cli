import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [{ template: 'vercel.json.hbs', outputPath: 'vercel.json', target: 'root' }],
  injections: [],
};

export default fileMap;
