/**
 * Rewrites stub plugin meta.ts / file-map.ts to full PluginMeta / PluginFileMap shape.
 * Skips plugins that already define platformSupport.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const registryPath = path.join(root, 'src', 'plugins', 'registry.ts');
const registrySrc = fs.readFileSync(registryPath, 'utf8');

const entries = [];
for (const line of registrySrc.split('\n')) {
  const m = line.match(
    /\{\s*id:\s*'([^']+)',\s*path:\s*'\.\/([^']+)',\s*category:\s*'([^']+)'\s*\},?/
  );
  if (m) entries.push({ id: m[1], pluginPath: m[2], category: m[3] });
}

const PLATFORM_SUPPORT = {
  'frontend-web': 'web-only',
  'frontend-mobile': 'mobile-only',
  backend: 'backend-only',
  'api-style': 'backend-only',
  database: 'backend-only',
  orm: 'backend-only',
  auth: 'all',
  'styling-web': 'web-only',
  'styling-mobile': 'mobile-only',
  state: 'all',
  forms: 'web-only',
  'ui-library': 'web-only',
  'api-client': 'all',
  'mobile-navigation': 'mobile-only',
  'frontend-extras': 'all',
  'backend-extras': 'backend-only',
  testing: 'all',
  logging: 'backend-only',
  monitoring: 'all',
  devtools: 'all',
  devops: 'all',
  deployment: 'all',
};

const CATEGORY_PREDICATE = {
  'frontend-web': 'showWhenWebFrontend',
  'frontend-mobile': 'showWhenMobileFrontend',
  'api-style': 'showWhenNodeBackend',
  auth: 'showWhenAuth',
  'styling-web': 'showWhenWebFrontend',
  'styling-mobile': 'showWhenMobileNonFlutter',
  state: 'showWhenFrontend',
  forms: 'showWhenWebFrontend',
  'ui-library': 'showWhenWebFrontend',
  'api-client': 'showWhenApiClient',
  'mobile-navigation': 'showWhenMobileNonFlutter',
  'frontend-extras': 'showWhenFrontend',
  'backend-extras': 'showWhenNodeBackend',
  testing: 'showAlways',
  logging: 'showWhenNodeBackend',
  monitoring: 'showAlways',
  devtools: 'showAlways',
  devops: 'showAlways',
  deployment: 'showAlways',
};

const ID_PREDICATE = {
  'next-auth': 'showWhenWebFrontend',
  detox: 'showWhenMobileNativeTesting',
  maestro: 'showWhenMobileNativeTesting',
  'testing-library-react-native': 'showWhenMobileNativeTesting',
  'testing-library-react': 'showWhenWebFrontend',
  playwright: 'showWhenWebFrontend',
  cypress: 'showWhenWebFrontend',
  'sentry-react-native': 'showWhenMobileNonFlutter',
  recharts: 'showWhenWebFrontend',
  'react-table': 'showWhenWebFrontend',
  'async-storage': 'showWhenMobileNonFlutter',
  'expo-secure-store': 'showWhenMobileNonFlutter',
  'expo-image': 'showWhenMobileNonFlutter',
  'react-native-reanimated': 'showWhenMobileNonFlutter',
  'lottie-rn': 'showWhenMobileNonFlutter',
  'react-native-maps': 'showWhenMobileNonFlutter',
  'react-native-push-notifications': 'showWhenMobileNonFlutter',
  'expo-camera': 'showWhenMobileNonFlutter',
  'expo-location': 'showWhenMobileNonFlutter',
  'react-native-gesture-handler': 'showWhenMobileNonFlutter',
  'react-native-svg': 'showWhenMobileNonFlutter',
  'expo-haptics': 'showWhenMobileNonFlutter',
  'react-native-mmkv': 'showWhenMobileNonFlutter',
  'react-native-bottom-sheet': 'showWhenMobileNonFlutter',
};

function labelize(id) {
  return id
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function relPaths(pluginPath) {
  const segments = pluginPath.split('/').filter(Boolean);
  const upToPlugins = '../'.repeat(segments.length);
  const upToSrc = '../'.repeat(segments.length + 1);
  return {
    types: `${upToSrc}shared/types.js`,
    helpers: `${upToPlugins}helpers/show-when.js`,
  };
}

function orderInCategory(category) {
  const inCat = entries.filter((e) => e.category === category);
  const map = new Map(inCat.map((e, i) => [e.id, i + 1]));
  return map;
}

let updated = 0;
let skipped = 0;

for (const { id, pluginPath, category } of entries) {
  const pluginDir = path.join(root, 'src', 'plugins', ...pluginPath.split('/'));
  const metaPath = path.join(pluginDir, 'meta.ts');
  if (!fs.existsSync(metaPath)) {
    console.warn('No meta.ts:', pluginPath);
    continue;
  }
  const existing = fs.readFileSync(metaPath, 'utf8');
  if (existing.includes('platformSupport:')) {
    skipped++;
    continue;
  }

  const { types, helpers } = relPaths(pluginPath);
  const predicate = ID_PREDICATE[id] ?? CATEGORY_PREDICATE[category] ?? 'showAlways';
  const platformSupport = PLATFORM_SUPPORT[category] ?? 'all';
  const label = labelize(id);
  const description = `${label} — generated project integration (packages, env, scripts to be expanded).`;
  const orderMap = orderInCategory(category);
  const order = orderMap.get(id) ?? 99;

  const metaOut = `import type { PluginMeta } from '${types}';
import { ${predicate} } from '${helpers}';

const meta: PluginMeta = {
  id: '${id}',
  label: '${label}',
  description: '${description.replace(/'/g, "\\'")}',
  category: '${category}',
  platformSupport: '${platformSupport}',
  deps: [],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: ${predicate},
  order: ${order},
};

export default meta;
`;

  fs.writeFileSync(metaPath, metaOut, 'utf8');
  updated++;

  const fmPath = path.join(pluginDir, 'file-map.ts');
  if (fs.existsSync(fmPath)) {
    const fm = fs.readFileSync(fmPath, 'utf8');
    const isLegacyStub =
      /export const fileMap:\s*FileMap\b/.test(fm) ||
      (/\bentries:\s*\[/.test(fm) && !/PluginFileMap/.test(fm));
    if (isLegacyStub) {
      const fmOut = `import type { PluginFileMap } from '${types}';

const fileMap: PluginFileMap = {
  files: [],
  injections: [],
};

export default fileMap;
`;
      fs.writeFileSync(fmPath, fmOut, 'utf8');
    }
  }
}

console.log('normalize-plugin-metas:', { updated, skipped, total: entries.length });
