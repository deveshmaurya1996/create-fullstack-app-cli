export class CLIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CLIError';
  }
}

export class PluginConflictError extends CLIError {
  public readonly pluginA: string;
  public readonly pluginB: string;

  constructor(pluginA: string, pluginB: string) {
    super(`Plugin "${pluginA}" conflicts with "${pluginB}". They cannot be used together.`);
    this.name = 'PluginConflictError';
    this.pluginA = pluginA;
    this.pluginB = pluginB;
  }
}

export class MissingDependencyError extends CLIError {
  public readonly plugin: string;
  public readonly missingDeps: string[];

  constructor(plugin: string, missingDeps: string[]) {
    super(
      `Plugin "${plugin}" requires the following plugins to be active: ${missingDeps.join(', ')}`
    );
    this.name = 'MissingDependencyError';
    this.plugin = plugin;
    this.missingDeps = missingDeps;
  }
}

export class TemplateRenderError extends CLIError {
  public readonly templatePath: string;
  public readonly originalError: Error;

  constructor(templatePath: string, originalError: Error) {
    super(`Failed to render template "${templatePath}": ${originalError.message}`);
    this.name = 'TemplateRenderError';
    this.templatePath = templatePath;
    this.originalError = originalError;
  }
}

export class FileWriteError extends CLIError {
  public readonly filePath: string;
  public readonly originalError: Error;

  constructor(filePath: string, originalError: Error) {
    super(`Failed to write file "${filePath}": ${originalError.message}`);
    this.name = 'FileWriteError';
    this.filePath = filePath;
    this.originalError = originalError;
  }
}

export class ValidationError extends CLIError {
  public readonly validationErrors: string[];

  constructor(message: string, validationErrors: string[]) {
    super(`${message}:\n${validationErrors.map((e) => `  - ${e}`).join('\n')}`);
    this.name = 'ValidationError';
    this.validationErrors = validationErrors;
  }
}

export class PluginLoadError extends CLIError {
  public readonly pluginId: string;
  public readonly originalError: Error;

  constructor(pluginId: string, originalError: Error) {
    super(`Failed to load plugin "${pluginId}": ${originalError.message}`);
    this.name = 'PluginLoadError';
    this.pluginId = pluginId;
    this.originalError = originalError;
  }
}

export class LayoutError extends CLIError {
  public readonly layoutName: string;

  constructor(layoutName: string, message: string) {
    super(`Layout "${layoutName}": ${message}`);
    this.name = 'LayoutError';
    this.layoutName = layoutName;
  }
}