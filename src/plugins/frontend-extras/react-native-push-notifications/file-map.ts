import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'lib/notifications.ts.hbs', outputPath: 'src/lib/notifications.ts', target: 'frontend' },
    { template: 'hooks/useNotifications.ts.hbs', outputPath: 'src/hooks/useNotifications.ts', target: 'frontend' },
  ],
  injections: [],
};

export default fileMap;
