import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    {
      template: 'components/SampleBarChart.tsx.hbs',
      outputPath: 'src/components/charts/SampleBarChart.tsx',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'components/SampleBarChart.tsx.hbs',
      outputPath: 'components/charts/SampleBarChart.tsx',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
    {
      template: 'components/SampleLineChart.tsx.hbs',
      outputPath: 'src/components/charts/SampleLineChart.tsx',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'components/SampleLineChart.tsx.hbs',
      outputPath: 'components/charts/SampleLineChart.tsx',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
    {
      template: 'data/sample-chart-data.ts.hbs',
      outputPath: 'src/data/sample-chart-data.ts',
      target: 'frontend',
      when: (ctx) => !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'data/sample-chart-data.ts.hbs',
      outputPath: 'data/sample-chart-data.ts',
      target: 'frontend',
      when: (ctx) => ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
  ],
  injections: [],
};

export default fileMap;
