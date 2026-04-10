import path from 'node:path';
import type { GeneratorOptions, GeneratorResult, WizardAnswers, Plugin } from '../shared/types.js';
import { runPipeline } from './pipeline.js';

export async function generate(
  answers: WizardAnswers,
  activePlugins: Plugin[],
  options: {
    outputDir?: string;
    dryRun?: boolean;
    skipInstall?: boolean;
    skipGit?: boolean;
  } = {}
): Promise<GeneratorResult> {
  const outputDir = options.outputDir || path.resolve(process.cwd(), answers.projectName);

  const generatorOptions: GeneratorOptions = {
    projectName: answers.projectName,
    outputDir,
    answers,
    activePlugins,
    dryRun: options.dryRun,
    skipInstall: options.skipInstall,
    skipGit: options.skipGit,
  };

  return runPipeline(generatorOptions);
}

export { buildContext } from './context.js';
export { renderTemplate, renderTemplateString, clearTemplateCache } from './template-engine.js';
export { runPipeline } from './pipeline.js';