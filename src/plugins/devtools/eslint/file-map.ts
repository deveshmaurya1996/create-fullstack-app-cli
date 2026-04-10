import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'eslint.config.js.hbs', outputPath: 'eslint.config.js', target: 'root' },
    { template: '.eslintignore.hbs', outputPath: '.eslintignore', target: 'root' },
  ],
  injections: [],
};

export default fileMap;
