import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'babel-plugin.hbs', outputPath: 'babel.plugin.patch.js', target: 'frontend' },
    { template: 'components/AnimatedCard.tsx.hbs', outputPath: 'src/components/AnimatedCard.tsx', target: 'frontend' },
  ],
  injections: [],
};

export default fileMap;
