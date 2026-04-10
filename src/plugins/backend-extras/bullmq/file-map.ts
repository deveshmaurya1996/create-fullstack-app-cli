import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'queue.ts.hbs', outputPath: 'src/lib/queue.ts', target: 'backend' },
    { template: 'jobs/send-email.ts.hbs', outputPath: 'src/jobs/send-email.ts', target: 'backend' },
    { template: 'workers/email.worker.ts.hbs', outputPath: 'src/workers/email.worker.ts', target: 'backend' },
  ],
  injections: [],
};

export default fileMap;
