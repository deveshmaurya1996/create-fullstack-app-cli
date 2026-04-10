import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'Appfile.hbs', outputPath: 'fastlane/Appfile', target: 'root' },
    { template: 'Fastfile.hbs', outputPath: 'fastlane/Fastfile', target: 'root' },
    { template: 'Matchfile.hbs', outputPath: 'fastlane/Matchfile', target: 'root' },
  ],
  injections: [],
};

export default fileMap;
