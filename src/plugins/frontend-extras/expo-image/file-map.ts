import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    {
      template: 'components/OptimizedImage.tsx.hbs',
      outputPath: 'src/components/OptimizedImage.tsx',
      target: 'frontend',
    },
  ],
  injections: [],
};

export default fileMap;
