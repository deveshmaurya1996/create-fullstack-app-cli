import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [{ template: 'fly.toml.hbs', outputPath: 'fly.toml', target: 'root' }],
  injections: [],
};

export default fileMap;
