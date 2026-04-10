# create-fullstack-app

Interactive CLI that scaffolds modern full-stack projects: you choose structure, frameworks, data layer, auth, DevOps, and extras; the tool emits a working repo with sensible defaults.

Under the hood, generation is **plugin-driven**: each stack piece (frontend, backend, auth, testing, and so on) contributes metadata, optional dependencies, and Handlebars templates. **Layouts** (single app, monorepo, microservices) decide where files land and how many `package.json` targets exist. The wizard collects answers, resolves active plugins, runs compatibility checks, then writes files through one pipeline—so new combinations are added by extending plugins rather than one-off scripts.

## Quick start

From the directory where you want the new project folder to appear:

```bash
npx @dartix-software-solutions/create-fullstack-app@latest
```

Or with npm’s create initializer (same package):

```bash
npm create @dartix-software-solutions/fullstack-app@latest
```

You can also install globally:

```bash
npm install -g @dartix-software-solutions/create-fullstack-app
create-fullstack-app
```

The wizard asks for a **project name** and walks the prompts. Use **`--yes`** (`-y`) to accept defaults where supported. The target folder must be **missing or empty**; if it already has files, the CLI exits with an error so you do not accidentally overwrite a non-empty tree.

## What you get

- **Layouts** — Monorepo (apps + packages), single repo, or a microservices-oriented tree; optional Turborepo, Nx, or a basic workspace where applicable.
- **Project types** — Flows such as SaaS, API-only, admin, mobile, or full web + API (choices depend on structure and scope).
- **Package manager** — npm, pnpm, yarn, or bun.
- **Web frontends** — Next.js, Vite (React), Remix, Astro, SvelteKit, Vue (Vite), or none.
- **Mobile** — Expo (React Native), React Native (CLI), or Flutter; **Expo defaults to Expo Router**, **React Native CLI defaults to React Navigation** (you can switch navigation in the wizard when both are offered).
- **Styling & UI** — Tailwind, Shadcn UI, Material UI, Chakra UI, Ant Design, Styled Components, or vanilla CSS (per stack).
- **Client state & data** — React Query, Zustand, Redux Toolkit, Jotai, MobX, or none; forms; HTTP / tRPC / GraphQL clients; optional extras (charts, tables, motion, dates, icons).
- **Backends** — NestJS, Express, Fastify, FastAPI, Hono, Koa, Django, Spring Boot, and others when you include a backend.
- **APIs** — REST, tRPC, GraphQL, or gRPC where the backend supports it; utilities such as validation, OpenAPI, CORS, security headers, rate limits.
- **Data** — Databases (e.g. PostgreSQL, MySQL, MongoDB, SQLite, Redis); ORMs (Prisma, Drizzle, TypeORM, Mongoose, Django ORM, etc.) depending on stack.
- **Auth** — JWT, NextAuth, Clerk, Auth0, Firebase, Supabase, Lucia, and more, with feature-oriented options where relevant.
- **Quality & testing** — ESLint, Prettier, Husky, lint-staged, Commitlint, EditorConfig; Jest, Vitest, Cypress, Playwright, Detox, and related plugins.
- **Ops & deploy** — Docker, Compose, Kubernetes hints, GitHub Actions, deployment targets (Vercel, AWS, Railway, Render, etc.) when selected.
- **Advanced backend** — Queues, cron, email, uploads, WebSockets, Swagger, and other backend-extras plugins.
- **AI (optional)** — Plugins that add OpenAI- or cloud-oriented env vars and starter wiring when chosen.

Output is a **starting point**: install dependencies, follow the printed next steps and `README` in the generated project, and fill in `.env` for your environment.

## Requirements

**Node.js 18+** (CLI and many generated stacks assume a modern runtime).

## Links

- **Developer:** [Devesh Maurya](https://devesh-maurya-portfolio.vercel.app/)
- **Dartix:** [dartix.live](https://www.dartix.live/)
- **Blog (internals, git, npm releases):** [create-fullstack-app write-up](https://devesh-maurya-portfolio.vercel.app/blog/building-create-fullstack-app-cli)

## Changelog

### 0.1.4

- Pluggable generator: layouts + plugin `meta` / `file-map` / Handlebars templates; wizard wired to `generate()`.
- README aligned with current CLI behavior (empty target directory; mobile navigation defaults).

### 0.1.1

- Documentation: full npm README (install, features, usage).
- Packaging: `README.md` listed in `package.json` `files` so it is always included in the published tarball.
- Repo: root `.gitignore` for Node/TypeScript builds.
- CI: GitHub Action to publish to npm on version tags (`v*`), with a check that the git tag matches `package.json` `version`.

### 0.1.0

- Initial public release of the interactive full-stack scaffolding CLI.

## License

MIT

---

Package on npm: [`@dartix-software-solutions/create-fullstack-app`](https://www.npmjs.com/package/@dartix-software-solutions/create-fullstack-app) · [Developer](https://devesh-maurya-portfolio.vercel.app/) · [Dartix](https://www.dartix.live/)
