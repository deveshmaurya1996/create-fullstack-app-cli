import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from '../shared/types.js';
import { ValidationError } from '../shared/errors.js';
import { logger } from '../shared/logger.js';

export interface PluginValidationResult {
  pluginId: string;
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validatePlugin(plugin: Plugin): PluginValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const { meta, fileMap, templateDir } = plugin;

  // Validate meta
  if (!meta.id || typeof meta.id !== 'string') {
    errors.push('meta.id is required and must be a string');
  }

  if (!meta.label || typeof meta.label !== 'string') {
    errors.push('meta.label is required and must be a string');
  }

  if (!meta.description || typeof meta.description !== 'string') {
    errors.push('meta.description is required and must be a string');
  }

  if (!meta.category) {
    errors.push('meta.category is required');
  }

  if (!meta.platformSupport) {
    errors.push('meta.platformSupport is required');
  }

  if (typeof meta.showWhen !== 'function') {
    errors.push('meta.showWhen must be a function');
  }

  if (!Array.isArray(meta.deps)) {
    errors.push('meta.deps must be an array');
  } else {
    for (const dep of meta.deps) {
      if (!dep.name || !dep.version) {
        errors.push(`Invalid dependency: ${JSON.stringify(dep)} — must have name and version`);
      }
    }
  }

  if (!Array.isArray(meta.devDeps)) {
    errors.push('meta.devDeps must be an array');
  }

  if (!Array.isArray(meta.envVars)) {
    errors.push('meta.envVars must be an array');
  } else {
    for (const envVar of meta.envVars) {
      if (!envVar.key || !envVar.target) {
        errors.push(`Invalid envVar: ${JSON.stringify(envVar)} — must have key and target`);
      }
    }
  }

  if (!Array.isArray(meta.scripts)) {
    errors.push('meta.scripts must be an array');
  }

  if (!Array.isArray(meta.conflicts)) {
    errors.push('meta.conflicts must be an array');
  }

  if (!Array.isArray(meta.requires)) {
    errors.push('meta.requires must be an array');
  }

  // Validate file map
  if (!fileMap || !Array.isArray(fileMap.files)) {
    errors.push('fileMap.files must be an array');
  } else {
    for (const entry of fileMap.files) {
      if (!entry.template || !entry.outputPath || !entry.target) {
        errors.push(
          `Invalid file map entry: ${JSON.stringify(entry)} — must have template, outputPath, target`
        );
      }

      // Check template file exists
      if (entry.template && templateDir) {
        const templatePath = path.join(templateDir, entry.template);
        if (!fs.existsSync(templatePath)) {
          warnings.push(`Template file not found: ${templatePath}`);
        }
      }
    }
  }

  if (!fileMap || !Array.isArray(fileMap.injections)) {
    errors.push('fileMap.injections must be an array');
  } else {
    for (const injection of fileMap.injections) {
      if (!injection.template || !injection.targetFile || !injection.marker || !injection.target) {
        errors.push(
          `Invalid injection entry: ${JSON.stringify(injection)} — must have template, targetFile, marker, target`
        );
      }
    }
  }

  return {
    pluginId: meta.id,
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateAllPlugins(plugins: Plugin[]): PluginValidationResult[] {
  const results: PluginValidationResult[] = [];

  for (const plugin of plugins) {
    const result = validatePlugin(plugin);
    results.push(result);

    if (!result.valid) {
      logger.error(`Plugin "${result.pluginId}" validation failed:`);
      for (const err of result.errors) {
        logger.error(`  - ${err}`);
      }
    }

    if (result.warnings.length > 0) {
      logger.warn(`Plugin "${result.pluginId}" warnings:`);
      for (const warn of result.warnings) {
        logger.warn(`  - ${warn}`);
      }
    }
  }

  return results;
}

export function assertAllPluginsValid(plugins: Plugin[]): void {
  const results = validateAllPlugins(plugins);
  const invalid = results.filter((r) => !r.valid);

  if (invalid.length > 0) {
    throw new ValidationError(
      `${invalid.length} plugin(s) failed validation`,
      invalid.flatMap((r) => r.errors.map((e) => `[${r.pluginId}] ${e}`))
    );
  }
}