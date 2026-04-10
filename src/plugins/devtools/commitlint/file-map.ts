import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'commitlint.config.js.hbs', outputPath: 'commitlint.config.js', target: 'root' },
  ],
  injections: [],
};

export default fileMap;
