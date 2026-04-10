
export type {
  PluginMeta,
  PluginFileMap,
  FileMapEntry,
  InjectionEntry,
  Plugin,
  EnvVar,
  ScriptEntry,
  PluginDependency,
  ShowWhenFn,
  WhenFn,
  PlatformSupport,
  PluginCategory,
} from '../shared/types.js';

export interface PluginDefinition {
  meta: import('../shared/types.js').PluginMeta;
  fileMap: import('../shared/types.js').PluginFileMap;
}

export interface PluginRegistryEntry {
  plugin: import('../shared/types.js').Plugin;
  loaded: boolean;
}

export interface PluginQuery {
  category?: import('../shared/types.js').PluginCategory;
  platformSupport?: import('../shared/types.js').PlatformSupport;
  ids?: string[];
}