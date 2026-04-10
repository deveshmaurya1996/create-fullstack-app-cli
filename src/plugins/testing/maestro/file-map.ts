import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: '.maestro/home.yaml.hbs', outputPath: '.maestro/home.yaml', target: 'frontend' },
    { template: '.maestro/login.yaml.hbs', outputPath: '.maestro/login.yaml', target: 'frontend' },
  ],
  injections: [],
};

export default fileMap;
