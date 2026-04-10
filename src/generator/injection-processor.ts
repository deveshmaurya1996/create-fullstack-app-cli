import type {TemplateContext, Plugin } from '../shared/types.js';
import { renderTemplate } from './template-engine.js';
import { logger } from '../shared/logger.js';
import path from 'node:path';

interface PendingInjection {
  targetFile: string;
  marker: string;
  content: string;
  pluginId: string;
}

export class InjectionProcessor {
  private pendingInjections: PendingInjection[] = [];

  collectInjections(
    plugins: Plugin[],
    context: TemplateContext,
    pathResolver: (relativePath: string, target: string) => string
  ): void {
    this.pendingInjections = [];

    for (const plugin of plugins) {
      for (const injection of plugin.fileMap.injections) {
        if (injection.when && !injection.when(context)) {
          continue;
        }

        const templatePath = path.join(plugin.templateDir, injection.template);
        const content = renderTemplate(templatePath, context);

        const resolvedTargetFile = pathResolver(injection.targetFile, injection.target);

        this.pendingInjections.push({
          targetFile: resolvedTargetFile,
          marker: injection.marker,
          content: content.trim(),
          pluginId: plugin.meta.id,
        });
      }
    }

    logger.debug(`Collected ${this.pendingInjections.length} injection(s)`);
  }

  applyInjections(filePath: string, fileContent: string): string {
    const injectionsForFile = this.pendingInjections.filter(
      (inj) => inj.targetFile === filePath
    );

    if (injectionsForFile.length === 0) {
      return fileContent;
    }

    let result = fileContent;

    const byMarker = new Map<string, PendingInjection[]>();
    for (const injection of injectionsForFile) {
      if (!byMarker.has(injection.marker)) {
        byMarker.set(injection.marker, []);
      }
      byMarker.get(injection.marker)!.push(injection);
    }

    for (const [marker, injections] of byMarker) {
      if (!result.includes(marker)) {
        logger.warn(
          `Injection marker "${marker}" not found in "${filePath}" ` +
          `(plugins: ${injections.map((i) => i.pluginId).join(', ')})`
        );
        continue;
      }

      const uniqueContents = [...new Set(injections.map((i) => i.content))];
      const injectedContent = uniqueContents.join('\n');

      const markerLine = result.split('\n').find((line) => line.includes(marker));
      const indent = markerLine ? markerLine.match(/^(\s*)/)?.[1] || '' : '';

      const indentedContent = injectedContent
        .split('\n')
        .map((line) => (line.trim() ? `${indent}${line}` : line))
        .join('\n');

      result = result.replace(marker, `${indentedContent}\n${indent}${marker}`);

      logger.debug(
        `Injected ${uniqueContents.length} block(s) at "${marker}" in "${filePath}"`
      );
    }

    return result;
  }

  cleanMarkers(fileContent: string): string {
    return fileContent
      .split('\n')
      .filter((line) => {
        const trimmed = line.trim();
        return !(
          trimmed.startsWith('// ROUTE_IMPORTS') ||
          trimmed.startsWith('// ROUTE_REGISTRATIONS') ||
          trimmed.startsWith('// MIDDLEWARE_IMPORTS') ||
          trimmed.startsWith('// MIDDLEWARE_REGISTRATIONS') ||
          trimmed.startsWith('// PROVIDER_IMPORTS') ||
          trimmed.startsWith('{/* PROVIDER_WRAPPERS_START */}') ||
          trimmed.startsWith('{/* PROVIDER_WRAPPERS_END */}') ||
          trimmed.startsWith('// PLUGIN_IMPORTS') ||
          trimmed.startsWith('// PLUGIN_REGISTRATIONS') ||
          trimmed.startsWith('// MODULE_IMPORTS') ||
          trimmed.startsWith('// MODULE_REGISTRATIONS')
        );
      })
      .join('\n');
  }

  getPendingCount(): number {
    return this.pendingInjections.length;
  }

  getInjectionsForFile(filePath: string): PendingInjection[] {
    return this.pendingInjections.filter((inj) => inj.targetFile === filePath);
  }

  getAllTargetFiles(): string[] {
    return [...new Set(this.pendingInjections.map((inj) => inj.targetFile))];
  }

  clear(): void {
    this.pendingInjections = [];
  }
}