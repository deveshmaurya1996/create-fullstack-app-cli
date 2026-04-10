import type { WizardAnswers, TemplateContext, Plugin } from '../shared/types.js';
import { ENV_PREFIXES, PLATFORMS, SCOPES, STRUCTURES } from '../shared/constants.js';

/**
 * Builds the template context from wizard answers and active plugins.
 * This context is passed to EVERY Handlebars template during rendering.
 */
export function buildContext(
  answers: WizardAnswers,
  activePlugins: Plugin[]
): TemplateContext {
  const activeIds = activePlugins.map((p) => p.meta.id);
  const has = (id: string) => activeIds.includes(id);

  const hasFrontend =
    answers.scope === SCOPES.FRONTEND_ONLY || answers.scope === SCOPES.FULLSTACK;
  const hasBackend =
    answers.scope === SCOPES.BACKEND_ONLY || answers.scope === SCOPES.FULLSTACK;
  const hasWeb =
    hasFrontend && (answers.platform === PLATFORMS.WEB || answers.platform === PLATFORMS.BOTH);
  const hasMobile =
    hasFrontend && (answers.platform === PLATFORMS.MOBILE || answers.platform === PLATFORMS.BOTH);

  const frontendFramework = answers.webFramework || answers.mobileFramework;
  const envPrefix = frontendFramework ? (ENV_PREFIXES[frontendFramework] || 'VITE_') : 'VITE_';

  return {
    // Raw answers
    projectName: answers.projectName,
    structure: answers.structure,
    scope: answers.scope,
    platform: answers.platform,
    packageManager: answers.packageManager,
    projectType: answers.projectType || null,

    // Framework selections 
    webFramework: answers.webFramework,
    mobileFramework: answers.mobileFramework,
    backendFramework: answers.backendFramework,
    answers: {
      backend: answers.backendFramework,
      database: answers.database,
      orm: answers.orm,
    },

    // Computed booleans
    hasFrontend,
    hasBackend,
    hasWeb,
    hasMobile,
    hasBothPlatforms: answers.platform === PLATFORMS.BOTH,
    hasAuth: !!answers.auth && answers.auth !== 'none',
    hasDatabase: !!answers.database && answers.database !== 'none',
    hasRedis: answers.redis,
    hasOrm: !!answers.orm && answers.orm !== 'none',
    hasMonorepo: answers.structure === STRUCTURES.MONOREPO,
    hasMicroservices: answers.structure === STRUCTURES.MICROSERVICES,
    isSingleApp: answers.structure === STRUCTURES.SINGLE_APP,
    isFullstack: hasFrontend && hasBackend,
    isTypescript: true,
    backendTs: answers.backendTs,

    // Specific tech booleans - Frontends
    hasReactVite: has('react-vite'),
    hasNext: has('next'),
    hasVue: has('vue'),
    hasSvelte: has('svelte'),
    hasAngular: has('angular'),
    hasExpo: has('expo'),
    hasReactNativeCli: has('react-native-cli'),
    hasFlutter: has('flutter'),

    // Databases
    hasPostgres: has('postgres'),
    hasMongodb: has('mongodb'),
    hasMysql: has('mysql'),
    hasSqlite: has('sqlite'),

    // ORMs
    hasPrisma: has('prisma'),
    hasDrizzle: has('drizzle'),
    hasTypeorm: has('typeorm'),
    hasMongoose: has('mongoose'),

    // Backends
    hasExpress: has('express'),
    hasFastify: has('fastify'),
    hasNestjs: has('nestjs'),
    hasHono: has('hono'),
    hasDjango: has('django'),
    hasFastapi: has('fastapi'),

    // Styling
    hasTailwind: has('tailwind'),
    hasStyledComponents: has('styled-components') || has('styled-components-rn'),
    hasCssModules: has('css-modules'),
    hasNativeWind: has('nativewind'),

    // State
    hasZustand: has('zustand'),
    hasReduxToolkit: has('redux-toolkit'),
    hasTanstackQuery: has('tanstack-query'),
    hasMobx: has('mobx'),

    // Forms
    hasReactHookForm: has('react-hook-form'),
    hasFormik: has('formik'),

    // UI Library
    hasShadcn: has('shadcn'),
    hasMui: has('mui'),
    hasAntDesign: has('ant-design'),

    // API Client
    hasAxios: has('axios'),
    hasFetchWrapper: has('fetch-wrapper'),
    hasTrpcClient: has('trpc-client'),

    // Navigation
    hasReactNavigation: has('react-navigation'),
    hasExpoRouter: has('expo-router'),

    // Auth
    hasJwtCustom: has('jwt-custom'),
    hasNextAuth: has('next-auth'),
    hasClerk: has('clerk'),
    hasLucia: has('lucia'),

    // API Style
    hasGraphql: answers.apiStyle === 'graphql',
    hasTrpc: answers.apiStyle === 'trpc',
    hasRest: answers.apiStyle === 'rest',

    // Testing
    hasVitest: has('vitest'),
    hasJest: has('jest'),
    hasPlaywright: has('playwright'),
    hasCypress: has('cypress'),
    hasDetox: has('detox'),
    hasMaestro: has('maestro'),

    // Logging
    hasWinston: has('winston'),
    hasPino: has('pino'),

    // Monitoring
    hasSentry: has('sentry'),
    hasSentryReactNative: has('sentry-react-native'),
    hasDatadog: has('datadog'),

    // DevOps
    hasDocker: has('docker'),
    hasGithubActions: has('github-actions'),
    hasGitlabCi: has('gitlab-ci'),
    hasEasBuild: has('eas-build'),
    hasFastlane: has('fastlane'),

    // DevTools
    hasEslint: has('eslint'),
    hasPrettier: has('prettier'),
    hasHusky: has('husky'),
    hasLintStaged: has('lint-staged'),
    hasCommitlint: has('commitlint'),

    // Frontend extras
    hasRecharts: has('recharts'),
    hasReactTable: has('react-table'),
    hasDateFns: has('date-fns'),
    hasI18next: has('i18next'),
    hasAsyncStorage: has('async-storage'),
    hasExpoSecureStore: has('expo-secure-store'),
    hasReanimated: has('react-native-reanimated'),

    // Backend extras
    hasWebsocket: has('websocket'),
    hasBullmq: has('bullmq'),
    hasFirebasePush: has('firebase-push'),
    hasSwagger: has('swagger'),

    // Computed values
    envPrefix,
    frontendFramework,
    activePluginIds: activeIds,
    monorepoTool: answers.monorepoTool,
    deployment: answers.deployment,
  };
}