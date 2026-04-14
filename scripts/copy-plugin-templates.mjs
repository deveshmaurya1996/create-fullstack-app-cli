import { cp, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const srcPluginsRoot = path.join(repoRoot, 'src', 'plugins');
const distRoot = path.join(repoRoot, 'dist');

async function collectTemplateDirs(rootDir) {
  const found = [];
  const stack = [rootDir];

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = await readdir(current, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const fullPath = path.join(current, entry.name);

      if (entry.name === 'templates') {
        found.push(fullPath);
        continue;
      }

      stack.push(fullPath);
    }
  }

  return found;
}

async function main() {
  const templateDirs = await collectTemplateDirs(srcPluginsRoot);
  await mkdir(distRoot, { recursive: true });

  for (const srcTemplateDir of templateDirs) {
    const relPath = path.relative(srcPluginsRoot, srcTemplateDir);
    const distTemplateDir = path.join(distRoot, relPath);
    await mkdir(path.dirname(distTemplateDir), { recursive: true });
    await cp(srcTemplateDir, distTemplateDir, { recursive: true });
  }

  console.log(`Copied ${templateDirs.length} plugin template directories.`);
}

main().catch((error) => {
  console.error('Failed to copy plugin templates:', error);
  process.exit(1);
});
