import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'components/LottieAnimation.tsx.hbs', outputPath: 'src/components/LottieAnimation.tsx', target: 'frontend' },
    { template: 'assets/sample-animation.json.hbs', outputPath: 'src/assets/sample-animation.json', target: 'frontend' },
  ],
  injections: [],
};

export default fileMap;
