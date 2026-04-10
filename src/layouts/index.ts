import type { LayoutStrategy, Structure } from '../shared/types.js';
import { STRUCTURES } from '../shared/constants.js';
import { SingleAppLayout } from './single-app.js';
import { MonorepoLayout } from './monorepo.js';
import { MicroservicesLayout } from './microservices.js';
import { LayoutError } from '../shared/errors.js';

export function getLayout(structure: Structure): LayoutStrategy {
  switch (structure) {
    case STRUCTURES.SINGLE_APP:
      return new SingleAppLayout();
    case STRUCTURES.MONOREPO:
      return new MonorepoLayout();
    case STRUCTURES.MICROSERVICES:
      return new MicroservicesLayout();
    default:
      throw new LayoutError(structure, `Unknown structure type: ${structure}`);
  }
}

export { SingleAppLayout } from './single-app.js';
export { MonorepoLayout } from './monorepo.js';
export { MicroservicesLayout } from './microservices.js';