import type { PluginFileMap } from '../../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'theme.ts.hbs', outputPath: 'src/theme.ts', target: 'frontend' },
    { template: 'providers/ThemeProvider.tsx.hbs', outputPath: 'src/providers/ThemeProvider.tsx', target: 'frontend' },
    { template: 'styled.d.ts.hbs', outputPath: 'src/styled.d.ts', target: 'frontend' },
  ],
  injections: [],
};

export default fileMap;
