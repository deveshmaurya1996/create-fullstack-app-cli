import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'ci.yml.hbs', outputPath: '.github/workflows/ci.yml', target: 'root' },
    { template: 'deploy.yml.hbs', outputPath: '.github/workflows/deploy.yml', target: 'root' },
    { template: 'mobile-build.yml.hbs', outputPath: '.github/workflows/mobile-build.yml', target: 'root' },
  ],
  injections: [],
};

export default fileMap;
