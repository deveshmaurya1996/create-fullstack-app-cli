import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'schema.ts.hbs', outputPath: 'src/graphql/schema.ts', target: 'backend' },
    { template: 'server-plugin.ts.hbs', outputPath: 'src/graphql/server-plugin.ts', target: 'backend' },
    { template: 'resolvers/index.ts.hbs', outputPath: 'src/graphql/resolvers/index.ts', target: 'backend' },
    { template: 'resolvers/user.resolver.ts.hbs', outputPath: 'src/graphql/resolvers/user.resolver.ts', target: 'backend' },
    { template: 'types/user.type.ts.hbs', outputPath: 'src/graphql/types/user.type.ts', target: 'backend' },
    { template: 'route-import.hbs', outputPath: 'src/routes/fragments/graphql.route-import.ts', target: 'backend' },
    { template: 'route-register.hbs', outputPath: 'src/routes/fragments/graphql.route-register.ts', target: 'backend' },
  ],
  injections: [],
};

export default fileMap;
