import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import type { Plugin, PluginMeta, PluginFileMap, PluginCategory, WizardDraft } from '../shared/types.js';
import { PluginLoadError } from '../shared/errors.js';
import { logger } from '../shared/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PluginRegistry {
  private plugins: Map<string, Plugin> = new Map();
  private categorized: Map<string, Plugin[]> = new Map();
  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;

    await this.loadAllPlugins();
    this.buildCategoryIndex();
    this.initialized = true;

    logger.debug(`Plugin registry initialized with ${this.plugins.size} plugins`);
  }

  private async loadAllPlugins(): Promise<void> {
    const pluginDirs = this.getPluginDirectories();

    for (const { id, dir } of pluginDirs) {
      try {
        const metaHref = pathToFileURL(path.join(dir, 'meta.js')).href;
        const fileMapHref = pathToFileURL(path.join(dir, 'file-map.js')).href;
        const metaModule = await import(metaHref);
        const fileMapModule = await import(fileMapHref);

        const meta: PluginMeta = metaModule.default || metaModule.meta;
        const fileMap: PluginFileMap = fileMapModule.default || fileMapModule.fileMap;

        const plugin: Plugin = {
          meta: { ...meta, id: meta.id || id },
          fileMap,
          templateDir: path.join(dir, 'templates'),
        };

        this.plugins.set(plugin.meta.id, plugin);
      } catch (error) {
        throw new PluginLoadError(id, error as Error);
      }
    }
  }

  private getPluginDirectories(): { id: string; dir: string; category: string }[] {
    // This maps the file structure to plugin registrations
    // In production, this would scan the filesystem
    // For now, we maintain an explicit registry for type safety
    return PLUGIN_MANIFEST.map((entry) => ({
      id: entry.id,
      dir: path.resolve(__dirname, entry.path),
      category: entry.category,
    }));
  }

  private buildCategoryIndex(): void {
    this.categorized.clear();
    for (const plugin of this.plugins.values()) {
      const cat = plugin.meta.category;
      if (!this.categorized.has(cat)) {
        this.categorized.set(cat, []);
      }
      this.categorized.get(cat)!.push(plugin);
    }

    // Sort by order within each category
    for (const [, plugins] of this.categorized) {
      plugins.sort((a, b) => (a.meta.order ?? 999) - (b.meta.order ?? 999));
    }
  }

  getPlugin(id: string): Plugin | undefined {
    return this.plugins.get(id);
  }

  getPluginOrThrow(id: string): Plugin {
    const plugin = this.plugins.get(id);
    if (!plugin) {
      throw new PluginLoadError(id, new Error(`Plugin "${id}" not found in registry`));
    }
    return plugin;
  }

  getAllPlugins(): Plugin[] {
    return Array.from(this.plugins.values());
  }

  getPluginsByCategory(category: PluginCategory): Plugin[] {
    return this.categorized.get(category) || [];
  }

  getPluginsByIds(ids: string[]): Plugin[] {
    return ids
      .map((id) => this.plugins.get(id))
      .filter((p): p is Plugin => p !== undefined);
  }

  getVisiblePlugins(category: PluginCategory, draft: WizardDraft): Plugin[] {
    const plugins = this.getPluginsByCategory(category);
    return plugins.filter((plugin) => {
      try {
        return plugin.meta.showWhen(draft);
      } catch {
        logger.warn(`showWhen failed for plugin "${plugin.meta.id}", hiding it`);
        return false;
      }
    });
  }

  getCategories(): PluginCategory[] {
    return Array.from(this.categorized.keys()) as PluginCategory[];
  }

  getPluginCount(): number {
    return this.plugins.size;
  }

  isInitialized(): boolean {
    return this.initialized;
  }
}

// ─── Plugin Manifest ──────────────────────────────────────────
// This is the single registration point for all plugins.
// Each entry maps to a folder in the plugins/ directory.

interface PluginManifestEntry {
  id: string;
  path: string;
  category: string;
}

const PLUGIN_MANIFEST: PluginManifestEntry[] = [
  // Frontend - Web
  { id: 'react-vite', path: './frontends/web/react-vite', category: 'frontend-web' },
  { id: 'next', path: './frontends/web/next', category: 'frontend-web' },
  { id: 'vue', path: './frontends/web/vue', category: 'frontend-web' },
  { id: 'svelte', path: './frontends/web/svelte', category: 'frontend-web' },
  { id: 'angular', path: './frontends/web/angular', category: 'frontend-web' },

  // Frontend - Mobile
  { id: 'expo', path: './frontends/mobile/expo', category: 'frontend-mobile' },
  { id: 'react-native-cli', path: './frontends/mobile/react-native-cli', category: 'frontend-mobile' },
  { id: 'flutter', path: './frontends/mobile/flutter', category: 'frontend-mobile' },

  // Backends
  { id: 'express', path: './backends/express', category: 'backend' },
  { id: 'fastify', path: './backends/fastify', category: 'backend' },
  { id: 'nestjs', path: './backends/nestjs', category: 'backend' },
  { id: 'hono', path: './backends/hono', category: 'backend' },
  { id: 'django', path: './backends/django', category: 'backend' },
  { id: 'fastapi', path: './backends/fastapi', category: 'backend' },

  // API Style
  { id: 'graphql-server', path: './api-style/graphql-server', category: 'api-style' },
  { id: 'trpc-server', path: './api-style/trpc-server', category: 'api-style' },

  // Databases
  { id: 'postgres', path: './databases/postgres', category: 'database' },
  { id: 'mongodb', path: './databases/mongodb', category: 'database' },
  { id: 'mysql', path: './databases/mysql', category: 'database' },
  { id: 'sqlite', path: './databases/sqlite', category: 'database' },
  { id: 'redis', path: './databases/redis', category: 'database' },

  // ORMs
  { id: 'prisma', path: './orms/prisma', category: 'orm' },
  { id: 'drizzle', path: './orms/drizzle', category: 'orm' },
  { id: 'typeorm', path: './orms/typeorm', category: 'orm' },
  { id: 'mongoose', path: './orms/mongoose', category: 'orm' },

  // Auth
  { id: 'jwt-custom', path: './auth/jwt-custom', category: 'auth' },
  { id: 'next-auth', path: './auth/next-auth', category: 'auth' },
  { id: 'clerk', path: './auth/clerk', category: 'auth' },
  { id: 'lucia', path: './auth/lucia', category: 'auth' },

  // Styling - Web
  { id: 'tailwind', path: './styling/web/tailwind', category: 'styling-web' },
  { id: 'styled-components', path: './styling/web/styled-components', category: 'styling-web' },
  { id: 'css-modules', path: './styling/web/css-modules', category: 'styling-web' },

  // Styling - Mobile
  { id: 'nativewind', path: './styling/mobile/nativewind', category: 'styling-mobile' },
  { id: 'rn-stylesheet', path: './styling/mobile/rn-stylesheet', category: 'styling-mobile' },
  { id: 'styled-components-rn', path: './styling/mobile/styled-components-rn', category: 'styling-mobile' },

  // State Management
  { id: 'zustand', path: './state/zustand', category: 'state' },
  { id: 'redux-toolkit', path: './state/redux-toolkit', category: 'state' },
  { id: 'tanstack-query', path: './state/tanstack-query', category: 'state' },
  { id: 'mobx', path: './state/mobx', category: 'state' },

  // Forms
  { id: 'react-hook-form', path: './forms/react-hook-form', category: 'forms' },
  { id: 'formik', path: './forms/formik', category: 'forms' },

  // UI Libraries
  { id: 'shadcn', path: './ui-library/shadcn', category: 'ui-library' },
  { id: 'mui', path: './ui-library/mui', category: 'ui-library' },
  { id: 'ant-design', path: './ui-library/ant-design', category: 'ui-library' },

  // API Client
  { id: 'axios', path: './api-client/axios', category: 'api-client' },
  { id: 'fetch-wrapper', path: './api-client/fetch-wrapper', category: 'api-client' },
  { id: 'trpc-client', path: './api-client/trpc-client', category: 'api-client' },

  // Mobile Navigation
  { id: 'react-navigation', path: './mobile-navigation/react-navigation', category: 'mobile-navigation' },
  { id: 'expo-router', path: './mobile-navigation/expo-router', category: 'mobile-navigation' },

  // Frontend Extras
  { id: 'recharts', path: './frontend-extras/recharts', category: 'frontend-extras' },
  { id: 'react-table', path: './frontend-extras/react-table', category: 'frontend-extras' },
  { id: 'date-fns', path: './frontend-extras/date-fns', category: 'frontend-extras' },
  { id: 'i18next', path: './frontend-extras/i18next', category: 'frontend-extras' },
  { id: 'async-storage', path: './frontend-extras/async-storage', category: 'frontend-extras' },
  { id: 'expo-secure-store', path: './frontend-extras/expo-secure-store', category: 'frontend-extras' },
  { id: 'expo-image', path: './frontend-extras/expo-image', category: 'frontend-extras' },
  { id: 'react-native-reanimated', path: './frontend-extras/react-native-reanimated', category: 'frontend-extras' },
  { id: 'lottie-rn', path: './frontend-extras/lottie-rn', category: 'frontend-extras' },
  { id: 'react-native-maps', path: './frontend-extras/react-native-maps', category: 'frontend-extras' },
  { id: 'react-native-push-notifications', path: './frontend-extras/react-native-push-notifications', category: 'frontend-extras' },
  { id: 'expo-camera', path: './frontend-extras/expo-camera', category: 'frontend-extras' },
  { id: 'expo-location', path: './frontend-extras/expo-location', category: 'frontend-extras' },
  { id: 'react-native-gesture-handler', path: './frontend-extras/react-native-gesture-handler', category: 'frontend-extras' },
  { id: 'react-native-svg', path: './frontend-extras/react-native-svg', category: 'frontend-extras' },
  { id: 'expo-haptics', path: './frontend-extras/expo-haptics', category: 'frontend-extras' },
  { id: 'react-native-mmkv', path: './frontend-extras/react-native-mmkv', category: 'frontend-extras' },
  { id: 'react-native-bottom-sheet', path: './frontend-extras/react-native-bottom-sheet', category: 'frontend-extras' },

  // Backend Extras
  { id: 'multer', path: './backend-extras/multer', category: 'backend-extras' },
  { id: 's3-upload', path: './backend-extras/s3-upload', category: 'backend-extras' },
  { id: 'rate-limit', path: './backend-extras/rate-limit', category: 'backend-extras' },
  { id: 'cors-config', path: './backend-extras/cors-config', category: 'backend-extras' },
  { id: 'helmet', path: './backend-extras/helmet', category: 'backend-extras' },
  { id: 'websocket', path: './backend-extras/websocket', category: 'backend-extras' },
  { id: 'bullmq', path: './backend-extras/bullmq', category: 'backend-extras' },
  { id: 'firebase-push', path: './backend-extras/firebase-push', category: 'backend-extras' },
  { id: 'email', path: './backend-extras/email', category: 'backend-extras' },
  { id: 'swagger', path: './backend-extras/swagger', category: 'backend-extras' },
  { id: 'compression', path: './backend-extras/compression', category: 'backend-extras' },
  { id: 'cron', path: './backend-extras/cron', category: 'backend-extras' },

  // Testing
  { id: 'vitest', path: './testing/vitest', category: 'testing' },
  { id: 'jest', path: './testing/jest', category: 'testing' },
  { id: 'playwright', path: './testing/playwright', category: 'testing' },
  { id: 'cypress', path: './testing/cypress', category: 'testing' },
  { id: 'detox', path: './testing/detox', category: 'testing' },
  { id: 'maestro', path: './testing/maestro', category: 'testing' },
  { id: 'testing-library-react', path: './testing/testing-library-react', category: 'testing' },
  { id: 'testing-library-react-native', path: './testing/testing-library-react-native', category: 'testing' },
  { id: 'supertest', path: './testing/supertest', category: 'testing' },

  // Logging
  { id: 'winston', path: './logging/winston', category: 'logging' },
  { id: 'pino', path: './logging/pino', category: 'logging' },

  // Monitoring
  { id: 'sentry', path: './monitoring/sentry', category: 'monitoring' },
  { id: 'sentry-react-native', path: './monitoring/sentry-react-native', category: 'monitoring' },
  { id: 'datadog', path: './monitoring/datadog', category: 'monitoring' },

  // Dev Tools
  { id: 'eslint', path: './devtools/eslint', category: 'devtools' },
  { id: 'prettier', path: './devtools/prettier', category: 'devtools' },
  { id: 'husky', path: './devtools/husky', category: 'devtools' },
  { id: 'lint-staged', path: './devtools/lint-staged', category: 'devtools' },
  { id: 'commitlint', path: './devtools/commitlint', category: 'devtools' },

  // DevOps
  { id: 'docker', path: './devops/docker', category: 'devops' },
  { id: 'github-actions', path: './devops/github-actions', category: 'devops' },
  { id: 'gitlab-ci', path: './devops/gitlab-ci', category: 'devops' },
  { id: 'eas-build', path: './devops/eas-build', category: 'devops' },
  { id: 'fastlane', path: './devops/fastlane', category: 'devops' },

  // Deployment
  { id: 'vercel', path: './deployment/vercel', category: 'deployment' },
  { id: 'railway', path: './deployment/railway', category: 'deployment' },
  { id: 'aws', path: './deployment/aws', category: 'deployment' },
  { id: 'flyio', path: './deployment/flyio', category: 'deployment' },
  { id: 'eas-submit', path: './deployment/eas-submit', category: 'deployment' },
];

// Singleton
export const pluginRegistry = new PluginRegistry();