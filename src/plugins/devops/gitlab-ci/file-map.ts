import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [{ template: '.gitlab-ci.yml.hbs', outputPath: '.gitlab-ci.yml', target: 'root' }],
  injections: [],
};

export default fileMap;
