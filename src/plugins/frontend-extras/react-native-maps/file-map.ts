import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'components/MapView.tsx.hbs', outputPath: 'src/components/MapView.tsx', target: 'frontend' },
    { template: 'screens/MapScreen.tsx.hbs', outputPath: 'src/screens/MapScreen.tsx', target: 'frontend' },
  ],
  injections: [],
};

export default fileMap;
