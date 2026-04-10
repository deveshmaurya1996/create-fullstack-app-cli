import type { PluginFileMap } from '../../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'tailwind.config.js.hbs', outputPath: 'tailwind.config.js', target: 'frontend' },
    { template: 'global.css.hbs', outputPath: 'global.css', target: 'frontend' },
    { template: 'nativewind-env.d.ts.hbs', outputPath: 'nativewind-env.d.ts', target: 'frontend' },
    { template: 'metro.config.patch.hbs', outputPath: 'metro.config.patch.js', target: 'frontend' },
  ],
  injections: [],
};

export default fileMap;
