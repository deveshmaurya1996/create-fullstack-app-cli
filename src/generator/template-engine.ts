import Handlebars from 'handlebars';
import fs from 'node:fs';
import type { TemplateContext } from '../shared/types.js';
import { TemplateRenderError } from '../shared/errors.js';
import { registerHandlebarsHelpers } from './handlebars-helpers.js';

let helpersRegistered = false;

function ensureHelpers(): void {
  if (!helpersRegistered) {
    registerHandlebarsHelpers(Handlebars);
    helpersRegistered = true;
  }
}

const templateCache = new Map<string, HandlebarsTemplateDelegate>();

export function renderTemplate(
  templatePath: string,
  context: TemplateContext
): string {
  ensureHelpers();

  try {
    let compiledTemplate = templateCache.get(templatePath);

    if (!compiledTemplate) {
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      compiledTemplate = Handlebars.compile(templateSource, {
        noEscape: true,
        strict: false,
      });
      templateCache.set(templatePath, compiledTemplate);
    }

    const result = compiledTemplate(context);
    return result;
  } catch (error) {
    throw new TemplateRenderError(templatePath, error as Error);
  }
}

export function renderTemplateString(
  templateSource: string,
  context: TemplateContext
): string {
  ensureHelpers();

  try {
    const compiled = Handlebars.compile(templateSource, {
      noEscape: true,
      strict: false,
    });
    return compiled(context);
  } catch (error) {
    throw new TemplateRenderError('<inline>', error as Error);
  }
}

export function clearTemplateCache(): void {
  templateCache.clear();
}

export function registerPartial(name: string, templatePath: string): void {
  const source = fs.readFileSync(templatePath, 'utf-8');
  Handlebars.registerPartial(name, source);
}