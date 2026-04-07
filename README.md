# create-fullstack-app

Interactive CLI that scaffolds modern full-stack projects: pick your structure, frameworks, data layer, auth, DevOps, and optional AI hooks, then get a working repo with sensible defaults.

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

The wizard asks for a **project name** (a new folder with that name is created in the current working directory, unless you choose to install into an existing folder). Your last choices are saved locally so the next run can **reuse or reset** them.

## What you get

- **Layouts** — Monorepo (apps + packages), single repo, or microservices-style backends; optional Turborepo, Nx, or a basic workspace.
- **Project types** — SaaS, API-only, admin dashboard, mobile, or full web + API product flows (options depend on structure).
- **Package manager** — npm, pnpm, yarn, or bun.
- **Web frontends** — Next.js, Vite (React), Remix, Astro, SvelteKit, Vue (Vite), or none.
- **Mobile** — Expo (React Native), React Native (CLI), or Flutter.
- **Styling & UI** — Tailwind CSS, Shadcn UI, Material UI, Chakra UI, Ant Design, Styled Components, or vanilla CSS.
- **Client state & data** — React Query, Zustand, Redux Toolkit, Jotai, MobX, or none; forms (e.g. React Hook Form); HTTP/tRPC/GraphQL clients; optional extras (charts, tables, animation, dates, icons).
- **Backends** — NestJS, Express, Fastify, FastAPI, Hono, Koa, Django, or Spring Boot (when you include a backend).
- **APIs** — REST, tRPC, GraphQL, or gRPC where applicable; backend-specific utilities (validation, OpenAPI, CORS, security, rate limits).
- **Data** — Databases (e.g. PostgreSQL, MySQL, MongoDB, SQLite, Redis); ORMs such as Prisma, Drizzle, TypeORM, SQLModel, Django ORM, Spring Data JPA, etc., depending on stack.
- **Auth** — JWT, NextAuth, Clerk, Auth0, Firebase, Supabase, plus features like email/password, OAuth providers, RBAC, sessions.
- **Quality & testing** — ESLint, Prettier, Husky, lint-staged, Commitlint, EditorConfig; Jest, Vitest, Cypress, Playwright.
- **Ops & deploy** — Docker, Docker Compose, Kubernetes, GitHub Actions, CI/CD placeholders; deployment hints (Vercel, AWS, Railway, Render, and others).
- **Advanced backend** — Caching, job queues, schedulers, WebSockets, queues, CDN-oriented setup where relevant.
- **AI (optional)** — OpenAI-oriented integration package options (e.g. chat, image, vector DB) when selected.
- **Docker artifacts** — Generated when you opt into Docker / Compose in the wizard.

Generated code is meant as a **starting point**: install dependencies, run the dev scripts shown at the end, and adjust env vars and cloud resources for your environment.

## Using an existing folder

If a directory with the chosen project name already exists, the CLI offers to **open the wizard again** (edit choices) or **proceed** and merge/overwrite files—use proceed only when you intend to update that folder.

## Requirements

Use a current **Node.js** LTS or Current release (the CLI and generated stacks expect modern Node features).

## Links

- **Developer:** [Devesh Maurya](https://devesh-maurya-portfolio.vercel.app/)
- **Dartix:** [dartix.live](https://www.dartix.live/)
- **Blog (internals, git, npm releases):** [create-fullstack-app write-up](https://devesh-maurya-portfolio.vercel.app/blog/building-create-fullstack-app-cli)

## Changelog

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
