# Target repository structure (vision)

This document is the **north-star layout** for `create-fullstack-app` as a **plugin + layout + template-engine** tool. The **current** codebase uses that architecture for generation (`src/generator/`, `src/plugins/`, `src/layouts/`) plus the wizard under `src/cli/`.

- **Current vs target:** see [Current state](#current-state-today) below.
- **Wizard behavior today:** [WIZARD-ARCHITECTURE.md](./WIZARD-ARCHITECTURE.md)

Paste artifacts in the original sketch (duplicate tree restart, merged lines like `file-map.ts│`) are corrected here.

---

## Current state (today)

| Area | Today |
|------|--------|
| CLI entry | `src/index.ts` → build to `dist/index.js`; `package.json` `bin` may point at `bin/create-fullstack-app.js` (thin wrapper) |
| Wizard | `src/cli/run-wizard.ts`, `prompt-definitions.ts`, `visibility.ts`, `build-answers.ts` |
| Choices | `src/cli/choices-registry.ts` (static lists, not plugin registry) |
| Generation | `src/setup/*.ts` (spawn commands, write files), not Handlebars plugin pipeline |
| Plugins | **Not present** as `src/plugins/**` |
| Layouts | Logic spread across `paths.ts`, `structure.ts`, `monorepo.ts`, etc., not `src/layouts/*` |
| Tests / examples | No `tests/` or `examples/` tree yet |

---

## Target root layout

```text
create-fullstack-app/
├── package.json
├── tsconfig.json
├── tsconfig.build.json          # optional: split from dev tsconfig when needed
├── README.md
├── CONTRIBUTING.md
├── .gitignore
├── .prettierrc                  # when adopted
├── .eslintrc.cjs                # when adopted
├── .husky/                      # when adopted (dogfood)
│   └── pre-commit
├── bin/
│   └── create-fullstack-app.js  # #!/usr/bin/env node → loads dist CLI
│
├── src/
│   ├── index.ts                 # CLI bootstrap; delegates to run-wizard / commands
│   ├── cli/                     # wizard UX (phases, review, navigation)
│   ├── plugins/                 # plugin packs: meta + file-map + templates
│   ├── layouts/                 # monorepo / single-app / microservices strategies
│   ├── generator/               # template engine, merges, injections, writers
│   ├── shared/                  # types, errors, utils used across layers
│   └── commands/                # optional: add-plugin, list-plugins, …
│
├── templates/                   # global templates (gitignore shells, readme parts, workspace files)
├── tests/                       # unit, integration, snapshot, e2e, fixtures
├── scripts/                     # codegen: plugin catalog, validate plugins, …
├── examples/                    # checked-in sample outputs (optional)
└── docs/
    ├── WIZARD-ARCHITECTURE.md
    ├── TARGET-REPOSITORY-STRUCTURE.md   # this file
    ├── PLUGIN-GUIDE.md
    ├── LAYOUT-GUIDE.md
    ├── TEMPLATE-GUIDE.md
    ├── DECISION-TREE.md
    ├── PLUGIN-CATALOG.md # can be generated
    └── MOBILE-FLOW.md
```

---

## Target `src/cli/` (wizard layer)

| File | Responsibility |
|------|------------------|
| `types.ts` | `WizardAnswer`, `WizardDraft`, `Phase`, `PromptDef`, … |
| `run-wizard.ts` | Phase loop: collect → validate → review |
| `prompt-definitions.ts` | Declarative prompts; choices may reference plugin registry |
| `prompt-runner.ts` | Inquirer wrapper: errors, back, skip, uniform UX |
| `build-answers.ts` | Raw draft → normalized `WizardAnswer` |
| `visibility.ts` | Should this question show? (single source of truth) |
| `choices-registry.ts` | Resolve options from registry + `showWhen` / category |
| `review.ts` | Summary screen before generate |
| `navigation.ts` | Back / forward / restart / jump-to-phase |
| `ui/*` | `colors`, `spinner`, `tree`, `table`, `banner` |

---

## Target `src/plugins/` (plugin packs)

Each **plugin** is a folder with:

- `meta.ts` — id, category, `showWhen`, `requires`, `conflicts`, deps, env hints
- `file-map.ts` — target paths + template names + conditions
- `templates/**` — Handlebars (or other) templates, optionally `.hbs`

### Plugin categories (index)

| Category | Examples |
|----------|----------|
| `frontends/web` | `react-vite`, `next`, `vue`, `svelte`, `angular` |
| `frontends/mobile` | `expo`, `react-native-cli`, `flutter` |
| `backends` | `express`, `fastify`, `nestjs`, `hono`, `django`, … |
| `api-style` | `graphql-server`, `trpc-server` |
| `databases` | `postgres`, `mongodb`, `mysql`, `sqlite`, `redis` |
| `orms` | `prisma`, `drizzle`, `typeorm`, `mongoose` |
| `auth` | `jwt-custom`, `next-auth`, `clerk`, `lucia`, … |
| `styling` | web: `tailwind`, `styled-components`, `css-modules`; mobile: `nativewind`, … |
| `state` | `zustand`, `redux-toolkit`, `tanstack-query`, `mobx` |
| `forms` | `react-hook-form`, `formik` |
| `ui-library` | `shadcn`, `mui`, `ant-design` |
| `api-client` | `axios`, `fetch-wrapper`, `trpc-client` |
| `mobile-navigation` | `react-navigation`, `expo-router` |
| `frontend-extras` | `date-fns`, `i18next`, charts/tables (web), AsyncStorage, Reanimated, … (mobile) |
| `backend-extras` | uploads, S3, rate-limit, helmet, websocket, bullmq, email, swagger, … |
| `testing` | `vitest`, `jest`, `playwright`, `cypress`, `detox`, `maestro`, `supertest`, … |
| `logging` | `pino`, `winston` |
| `monitoring` | `sentry`, `sentry-react-native`, `datadog` |
| `devtools` | `eslint`, `prettier`, `husky`, `lint-staged`, `commitlint` |
| `devops` | `docker`, `github-actions`, `gitlab-ci`, `eas-build`, `fastlane` |
| `deployment` | `vercel`, `railway`, `aws`, `flyio`, `eas-submit` |

Deep trees (every `.hbs` file) follow the same idea as your sketch: **conditional** files for `hasAuth`, `hasBackend`, `apiStyle`, etc. Implementation can copy your detailed file lists per stack when migrating each plugin.

Supporting modules:

- `plugins/types.ts` — `PluginMeta`, `FileMapEntry`, `ShowWhenFn`, …
- `plugins/registry.ts` — load & index plugins
- `plugins/validator.ts` — validate meta + file-map at load time
- `plugins/conflict-checker.ts` — active set conflicts
- `plugins/dependency-checker.ts` — `requires` satisfaction

---

## Target `src/layouts/`

| File | Role |
|------|------|
| `types.ts` | `LayoutStrategy`: paths, `scaffold`, root configs, package.json targets, tree preview |
| `index.ts` | `getLayout(structure)` factory |
| `single-app.ts` | fe-only / be-only / full-stack (web or mobile split) |
| `monorepo.ts` | apps + packages; turbo / nx / pnpm workspaces |
| `microservices.ts` | gateway, services, shared, infra folders |
| `helpers/*` | path sanitization, package.json fragments |

---

## Target `src/generator/`

| File | Role |
|------|------|
| `index.ts` | `generate()` orchestration |
| `context.ts` | `TemplateContext` from answers + active plugins |
| `pipeline.ts` | steps + progress |
| `file-writer.ts` | disk writes, mkdir, conflict policy |
| `template-engine.ts` | Handlebars compile + cache |
| `handlebars-helpers.ts` | `eq`, `and`, `includes`, case helpers, … |
| `injection-processor.ts` | markers: `// ROUTE_IMPORTS`, etc. |
| `dependency-resolver.ts` | merge `package.json` deps |
| `script-builder.ts` | merge scripts |
| `env-builder.ts` | `.env.example` |
| `package-json-generator.ts` | full manifests per target |
| `readme-generator.ts` | stack-specific README |
| `gitignore-generator.ts` | stack-specific ignores |
| `post-generate.ts` | optional `git init`, install hint |
| `validators/*` | compatibility, file collisions, env completeness |

---

## Target `templates/` (global)

Shared shells not owned by a single plugin: `.gitignore` fragments, modular README sections, `editorconfig`, monorepo `turbo.json` / `nx` / `pnpm-workspace` bases.

---

## Target `tests/`

- `unit/` — cli, plugins, layouts, generator pieces- `integration/` — full generation to temp dir  
- `snapshot/` — golden trees for key combos  
- `e2e/` — simulated wizard + install/build  
- `fixtures/sample-answers/*.json`  
- `fixtures/expected-outputs/` (optional)  
- `fixtures/mock-plugins/` (minimal plugins for tests)

---

## Target `scripts/`

- `generate-plugin-catalog.ts` → `docs/PLUGIN-CATALOG.md`  
- `validate-all-plugins.ts`  
- `test-combinations.ts`  
- `scaffold-plugin.ts`

---

## Target `examples/`

Pre-generated reference repos (`react-vite-express-prisma`, `expo-fastify-jwt`, …) **optional**; keep small or link to external repos if size is a concern.

---

## Migration strategy (suggested phases)

1. **Docs + boundaries** — keep this file + CONTRIBUTING + plugin guide stubs aligned with reality.  
2. **Bin + packaging** — ship `bin/create-fullstack-app.js`; include `bin` in `package.json` `files`.  
3. **Extract layout interfaces** — introduce `src/layouts/*` wrapping today’s `paths` / `structure` behavior without Handlebars yet.  
4. **First plugin pilot** — one frontend (e.g. Vite) as `meta` + `file-map` + templates; run through new generator alongside old path (feature flag).  
5. **Wizard registry** — narrow `choices-registry` from static arrays to plugin-driven lists + `showWhen`.  
6. **Incremental port** — move stacks from `setup/*.ts` into plugins until old imperative path can shrink.

---

## Related

- [WIZARD-ARCHITECTURE.md](./WIZARD-ARCHITECTURE.md) — today’s prompt order and visibility rules  
- [CONTRIBUTING.md](../CONTRIBUTING.md) — how to contribute; points here for structure
