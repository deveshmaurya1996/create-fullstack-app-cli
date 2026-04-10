import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'cypress.config.ts.hbs', outputPath: 'src/cypress.config.ts', target: 'frontend' },
    { template: 'support/e2e.ts.hbs', outputPath: 'src/cypress/support/e2e.ts', target: 'frontend' },
    { template: 'support/commands.ts.hbs', outputPath: 'src/cypress/support/commands.ts', target: 'frontend' },
    { template: 'e2e/home.cy.ts.hbs', outputPath: 'src/cypress/e2e/home.cy.ts', target: 'frontend' },
    { template: 'e2e/auth.cy.ts.hbs', outputPath: 'src/cypress/e2e/auth.cy.ts', target: 'frontend' },
  ],
  injections: [],
};

export default fileMap;
