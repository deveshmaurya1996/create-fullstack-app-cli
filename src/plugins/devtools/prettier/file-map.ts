import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: '.prettierrc.hbs', outputPath: '.prettierrc', target: 'root' },
    { template: '.prettierignore.hbs', outputPath: '.prettierignore', target: 'root' },
  ],
  injections: [],
};

export default fileMap;
