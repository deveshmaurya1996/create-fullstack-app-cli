import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'websocket.ts.hbs', outputPath: 'src/lib/websocket.ts', target: 'backend' },
    { template: 'events/chat.ts.hbs', outputPath: 'src/events/chat.ts', target: 'backend' },
    { template: 'route-import.hbs', outputPath: 'src/routes/fragments/ws.route-import.ts', target: 'backend' },
    { template: 'route-register.hbs', outputPath: 'src/routes/fragments/ws.route-register.ts', target: 'backend' },
  ],
  injections: [],
};

export default fileMap;
