import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'cron.ts.hbs', outputPath: 'src/lib/cron.ts', target: 'backend' },
    { template: 'jobs/cleanup.ts.hbs', outputPath: 'src/jobs/cleanup.ts', target: 'backend' },
  ],
  injections: [],
};

export default fileMap;
