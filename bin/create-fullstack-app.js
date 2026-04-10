#!/usr/bin/env node
/**
 * Optional local entry: runs the same CLI as the published package after a build.
 * Source of truth: src/bin/create-fullstack-app.ts → dist/bin/create-fullstack-app.js
 * For day-to-day dev without building: npm run dev  (tsx src/index.ts)
 */
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const built = path.join(__dirname, '..', 'dist', 'bin', 'create-fullstack-app.js');

if (!existsSync(built)) {
  console.error(
    'create-fullstack-app: dist/bin not found. Run `npm run build`, or use `npm run dev` / `npx tsx src/index.ts`.'
  );
  process.exit(1);
}

await import(pathToFileURL(built).href);
