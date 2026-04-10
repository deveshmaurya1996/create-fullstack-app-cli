import type {
    TARGETS,
    STRUCTURES,
    PLATFORMS,
    SCOPES,
    PLUGIN_CATEGORIES,
    PACKAGE_MANAGERS,
    PROJECT_TYPES,
  } from './constants.js';
  
  export type ValueOf<T> = T[keyof T];
  
  export type Target = ValueOf<typeof TARGETS>;
  export type Structure = ValueOf<typeof STRUCTURES>;
  export type Platform = ValueOf<typeof PLATFORMS>;
  export type Scope = ValueOf<typeof SCOPES>;
  export type PluginCategory = ValueOf<typeof PLUGIN_CATEGORIES>;
  export type PackageManager = (typeof PACKAGE_MANAGERS)[number];
  export type ProjectType = (typeof PROJECT_TYPES)[number];
  
  export type PlatformSupport = 'all' | 'web-only' | 'mobile-only' | 'backend-only';
  
  export interface EnvVar {
    key: string;
    defaultValue: string;
    comment: string;
    target: Target;
  }
  
  export interface ScriptEntry {
    name: string;
    command: string;
    target: Target;
    description?: string;
  }
  
  export interface PluginDependency {
    name: string;
    version: string;
  }
  
  export type ShowWhenFn = (draft: WizardDraft) => boolean;
  export type WhenFn = (context: TemplateContext) => boolean;
  
  export interface PluginMeta {
    id: string;
    label: string;
    description: string;
    category: PluginCategory;
    platformSupport: PlatformSupport;
    deps: PluginDependency[];
    devDeps: PluginDependency[];
    pythonDeps?: PluginDependency[];
    envVars: EnvVar[];
    scripts: ScriptEntry[];
    conflicts: string[];
    requires: string[];
    showWhen: ShowWhenFn;
    skipStylingQuestion?: boolean;
    skipNavigationQuestion?: boolean;
    order?: number;
  }
  
  export interface FileMapEntry {
    template: string;
    outputPath: string;
    target: Target;
    when?: WhenFn;
  }
  
  export interface InjectionEntry {
    template: string;
    targetFile: string;
    marker: string;
    target: Target;
    when?: WhenFn;
  }
  
  export interface PluginFileMap {
    files: FileMapEntry[];
    injections: InjectionEntry[];
  }
  
  export interface Plugin {
    meta: PluginMeta;
    fileMap: PluginFileMap;
    templateDir: string;
  }
  
  export interface WizardDraft {
    projectName?: string;
    structure?: Structure;
    scope?: Scope;
    projectType?: ProjectType;
    monorepoTool?: string;
    packageManager?: PackageManager;
    platform?: Platform;
    webFramework?: string;
    mobileFramework?: string;
    webStyling?: string;
    mobileStyling?: string;
    stateManagement?: string[];
    formLibrary?: string;
    uiLibrary?: string;
    apiClient?: string;
    mobileNavigation?: string;
    frontendExtras?: string[];
    backendFramework?: string;
    backendTs?: boolean;
    apiStyle?: string;
    database?: string;
    orm?: string;
    redis?: boolean;
    backendExtras?: string[];
    auth?: string;
    testing?: string[];
    logging?: string;
    monitoring?: string;
    devtools?: string[];
    devops?: string[];
    deployment?: string[];
    needBackend?: boolean;
  }
  
  export interface WizardAnswers extends Required<Omit<WizardDraft, 
    'projectType' |
    'monorepoTool' | 'webFramework' | 'mobileFramework' | 'webStyling' |
    'mobileStyling' | 'formLibrary' | 'uiLibrary' | 'apiClient' |
    'mobileNavigation' | 'backendFramework' | 'apiStyle' | 'database' |
    'orm' | 'auth' | 'logging' | 'monitoring'
  >> {
    projectType: ProjectType | null;
    monorepoTool: string | null;
    webFramework: string | null;
    mobileFramework: string | null;
    webStyling: string | null;
    mobileStyling: string | null;
    formLibrary: string | null;
    uiLibrary: string | null;
    apiClient: string | null;
    mobileNavigation: string | null;
    backendFramework: string | null;
    apiStyle: string | null;
    database: string | null;
    orm: string | null;
    auth: string | null;
    logging: string | null;
    monitoring: string | null;
  }
  
  /** Subset of wizard answers for file-map `when` hooks (`backend` mirrors `backendFramework`). */
  export interface TemplateContextAnswers {
    backend: string | null;
    database: string | null;
    orm: string | null;
  }
  
  export interface TemplateContext {
    projectName: string;
    structure: Structure;
    scope: Scope;
    platform: Platform;
    packageManager: PackageManager;
    projectType: ProjectType | null;
  
    webFramework: string | null;
    mobileFramework: string | null;
    backendFramework: string | null;
    /** Wizard answers for conditional generation (e.g. skip Node DB helpers on Django). */
    answers: TemplateContextAnswers;
  
    hasFrontend: boolean;
    hasBackend: boolean;
    hasWeb: boolean;
    hasMobile: boolean;
    hasBothPlatforms: boolean;
    hasAuth: boolean;
    hasDatabase: boolean;
    hasRedis: boolean;
    hasOrm: boolean;
    hasMonorepo: boolean;
    hasMicroservices: boolean;
    isSingleApp: boolean;
    isFullstack: boolean;
    isTypescript: boolean;
    backendTs: boolean;
  
    hasReactVite: boolean;
    hasNext: boolean;
    hasVue: boolean;
    hasSvelte: boolean;
    hasAngular: boolean;
    hasExpo: boolean;
    hasReactNativeCli: boolean;
    hasFlutter: boolean;
    hasExpress: boolean;
    hasFastify: boolean;
    hasNestjs: boolean;
    hasHono: boolean;
    hasDjango: boolean;
    hasFastapi: boolean;
  
    hasPostgres: boolean;
    hasMongodb: boolean;
    hasMysql: boolean;
    hasSqlite: boolean;
  
    hasPrisma: boolean;
    hasDrizzle: boolean;
    hasTypeorm: boolean;
    hasMongoose: boolean;
  
    hasTailwind: boolean;
    hasStyledComponents: boolean;
    hasCssModules: boolean;
    hasNativeWind: boolean;
  
    hasZustand: boolean;
    hasReduxToolkit: boolean;
    hasTanstackQuery: boolean;
    hasMobx: boolean;
  
    hasReactHookForm: boolean;
    hasFormik: boolean;
  
    hasShadcn: boolean;
    hasMui: boolean;
    hasAntDesign: boolean;
  
    hasAxios: boolean;
    hasFetchWrapper: boolean;
    hasTrpcClient: boolean;
  
    hasReactNavigation: boolean;
    hasExpoRouter: boolean;
  
    hasJwtCustom: boolean;
    hasNextAuth: boolean;
    hasClerk: boolean;
    hasLucia: boolean;
  
    hasGraphql: boolean;
    hasTrpc: boolean;
    hasRest: boolean;
  
    hasVitest: boolean;
    hasJest: boolean;
    hasPlaywright: boolean;
    hasCypress: boolean;
    hasDetox: boolean;
    hasMaestro: boolean;
  
    hasWinston: boolean;
    hasPino: boolean;
    hasSentry: boolean;
    hasSentryReactNative: boolean;
    hasDatadog: boolean;
  
    hasDocker: boolean;
    hasGithubActions: boolean;
    hasGitlabCi: boolean;
    hasEasBuild: boolean;
    hasFastlane: boolean;
  
    hasEslint: boolean;
    hasPrettier: boolean;
    hasHusky: boolean;
    hasLintStaged: boolean;
    hasCommitlint: boolean;
  
    hasRecharts: boolean;
    hasReactTable: boolean;
    hasDateFns: boolean;
    hasI18next: boolean;
    hasAsyncStorage: boolean;
    hasExpoSecureStore: boolean;
    hasReanimated: boolean;
    hasWebsocket: boolean;
    hasBullmq: boolean;
    hasFirebasePush: boolean;
    hasSwagger: boolean;
  
    envPrefix: string;
    frontendFramework: string | null;
    activePluginIds: string[];
    monorepoTool: string | null;
  
    deployment: string[];
  }
  
  export interface PackageJsonLocation {
    path: string;
    target: Target;
    name: string;
  }
  
  export interface FileEntry {
    path: string;
    content: string;
  }
  
  export interface LayoutStrategy {
    name: string;
    resolvePath(relativePath: string, target: Target, context?: TemplateContext): string;
    scaffold(projectName: string, context: TemplateContext): string[];
    rootConfig(context: TemplateContext): FileEntry[];
    packageJsonTargets(context: TemplateContext): PackageJsonLocation[];
    previewTree(context: TemplateContext): string;
  }
  
  export interface GeneratorOptions {
    projectName: string;
    outputDir: string;
    answers: WizardAnswers;
    activePlugins: Plugin[];
    dryRun?: boolean;
    skipInstall?: boolean;
    skipGit?: boolean;
  }
  
  export interface GeneratorResult {
    outputDir: string;
    filesWritten: string[];
    packagesInstalled: boolean;
    gitInitialized: boolean;
    errors: string[];
    warnings: string[];
  }
  
  export interface MergedDependencies {
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
  }
  
  export interface MergedScripts {
    scripts: Record<string, string>;
  }
  
  export interface ReviewData {
    projectName: string;
    structure: string;
    packageManager: string;
    sections: ReviewSection[];
    folderTree: string;
    packages: ReviewPackages;
    envVars: ReviewEnvVars;
    scripts: ReviewScripts;
    conflicts: string[];
    warnings: string[];
  }
  
  export interface ReviewSection {
    title: string;
    items: ReviewItem[];
  }
  
  export interface ReviewItem {
    label: string;
    value: string;
  }
  
  export interface ReviewPackages {
    total: number;
    groups: {
      label: string;
      count: number;
      packages: string[];
    }[];
  }
  
  export interface ReviewEnvVars {
    groups: {
      label: string;
      vars: { key: string; comment: string }[];
    }[];
  }
  
  export interface ReviewScripts {
    groups: {
      label: string;
      scripts: { name: string; command: string; description?: string }[];
    }[];
  }