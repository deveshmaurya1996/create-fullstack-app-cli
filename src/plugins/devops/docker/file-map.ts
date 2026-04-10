import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: '.dockerignore.hbs', outputPath: '.dockerignore', target: 'root' },
    { template: 'Dockerfile.frontend.hbs', outputPath: 'Dockerfile.frontend', target: 'root' },
    { template: 'Dockerfile.backend.hbs', outputPath: 'Dockerfile.backend', target: 'root' },
    { template: 'docker-compose.yml.hbs', outputPath: 'docker-compose.yml', target: 'root' },
    { template: 'docker-compose.dev.yml.hbs', outputPath: 'docker-compose.dev.yml', target: 'root' },
    { template: 'docker-compose.test.yml.hbs', outputPath: 'docker-compose.test.yml', target: 'root' },
  ],
  injections: [],
};

export default fileMap;
