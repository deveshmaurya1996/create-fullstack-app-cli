import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'railway.json.hbs', outputPath: 'railway.json', target: 'root' },
    { template: 'railway.toml.hbs', outputPath: 'railway.toml', target: 'root' },
  ],
  injections: [],
};

export default fileMap;
