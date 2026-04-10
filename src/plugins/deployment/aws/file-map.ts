import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'aws-config.yml.hbs', outputPath: 'deploy/aws/aws-config.yml', target: 'root' },
    { template: 'buildspec.yml.hbs', outputPath: 'buildspec.yml', target: 'root' },
  ],
  injections: [],
};

export default fileMap;
