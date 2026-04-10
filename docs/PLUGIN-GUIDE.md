# Plugin guide (stub)

Authoring plugins is not fully wired yet. This guide will cover:

- `meta.ts`: id, category, `showWhen`, `requires`, `conflicts`, dependencies, env vars
- `file-map.ts`: output paths, template names, conditional includes
- Templates: Handlebars context, helpers, auth/backend flags
- Validation: registry load checks, conflict and dependency resolution

**For now:** use [TARGET-REPOSITORY-STRUCTURE.md](./TARGET-REPOSITORY-STRUCTURE.md) for folder layout and categories. Generation runs through `src/generator/` (pipeline, layouts, Handlebars) and `src/plugins/**` (meta + file-map + templates).
