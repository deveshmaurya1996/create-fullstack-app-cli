import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'components/SampleTable.tsx.hbs', outputPath: 'src/components/SampleTable.tsx', target: 'frontend' },
    { template: 'data/sample-table-data.ts.hbs', outputPath: 'src/data/sample-table-data.ts', target: 'frontend' },
  ],
  injections: [],
};

export default fileMap;
