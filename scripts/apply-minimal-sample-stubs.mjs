/**
 * Replaces bare scaffold stubs (`export {}`) with tiny sample implementations.
 * Does not modify plugin packs (src/plugins/** except top-level *.ts), run-wizard, etc.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const src = path.join(root, "src");

function isBareStub(text) {
  return (
    text.includes("scaffolded; wire up per docs/structure.md") &&
    /export\s*\{\s*\}\s*;?\s*$/m.test(text.trim())
  );
}

function posix(p) {
  return p.split(path.sep).join("/");
}

/** @type {Record<string, string>} */
const exact = {
  "src/cli/review.ts": `/** Sample — summary before generate (wire to wizard later) */
export function formatReviewPlaceholder(): string {
  return "Review (sample)";
}
`,
  "src/cli/navigation.ts": `/** Sample — wizard phase navigation */
export type SampleNavPhase = "intro" | "stack" | "review";

export function sampleNextPhase(p: SampleNavPhase): SampleNavPhase {
  if (p === "intro") return "stack";
  if (p === "stack") return "review";
  return "review";
}
`,
  "src/cli/prompt-runner.ts": `/** Sample — central place to wrap inquirer later */
export async function samplePrompt<T>(value: T): Promise<T> {
  return value;
}
`,
  "src/cli/ui/colors.ts": `import chalk from "chalk";

/** Sample — thin chalk wrapper */
export const sampleHighlight = (s: string): string => chalk.cyan(s);
`,
  "src/cli/ui/spinner.ts": `/** Sample — swap for ora when integrated */
export async function sampleSpinner<T>(label: string, run: () => Promise<T>): Promise<T> {
  console.log(label + " …");
  return run();
}
`,
  "src/cli/ui/tree.ts": `/** Sample lines for folder previews */
export function sampleTreeLines(rootLabel: string): string[] {
  return [rootLabel, "├── …"];
}
`,
  "src/cli/ui/table.ts": `/** Sample plain-text table */
export function sampleTable(rows: string[][]): string {
  return rows.map((r) => r.join(" | ")).join("\\n");
}
`,
  "src/cli/ui/banner.ts": `/** Sample banner */
export function sampleBanner(title: string): string {
  return "── " + title + " ──";
}
`,
  "src/commands/create.ts": `/** Sample — default command (real entry is src/index.ts today) */
export function sampleCreateCommand(): void {
  console.log("create (sample stub)");
}
`,
  "src/commands/add-plugin.ts": `/** Sample — scaffold a plugin folder later */
export function sampleAddPluginCommand(name: string): void {
  console.log("add-plugin (sample):", name);
}
`,
  "src/commands/list-plugins.ts": `/** Sample — list registry later */
export function sampleListPluginsCommand(): void {
  console.log("list-plugins (sample stub)");
}
`,
  "src/shared/constants.ts": `/** Sample constants */
export const SAMPLE_CLI_VERSION = "0.0.0-sample";
`,
  "src/shared/logger.ts": `/** Sample internal logger */
export const sampleLog = (...args: unknown[]): void => {
  console.error("[create-fullstack-app]", ...args);
};
`,
  "src/shared/errors.ts": `/** Sample error type */
export class SampleCliError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SampleCliError";
  }
}
`,
  "src/shared/types.ts": `/** Sample shared shape for generated files */
export type SampleFileEntry = { path: string; body: string };
`,
  "src/shared/utils.ts": `/** Sample string helper */
export function sampleKebabCase(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/\\s+/g, "-");
}
`,
  "src/layouts/types.ts": `/** Sample layout discriminator */
export type SampleLayoutId = "single-app" | "monorepo" | "microservices";
`,
  "src/layouts/index.ts": `import type { SampleLayoutId } from "./types.js";

/** Sample factory — delegate to real strategies later */
export function sampleGetLayout(id: SampleLayoutId): SampleLayoutId {
  return id;
}
`,
  "src/layouts/single-app.ts": `/** Sample marker for single-app layout */
export const sampleSingleAppLayout = "single-app";
`,
  "src/layouts/monorepo.ts": `/** Sample marker for monorepo layout */
export const sampleMonorepoLayout = "monorepo";
`,
  "src/layouts/microservices.ts": `/** Sample marker for microservices layout */
export const sampleMicroservicesLayout = "microservices";
`,
  "src/layouts/helpers/path-utils.ts": `/** Sample path normalizer */
export function sampleNormPath(p: string): string {
  return p.replace(/\\\\/g, "/").replace(/\\/+/g, "/");
}
`,
  "src/layouts/helpers/package-json-builder.ts": `/** Sample package.json fragment */
export function samplePkgName(name: string): { name: string } {
  return { name };
}
`,
  "src/generator/index.ts": `/** Sample — generation orchestration entry */
export async function sampleGenerate(): Promise<void> {
  /* wire pipeline later */
}
`,
  "src/generator/context.ts": `/** Sample template context */
export type SampleTemplateContext = Record<string, unknown>;

export function sampleBuildContext(): SampleTemplateContext {
  return {};
}
`,
  "src/generator/pipeline.ts": `/** Sample pipeline step */
export async function sampleRunPipelineStep(name: string): Promise<void> {
  console.log("pipeline step (sample):", name);
}
`,
  "src/generator/file-writer.ts": `/** Sample file write (no-op) */
export async function sampleWriteFile(_path: string, _body: string): Promise<void> {
  /* TODO: fs output + conflict policy */
}
`,
  "src/generator/template-engine.ts": `/** Sample render hook */
export function sampleRenderTemplate(_template: string, _ctx: unknown): string {
  return "";
}
`,
  "src/generator/handlebars-helpers.ts": `/** Sample helper registry */
export const sampleHandlebarsHelpers: Record<string, unknown> = {};
`,
  "src/generator/injection-processor.ts": `/** Sample marker injection */
export function sampleInjectAtMarker(_source: string, _marker: string, _chunk: string): string {
  return _source;
}
`,
  "src/generator/dependency-resolver.ts": `/** Sample merged deps */
export function sampleMergeDeps(a: Record<string, string>, b: Record<string, string>): Record<string, string> {
  return { ...a, ...b };
}
`,
  "src/generator/script-builder.ts": `/** Sample merged scripts */
export function sampleMergeScripts(a: Record<string, string>, b: Record<string, string>): Record<string, string> {
  return { ...a, ...b };
}
`,
  "src/generator/env-builder.ts": `/** Sample .env.example line */
export function sampleEnvLine(key: string, value: string): string {
  return key + "=" + value;
}
`,
  "src/generator/package-json-generator.ts": `/** Sample minimal package.json text */
export function samplePackageJsonString(name: string): string {
  return JSON.stringify({ name, version: "0.0.0", private: true }, null, 2);
}
`,
  "src/generator/readme-generator.ts": `/** Sample README body */
export function sampleReadme(title: string): string {
  return "# " + title + "\\n\\n(sample)";
}
`,
  "src/generator/gitignore-generator.ts": `/** Sample ignore lines */
export function sampleGitignoreLines(): string[] {
  return ["node_modules/", "dist/"];
}
`,
  "src/generator/post-generate.ts": `/** Sample post steps */
export async function samplePostGenerate(): Promise<void> {
  /* e.g. git init */
}
`,
  "src/generator/validators/plugin-compatibility.ts": `/** Sample compatibility check */
export function sampleCheckCompatibility(): boolean {
  return true;
}
`,
  "src/generator/validators/file-collision.ts": `/** Sample collision check */
export function sampleCheckCollisions(paths: string[]): boolean {
  return new Set(paths).size === paths.length;
}
`,
  "src/generator/validators/env-completeness.ts": `/** Sample env check */
export function sampleEnvComplete(keys: string[]): boolean {
  return keys.length > 0;
}
`,
};

function main() {
  let n = 0;
  for (const [rel, content] of Object.entries(exact)) {
    const abs = path.join(root, ...rel.split("/"));
    if (!fs.existsSync(abs)) continue;
    const prev = fs.readFileSync(abs, "utf8");
    if (!isBareStub(prev)) continue;
    fs.writeFileSync(abs, content, "utf8");
    n++;
  }
  console.log("apply-minimal-sample-stubs: updated", n, "files");
}

main();
