import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'hooks/useCamera.ts.hbs', outputPath: 'src/hooks/useCamera.ts', target: 'frontend' },
    { template: 'components/CameraView.tsx.hbs', outputPath: 'src/components/CameraView.tsx', target: 'frontend' },
  ],
  injections: [],
};

export default fileMap;
