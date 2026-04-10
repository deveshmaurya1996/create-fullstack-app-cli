import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'pre-commit.hbs', outputPath: '.husky/pre-commit', target: 'root' },
    { template: 'commit-msg.hbs', outputPath: '.husky/commit-msg', target: 'root' },
  ],
  injections: [],
};

export default fileMap;
