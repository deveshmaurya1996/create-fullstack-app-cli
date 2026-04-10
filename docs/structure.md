create-fullstack-app/
├── package.json
├── tsconfig.json
├── tsconfig.build.json                          ← NEW: separate build config
├── README.md
├── CONTRIBUTING.md                               ← NEW: how to add plugins
├── .gitignore
├── .prettierrc
├── .eslintrc.js
├── .husky/                                       ← NEW: dogfood our own devtools
│   └── pre-commit
├── bin/
│   └── create-fullstack-app.js                   ← NEW: CLI entry point (#!/usr/bin/env node)
│
├── src/
│   ├── index.ts                                  ← CLI bootstrap, arg parsing, calls run-wizard
│   │
│   ├── cli/
│   │   ├── types.ts                              ← WizardAnswer, WizardDraft, Phase, PromptDef
│   │   ├── run-wizard.ts                         ← Main wizard loop: phase→prompt→collect→review
│   │   ├── prompt-definitions.ts                 ← All prompt configs (question text, type, choices ref)
│   │   ├── prompt-runner.ts                      ← NEW: wraps inquirer/prompts with error handling,
│   │   │                                            back navigation, skip logic
│   │   ├── build-answers.ts                      ← Transforms raw prompt responses into WizardAnswer
│   │   ├── visibility.ts                         ← Should this question show? (checks draft state)
│   │   ├── choices-registry.ts                   ← Reads plugin registry, filters by category + showWhen
│   │   ├── review.ts                             ← Builds and renders the review screen
│   │   ├── navigation.ts                         ← NEW: back/forward/restart/jump-to-phase logic
│   │   └── ui/                                   ← NEW: CLI display utilities
│   │       ├── colors.ts                         ← chalk/picocolors wrapper
│   │       ├── spinner.ts                        ← ora wrapper for generation progress
│   │       ├── tree.ts                           ← ASCII folder tree renderer
│   │       ├── table.ts                          ← Package list table formatter
│   │       └── banner.ts                         ← Welcome banner, version display
│   │
│   ├── plugins/
│   │   ├── types.ts                              ← PluginMeta, FileMapEntry, InjectionEntry,
│   │   │                                            PluginCategory, EnvVar, ScriptEntry,
│   │   │                                            ShowWhenFn, WhenFn, PlatformSupport
│   │   ├── registry.ts                           ← Master registry: loads all plugins, indexes by
│   │   │                                            ID and category, provides query methods
│   │   ├── validator.ts                          ← NEW: validates plugin meta/file-map at load time
│   │   │                                            (catches missing templates, bad deps, etc.)
│   │   ├── conflict-checker.ts                   ← NEW: given active plugins, find conflicts
│   │   ├── dependency-checker.ts                 ← NEW: given active plugins, verify all "requires"
│   │   │                                            are satisfied, suggest missing plugins
│   │   │
│   │   ├── frontends/
│   │   │   ├── web/
│   │   │   │   ├── react-vite/
│   │   │   │   │   ├── meta.ts
│   │   │   │   │   ├── file-map.ts
│   │   │   │   │   └── templates/
│   │   │   │   │       ├── index.html.hbs
│   │   │   │   │       ├── main.tsx.hbs
│   │   │   │   │       ├── App.tsx.hbs                ← conditionals for router, providers,
│   │   │   │   │       │                                 state, query client, auth, i18n
│   │   │   │   │       ├── vite.config.ts.hbs
│   │   │   │   │       ├── tsconfig.json.hbs
│   │   │   │   │       ├── tsconfig.node.json.hbs     ← NEW: vite needs this
│   │   │   │   │       ├── pages/
│   │   │   │   │       │   ├── Home.tsx.hbs
│   │   │   │   │       │   ├── About.tsx.hbs
│   │   │   │   │       │   ├── NotFound.tsx.hbs
│   │   │   │   │       │   ├── Login.tsx.hbs           ← NEW: when hasAuth (conditional in file-map)
│   │   │   │   │       │   ├── Register.tsx.hbs        ← NEW: when hasAuth
│   │   │   │   │       │   └── Dashboard.tsx.hbs       ← NEW: when hasAuth (protected route example)
│   │   │   │   │       ├── components/
│   │   │   │   │       │   ├── Layout.tsx.hbs
│   │   │   │   │       │   ├── Navbar.tsx.hbs
│   │   │   │   │       │   ├── Footer.tsx.hbs          ← NEW
│   │   │   │   │       │   ├── ErrorBoundary.tsx.hbs
│   │   │   │   │       │   ├── ProtectedRoute.tsx.hbs  ← NEW: when hasAuth
│   │   │   │   │       │   └── LoadingSpinner.tsx.hbs  ← NEW: used by async components
│   │   │   │   │       ├── hooks/
│   │   │   │   │       │   ├── useApi.ts.hbs           ← when hasBackend
│   │   │   │   │       │   └── useAuth.ts.hbs          ← NEW: when hasAuth
│   │   │   │   │       ├── lib/
│   │   │   │   │       │   ├── config.ts.hbs
│   │   │   │   │       │   └── utils.ts.hbs            ← NEW: cn() helper, common utils
│   │   │   │   │       ├── types/
│   │   │   │   │       │   └── index.ts.hbs
│   │   │   │   │       └── router/                     ← NEW: extracted router setup
│   │   │   │   │           └── index.tsx.hbs
│   │   │   │   │
│   │   │   │   ├── next/
│   │   │   │   │   ├── meta.ts
│   │   │   │   │   ├── file-map.ts
│   │   │   │   │   └── templates/
│   │   │   │   │       ├── next.config.ts.hbs
│   │   │   │   │       ├── tsconfig.json.hbs
│   │   │   │   │       ├── middleware.ts.hbs            ← NEW: Next.js middleware (route protection)
│   │   │   │   │       ├── app/
│   │   │   │   │       │   ├── layout.tsx.hbs
│   │   │   │   │       │   ├── page.tsx.hbs
│   │   │   │   │       │   ├── loading.tsx.hbs          ← NEW: Next.js loading UI
│   │   │   │   │       │   ├── error.tsx.hbs            ← NEW: Next.js error boundary
│   │   │   │   │       │   ├── globals.css.hbs
│   │   │   │   │       │   ├── not-found.tsx.hbs
│   │   │   │   │       │   ├── about/
│   │   │   │   │       │   │   └── page.tsx.hbs
│   │   │   │   │       │   ├── login/                   ← NEW: when hasAuth
│   │   │   │   │       │   │   └── page.tsx.hbs
│   │   │   │   │       │   ├── register/                ← NEW: when hasAuth
│   │   │   │   │       │   │   └── page.tsx.hbs
│   │   │   │   │       │   ├── dashboard/               ← NEW: when hasAuth
│   │   │   │   │       │   │   └── page.tsx.hbs
│   │   │   │   │       │   └── api/
│   │   │   │   │       │       └── health/
│   │   │   │   │       │           └── route.ts.hbs
│   │   │   │   │       ├── components/
│   │   │   │   │       │   ├── Navbar.tsx.hbs
│   │   │   │   │       │   ├── Footer.tsx.hbs
│   │   │   │   │       │   └── LoadingSpinner.tsx.hbs   ← NEW
│   │   │   │   │       ├── lib/
│   │   │   │   │       │   ├── config.ts.hbs
│   │   │   │   │       │   └── utils.ts.hbs             ← NEW
│   │   │   │   │       └── types/
│   │   │   │   │           └── index.ts.hbs             ← NEW
│   │   │   │   │
│   │   │   │   ├── vue/
│   │   │   │   │   ├── meta.ts
│   │   │   │   │   ├── file-map.ts
│   │   │   │   │   └── templates/
│   │   │   │   │       ├── App.vue.hbs
│   │   │   │   │       ├── main.ts.hbs
│   │   │   │   │       ├── vite.config.ts.hbs
│   │   │   │   │       ├── tsconfig.json.hbs
│   │   │   │   │       ├── env.d.ts.hbs                 ← NEW: Vue env type declarations
│   │   │   │   │       ├── index.html.hbs
│   │   │   │   │       ├── router/                      ← NEW: Vue Router setup
│   │   │   │   │       │   └── index.ts.hbs
│   │   │   │   │       ├── pages/
│   │   │   │   │       │   ├── Home.vue.hbs
│   │   │   │   │       │   ├── About.vue.hbs
│   │   │   │   │       │   ├── NotFound.vue.hbs         ← NEW
│   │   │   │   │       │   ├── Login.vue.hbs            ← NEW: when hasAuth
│   │   │   │   │       │   └── Dashboard.vue.hbs        ← NEW: when hasAuth
│   │   │   │   │       ├── components/
│   │   │   │   │       │   ├── Layout.vue.hbs
│   │   │   │   │       │   ├── Navbar.vue.hbs
│   │   │   │   │       │   └── LoadingSpinner.vue.hbs   ← NEW
│   │   │   │   │       ├── composables/                 ← NEW: Vue composables (equivalent of hooks)
│   │   │   │   │       │   ├── useApi.ts.hbs
│   │   │   │   │       │   └── useAuth.ts.hbs
│   │   │   │   │       ├── stores/                      ← NEW: Pinia store (Vue's default state)
│   │   │   │   │       │   └── app.ts.hbs
│   │   │   │   │       └── lib/
│   │   │   │   │           └── config.ts.hbs
│   │   │   │   │
│   │   │   │   ├── svelte/
│   │   │   │   │   ├── meta.ts
│   │   │   │   │   ├── file-map.ts
│   │   │   │   │   └── templates/
│   │   │   │   │       ├── svelte.config.js.hbs         ← NEW: SvelteKit config
│   │   │   │   │       ├── vite.config.ts.hbs
│   │   │   │   │       ├── tsconfig.json.hbs
│   │   │   │   │       ├── app.html.hbs                 ← NEW: SvelteKit app shell
│   │   │   │   │       ├── app.d.ts.hbs                 ← NEW: SvelteKit types
│   │   │   │   │       ├── routes/                      ← NEW: SvelteKit uses routes/ not pages/
│   │   │   │   │       │   ├── +layout.svelte.hbs
│   │   │   │   │       │   ├── +page.svelte.hbs
│   │   │   │   │       │   ├── +error.svelte.hbs        ← NEW
│   │   │   │   │       │   ├── about/
│   │   │   │   │       │   │   └── +page.svelte.hbs
│   │   │   │   │       │   ├── login/                   ← NEW: when hasAuth
│   │   │   │   │       │   │   └── +page.svelte.hbs
│   │   │   │   │       │   └── dashboard/               ← NEW: when hasAuth
│   │   │   │   │       │       └── +page.svelte.hbs
│   │   │   │   │       ├── components/                  ← RENAMED from old structure
│   │   │   │   │       │   ├── Layout.svelte.hbs
│   │   │   │   │       │   ├── Navbar.svelte.hbs
│   │   │   │   │       │   └── LoadingSpinner.svelte.hbs
│   │   │   │   │       └── lib/                         ← SvelteKit $lib convention
│   │   │   │   │           ├── config.ts.hbs
│   │   │   │   │           └── utils.ts.hbs
│   │   │   │   │
│   │   │   │   └── angular/
│   │   │   │       ├── meta.ts
│   │   │   │       ├── file-map.ts
│   │   │   │       └── templates/
│   │   │   │           ├── angular.json.hbs
│   │   │   │           ├── tsconfig.json.hbs
│   │   │   │           ├── tsconfig.app.json.hbs        ← NEW
│   │   │   │           ├── app/
│   │   │   │           │   ├── app.component.ts.hbs
│   │   │   │           │   ├── app.component.html.hbs
│   │   │   │           │   ├── app.config.ts.hbs        ← NEW: Angular 17+ standalone config
│   │   │   │           │   ├── app.routes.ts.hbs        ← NEW: Angular 17+ routing
│   │   │   │           │   └── app.module.ts.hbs        ← kept for non-standalone
│   │   │   │           ├── pages/
│   │   │   │           │   ├── home/
│   │   │   │           │   │   ├── home.component.ts.hbs
│   │   │   │           │   │   └── home.component.html.hbs
│   │   │   │           │   ├── about/
│   │   │   │           │   │   ├── about.component.ts.hbs
│   │   │   │           │   │   └── about.component.html.hbs
│   │   │   │           │   ├── login/                    ← NEW: when hasAuth
│   │   │   │           │   │   ├── login.component.ts.hbs
│   │   │   │           │   │   └── login.component.html.hbs
│   │   │   │           │   └── not-found/                ← NEW
│   │   │   │           │       ├── not-found.component.ts.hbs
│   │   │   │           │       └── not-found.component.html.hbs
│   │   │   │           ├── components/
│   │   │   │           │   ├── navbar/
│   │   │   │           │   │   ├── navbar.component.ts.hbs
│   │   │   │           │   │   └── navbar.component.html.hbs
│   │   │   │           │   └── loading-spinner/          ← NEW
│   │   │   │           │       ├── loading-spinner.component.ts.hbs
│   │   │   │           │       └── loading-spinner.component.html.hbs
│   │   │   │           ├── services/                     ← NEW: Angular services
│   │   │   │           │   ├── api.service.ts.hbs
│   │   │   │           │   └── auth.service.ts.hbs
│   │   │   │           ├── guards/                       ← NEW: Angular route guards
│   │   │   │           │   └── auth.guard.ts.hbs
│   │   │   │           └── environments/                 ← NEW: Angular environment files
│   │   │   │               ├── environment.ts.hbs
│   │   │   │               └── environment.prod.ts.hbs
│   │   │   │
│   │   │   └── mobile/
│   │   │       ├── expo/
│   │   │       │   ├── meta.ts
│   │   │       │   ├── file-map.ts
│   │   │       │   └── templates/
│   │   │       │       ├── App.tsx.hbs                  ← used when NOT using expo-router
│   │   │       │       ├── app.json.hbs
│   │   │       │       ├── app.config.ts.hbs            ← NEW: dynamic Expo config
│   │   │       │       ├── babel.config.js.hbs
│   │   │       │       ├── metro.config.js.hbs          ← NEW: Metro bundler config
│   │   │       │       ├── tsconfig.json.hbs
│   │   │       │       ├── index.ts.hbs                 ← NEW: entry point registration
│   │   │       │       ├── assets/                      ← NEW: placeholder assets
│   │   │       │       │   ├── icon.png.hbs             ← actually generates a data-uri placeholder
│   │   │       │       │   ├── splash.png.hbs
│   │   │       │       │   └── adaptive-icon.png.hbs
│   │   │       │       ├── screens/
│   │   │       │       │   ├── HomeScreen.tsx.hbs
│   │   │       │       │   ├── ProfileScreen.tsx.hbs
│   │   │       │       │   ├── LoginScreen.tsx.hbs      ← NEW: when hasAuth
│   │   │       │       │   ├── RegisterScreen.tsx.hbs   ← NEW: when hasAuth
│   │   │       │       │   └── SettingsScreen.tsx.hbs   ← NEW: common mobile screen
│   │   │       │       ├── components/
│   │   │       │       │   ├── Screen.tsx.hbs           ← NEW: SafeAreaView wrapper
│   │   │       │       │   ├── Button.tsx.hbs
│   │   │       │       │   ├── Card.tsx.hbs
│   │   │       │       │   ├── Input.tsx.hbs            ← NEW: styled TextInput
│   │   │       │       │   ├── LoadingScreen.tsx.hbs    ← NEW: full-screen loader
│   │   │       │       │   └── Avatar.tsx.hbs           ← NEW: user avatar component
│   │   │       │       ├── navigation/
│   │   │       │       │   ├── RootNavigator.tsx.hbs    ← when NOT using expo-router
│   │   │       │       │   └── types.ts.hbs             ← NEW: navigation type definitions
│   │   │       │       ├── hooks/
│   │   │       │       │   ├── useApi.ts.hbs
│   │   │       │       │   ├── useAuth.ts.hbs           ← NEW: when hasAuth
│   │   │       │       │   └── useAppState.ts.hbs       ← NEW: AppState listener (bg/fg)
│   │   │       │       ├── lib/
│   │   │       │       │   ├── config.ts.hbs
│   │   │       │       │   └── utils.ts.hbs             ← NEW
│   │   │       │       ├── types/
│   │   │       │       │   └── index.ts.hbs             ← NEW: shared mobile types
│   │   │       │       └── constants/
│   │   │       │           └── index.ts.hbs             ← NEW: colors, spacing, etc.
│   │   │       │
│   │   │       ├── react-native-cli/
│   │   │       │   ├── meta.ts
│   │   │       │   ├── file-map.ts
│   │   │       │   └── templates/
│   │   │       │       ├── App.tsx.hbs
│   │   │       │       ├── metro.config.js.hbs
│   │   │       │       ├── tsconfig.json.hbs
│   │   │       │       ├── index.js.hbs                 ← NEW: RN CLI entry point
│   │   │       │       ├── react-native.config.js.hbs   ← NEW: RN CLI config
│   │   │       │       ├── Gemfile.hbs                  ← NEW: iOS CocoaPods dependency
│   │   │       │       ├── screens/
│   │   │       │       │   ├── HomeScreen.tsx.hbs
│   │   │       │       │   ├── ProfileScreen.tsx.hbs
│   │   │       │       │   ├── LoginScreen.tsx.hbs      ← NEW: when hasAuth
│   │   │       │       │   ├── RegisterScreen.tsx.hbs   ← NEW: when hasAuth
│   │   │       │       │   └── SettingsScreen.tsx.hbs   ← NEW
│   │   │       │       ├── components/
│   │   │       │       │   ├── Screen.tsx.hbs           ← NEW
│   │   │       │       │   ├── Button.tsx.hbs
│   │   │       │       │   ├── Card.tsx.hbs
│   │   │       │       │   ├── Input.tsx.hbs            ← NEW
│   │   │       │       │   └── LoadingScreen.tsx.hbs    ← NEW
│   │   │       │       ├── navigation/
│   │   │       │       │   ├── RootNavigator.tsx.hbs
│   │   │       │       │   └── types.ts.hbs             ← NEW
│   │   │       │       ├── hooks/
│   │   │       │       │   ├── useApi.ts.hbs            ← NEW
│   │   │       │       │   └── useAuth.ts.hbs           ← NEW: when hasAuth
│   │   │       │       ├── lib/
│   │   │       │       │   ├── config.ts.hbs
│   │   │       │       │   └── utils.ts.hbs             ← NEW
│   │   │       │       ├── types/
│   │   │       │       │   └── index.ts.hbs             ← NEW
│   │   │       │       └── constants/
│   │   │       │           └── index.ts.hbs             ← NEW
│   │   │       │
│   │   │       └── flutter/
│   │   │           ├── meta.ts                          ← sets skipStylingQuestion: true,
│   │   │           │                                       skipNavigationQuestion: true
│   │   │           ├── file-map.ts
│   │   │           └── templates/
│   │   │               ├── pubspec.yaml.hbs
│   │   │               ├── analysis_options.yaml.hbs    ← NEW: Dart linting
│   │   │               ├── .metadata.hbs                ← NEW: Flutter metadata
│   │   │               └── lib/
│   │   │                   ├── main.dart.hbs
│   │   │                   ├── app.dart.hbs             ← NEW: MaterialApp config
│   │   │                   ├── router.dart.hbs          ← NEW: go_router setup
│   │   │                   ├── screens/
│   │   │                   │   ├── home_screen.dart.hbs
│   │   │                   │   ├── profile_screen.dart.hbs
│   │   │                   │   ├── login_screen.dart.hbs    ← NEW: when hasAuth
│   │   │                   │   └── settings_screen.dart.hbs ← NEW
│   │   │                   ├── widgets/
│   │   │                   │   ├── app_button.dart.hbs
│   │   │                   │   ├── app_card.dart.hbs
│   │   │                   │   ├── app_input.dart.hbs       ← NEW
│   │   │                   │   └── loading_indicator.dart.hbs ← NEW
│   │   │                   ├── models/                      ← NEW: Dart data models
│   │   │                   │   └── user.dart.hbs
│   │   │                   ├── providers/                   ← NEW: Riverpod/Provider state
│   │   │                   │   ├── app_provider.dart.hbs
│   │   │                   │   └── auth_provider.dart.hbs
│   │   │                   ├── services/
│   │   │                   │   ├── api_service.dart.hbs
│   │   │                   │   ├── auth_service.dart.hbs    ← NEW: when hasAuth
│   │   │                   │   └── storage_service.dart.hbs ← NEW: secure storage
│   │   │                   ├── utils/                       ← NEW
│   │   │                   │   └── constants.dart.hbs
│   │   │                   └── theme/                       ← NEW: Flutter theming
│   │   │                       └── app_theme.dart.hbs
│   │   │
│   │   ├── backends/
│   │   │   ├── express/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── server.ts.hbs                    ← main entry, {{#if}} for logger, cors, etc.
│   │   │   │       ├── tsconfig.json.hbs
│   │   │   │       ├── routes/
│   │   │   │       │   ├── index.ts.hbs                 ← has // ROUTE_IMPORTS, // ROUTE_REGISTRATIONS
│   │   │   │       │   ├── health.ts.hbs
│   │   │   │       │   └── users.ts.hbs
│   │   │   │       ├── controllers/
│   │   │   │       │   └── user.controller.ts.hbs
│   │   │   │       ├── services/
│   │   │   │       │   └── user.service.ts.hbs          ← {{#if hasPrisma}} for DB queries
│   │   │   │       ├── middleware/
│   │   │   │       │   ├── error-handler.ts.hbs
│   │   │   │       │   ├── not-found.ts.hbs
│   │   │   │       │   └── validate.ts.hbs
│   │   │   │       ├── lib/
│   │   │   │       │   ├── config.ts.hbs                ← env validation with zod/envalid
│   │   │   │       │   └── utils.ts.hbs                 ← NEW
│   │   │   │       └── types/
│   │   │   │           └── index.ts.hbs                 ← NEW: Express extended types
│   │   │   │
│   │   │   ├── fastify/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── server.ts.hbs
│   │   │   │       ├── tsconfig.json.hbs
│   │   │   │       ├── routes/
│   │   │   │       │   ├── index.ts.hbs
│   │   │   │       │   ├── health.ts.hbs
│   │   │   │       │   └── users.ts.hbs
│   │   │   │       ├── plugins/                         ← Fastify plugin pattern
│   │   │   │       │   └── sensible.ts.hbs              ← NEW: @fastify/sensible
│   │   │   │       ├── services/
│   │   │   │       │   └── user.service.ts.hbs
│   │   │   │       ├── schemas/                         ← NEW: Fastify JSON schemas
│   │   │   │       │   └── user.schema.ts.hbs
│   │   │   │       ├── lib/
│   │   │   │       │   ├── config.ts.hbs
│   │   │   │       │   └── utils.ts.hbs                 ← NEW
│   │   │   │       └── types/
│   │   │   │           └── index.ts.hbs                 ← NEW
│   │   │   │
│   │   │   ├── nestjs/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── main.ts.hbs
│   │   │   │       ├── app.module.ts.hbs
│   │   │   │       ├── app.controller.ts.hbs
│   │   │   │       ├── app.service.ts.hbs
│   │   │   │       ├── tsconfig.json.hbs
│   │   │   │       ├── tsconfig.build.json.hbs          ← NEW
│   │   │   │       ├── nest-cli.json.hbs
│   │   │   │       ├── common/                          ← NEW: NestJS common patterns
│   │   │   │       │   ├── filters/
│   │   │   │       │   │   └── http-exception.filter.ts.hbs
│   │   │   │       │   ├── interceptors/
│   │   │   │       │   │   └── logging.interceptor.ts.hbs
│   │   │   │       │   ├── guards/                      ← NEW: when hasAuth
│   │   │   │       │   │   └── auth.guard.ts.hbs
│   │   │   │       │   └── decorators/                  ← NEW
│   │   │   │       │       └── current-user.decorator.ts.hbs
│   │   │   │       ├── config/                          ← NEW: NestJS ConfigModule
│   │   │   │       │   └── configuration.ts.hbs
│   │   │   │       └── users/
│   │   │   │           ├── users.module.ts.hbs
│   │   │   │           ├── users.controller.ts.hbs
│   │   │   │           ├── users.service.ts.hbs
│   │   │   │           ├── entities/                    ← NEW
│   │   │   │           │   └── user.entity.ts.hbs
│   │   │   │           └── dto/
│   │   │   │               ├── create-user.dto.ts.hbs
│   │   │   │               └── update-user.dto.ts.hbs   ← NEW
│   │   │   │
│   │   │   ├── hono/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── server.ts.hbs
│   │   │   │       ├── tsconfig.json.hbs
│   │   │   │       ├── routes/
│   │   │   │       │   ├── index.ts.hbs
│   │   │   │       │   ├── health.ts.hbs
│   │   │   │       │   └── users.ts.hbs
│   │   │   │       ├── middleware/                       ← NEW
│   │   │   │       │   └── error-handler.ts.hbs
│   │   │   │       └── lib/
│   │   │   │           ├── config.ts.hbs
│   │   │   │           └── utils.ts.hbs                 ← NEW
│   │   │   │
│   │   │   └── django/
│   │   │       ├── meta.ts
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           ├── manage.py.hbs
│   │   │           ├── requirements.txt.hbs
│   │   │           ├── config/
│   │   │           │   ├── settings.py.hbs              ← {{#if}} for cors, database, etc.
│   │   │           │   ├── urls.py.hbs
│   │   │           │   ├── wsgi.py.hbs
│   │   │           │   └── asgi.py.hbs                  ← NEW: async support
│   │   │           ├── users/
│   │   │           │   ├── models.py.hbs
│   │   │           │   ├── views.py.hbs
│   │   │           │   ├── urls.py.hbs
│   │   │           │   ├── serializers.py.hbs
│   │   │           │   ├── admin.py.hbs                 ← NEW: Django admin registration
│   │   │           │   └── tests.py.hbs                 ← NEW: Django test
│   │   │           └── core/                            ← NEW: shared Django app
│   │   │               ├── permissions.py.hbs
│   │   │               └── pagination.py.hbs
│   │   │
│   │   ├── api-style/                                   ← NEW CATEGORY: server-side API style plugins
│   │   │   ├── graphql-server/
│   │   │   │   ├── meta.ts                              ← showWhen: hasBackend && apiStyle === 'graphql'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── schema.ts.hbs                    ← type-graphql or @apollo/server schema
│   │   │   │       ├── resolvers/
│   │   │   │       │   ├── index.ts.hbs
│   │   │   │       │   └── user.resolver.ts.hbs
│   │   │   │       ├── types/
│   │   │   │       │   └── user.type.ts.hbs
│   │   │   │       ├── server-plugin.ts.hbs             ← integration with Express/Fastify/NestJS
│   │   │   │       ├── route-import.hbs                 ← injection
│   │   │   │       └── route-register.hbs               ← injection
│   │   │   │
│   │   │   └── trpc-server/
│   │   │       ├── meta.ts                              ← showWhen: hasBackend && apiStyle === 'trpc'
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           ├── trpc.ts.hbs                      ← initTRPC, context, middleware
│   │   │           ├── routers/
│   │   │           │   ├── index.ts.hbs                 ← appRouter
│   │   │           │   └── user.router.ts.hbs
│   │   │           ├── server-plugin.ts.hbs             ← Express/Fastify adapter
│   │   │           ├── route-import.hbs
│   │   │           └── route-register.hbs
│   │   │
│   │   ├── databases/
│   │   │   ├── postgres/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── env-fragment.hbs
│   │   │   │
│   │   │   ├── mongodb/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── env-fragment.hbs
│   │   │   │
│   │   │   ├── mysql/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── env-fragment.hbs
│   │   │   │
│   │   │   ├── sqlite/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── env-fragment.hbs
│   │   │   │
│   │   │   └── redis/
│   │   │       ├── meta.ts
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           ├── redis-client.ts.hbs
│   │   │           └── env-fragment.hbs
│   │   │
│   │   ├── orms/
│   │   │   ├── prisma/
│   │   │   │   ├── meta.ts                              ← conflicts: ['mongoose'], requires SQL DB
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── schema.prisma.hbs                ← {{#if hasAuth}} adds User fields
│   │   │   │       ├── db-client.ts.hbs                 ← singleton pattern
│   │   │   │       ├── seed.ts.hbs
│   │   │   │       └── migrations/                      ← NEW: initial migration readme
│   │   │   │           └── README.md.hbs
│   │   │   │
│   │   │   ├── drizzle/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── schema.ts.hbs
│   │   │   │       ├── db-client.ts.hbs
│   │   │   │       ├── migrate.ts.hbs
│   │   │   │       ├── seed.ts.hbs                      ← NEW
│   │   │   │       └── drizzle.config.ts.hbs
│   │   │   │
│   │   │   ├── typeorm/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── data-source.ts.hbs
│   │   │   │       ├── db-client.ts.hbs
│   │   │   │       ├── seed.ts.hbs                      ← NEW
│   │   │   │       └── entities/
│   │   │   │           └── user.entity.ts.hbs
│   │   │   │
│   │   │   └── mongoose/
│   │   │       ├── meta.ts                              ← conflicts: ['prisma','drizzle','typeorm']
│   │   │       │                                           requires: ['mongodb']
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           ├── connection.ts.hbs
│   │   │           ├── seed.ts.hbs                      ← NEW
│   │   │           └── models/
│   │   │               └── user.model.ts.hbs
│   │   │
│   │   ├── auth/
│   │   │   ├── jwt-custom/
│   │   │   │   ├── meta.ts                              ← universal, works with any backend
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── backend/                          ← NEW: split by target
│   │   │   │       │   ├── auth.middleware.ts.hbs
│   │   │   │       │   ├── auth.service.ts.hbs
│   │   │   │       │   ├── auth.routes.ts.hbs           ← login, register, refresh, me
│   │   │   │       │   ├── jwt.utils.ts.hbs
│   │   │   │       │   ├── route-import.hbs
│   │   │   │       │   └── route-register.hbs
│   │   │   │       └── frontend/                        ← NEW: auth UI per platform
│   │   │   │           ├── web/
│   │   │   │           │   ├── LoginPage.tsx.hbs
│   │   │   │           │   ├── RegisterPage.tsx.hbs
│   │   │   │           │   ├── AuthProvider.tsx.hbs
│   │   │   │           │   └── ProtectedRoute.tsx.hbs
│   │   │   │           └── mobile/
│   │   │   │               ├── LoginScreen.tsx.hbs
│   │   │   │               ├── RegisterScreen.tsx.hbs
│   │   │   │               ├── AuthProvider.tsx.hbs
│   │   │   │               └── auth-layout.tsx.hbs      ← expo-router (auth) group layout
│   │   │   │
│   │   │   ├── next-auth/
│   │   │   │   ├── meta.ts                              ← showWhen: webFramework === 'next'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── auth.config.ts.hbs
│   │   │   │       ├── auth.ts.hbs
│   │   │   │       ├── middleware.ts.hbs
│   │   │   │       └── providers/
│   │   │   │           └── SessionProvider.tsx.hbs       ← NEW
│   │   │   │
│   │   │   ├── clerk/
│   │   │   │   ├── meta.ts                              ← works with web AND mobile
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── web/                             ← NEW: split
│   │   │   │       │   ├── middleware.ts.hbs
│   │   │   │       │   └── providers/
│   │   │   │       │       └── ClerkProvider.tsx.hbs
│   │   │   │       └── mobile/                          ← NEW: Clerk for RN
│   │   │   │           └── providers/
│   │   │   │               └── ClerkProvider.tsx.hbs
│   │   │   │
│   │   │   └── lucia/
│   │   │       ├── meta.ts
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           ├── auth.ts.hbs
│   │   │           ├── auth.middleware.ts.hbs
│   │   │           ├── auth.routes.ts.hbs
│   │   │           ├── route-import.hbs                 ← NEW
│   │   │           └── route-register.hbs               ← NEW
│   │   │
│   │   ├── styling/
│   │   │   ├── web/
│   │   │   │   ├── tailwind/
│   │   │   │   │   ├── meta.ts
│   │   │   │   │   ├── file-map.ts
│   │   │   │   │   └── templates/
│   │   │   │   │       ├── tailwind.config.ts.hbs
│   │   │   │   │       ├── postcss.config.js.hbs
│   │   │   │   │       └── globals.css.hbs              ← @tailwind directives + base styles
│   │   │   │   │
│   │   │   │   ├── styled-components/
│   │   │   │   │   ├── meta.ts
│   │   │   │   │   ├── file-map.ts
│   │   │   │   │   └── templates/
│   │   │   │   │       ├── theme.ts.hbs
│   │   │   │   │       ├── global-styles.ts.hbs
│   │   │   │   │       ├── styled.d.ts.hbs
│   │   │   │   │       └── providers/                   ← NEW
│   │   │   │   │           └── ThemeProvider.tsx.hbs
│   │   │   │   │
│   │   │   │   └── css-modules/
│   │   │   │       ├── meta.ts
│   │   │   │       ├── file-map.ts
│   │   │   │       └── templates/
│   │   │   │           ├── globals.css.hbs
│   │   │   │           └── styles/                      ← NEW: sample module files
│   │   │   │               ├── Layout.module.css.hbs
│   │   │   │               └── Navbar.module.css.hbs
│   │   │   │
│   │   │   └── mobile/
│   │   │       ├── nativewind/
│   │   │       │   ├── meta.ts                          ← requires: expo OR react-native-cli
│   │   │       │   ├── file-map.ts
│   │   │       │   └── templates/
│   │   │       │       ├── tailwind.config.js.hbs
│   │   │       │       ├── global.css.hbs
│   │   │       │       ├── nativewind-env.d.ts.hbs      ← NEW: NativeWind type declarations
│   │   │       │       └── metro.config.patch.hbs       ← NEW: metro config additions for NW
│   │   │       │
│   │   │       ├── rn-stylesheet/
│   │   │       │   ├── meta.ts
│   │   │       │   ├── file-map.ts
│   │   │       │   └── templates/
│   │   │       │       ├── theme.ts.hbs                 ← colors, spacing, typography
│   │   │       │       └── styles/                      ← NEW: shared style sheets
│   │   │       │           └── common.ts.hbs
│   │   │       │
│   │   │       └── styled-components-rn/               ← NEW PLUGIN: styled-components for RN
│   │   │           ├── meta.ts
│   │   │           ├── file-map.ts
│   │   │           └── templates/
│   │   │               ├── theme.ts.hbs
│   │   │               ├── styled.d.ts.hbs
│   │   │               └── providers/
│   │   │                   └── ThemeProvider.tsx.hbs
│   │   │
│   │   ├── state/
│   │   │   ├── zustand/
│   │   │   │   ├── meta.ts                              ← works web + mobile
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── stores/
│   │   │   │           ├── useAppStore.ts.hbs            ← platform-aware (localStorage vs AS)
│   │   │   │           └── useAuthStore.ts.hbs           ← when hasAuth, platform-aware
│   │   │   │
│   │   │   ├── redux-toolkit/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── store.ts.hbs
│   │   │   │       ├── hooks.ts.hbs                     ← NEW: useAppDispatch, useAppSelector
│   │   │   │       ├── providers/
│   │   │   │       │   └── StoreProvider.tsx.hbs
│   │   │   │       └── slices/
│   │   │   │           ├── appSlice.ts.hbs
│   │   │   │           └── authSlice.ts.hbs
│   │   │   │
│   │   │   ├── tanstack-query/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── query-client.ts.hbs              ← NEW: extracted client config
│   │   │   │       ├── providers/
│   │   │   │       │   └── QueryProvider.tsx.hbs
│   │   │   │       └── hooks/
│   │   │   │           ├── useUsers.ts.hbs
│   │   │   │           └── useAuth.ts.hbs               ← NEW: when hasAuth
│   │   │   │
│   │   │   └── mobx/
│   │   │       ├── meta.ts
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           ├── providers/                       ← NEW
│   │   │           │   └── StoreProvider.tsx.hbs
│   │   │           └── stores/
│   │   │               ├── RootStore.ts.hbs
│   │   │               ├── AppStore.ts.hbs
│   │   │               └── AuthStore.ts.hbs             ← NEW: when hasAuth
│   │   │
│   │   ├── forms/
│   │   │   ├── react-hook-form/
│   │   │   │   ├── meta.ts                              ← showWhen: platform !== 'mobile'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── components/
│   │   │   │       │   ├── SampleForm.tsx.hbs
│   │   │   │       │   └── FormField.tsx.hbs            ← NEW: reusable form field wrapper
│   │   │   │       ├── hooks/
│   │   │   │       │   └── useFormHelper.ts.hbs
│   │   │   │       └── lib/
│   │   │   │           └── validators.ts.hbs            ← Zod schemas
│   │   │   │
│   │   │   └── formik/
│   │   │       ├── meta.ts                              ← showWhen: platform !== 'mobile'
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           ├── components/
│   │   │           │   └── SampleForm.tsx.hbs
│   │   │           └── lib/
│   │   │               └── validators.ts.hbs            ← NEW: Yup schemas
│   │   │
│   │   ├── ui-library/
│   │   │   ├── shadcn/
│   │   │   │   ├── meta.ts                              ← showWhen: platform !== 'mobile',
│   │   │   │   │                                           requires: ['tailwind']
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── components.json.hbs
│   │   │   │       ├── lib/
│   │   │   │       │   └── utils.ts.hbs                 ← NEW: cn() helper
│   │   │   │       └── components/
│   │   │   │           └── ui/
│   │   │   │               ├── button.tsx.hbs
│   │   │   │               ├── input.tsx.hbs
│   │   │   │               ├── card.tsx.hbs
│   │   │   │               ├── dialog.tsx.hbs           ← NEW
│   │   │   │               ├── dropdown-menu.tsx.hbs    ← NEW
│   │   │   │               └── toast.tsx.hbs            ← NEW
│   │   │   │
│   │   │   ├── mui/
│   │   │   │   ├── meta.ts                              ← showWhen: platform !== 'mobile'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── theme.ts.hbs
│   │   │   │       ├── emotion-cache.ts.hbs             ← NEW: SSR emotion cache
│   │   │   │       └── providers/
│   │   │   │           └── ThemeProvider.tsx.hbs
│   │   │   │
│   │   │   └── ant-design/
│   │   │       ├── meta.ts                              ← showWhen: platform !== 'mobile'
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           ├── theme.ts.hbs
│   │   │           └── providers/
│   │   │               └── AntdProvider.tsx.hbs
│   │   │
│   │   ├── api-client/
│   │   │   ├── axios/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── api-client.ts.hbs                ← platform-aware (SecureStore vs localStorage
│   │   │   │                                               for auth token in interceptors)
│   │   │   │
│   │   │   ├── fetch-wrapper/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── api-client.ts.hbs
│   │   │   │
│   │   │   └── trpc-client/
│   │   │       ├── meta.ts                              ← showWhen: apiStyle === 'trpc',
│   │   │       │                                           requires TS frontend
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           ├── trpc.ts.hbs
│   │   │           └── providers/
│   │   │               └── TrpcProvider.tsx.hbs
│   │   │
│   │   ├── mobile-navigation/
│   │   │   ├── react-navigation/
│   │   │   │   ├── meta.ts                              ← showWhen: platform === 'mobile' &&
│   │   │   │   │                                           mobileFramework !== 'flutter'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── RootNavigator.tsx.hbs
│   │   │   │       ├── TabNavigator.tsx.hbs
│   │   │   │       ├── AuthNavigator.tsx.hbs            ← NEW: when hasAuth
│   │   │   │       ├── linking.ts.hbs                   ← NEW: deep linking config
│   │   │   │       └── types.ts.hbs
│   │   │   │
│   │   │   └── expo-router/
│   │   │       ├── meta.ts                              ← showWhen: mobileFramework === 'expo'
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           ├── app/
│   │   │           │   ├── _layout.tsx.hbs              ← wraps providers based on active plugins
│   │   │           │   ├── index.tsx.hbs
│   │   │           │   ├── profile.tsx.hbs
│   │   │           │   ├── settings.tsx.hbs             ← NEW
│   │   │           │   ├── +not-found.tsx.hbs           ← NEW
│   │   │           │   ├── (tabs)/                      ← NEW: tab layout
│   │   │           │   │   ├── _layout.tsx.hbs
│   │   │           │   │   ├── index.tsx.hbs
│   │   │           │   │   └── profile.tsx.hbs
│   │   │           │   └── (auth)/                      ← NEW: when hasAuth
│   │   │           │       ├── _layout.tsx.hbs
│   │   │           │       ├── login.tsx.hbs
│   │   │           │       └── register.tsx.hbs
│   │   │           └── types.ts.hbs
│   │   │
│   │   ├── frontend-extras/
│   │   │   │
│   │   │   │   ── UNIVERSAL (web + mobile) ──
│   │   │   │
│   │   │   ├── date-fns/
│   │   │   │   ├── meta.ts                              ← platformSupport: 'all'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── lib/
│   │   │   │           └── date-helpers.ts.hbs
│   │   │   │
│   │   │   ├── i18next/
│   │   │   │   ├── meta.ts                              ← platformSupport: 'all'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── i18n.ts.hbs                      ← platform-aware init
│   │   │   │       └── locales/
│   │   │   │           ├── en.json.hbs
│   │   │   │           └── es.json.hbs
│   │   │   │
│   │   │   │   ── WEB-ONLY ──
│   │   │   │
│   │   │   ├── recharts/
│   │   │   │   ├── meta.ts                              ← platformSupport: 'web-only'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── components/
│   │   │   │       │   ├── SampleBarChart.tsx.hbs
│   │   │   │       │   └── SampleLineChart.tsx.hbs
│   │   │   │       └── data/
│   │   │   │           └── sample-chart-data.ts.hbs
│   │   │   │
│   │   │   ├── react-table/
│   │   │   │   ├── meta.ts                              ← platformSupport: 'web-only'
│   │   │   │   ├── file-map.tscreate-fullstack-app/
├── package.json
├── tsconfig.json
├── tsconfig.build.json                          ← NEW: separate build config
├── README.md
├── CONTRIBUTING.md                               ← NEW: how to add plugins
├── .gitignore
├── .prettierrc
├── .eslintrc.js
├── .husky/                                       ← NEW: dogfood our own devtools
│   └── pre-commit
├── bin/
│   └── create-fullstack-app.js                   ← NEW: CLI entry point (#!/usr/bin/env node)
│
├── src/
│   ├── index.ts                                  ← CLI bootstrap, arg parsing, calls run-wizard
│   │
│   ├── cli/
│   │   ├── types.ts                              ← WizardAnswer, WizardDraft, Phase, PromptDef
│   │   ├── run-wizard.ts                         ← Main wizard loop: phase→prompt→collect→review
│   │   ├── prompt-definitions.ts                 ← All prompt configs (question text, type, choices ref)
│   │   ├── prompt-runner.ts                      ← NEW: wraps inquirer/prompts with error handling,
│   │   │                                            back navigation, skip logic
│   │   ├── build-answers.ts                      ← Transforms raw prompt responses into WizardAnswer
│   │   ├── visibility.ts                         ← Should this question show? (checks draft state)
│   │   ├── choices-registry.ts                   ← Reads plugin registry, filters by category + showWhen
│   │   ├── review.ts                             ← Builds and renders the review screen
│   │   ├── navigation.ts                         ← NEW: back/forward/restart/jump-to-phase logic
│   │   └── ui/                                   ← NEW: CLI display utilities
│   │       ├── colors.ts                         ← chalk/picocolors wrapper
│   │       ├── spinner.ts                        ← ora wrapper for generation progress
│   │       ├── tree.ts                           ← ASCII folder tree renderer
│   │       ├── table.ts                          ← Package list table formatter
│   │       └── banner.ts                         ← Welcome banner, version display
│   │
│   ├── plugins/
│   │   ├── types.ts                              ← PluginMeta, FileMapEntry, InjectionEntry,
│   │   │                                            PluginCategory, EnvVar, ScriptEntry,
│   │   │                                            ShowWhenFn, WhenFn, PlatformSupport
│   │   ├── registry.ts                           ← Master registry: loads all plugins, indexes by
│   │   │                                            ID and category, provides query methods
│   │   ├── validator.ts                          ← NEW: validates plugin meta/file-map at load time
│   │   │                                            (catches missing templates, bad deps, etc.)
│   │   ├── conflict-checker.ts                   ← NEW: given active plugins, find conflicts
│   │   ├── dependency-checker.ts                 ← NEW: given active plugins, verify all "requires"
│   │   │                                            are satisfied, suggest missing plugins
│   │   │
│   │   ├── frontends/
│   │   │   ├── web/
│   │   │   │   ├── react-vite/
│   │   │   │   │   ├── meta.ts
│   │   │   │   │   ├── file-map.ts
│   │   │   │   │   └── templates/
│   │   │   │   │       ├── index.html.hbs
│   │   │   │   │       ├── main.tsx.hbs
│   │   │   │   │       ├── App.tsx.hbs                ← conditionals for router, providers,
│   │   │   │   │       │                                 state, query client, auth, i18n
│   │   │   │   │       ├── vite.config.ts.hbs
│   │   │   │   │       ├── tsconfig.json.hbs
│   │   │   │   │       ├── tsconfig.node.json.hbs     ← NEW: vite needs this
│   │   │   │   │       ├── pages/
│   │   │   │   │       │   ├── Home.tsx.hbs
│   │   │   │   │       │   ├── About.tsx.hbs
│   │   │   │   │       │   ├── NotFound.tsx.hbs
│   │   │   │   │       │   ├── Login.tsx.hbs           ← NEW: when hasAuth (conditional in file-map)
│   │   │   │   │       │   ├── Register.tsx.hbs        ← NEW: when hasAuth
│   │   │   │   │       │   └── Dashboard.tsx.hbs       ← NEW: when hasAuth (protected route example)
│   │   │   │   │       ├── components/
│   │   │   │   │       │   ├── Layout.tsx.hbs
│   │   │   │   │       │   ├── Navbar.tsx.hbs
│   │   │   │   │       │   ├── Footer.tsx.hbs          ← NEW
│   │   │   │   │       │   ├── ErrorBoundary.tsx.hbs
│   │   │   │   │       │   ├── ProtectedRoute.tsx.hbs  ← NEW: when hasAuth
│   │   │   │   │       │   └── LoadingSpinner.tsx.hbs  ← NEW: used by async components
│   │   │   │   │       ├── hooks/
│   │   │   │   │       │   ├── useApi.ts.hbs           ← when hasBackend
│   │   │   │   │       │   └── useAuth.ts.hbs          ← NEW: when hasAuth
│   │   │   │   │       ├── lib/
│   │   │   │   │       │   ├── config.ts.hbs
│   │   │   │   │       │   └── utils.ts.hbs            ← NEW: cn() helper, common utils
│   │   │   │   │       ├── types/
│   │   │   │   │       │   └── index.ts.hbs
│   │   │   │   │       └── router/                     ← NEW: extracted router setup
│   │   │   │   │           └── index.tsx.hbs
│   │   │   │   │
│   │   │   │   ├── next/
│   │   │   │   │   ├── meta.ts
│   │   │   │   │   ├── file-map.ts
│   │   │   │   │   └── templates/
│   │   │   │   │       ├── next.config.ts.hbs
│   │   │   │   │       ├── tsconfig.json.hbs
│   │   │   │   │       ├── middleware.ts.hbs            ← NEW: Next.js middleware (route protection)
│   │   │   │   │       ├── app/
│   │   │   │   │       │   ├── layout.tsx.hbs
│   │   │   │   │       │   ├── page.tsx.hbs
│   │   │   │   │       │   ├── loading.tsx.hbs          ← NEW: Next.js loading UI
│   │   │   │   │       │   ├── error.tsx.hbs            ← NEW: Next.js error boundary
│   │   │   │   │       │   ├── globals.css.hbs
│   │   │   │   │       │   ├── not-found.tsx.hbs
│   │   │   │   │       │   ├── about/
│   │   │   │   │       │   │   └── page.tsx.hbs
│   │   │   │   │       │   ├── login/                   ← NEW: when hasAuth
│   │   │   │   │       │   │   └── page.tsx.hbs
│   │   │   │   │       │   ├── register/                ← NEW: when hasAuth
│   │   │   │   │       │   │   └── page.tsx.hbs
│   │   │   │   │       │   ├── dashboard/               ← NEW: when hasAuth
│   │   │   │   │       │   │   └── page.tsx.hbs
│   │   │   │   │       │   └── api/
│   │   │   │   │       │       └── health/
│   │   │   │   │       │           └── route.ts.hbs
│   │   │   │   │       ├── components/
│   │   │   │   │       │   ├── Navbar.tsx.hbs
│   │   │   │   │       │   ├── Footer.tsx.hbs
│   │   │   │   │       │   └── LoadingSpinner.tsx.hbs   ← NEW
│   │   │   │   │       ├── lib/
│   │   │   │   │       │   ├── config.ts.hbs
│   │   │   │   │       │   └── utils.ts.hbs             ← NEW
│   │   │   │   │       └── types/
│   │   │   │   │           └── index.ts.hbs             ← NEW
│   │   │   │   │
│   │   │   │   ├── vue/
│   │   │   │   │   ├── meta.ts
│   │   │   │   │   ├── file-map.ts
│   │   │   │   │   └── templates/
│   │   │   │   │       ├── App.vue.hbs
│   │   │   │   │       ├── main.ts.hbs
│   │   │   │   │       ├── vite.config.ts.hbs
│   │   │   │   │       ├── tsconfig.json.hbs
│   │   │   │   │       ├── env.d.ts.hbs                 ← NEW: Vue env type declarations
│   │   │   │   │       ├── index.html.hbs
│   │   │   │   │       ├── router/                      ← NEW: Vue Router setup
│   │   │   │   │       │   └── index.ts.hbs
│   │   │   │   │       ├── pages/
│   │   │   │   │       │   ├── Home.vue.hbs
│   │   │   │   │       │   ├── About.vue.hbs
│   │   │   │   │       │   ├── NotFound.vue.hbs         ← NEW
│   │   │   │   │       │   ├── Login.vue.hbs            ← NEW: when hasAuth
│   │   │   │   │       │   └── Dashboard.vue.hbs        ← NEW: when hasAuth
│   │   │   │   │       ├── components/
│   │   │   │   │       │   ├── Layout.vue.hbs
│   │   │   │   │       │   ├── Navbar.vue.hbs
│   │   │   │   │       │   └── LoadingSpinner.vue.hbs   ← NEW
│   │   │   │   │       ├── composables/                 ← NEW: Vue composables (equivalent of hooks)
│   │   │   │   │       │   ├── useApi.ts.hbs
│   │   │   │   │       │   └── useAuth.ts.hbs
│   │   │   │   │       ├── stores/                      ← NEW: Pinia store (Vue's default state)
│   │   │   │   │       │   └── app.ts.hbs
│   │   │   │   │       └── lib/
│   │   │   │   │           └── config.ts.hbs
│   │   │   │   │
│   │   │   │   ├── svelte/
│   │   │   │   │   ├── meta.ts
│   │   │   │   │   ├── file-map.ts
│   │   │   │   │   └── templates/
│   │   │   │   │       ├── svelte.config.js.hbs         ← NEW: SvelteKit config
│   │   │   │   │       ├── vite.config.ts.hbs
│   │   │   │   │       ├── tsconfig.json.hbs
│   │   │   │   │       ├── app.html.hbs                 ← NEW: SvelteKit app shell
│   │   │   │   │       ├── app.d.ts.hbs                 ← NEW: SvelteKit types
│   │   │   │   │       ├── routes/                      ← NEW: SvelteKit uses routes/ not pages/
│   │   │   │   │       │   ├── +layout.svelte.hbs
│   │   │   │   │       │   ├── +page.svelte.hbs
│   │   │   │   │       │   ├── +error.svelte.hbs        ← NEW
│   │   │   │   │       │   ├── about/
│   │   │   │   │       │   │   └── +page.svelte.hbs
│   │   │   │   │       │   ├── login/                   ← NEW: when hasAuth
│   │   │   │   │       │   │   └── +page.svelte.hbs
│   │   │   │   │       │   └── dashboard/               ← NEW: when hasAuth
│   │   │   │   │       │       └── +page.svelte.hbs
│   │   │   │   │       ├── components/                  ← RENAMED from old structure
│   │   │   │   │       │   ├── Layout.svelte.hbs
│   │   │   │   │       │   ├── Navbar.svelte.hbs
│   │   │   │   │       │   └── LoadingSpinner.svelte.hbs
│   │   │   │   │       └── lib/                         ← SvelteKit $lib convention
│   │   │   │   │           ├── config.ts.hbs
│   │   │   │   │           └── utils.ts.hbs
│   │   │   │   │
│   │   │   │   └── angular/
│   │   │   │       ├── meta.ts
│   │   │   │       ├── file-map.ts
│   │   │   │       └── templates/
│   │   │   │           ├── angular.json.hbs
│   │   │   │           ├── tsconfig.json.hbs
│   │   │   │           ├── tsconfig.app.json.hbs        ← NEW
│   │   │   │           ├── app/
│   │   │   │           │   ├── app.component.ts.hbs
│   │   │   │           │   ├── app.component.html.hbs
│   │   │   │           │   ├── app.config.ts.hbs        ← NEW: Angular 17+ standalone config
│   │   │   │           │   ├── app.routes.ts.hbs        ← NEW: Angular 17+ routing
│   │   │   │           │   └── app.module.ts.hbs        ← kept for non-standalone
│   │   │   │           ├── pages/
│   │   │   │           │   ├── home/
│   │   │   │           │   │   ├── home.component.ts.hbs
│   │   │   │           │   │   └── home.component.html.hbs
│   │   │   │           │   ├── about/
│   │   │   │           │   │   ├── about.component.ts.hbs
│   │   │   │           │   │   └── about.component.html.hbs
│   │   │   │           │   ├── login/                    ← NEW: when hasAuth
│   │   │   │           │   │   ├── login.component.ts.hbs
│   │   │   │           │   │   └── login.component.html.hbs
│   │   │   │           │   └── not-found/                ← NEW
│   │   │   │           │       ├── not-found.component.ts.hbs
│   │   │   │           │       └── not-found.component.html.hbs
│   │   │   │           ├── components/
│   │   │   │           │   ├── navbar/
│   │   │   │           │   │   ├── navbar.component.ts.hbs
│   │   │   │           │   │   └── navbar.component.html.hbs
│   │   │   │           │   └── loading-spinner/          ← NEW
│   │   │   │           │       ├── loading-spinner.component.ts.hbs
│   │   │   │           │       └── loading-spinner.component.html.hbs
│   │   │   │           ├── services/                     ← NEW: Angular services
│   │   │   │           │   ├── api.service.ts.hbs
│   │   │   │           │   └── auth.service.ts.hbs
│   │   │   │           ├── guards/                       ← NEW: Angular route guards
│   │   │   │           │   └── auth.guard.ts.hbs
│   │   │   │           └── environments/                 ← NEW: Angular environment files
│   │   │   │               ├── environment.ts.hbs
│   │   │   │               └── environment.prod.ts.hbs
│   │   │   │
│   │   │   └── mobile/
│   │   │       ├── expo/
│   │   │       │   ├── meta.ts
│   │   │       │   ├── file-map.ts
│   │   │       │   └── templates/
│   │   │       │       ├── App.tsx.hbs                  ← used when NOT using expo-router
│   │   │       │       ├── app.json.hbs
│   │   │       │       ├── app.config.ts.hbs            ← NEW: dynamic Expo config
│   │   │       │       ├── babel.config.js.hbs
│   │   │       │       ├── metro.config.js.hbs          ← NEW: Metro bundler config
│   │   │       │       ├── tsconfig.json.hbs
│   │   │       │       ├── index.ts.hbs                 ← NEW: entry point registration
│   │   │       │       ├── assets/                      ← NEW: placeholder assets
│   │   │       │       │   ├── icon.png.hbs             ← actually generates a data-uri placeholder
│   │   │       │       │   ├── splash.png.hbs
│   │   │       │       │   └── adaptive-icon.png.hbs
│   │   │       │       ├── screens/
│   │   │       │       │   ├── HomeScreen.tsx.hbs
│   │   │       │       │   ├── ProfileScreen.tsx.hbs
│   │   │       │       │   ├── LoginScreen.tsx.hbs      ← NEW: when hasAuth
│   │   │       │       │   ├── RegisterScreen.tsx.hbs   ← NEW: when hasAuth
│   │   │       │       │   └── SettingsScreen.tsx.hbs   ← NEW: common mobile screen
│   │   │       │       ├── components/
│   │   │       │       │   ├── Screen.tsx.hbs           ← NEW: SafeAreaView wrapper
│   │   │       │       │   ├── Button.tsx.hbs
│   │   │       │       │   ├── Card.tsx.hbs
│   │   │       │       │   ├── Input.tsx.hbs            ← NEW: styled TextInput
│   │   │       │       │   ├── LoadingScreen.tsx.hbs    ← NEW: full-screen loader
│   │   │       │       │   └── Avatar.tsx.hbs           ← NEW: user avatar component
│   │   │       │       ├── navigation/
│   │   │       │       │   ├── RootNavigator.tsx.hbs    ← when NOT using expo-router
│   │   │       │       │   └── types.ts.hbs             ← NEW: navigation type definitions
│   │   │       │       ├── hooks/
│   │   │       │       │   ├── useApi.ts.hbs
│   │   │       │       │   ├── useAuth.ts.hbs           ← NEW: when hasAuth
│   │   │       │       │   └── useAppState.ts.hbs       ← NEW: AppState listener (bg/fg)
│   │   │       │       ├── lib/
│   │   │       │       │   ├── config.ts.hbs
│   │   │       │       │   └── utils.ts.hbs             ← NEW
│   │   │       │       ├── types/
│   │   │       │       │   └── index.ts.hbs             ← NEW: shared mobile types
│   │   │       │       └── constants/
│   │   │       │           └── index.ts.hbs             ← NEW: colors, spacing, etc.
│   │   │       │
│   │   │       ├── react-native-cli/
│   │   │       │   ├── meta.ts
│   │   │       │   ├── file-map.ts
│   │   │       │   └── templates/
│   │   │       │       ├── App.tsx.hbs
│   │   │       │       ├── metro.config.js.hbs
│   │   │       │       ├── tsconfig.json.hbs
│   │   │       │       ├── index.js.hbs                 ← NEW: RN CLI entry point
│   │   │       │       ├── react-native.config.js.hbs   ← NEW: RN CLI config
│   │   │       │       ├── Gemfile.hbs                  ← NEW: iOS CocoaPods dependency
│   │   │       │       ├── screens/
│   │   │       │       │   ├── HomeScreen.tsx.hbs
│   │   │       │       │   ├── ProfileScreen.tsx.hbs
│   │   │       │       │   ├── LoginScreen.tsx.hbs      ← NEW: when hasAuth
│   │   │       │       │   ├── RegisterScreen.tsx.hbs   ← NEW: when hasAuth
│   │   │       │       │   └── SettingsScreen.tsx.hbs   ← NEW
│   │   │       │       ├── components/
│   │   │       │       │   ├── Screen.tsx.hbs           ← NEW
│   │   │       │       │   ├── Button.tsx.hbs
│   │   │       │       │   ├── Card.tsx.hbs
│   │   │       │       │   ├── Input.tsx.hbs            ← NEW
│   │   │       │       │   └── LoadingScreen.tsx.hbs    ← NEW
│   │   │       │       ├── navigation/
│   │   │       │       │   ├── RootNavigator.tsx.hbs
│   │   │       │       │   └── types.ts.hbs             ← NEW
│   │   │       │       ├── hooks/
│   │   │       │       │   ├── useApi.ts.hbs            ← NEW
│   │   │       │       │   └── useAuth.ts.hbs           ← NEW: when hasAuth
│   │   │       │       ├── lib/
│   │   │       │       │   ├── config.ts.hbs
│   │   │       │       │   └── utils.ts.hbs             ← NEW
│   │   │       │       ├── types/
│   │   │       │       │   └── index.ts.hbs             ← NEW
│   │   │       │       └── constants/
│   │   │       │           └── index.ts.hbs             ← NEW
│   │   │       │
│   │   │       └── flutter/
│   │   │           ├── meta.ts                          ← sets skipStylingQuestion: true,
│   │   │           │                                       skipNavigationQuestion: true
│   │   │           ├── file-map.ts
│   │   │           └── templates/
│   │   │               ├── pubspec.yaml.hbs
│   │   │               ├── analysis_options.yaml.hbs    ← NEW: Dart linting
│   │   │               ├── .metadata.hbs                ← NEW: Flutter metadata
│   │   │               └── lib/
│   │   │                   ├── main.dart.hbs
│   │   │                   ├── app.dart.hbs             ← NEW: MaterialApp config
│   │   │                   ├── router.dart.hbs          ← NEW: go_router setup
│   │   │                   ├── screens/
│   │   │                   │   ├── home_screen.dart.hbs
│   │   │                   │   ├── profile_screen.dart.hbs
│   │   │                   │   ├── login_screen.dart.hbs    ← NEW: when hasAuth
│   │   │                   │   └── settings_screen.dart.hbs ← NEW
│   │   │                   ├── widgets/
│   │   │                   │   ├── app_button.dart.hbs
│   │   │                   │   ├── app_card.dart.hbs
│   │   │                   │   ├── app_input.dart.hbs       ← NEW
│   │   │                   │   └── loading_indicator.dart.hbs ← NEW
│   │   │                   ├── models/                      ← NEW: Dart data models
│   │   │                   │   └── user.dart.hbs
│   │   │                   ├── providers/                   ← NEW: Riverpod/Provider state
│   │   │                   │   ├── app_provider.dart.hbs
│   │   │                   │   └── auth_provider.dart.hbs
│   │   │                   ├── services/
│   │   │                   │   ├── api_service.dart.hbs
│   │   │                   │   ├── auth_service.dart.hbs    ← NEW: when hasAuth
│   │   │                   │   └── storage_service.dart.hbs ← NEW: secure storage
│   │   │                   ├── utils/                       ← NEW
│   │   │                   │   └── constants.dart.hbs
│   │   │                   └── theme/                       ← NEW: Flutter theming
│   │   │                       └── app_theme.dart.hbs
│   │   │
│   │   ├── backends/
│   │   │   ├── express/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── server.ts.hbs                    ← main entry, {{#if}} for logger, cors, etc.
│   │   │   │       ├── tsconfig.json.hbs
│   │   │   │       ├── routes/
│   │   │   │       │   ├── index.ts.hbs                 ← has // ROUTE_IMPORTS, // ROUTE_REGISTRATIONS
│   │   │   │       │   ├── health.ts.hbs
│   │   │   │       │   └── users.ts.hbs
│   │   │   │       ├── controllers/
│   │   │   │       │   └── user.controller.ts.hbs
│   │   │   │       ├── services/
│   │   │   │       │   └── user.service.ts.hbs          ← {{#if hasPrisma}} for DB queries
│   │   │   │       ├── middleware/
│   │   │   │       │   ├── error-handler.ts.hbs
│   │   │   │       │   ├── not-found.ts.hbs
│   │   │   │       │   └── validate.ts.hbs
│   │   │   │       ├── lib/
│   │   │   │       │   ├── config.ts.hbs                ← env validation with zod/envalid
│   │   │   │       │   └── utils.ts.hbs                 ← NEW
│   │   │   │       └── types/
│   │   │   │           └── index.ts.hbs                 ← NEW: Express extended types
│   │   │   │
│   │   │   ├── fastify/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── server.ts.hbs
│   │   │   │       ├── tsconfig.json.hbs
│   │   │   │       ├── routes/
│   │   │   │       │   ├── index.ts.hbs
│   │   │   │       │   ├── health.ts.hbs
│   │   │   │       │   └── users.ts.hbs
│   │   │   │       ├── plugins/                         ← Fastify plugin pattern
│   │   │   │       │   └── sensible.ts.hbs              ← NEW: @fastify/sensible
│   │   │   │       ├── services/
│   │   │   │       │   └── user.service.ts.hbs
│   │   │   │       ├── schemas/                         ← NEW: Fastify JSON schemas
│   │   │   │       │   └── user.schema.ts.hbs
│   │   │   │       ├── lib/
│   │   │   │       │   ├── config.ts.hbs
│   │   │   │       │   └── utils.ts.hbs                 ← NEW
│   │   │   │       └── types/
│   │   │   │           └── index.ts.hbs                 ← NEW
│   │   │   │
│   │   │   ├── nestjs/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── main.ts.hbs
│   │   │   │       ├── app.module.ts.hbs
│   │   │   │       ├── app.controller.ts.hbs
│   │   │   │       ├── app.service.ts.hbs
│   │   │   │       ├── tsconfig.json.hbs
│   │   │   │       ├── tsconfig.build.json.hbs          ← NEW
│   │   │   │       ├── nest-cli.json.hbs
│   │   │   │       ├── common/                          ← NEW: NestJS common patterns
│   │   │   │       │   ├── filters/
│   │   │   │       │   │   └── http-exception.filter.ts.hbs
│   │   │   │       │   ├── interceptors/
│   │   │   │       │   │   └── logging.interceptor.ts.hbs
│   │   │   │       │   ├── guards/                      ← NEW: when hasAuth
│   │   │   │       │   │   └── auth.guard.ts.hbs
│   │   │   │       │   └── decorators/                  ← NEW
│   │   │   │       │       └── current-user.decorator.ts.hbs
│   │   │   │       ├── config/                          ← NEW: NestJS ConfigModule
│   │   │   │       │   └── configuration.ts.hbs
│   │   │   │       └── users/
│   │   │   │           ├── users.module.ts.hbs
│   │   │   │           ├── users.controller.ts.hbs
│   │   │   │           ├── users.service.ts.hbs
│   │   │   │           ├── entities/                    ← NEW
│   │   │   │           │   └── user.entity.ts.hbs
│   │   │   │           └── dto/
│   │   │   │               ├── create-user.dto.ts.hbs
│   │   │   │               └── update-user.dto.ts.hbs   ← NEW
│   │   │   │
│   │   │   ├── hono/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── server.ts.hbs
│   │   │   │       ├── tsconfig.json.hbs
│   │   │   │       ├── routes/
│   │   │   │       │   ├── index.ts.hbs
│   │   │   │       │   ├── health.ts.hbs
│   │   │   │       │   └── users.ts.hbs
│   │   │   │       ├── middleware/                       ← NEW
│   │   │   │       │   └── error-handler.ts.hbs
│   │   │   │       └── lib/
│   │   │   │           ├── config.ts.hbs
│   │   │   │           └── utils.ts.hbs                 ← NEW
│   │   │   │
│   │   │   └── django/
│   │   │       ├── meta.ts
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           ├── manage.py.hbs
│   │   │           ├── requirements.txt.hbs
│   │   │           ├── config/
│   │   │           │   ├── settings.py.hbs              ← {{#if}} for cors, database, etc.
│   │   │           │   ├── urls.py.hbs
│   │   │           │   ├── wsgi.py.hbs
│   │   │           │   └── asgi.py.hbs                  ← NEW: async support
│   │   │           ├── users/
│   │   │           │   ├── models.py.hbs
│   │   │           │   ├── views.py.hbs
│   │   │           │   ├── urls.py.hbs
│   │   │           │   ├── serializers.py.hbs
│   │   │           │   ├── admin.py.hbs                 ← NEW: Django admin registration
│   │   │           │   └── tests.py.hbs                 ← NEW: Django test
│   │   │           └── core/                            ← NEW: shared Django app
│   │   │               ├── permissions.py.hbs
│   │   │               └── pagination.py.hbs
│   │   │
│   │   ├── api-style/                                   ← NEW CATEGORY: server-side API style plugins
│   │   │   ├── graphql-server/
│   │   │   │   ├── meta.ts                              ← showWhen: hasBackend && apiStyle === 'graphql'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── schema.ts.hbs                    ← type-graphql or @apollo/server schema
│   │   │   │       ├── resolvers/
│   │   │   │       │   ├── index.ts.hbs
│   │   │   │       │   └── user.resolver.ts.hbs
│   │   │   │       ├── types/
│   │   │   │       │   └── user.type.ts.hbs
│   │   │   │       ├── server-plugin.ts.hbs             ← integration with Express/Fastify/NestJS
│   │   │   │       ├── route-import.hbs                 ← injection
│   │   │   │       └── route-register.hbs               ← injection
│   │   │   │
│   │   │   └── trpc-server/
│   │   │       ├── meta.ts                              ← showWhen: hasBackend && apiStyle === 'trpc'
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           ├── trpc.ts.hbs                      ← initTRPC, context, middleware
│   │   │           ├── routers/
│   │   │           │   ├── index.ts.hbs                 ← appRouter
│   │   │           │   └── user.router.ts.hbs
│   │   │           ├── server-plugin.ts.hbs             ← Express/Fastify adapter
│   │   │           ├── route-import.hbs
│   │   │           └── route-register.hbs
│   │   │
│   │   ├── databases/
│   │   │   ├── postgres/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── env-fragment.hbs
│   │   │   │
│   │   │   ├── mongodb/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── env-fragment.hbs
│   │   │   │
│   │   │   ├── mysql/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── env-fragment.hbs
│   │   │   │
│   │   │   ├── sqlite/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── env-fragment.hbs
│   │   │   │
│   │   │   └── redis/
│   │   │       ├── meta.ts
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           ├── redis-client.ts.hbs
│   │   │           └── env-fragment.hbs
│   │   │
│   │   ├── orms/
│   │   │   ├── prisma/
│   │   │   │   ├── meta.ts                              ← conflicts: ['mongoose'], requires SQL DB
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── schema.prisma.hbs                ← {{#if hasAuth}} adds User fields
│   │   │   │       ├── db-client.ts.hbs                 ← singleton pattern
│   │   │   │       ├── seed.ts.hbs
│   │   │   │       └── migrations/                      ← NEW: initial migration readme
│   │   │   │           └── README.md.hbs
│   │   │   │
│   │   │   ├── drizzle/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── schema.ts.hbs
│   │   │   │       ├── db-client.ts.hbs
│   │   │   │       ├── migrate.ts.hbs
│   │   │   │       ├── seed.ts.hbs                      ← NEW
│   │   │   │       └── drizzle.config.ts.hbs
│   │   │   │
│   │   │   ├── typeorm/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── data-source.ts.hbs
│   │   │   │       ├── db-client.ts.hbs
│   │   │   │       ├── seed.ts.hbs                      ← NEW
│   │   │   │       └── entities/
│   │   │   │           └── user.entity.ts.hbs
│   │   │   │
│   │   │   └── mongoose/
│   │   │       ├── meta.ts                              ← conflicts: ['prisma','drizzle','typeorm']
│   │   │       │                                           requires: ['mongodb']
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           ├── connection.ts.hbs
│   │   │           ├── seed.ts.hbs                      ← NEW
│   │   │           └── models/
│   │   │               └── user.model.ts.hbs
│   │   │
│   │   ├── auth/
│   │   │   ├── jwt-custom/
│   │   │   │   ├── meta.ts                              ← universal, works with any backend
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── backend/                          ← NEW: split by target
│   │   │   │       │   ├── auth.middleware.ts.hbs
│   │   │   │       │   ├── auth.service.ts.hbs
│   │   │   │       │   ├── auth.routes.ts.hbs           ← login, register, refresh, me
│   │   │   │       │   ├── jwt.utils.ts.hbs
│   │   │   │       │   ├── route-import.hbs
│   │   │   │       │   └── route-register.hbs
│   │   │   │       └── frontend/                        ← NEW: auth UI per platform
│   │   │   │           ├── web/
│   │   │   │           │   ├── LoginPage.tsx.hbs
│   │   │   │           │   ├── RegisterPage.tsx.hbs
│   │   │   │           │   ├── AuthProvider.tsx.hbs
│   │   │   │           │   └── ProtectedRoute.tsx.hbs
│   │   │   │           └── mobile/
│   │   │   │               ├── LoginScreen.tsx.hbs
│   │   │   │               ├── RegisterScreen.tsx.hbs
│   │   │   │               ├── AuthProvider.tsx.hbs
│   │   │   │               └── auth-layout.tsx.hbs      ← expo-router (auth) group layout
│   │   │   │
│   │   │   ├── next-auth/
│   │   │   │   ├── meta.ts                              ← showWhen: webFramework === 'next'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── auth.config.ts.hbs
│   │   │   │       ├── auth.ts.hbs
│   │   │   │       ├── middleware.ts.hbs
│   │   │   │       └── providers/
│   │   │   │           └── SessionProvider.tsx.hbs       ← NEW
│   │   │   │
│   │   │   ├── clerk/
│   │   │   │   ├── meta.ts                              ← works with web AND mobile
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── web/                             ← NEW: split
│   │   │   │       │   ├── middleware.ts.hbs
│   │   │   │       │   └── providers/
│   │   │   │       │       └── ClerkProvider.tsx.hbs
│   │   │   │       └── mobile/                          ← NEW: Clerk for RN
│   │   │   │           └── providers/
│   │   │   │               └── ClerkProvider.tsx.hbs
│   │   │   │
│   │   │   └── lucia/
│   │   │       ├── meta.ts
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           ├── auth.ts.hbs
│   │   │           ├── auth.middleware.ts.hbs
│   │   │           ├── auth.routes.ts.hbs
│   │   │           ├── route-import.hbs                 ← NEW
│   │   │           └── route-register.hbs               ← NEW
│   │   │
│   │   ├── styling/
│   │   │   ├── web/
│   │   │   │   ├── tailwind/
│   │   │   │   │   ├── meta.ts
│   │   │   │   │   ├── file-map.ts
│   │   │   │   │   └── templates/
│   │   │   │   │       ├── tailwind.config.ts.hbs
│   │   │   │   │       ├── postcss.config.js.hbs
│   │   │   │   │       └── globals.css.hbs              ← @tailwind directives + base styles
│   │   │   │   │
│   │   │   │   ├── styled-components/
│   │   │   │   │   ├── meta.ts
│   │   │   │   │   ├── file-map.ts
│   │   │   │   │   └── templates/
│   │   │   │   │       ├── theme.ts.hbs
│   │   │   │   │       ├── global-styles.ts.hbs
│   │   │   │   │       ├── styled.d.ts.hbs
│   │   │   │   │       └── providers/                   ← NEW
│   │   │   │   │           └── ThemeProvider.tsx.hbs
│   │   │   │   │
│   │   │   │   └── css-modules/
│   │   │   │       ├── meta.ts
│   │   │   │       ├── file-map.ts
│   │   │   │       └── templates/
│   │   │   │           ├── globals.css.hbs
│   │   │   │           └── styles/                      ← NEW: sample module files
│   │   │   │               ├── Layout.module.css.hbs
│   │   │   │               └── Navbar.module.css.hbs
│   │   │   │
│   │   │   └── mobile/
│   │   │       ├── nativewind/
│   │   │       │   ├── meta.ts                          ← requires: expo OR react-native-cli
│   │   │       │   ├── file-map.ts
│   │   │       │   └── templates/
│   │   │       │       ├── tailwind.config.js.hbs
│   │   │       │       ├── global.css.hbs
│   │   │       │       ├── nativewind-env.d.ts.hbs      ← NEW: NativeWind type declarations
│   │   │       │       └── metro.config.patch.hbs       ← NEW: metro config additions for NW
│   │   │       │
│   │   │       ├── rn-stylesheet/
│   │   │       │   ├── meta.ts
│   │   │       │   ├── file-map.ts
│   │   │       │   └── templates/
│   │   │       │       ├── theme.ts.hbs                 ← colors, spacing, typography
│   │   │       │       └── styles/                      ← NEW: shared style sheets
│   │   │       │           └── common.ts.hbs
│   │   │       │
│   │   │       └── styled-components-rn/               ← NEW PLUGIN: styled-components for RN
│   │   │           ├── meta.ts
│   │   │           ├── file-map.ts
│   │   │           └── templates/
│   │   │               ├── theme.ts.hbs
│   │   │               ├── styled.d.ts.hbs
│   │   │               └── providers/
│   │   │                   └── ThemeProvider.tsx.hbs
│   │   │
│   │   ├── state/
│   │   │   ├── zustand/
│   │   │   │   ├── meta.ts                              ← works web + mobile
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── stores/
│   │   │   │           ├── useAppStore.ts.hbs            ← platform-aware (localStorage vs AS)
│   │   │   │           └── useAuthStore.ts.hbs           ← when hasAuth, platform-aware
│   │   │   │
│   │   │   ├── redux-toolkit/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── store.ts.hbs
│   │   │   │       ├── hooks.ts.hbs                     ← NEW: useAppDispatch, useAppSelector
│   │   │   │       ├── providers/
│   │   │   │       │   └── StoreProvider.tsx.hbs
│   │   │   │       └── slices/
│   │   │   │           ├── appSlice.ts.hbs
│   │   │   │           └── authSlice.ts.hbs
│   │   │   │
│   │   │   ├── tanstack-query/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── query-client.ts.hbs              ← NEW: extracted client config
│   │   │   │       ├── providers/
│   │   │   │       │   └── QueryProvider.tsx.hbs
│   │   │   │       └── hooks/
│   │   │   │           ├── useUsers.ts.hbs
│   │   │   │           └── useAuth.ts.hbs               ← NEW: when hasAuth
│   │   │   │
│   │   │   └── mobx/
│   │   │       ├── meta.ts
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           ├── providers/                       ← NEW
│   │   │           │   └── StoreProvider.tsx.hbs
│   │   │           └── stores/
│   │   │               ├── RootStore.ts.hbs
│   │   │               ├── AppStore.ts.hbs
│   │   │               └── AuthStore.ts.hbs             ← NEW: when hasAuth
│   │   │
│   │   ├── forms/
│   │   │   ├── react-hook-form/
│   │   │   │   ├── meta.ts                              ← showWhen: platform !== 'mobile'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── components/
│   │   │   │       │   ├── SampleForm.tsx.hbs
│   │   │   │       │   └── FormField.tsx.hbs            ← NEW: reusable form field wrapper
│   │   │   │       ├── hooks/
│   │   │   │       │   └── useFormHelper.ts.hbs
│   │   │   │       └── lib/
│   │   │   │           └── validators.ts.hbs            ← Zod schemas
│   │   │   │
│   │   │   └── formik/
│   │   │       ├── meta.ts                              ← showWhen: platform !== 'mobile'
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           ├── components/
│   │   │           │   └── SampleForm.tsx.hbs
│   │   │           └── lib/
│   │   │               └── validators.ts.hbs            ← NEW: Yup schemas
│   │   │
│   │   ├── ui-library/
│   │   │   ├── shadcn/
│   │   │   │   ├── meta.ts                              ← showWhen: platform !== 'mobile',
│   │   │   │   │                                           requires: ['tailwind']
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── components.json.hbs
│   │   │   │       ├── lib/
│   │   │   │       │   └── utils.ts.hbs                 ← NEW: cn() helper
│   │   │   │       └── components/
│   │   │   │           └── ui/
│   │   │   │               ├── button.tsx.hbs
│   │   │   │               ├── input.tsx.hbs
│   │   │   │               ├── card.tsx.hbs
│   │   │   │               ├── dialog.tsx.hbs           ← NEW
│   │   │   │               ├── dropdown-menu.tsx.hbs    ← NEW
│   │   │   │               └── toast.tsx.hbs            ← NEW
│   │   │   │
│   │   │   ├── mui/
│   │   │   │   ├── meta.ts                              ← showWhen: platform !== 'mobile'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── theme.ts.hbs
│   │   │   │       ├── emotion-cache.ts.hbs             ← NEW: SSR emotion cache
│   │   │   │       └── providers/
│   │   │   │           └── ThemeProvider.tsx.hbs
│   │   │   │
│   │   │   └── ant-design/
│   │   │       ├── meta.ts                              ← showWhen: platform !== 'mobile'
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           ├── theme.ts.hbs
│   │   │           └── providers/
│   │   │               └── AntdProvider.tsx.hbs
│   │   │
│   │   ├── api-client/
│   │   │   ├── axios/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── api-client.ts.hbs                ← platform-aware (SecureStore vs localStorage
│   │   │   │                                               for auth token in interceptors)
│   │   │   │
│   │   │   ├── fetch-wrapper/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── api-client.ts.hbs
│   │   │   │
│   │   │   └── trpc-client/
│   │   │       ├── meta.ts                              ← showWhen: apiStyle === 'trpc',
│   │   │       │                                           requires TS frontend
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           ├── trpc.ts.hbs
│   │   │           └── providers/
│   │   │               └── TrpcProvider.tsx.hbs
│   │   │
│   │   ├── mobile-navigation/
│   │   │   ├── react-navigation/
│   │   │   │   ├── meta.ts                              ← showWhen: platform === 'mobile' &&
│   │   │   │   │                                           mobileFramework !== 'flutter'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── RootNavigator.tsx.hbs
│   │   │   │       ├── TabNavigator.tsx.hbs
│   │   │   │       ├── AuthNavigator.tsx.hbs            ← NEW: when hasAuth
│   │   │   │       ├── linking.ts.hbs                   ← NEW: deep linking config
│   │   │   │       └── types.ts.hbs
│   │   │   │
│   │   │   └── expo-router/
│   │   │       ├── meta.ts                              ← showWhen: mobileFramework === 'expo'
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           ├── app/
│   │   │           │   ├── _layout.tsx.hbs              ← wraps providers based on active plugins
│   │   │           │   ├── index.tsx.hbs
│   │   │           │   ├── profile.tsx.hbs
│   │   │           │   ├── settings.tsx.hbs             ← NEW
│   │   │           │   ├── +not-found.tsx.hbs           ← NEW
│   │   │           │   ├── (tabs)/                      ← NEW: tab layout
│   │   │           │   │   ├── _layout.tsx.hbs
│   │   │           │   │   ├── index.tsx.hbs
│   │   │           │   │   └── profile.tsx.hbs
│   │   │           │   └── (auth)/                      ← NEW: when hasAuth
│   │   │           │       ├── _layout.tsx.hbs
│   │   │           │       ├── login.tsx.hbs
│   │   │           │       └── register.tsx.hbs
│   │   │           └── types.ts.hbs
│   │   │
│   │   ├── frontend-extras/
│   │   │   │
│   │   │   │   ── UNIVERSAL (web + mobile) ──
│   │   │   │
│   │   │   ├── date-fns/
│   │   │   │   ├── meta.ts                              ← platformSupport: 'all'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── lib/
│   │   │   │           └── date-helpers.ts.hbs
│   │   │   │
│   │   │   ├── i18next/
│   │   │   │   ├── meta.ts                              ← platformSupport: 'all'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── i18n.ts.hbs                      ← platform-aware init
│   │   │   │       └── locales/
│   │   │   │           ├── en.json.hbs
│   │   │   │           └── es.json.hbs
│   │   │   │
│   │   │   │   ── WEB-ONLY ──
│   │   │   │
│   │   │   ├── recharts/
│   │   │   │   ├── meta.ts                              ← platformSupport: 'web-only'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── components/
│   │   │   │       │   ├── SampleBarChart.tsx.hbs
│   │   │   │       │   └── SampleLineChart.tsx.hbs
│   │   │   │       └── data/
│   │   │   │           └── sample-chart-data.ts.hbs
│   │   │   │
│   │   │   ├── react-table/
│   │   │   │   ├── meta.ts                              ← platformSupport: 'web-only'
│   │   │   │   ├── file-map.ts│   │   │   │   └── templates/
│   │   │   │       ├── components/
│   │   │   │       │   └── SampleTable.tsx.hbs
│   │   │   │       └── data/
│   │   │   │           └── sample-table-data.ts.hbs
│   │   │   │
│   │   │   │   ── MOBILE-ONLY ──
│   │   │   │
│   │   │   ├── async-storage/                           ← NEW PLUGIN
│   │   │   │   ├── meta.ts                              ← platformSupport: 'mobile-only'
│   │   │   │   │                                           deps: ['@react-native-async-storage/async-storage']
│   │   │   │   │                                           showWhen: mobileFramework !== 'flutter'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── lib/
│   │   │   │           └── storage.ts.hbs               ← typed wrapper around AsyncStorage
│   │   │   │
│   │   │   ├── expo-secure-store/                       ← NEW PLUGIN
│   │   │   │   ├── meta.ts                              ← platformSupport: 'mobile-only'
│   │   │   │   │                                           requires: ['expo']
│   │   │   │   │                                           deps: ['expo-secure-store']
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── lib/
│   │   │   │           └── secure-storage.ts.hbs        ← typed wrapper, getToken/setToken/clear
│   │   │   │
│   │   │   ├── expo-image/                              ← NEW PLUGIN
│   │   │   │   ├── meta.ts                              ← requires: ['expo']
│   │   │   │   │                                           deps: ['expo-image']
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── components/
│   │   │   │           └── OptimizedImage.tsx.hbs       ← cached image component
│   │   │   │
│   │   │   ├── react-native-reanimated/                 ← NEW PLUGIN
│   │   │   │   ├── meta.ts                              ← platformSupport: 'mobile-only'
│   │   │   │   │                                           deps: ['react-native-reanimated']
│   │   │   │   │                                           showWhen: mobileFramework !== 'flutter'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── babel-plugin.hbs                 ← injection into babel.config.js
│   │   │   │       └── components/
│   │   │   │           └── AnimatedCard.tsx.hbs         ← sample animated component
│   │   │   │
│   │   │   ├── lottie-rn/                               ← NEW PLUGIN
│   │   │   │   ├── meta.ts                              ← platformSupport: 'mobile-only'
│   │   │   │   │                                           deps: ['lottie-react-native']
│   │   │   │   │                                           showWhen: mobileFramework !== 'flutter'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── components/
│   │   │   │       │   └── LottieAnimation.tsx.hbs
│   │   │   │       └── assets/
│   │   │   │           └── sample-animation.json.hbs    ← small sample Lottie JSON
│   │   │   │
│   │   │   ├── react-native-maps/                       ← NEW PLUGIN
│   │   │   │   ├── meta.ts                              ← platformSupport: 'mobile-only'
│   │   │   │   │                                           deps: ['react-native-maps']
│   │   │   │   │                                           envVars: [EXPO_PUBLIC_GOOGLE_MAPS_API_KEY]
│   │   │   │   │                                           showWhen: mobileFramework !== 'flutter'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── components/
│   │   │   │       │   └── MapView.tsx.hbs              ← sample map with markers
│   │   │   │       └── screens/
│   │   │   │           └── MapScreen.tsx.hbs            ← when hasExpoRouter
│   │   │   │
│   │   │   ├── react-native-push-notifications/         ← NEW PLUGIN
│   │   │   │   ├── meta.ts                              ← platformSupport: 'mobile-only'
│   │   │   │   │                                           deps: ['expo-notifications', 'expo-device']
│   │   │   │   │                                           showWhen: mobileFramework === 'expo'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── lib/
│   │   │   │       │   └── notifications.ts.hbs         ← register, listen, request permission
│   │   │   │       └── hooks/
│   │   │   │           └── useNotifications.ts.hbs
│   │   │   │
│   │   │   ├── expo-camera/                             ← NEW PLUGIN
│   │   │   │   ├── meta.ts                              ← requires: ['expo']
│   │   │   │   │                                           deps: ['expo-camera']
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── components/
│   │   │   │       │   └── CameraView.tsx.hbs
│   │   │   │       └── hooks/
│   │   │   │           └── useCamera.ts.hbs
│   │   │   │
│   │   │   ├── expo-location/                           ← NEW PLUGIN
│   │   │   │   ├── meta.ts                              ← requires: ['expo']
│   │   │   │   │                                           deps: ['expo-location']
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── hooks/
│   │   │   │           └── useLocation.ts.hbs           ← permissions + watch position
│   │   │   │
│   │   │   ├── react-native-gesture-handler/            ← NEW PLUGIN
│   │   │   │   ├── meta.ts                              ← platformSupport: 'mobile-only'
│   │   │   │   │                                           deps: ['react-native-gesture-handler']
│   │   │   │   │                                           showWhen: mobileFramework !== 'flutter'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── components/
│   │   │   │           └── SwipeableCard.tsx.hbs
│   │   │   │
│   │   │   ├── react-native-svg/                        ← NEW PLUGIN
│   │   │   │   ├── meta.ts                              ← platformSupport: 'mobile-only'
│   │   │   │   │                                           deps: ['react-native-svg']
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── components/
│   │   │   │           └── SvgIcon.tsx.hbs
│   │   │   │
│   │   │   ├── expo-haptics/                            ← NEW PLUGIN
│   │   │   │   ├── meta.ts                              ← requires: ['expo']
│   │   │   │   │                                           deps: ['expo-haptics']
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── lib/
│   │   │   │           └── haptics.ts.hbs               ← wrapper for haptic feedback
│   │   │   │
│   │   │   ├── react-native-mmkv/                       ← NEW PLUGIN
│   │   │   │   ├── meta.ts                              ← platformSupport: 'mobile-only'
│   │   │   │   │                                           deps: ['react-native-mmkv']
│   │   │   │   │                                           conflicts: ['async-storage']
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── lib/
│   │   │   │           └── storage.ts.hbs               ← MMKV instance + typed helpers
│   │   │   │
│   │   │   └── react-native-bottom-sheet/               ← NEW PLUGIN
│   │   │       ├── meta.ts                              ← platformSupport: 'mobile-only'
│   │   │       │                                           deps: ['@gorhom/bottom-sheet']
│   │   │       │                                           requires one of: ['react-native-reanimated']
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           └── components/
│   │   │               └── SampleBottomSheet.tsx.hbs
│   │   │
│   │   ├── backend-extras/
│   │   │   ├── multer/
│   │   │   │   ├── meta.ts                              ← showWhen: backendFramework === 'express'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── upload.middleware.ts.hbs
│   │   │   │       ├── upload.routes.ts.hbs
│   │   │   │       ├── route-import.hbs
│   │   │   │       └── route-register.hbs
│   │   │   │
│   │   │   ├── s3-upload/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── s3.service.ts.hbs
│   │   │   │       ├── upload.routes.ts.hbs
│   │   │   │       ├── route-import.hbs
│   │   │   │       └── route-register.hbs
│   │   │   │
│   │   │   ├── rate-limit/                              ← NEW PLUGIN (was only in fastify templates)
│   │   │   │   ├── meta.ts                              ← adapts to express/fastify/hono
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── rate-limit.express.ts.hbs
│   │   │   │       ├── rate-limit.fastify.ts.hbs
│   │   │   │       ├── rate-limit.hono.ts.hbs
│   │   │   │       └── rate-limit.nestjs.ts.hbs
│   │   │   │
│   │   │   ├── cors-config/                             ← NEW PLUGIN (was only in framework templates)
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── cors.ts.hbs                      ← framework-aware via conditionals
│   │   │   │
│   │   │   ├── helmet/                                  ← NEW PLUGIN: security headers
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── security.ts.hbs
│   │   │   │
│   │   │   ├── websocket/                               ← NEW PLUGIN
│   │   │   │   ├── meta.ts                              ← deps vary by backend framework
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── websocket.ts.hbs                 ← Socket.io or ws setup
│   │   │   │       ├── events/
│   │   │   │       │   └── chat.ts.hbs                  ← sample event handler
│   │   │   │       ├── route-import.hbs
│   │   │   │       └── route-register.hbs
│   │   │   │
│   │   │   ├── bullmq/                                  ← NEW PLUGIN: background jobs
│   │   │   │   ├── meta.ts                              ← requires: ['redis']
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── queue.ts.hbs                     ← queue setup
│   │   │   │       ├── workers/
│   │   │   │       │   └── email.worker.ts.hbs          ← sample worker
│   │   │   │       └── jobs/
│   │   │   │           └── send-email.ts.hbs            ← sample job producer
│   │   │   │
│   │   │   ├── firebase-push/                           ← NEW PLUGIN: push notification backend
│   │   │   │   ├── meta.ts                              ← showWhen: projectType === 'mobile-app'
│   │   │   │   │                                           || platform === 'mobile' || platform === 'both'
│   │   │   │   │                                           deps: ['firebase-admin']
│   │   │   │   │                                           envVars: FIREBASE_PROJECT_ID, etc.
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── firebase.ts.hbs                  ← Firebase Admin initialization
│   │   │   │       ├── push.service.ts.hbs              ← send notification function
│   │   │   │       ├── push.routes.ts.hbs               ← register device token, send test
│   │   │   │       ├── route-import.hbs
│   │   │   │       └── route-register.hbs
│   │   │   │
│   │   │   ├── email/                                   ← NEW PLUGIN: email sending
│   │   │   │   ├── meta.ts                              ← deps: ['nodemailer'] or ['@sendgrid/mail']
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── email.service.ts.hbs
│   │   │   │       ├── templates/                       ← email HTML templates
│   │   │   │       │   ├── welcome.hbs.hbs
│   │   │   │       │   └── reset-password.hbs.hbs
│   │   │   │       └── email.routes.ts.hbs
│   │   │   │
│   │   │   ├── swagger/                                 ← NEW PLUGIN: API documentation
│   │   │   │   ├── meta.ts                              ← showWhen: apiStyle === 'rest'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── swagger.express.ts.hbs
│   │   │   │       ├── swagger.fastify.ts.hbs
│   │   │   │       └── swagger.nestjs.ts.hbs
│   │   │   │
│   │   │   ├── compression/                             ← NEW PLUGIN
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── compression.ts.hbs
│   │   │   │
│   │   │   └── cron/                                    ← NEW PLUGIN: scheduled tasks
│   │   │       ├── meta.ts                              ← deps: ['node-cron']
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           ├── cron.ts.hbs                      ← cron scheduler setup
│   │   │           └── jobs/
│   │   │               └── cleanup.ts.hbs               ← sample scheduled job
│   │   │
│   │   ├── testing/
│   │   │   ├── vitest/
│   │   │   │   ├── meta.ts                              ← platformSupport: 'web-only' + 'backend'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── vitest.config.ts.hbs
│   │   │   │       ├── setup.ts.hbs
│   │   │   │       └── __tests__/
│   │   │   │           └── sample.test.ts.hbs
│   │   │   │
│   │   │   ├── jest/
│   │   │   │   ├── meta.ts                              ← platformSupport: 'all'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── jest.config.ts.hbs               ← adapts preset for RN vs Node vs web
│   │   │   │       ├── setup.ts.hbs
│   │   │   │       └── __tests__/
│   │   │   │           └── sample.test.ts.hbs
│   │   │   │
│   │   │   ├── playwright/
│   │   │   │   ├── meta.ts                              ← showWhen: platform !== 'mobile'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── playwright.config.ts.hbs
│   │   │   │       └── e2e/
│   │   │   │           ├── home.spec.ts.hbs
│   │   │   │           └── auth.spec.ts.hbs             ← NEW: when hasAuth
│   │   │   │
│   │   │   ├── cypress/
│   │   │   │   ├── meta.ts                              ← showWhen: platform !== 'mobile'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── cypress.config.ts.hbs
│   │   │   │       ├── support/
│   │   │   │       │   ├── commands.ts.hbs
│   │   │   │       │   └── e2e.ts.hbs                   ← NEW
│   │   │   │       └── e2e/
│   │   │   │           ├── home.cy.ts.hbs
│   │   │   │           └── auth.cy.ts.hbs               ← NEW: when hasAuth
│   │   │   │
│   │   │   ├── detox/                                   ← NEW PLUGIN: mobile E2E
│   │   │   │   ├── meta.ts                              ← platformSupport: 'mobile-only'
│   │   │   │   │                                           showWhen: mobileFramework !== 'flutter'
│   │   │   │   │                                           devDeps: ['detox', '@types/detox']
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── .detoxrc.js.hbs
│   │   │   │       └── e2e/
│   │   │   │           ├── setup.ts.hbs
│   │   │   │           ├── home.test.ts.hbs
│   │   │   │           └── auth.test.ts.hbs             ← when hasAuth
│   │   │   │
│   │   │   ├── maestro/                                 ← NEW PLUGIN: mobile E2E (no-code style)
│   │   │   │   ├── meta.ts                              ← platformSupport: 'mobile-only'
│   │   │   │   │                                           conflicts: ['detox']
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── .maestro/
│   │   │   │           ├── home.yaml.hbs
│   │   │   │           └── login.yaml.hbs               ← when hasAuth
│   │   │   │
│   │   │   ├── testing-library-react/                   ← NEW PLUGIN
│   │   │   │   ├── meta.ts                              ← showWhen: platform !== 'mobile' &&
│   │   │   │   │                                           (webFramework === 'react-vite' || webFramework === 'next')
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── setup.ts.hbs
│   │   │   │       └── __tests__/
│   │   │   │           └── Home.test.tsx.hbs
│   │   │   │
│   │   │   ├── testing-library-react-native/            ← NEW PLUGIN
│   │   │   │   ├── meta.ts                              ← platformSupport: 'mobile-only'
│   │   │   │   │                                           showWhen: mobileFramework !== 'flutter'
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── setup.ts.hbs
│   │   │   │       └── __tests__/
│   │   │   │           └── HomeScreen.test.tsx.hbs
│   │   │   │
│   │   │   └── supertest/                               ← NEW PLUGIN: API integration tests
│   │   │       ├── meta.ts                              ← showWhen: hasBackend
│   │   │       │                                           devDeps: ['supertest', '@types/supertest']
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           └── __tests__/
│   │   │               ├── health.test.ts.hbs
│   │   │               └── users.test.ts.hbs
│   │   │
│   │   ├── logging/
│   │   │   ├── winston/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── logger.ts.hbs                    ← transports: console, file, {{#if hasSentry}}
│   │   │   │
│   │   │   └── pino/
│   │   │       ├── meta.ts
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           └── logger.ts.hbs
│   │   │
│   │   ├── monitoring/
│   │   │   ├── sentry/
│   │   │   │   ├── meta.ts                              ← showWhen: platform !== 'mobile'
│   │   │   │   │                                           (web + backend only variant)
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── sentry.client.ts.hbs
│   │   │   │       └── sentry.server.ts.hbs
│   │   │   │
│   │   │   ├── sentry-react-native/                     ← NEW PLUGIN: mobile Sentry
│   │   │   │   ├── meta.ts                              ← showWhen: platform === 'mobile' || platform === 'both'
│   │   │   │   │                                           deps: ['@sentry/react-native']
│   │   │   │   │                                           conflicts: ['sentry'] (can't have both)
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── sentry.mobile.ts.hbs             ← Sentry.init for RN
│   │   │   │       ├── sentry.server.ts.hbs             ← same backend Sentry
│   │   │   │       └── sentry.wrap.hbs                  ← injection: Sentry.wrap(RootLayout)
│   │   │   │
│   │   │   └── datadog/
│   │   │       ├── meta.ts
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           ├── datadog.ts.hbs
│   │   │           └── datadog.mobile.ts.hbs            ← NEW: when platform === 'mobile'
│   │   │
│   │   ├── devtools/
│   │   │   ├── eslint/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── eslint.config.js.hbs             ← flat config, adapts to framework
│   │   │   │       └── .eslintignore.hbs                ← NEW
│   │   │   │
│   │   │   ├── prettier/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── .prettierrc.hbs
│   │   │   │       └── .prettierignore.hbs
│   │   │   │
│   │   │   ├── husky/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── pre-commit.hbs                   ← {{#if hasLintStaged}} runs lint-staged
│   │   │   │       └── commit-msg.hbs                   ← {{#if hasCommitlint}} runs commitlint
│   │   │   │
│   │   │   ├── lint-staged/
│   │   │   │   ├── meta.ts                              ← requires: ['husky']
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── .lintstagedrc.hbs                ← adapts globs to framework
│   │   │   │
│   │   │   └── commitlint/
│   │   │       ├── meta.ts                              ← requires: ['husky']
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           └── commitlint.config.js.hbs
│   │   │
│   │   ├── devops/
│   │   │   ├── docker/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── Dockerfile.frontend.hbs          ← when: platform !== 'mobile' (can't Docker mobile)
│   │   │   │       ├── Dockerfile.backend.hbs
│   │   │   │       ├── docker-compose.yml.hbs           ← {{#if hasPostgres}} db service, etc.
│   │   │   │       ├── docker-compose.dev.yml.hbs       ← dev override with volumes
│   │   │   │       ├── docker-compose.test.yml.hbs      ← NEW: test DB container
│   │   │   │       └── .dockerignore.hbs
│   │   │   │
│   │   │   ├── github-actions/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       ├── ci.yml.hbs                       ← test + lint + type-check
│   │   │   │       ├── deploy.yml.hbs                   ← adapts to deployment target
│   │   │   │       └── mobile-build.yml.hbs             ← NEW: when platform === 'mobile'
│   │   │   │                                               EAS build in CI
│   │   │   │
│   │   │   ├── gitlab-ci/
│   │   │   │   ├── meta.ts
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── .gitlab-ci.yml.hbs
│   │   │   │
│   │   │   ├── eas-build/                               ← NEW PLUGIN: Expo Application Services
│   │   │   │   ├── meta.ts                              ← showWhen: mobileFramework === 'expo'
│   │   │   │   │                                           requires: ['expo']
│   │   │   │   ├── file-map.ts
│   │   │   │   └── templates/
│   │   │   │       └── eas.json.hbs                     ← build profiles: dev, preview, production
│   │   │   │
│   │   │   └── fastlane/                                ← NEW PLUGIN
│   │   │       ├── meta.ts                              ← showWhen: platform === 'mobile'
│   │   │       │                                           mobileFramework !== 'flutter'
│   │   │       ├── file-map.ts
│   │   │       └── templates/
│   │   │           ├── Fastfile.hbs
│   │   │           ├── Appfile.hbs
│   │   │           └── Matchfile.hbs                    ← code signing
│   │   │
│   │   └── deployment/
│   │       ├── vercel/
│   │       │   ├── meta.ts                              ← showWhen: platform !== 'mobile'
│   │       │   ├── file-map.ts
│   │       │   └── templates/
│   │       │       └── vercel.json.hbs
│   │       │
│   │       ├── railway/
│   │       │   ├── meta.ts
│   │       │   ├── file-map.ts
│   │       │   └── templates/
│   │       │       ├── railway.toml.hbs
│   │       │       └── railway.json.hbs                 ← NEW: Railway project config
│   │       │
│   │       ├── aws/
│   │       │   ├── meta.ts
│   │       │   ├── file-map.ts
│   │       │   └── templates/
│   │       │       ├── aws-config.yml.hbs
│   │       │       └── buildspec.yml.hbs                ← NEW: CodeBuild spec
│   │       │
│   │       ├── flyio/
│   │       │   ├── meta.ts
│   │       │   ├── file-map.ts
│   │       │   └── templates/
│   │       │       └── fly.toml.hbs
│   │       │
│   │       └── eas-submit/                              ← NEW PLUGIN: App store submission
│   │           ├── meta.ts                              ← showWhen: mobileFramework === 'expo'
│   │           │                                           requires: ['eas-build']
│   │           ├── file-map.ts
│   │           └── templates/
│   │               └── eas-submit.json.hbs              ← iOS + Android submission config
│   │
│   ├── layouts/
│   │   ├── types.ts                                     ← LayoutStrategy interface:
│   │   │                                                   resolvePath(relativePath, target) → string
│   │   │                                                   scaffold() → string[]
│   │   │                                                   rootConfig(context) → FileEntry[]
│   │   │                                                   packageJsonTargets() → PackageJsonLocation[]
│   │   │                                                   previewTree(context) → string
│   │   ├── index.ts                                     ← factory: getLayout(structure) → LayoutStrategy
│   │   ├── single-app.ts                                ← handles: fe-only, be-only, fullstack
│   │   │                                                   fullstack mobile → mobile/ + server/
│   │   │                                                   fullstack web → client/ + server/
│   │   │                                                   fe-only → src/ at root
│   │   │                                                   be-only → src/ at root
│   │   ├── monorepo.ts                                  ← apps/web, apps/mobile, apps/api,
│   │   │                                                   packages/shared, packages/ui
│   │   │                                                   handles: turbo, nx, pnpm workspaces
│   │   ├── microservices.ts                             ← frontend/, gateway/, services/,
│   │   │                                                   shared/, infrastructure/
│   │   └── helpers/                                     ← NEW
│   │       ├── path-utils.ts                            ← sanitize paths, resolve cross-platform
│   │       └── package-json-builder.ts                  ← build package.json for any target
│   │
│   ├── generator/
│   │   ├── index.ts                                     ← main generate() function, orchestrates all steps
│   │   ├── context.ts                                   ← buildContext(answers, activePlugins) → TemplateContext
│   │   │                                                   computes all booleans, env prefix, etc.
│   │   ├── pipeline.ts                                  ← step-by-step orchestrator with progress reporting
│   │   ├── file-writer.ts                               ← write file to disk, create dirs, handle overwrite
│   │   ├── template-engine.ts                           ← Handlebars compilation, caching, custom helpers
│   │   ├── handlebars-helpers.ts                        ← NEW: custom Handlebars helpers:
│   │   │                                                   eq, neq, and, or, not, includes,
│   │   │                                                   ternary, json, uppercase, lowercase,
│   │   │                                                   camelCase, kebabCase, PascalCase
│   │   ├── injection-processor.ts                       ← NEW: handles marker-based code injection
│   │   │                                                   finds markers like // ROUTE_IMPORTS in files
│   │   │                                                   inserts rendered template at marker position
│   │   │                                                   deduplicates injections
│   │   ├── dependency-resolver.ts                       ← merge all plugin deps per package.json target
│   │   │                                                   sort alphabetically, deduplicate, version conflicts
│   │   ├── script-builder.ts                            ← merge all plugin scripts per package.json target
│   │   │                                                   handle script name collisions
│   │   ├── env-builder.ts                               ← merge all plugin env vars per target
│   │   │                                                   group by plugin, add comments, write .env.example
│   │   ├── package-json-generator.ts                    ← NEW: generates complete package.json files
│   │   │                                                   name, version, private, type, scripts, deps,
│   │   │                                                   devDeps, workspaces (if monorepo)
│   │   ├── readme-generator.ts                          ← NEW: generates customized README.md
│   │   │                                                   based on all active plugins, scripts, env vars
│   │   ├── gitignore-generator.ts                       ← NEW: generates .gitignore based on stack
│   │   │                                                   (includes RN-specific ignores for mobile, etc.)
│   │   ├── post-generate.ts                             ← git init, optional install, success message
│   │   └── validators/                                  ← NEW: pre-generation validation
│   │       ├── plugin-compatibility.ts                  ← check all conflicts + requires
│   │       ├── file-collision.ts                        ← detect two plugins writing same file
│   │       └── env-completeness.ts                      ← verify all env vars have defaults
│   │
│   ├── shared/
│   │   ├── constants.ts                                 ← version, default values, category labels
│   │   ├── logger.ts                                    ← internal CLI logger (not user project logger)
│   │   ├── errors.ts                                    ← custom error classes:
│   │   │                                                   PluginConflictError, TemplateRenderError,
│   │   │                                                   MissingDependencyError, ValidationError
│   │   ├── types.ts                                     ← NEW: shared types across all layers
│   │   │                                                   TemplateContext, FileEntry, Target,
│   │   │                                                   PlatformSupport, etc.
│   │   └── utils.ts                                     ← NEW: toKebabCase, toCamelCase, toPascalCase,
│   │                                                       deepMerge, sortKeys, etc.
│   │
│   └── commands/                                        ← NEW: additional CLI commands
│       ├── create.ts                                    ← main create command (default)
│       ├── add-plugin.ts                                ← scaffold a new plugin folder
│       │                                                   usage: create-fullstack-app add-plugin my-plugin
│       │                                                   creates meta.ts, file-map.ts, templates/ stubs
│       └── list-plugins.ts                              ← list all registered plugins with categories
│
├── templates/                                           ← global (non-plugin) templates
│   ├── gitignore/                                       ← NEW: split by stack
│   │   ├── base.hbs
│   │   ├── node.hbs
│   │   ├── react-native.hbs
│   │   ├── flutter.hbs
│   │   ├── python.hbs
│   │   └── compose.hbs                                  ← combines based on active plugins
│   ├── readme/                                          ← NEW: modular README sections
│   │   ├── header.hbs
│   │   ├── tech-stack.hbs
│   │   ├── getting-started.hbs
│   │   ├── scripts.hbs
│   │   ├── env-vars.hbs
│   │   ├── folder-structure.hbs
│   │   ├── deployment.hbs
│   │   └── contributing.hbs
│   ├── editorconfig.hbs                                 ← was static, now template
│   ├── package-json/                                    ← NEW: package.json shells
│   │   ├── root.hbs
│   │   ├── frontend.hbs
│   │   ├── backend.hbs
│   │   └── shared.hbs
│   └── monorepo/
│       ├── turbo.json.hbs
│       ├── nx.json.hbs
│       ├── nx-project.json.hbs                          ← NEW: per-app Nx config
│       └── pnpm-workspace.yaml.hbs
│
├── tests/
│   ├── unit/
│   │   ├── cli/
│   │   │   ├── visibility.test.ts
│   │   │   ├── build-answers.test.ts
│   │   │   ├── choices-registry.test.ts                 ← NEW
│   │   │   ├── navigation.test.ts                       ← NEW
│   │   │   └── review.test.ts                           ← NEW
│   │   ├── plugins/
│   │   │   ├── meta-validation.test.ts
│   │   │   ├── file-map-validation.test.ts
│   │   │   ├── conflict-checker.test.ts                 ← NEW
│   │   │   ├── dependency-checker.test.ts               ← NEW
│   │   │   └── showWhen-rules.test.ts                   ← NEW: test every plugin's showWhen
│   │   ├── layouts/
│   │   │   ├── single-app.test.ts
│   │   │   ├── monorepo.test.ts
│   │   │   ├── microservices.test.ts
│   │   │   └── path-resolution.test.ts                  ← NEW: cross-layout path tests
│   │   └── generator/
│   │       ├── context.test.ts                          ← NEW: template context builder
│   │       ├── dependency-resolver.test.ts
│   │       ├── env-builder.test.ts
│   │       ├── script-builder.test.ts
│   │       ├── injection-processor.test.ts              ← NEW
│   │       ├── template-engine.test.ts                  ← NEW
│   │       ├── handlebars-helpers.test.ts               ← NEW
│   │       └── package-json-generator.test.ts           ← NEW
│   │
│   ├── integration/
│   │   ├── full-generation.test.ts                      ← generates to temp dir, verifies output
│   │   ├── combinations.test.ts                         ← tests many plugin combinations
│   │   ├── mobile-generation.test.ts                    ← NEW: mobile-specific generation
│   │   ├── monorepo-generation.test.ts                  ← NEW
│   │   ├── microservices-generation.test.ts             ← NEW
│   │   ├── injection.test.ts                            ← NEW: test injection markers work
│   │   └── plugin-isolation.test.ts                     ← NEW: adding/removing a plugin doesn't
│   │                                                       break others
│   │
│   ├── snapshot/                                        ← NEW: snapshot testing
│   │   ├── __snapshots__/
│   │   ├── react-vite-fullstack.snap.test.ts
│   │   ├── next-prisma-auth.snap.test.ts
│   │   ├── expo-fastify-jwt.snap.test.ts                ← NEW: mobile snapshot
│   │   ├── vue-express-mongo.snap.test.ts               ← NEW
│   │   └── monorepo-saas.snap.test.ts                   ← NEW
│   │
│   ├── e2e/                                             ← NEW: end-to-end CLI tests
│   │   ├── cli-wizard.test.ts                           ← simulates user input through full wizard
│   │   ├── generate-and-install.test.ts                 ← generates + npm install + verifies no errors
│   │   └── generate-and-build.test.ts                   ← generates + build + verifies compiles
│   │
│   └── fixtures/
│       ├── sample-answers/
│       │   ├── single-fe-only-react.json
│       │   ├── single-fe-only-next.json                 ← NEW
│       │   ├── single-fe-only-vue.json                  ← NEW
│       │   ├── single-be-only-express.json              ← RENAMED for clarity
│       │   ├── single-be-only-fastify.json              ← NEW
│       │   ├── single-be-only-nestjs.json               ← NEW
│       │   ├── single-fullstack-react-express.json      ← RENAMED
│       │   ├── single-fullstack-next-prisma.json        ← NEW
│       │   ├── monorepo-saas.json
│       │   ├── monorepo-api-only.json
│       │   ├── monorepo-web-mobile.json                 ← NEW: both platforms
│       │   ├── microservices.json
│       │   ├── mobile-expo-fullstack.json               ← RENAMED from mobile-expo.json
│       │   ├── mobile-expo-frontend-only.json           ← NEW
│       │   ├── mobile-rn-cli-fullstack.json             ← NEW
│       │   ├── mobile-flutter-fullstack.json            ← NEW
│       │   ├── mobile-expo-with-clerk.json              ← NEW: mobile + cloud auth
│       │   └── kitchen-sink.json                        ← NEW: maximum plugins active
│       │
│       ├── expected-outputs/                            ← NEW: expected file trees for comparison
│       │   ├── single-fe-only-react/
│       │   ├── single-fullstack-react-express/
│       │   ├── mobile-expo-fullstack/
│       │   └── monorepo-saas/
│       │
│       └── mock-plugins/                                ← NEW: minimal plugins for testing
│           ├── mock-frontend/
│           │   ├── meta.ts
│           │   ├── file-map.ts
│           │   └── templates/
│           │       └── App.tsx.hbs
│           └── mock-backend/
│               ├── meta.ts
│               ├── file-map.ts
│               └── templates/
│                   └── server.ts.hbs
│
├── docs/
│   ├── WIZARD-ARCHITECTURE.md                           ← already existed
│   ├── PLUGIN-GUIDE.md                                  ← NEW: how to create a plugin (for contributors)
│   │                                                       meta fields explained, file-map syntax,
│   │                                                       template conditionals, injection markers,
│   │                                                       showWhen patterns, testing your plugin
│   ├── LAYOUT-GUIDE.md                                  ← NEW: how layouts work, how to add one
│   ├── TEMPLATE-GUIDE.md                                ← NEW: Handlebars helpers available,
│   │                                                       context variables, conditional patterns,
│   │                                                       injection marker syntax
│   ├── DECISION-TREE.md                                 ← NEW: visual flow of all wizard paths
│   │                                                       (web, mobile, both, monorepo, etc.)
│   ├── PLUGIN-CATALOG.md                                ← NEW: auto-generated list of all plugins
│   │                                                       with their showWhen conditions, deps, etc.
│   └── MOBILE-FLOW.md                                   ← NEW: specific docs for mobile path
│                                                           (Expo vs RN CLI vs Flutter, what shows/hides,
│   │                                                       platform-specific template adaptations)
│
├── scripts/                                             ← NEW: development helper scripts
│   ├── generate-plugin-catalog.ts                       ← reads all plugin metas, generates PLUGIN-CATALOG.md
│   ├── validate-all-plugins.ts                          ← runs validator against every plugin
│   ├── test-combinations.ts                             ← programmatically tests many answer combos
│   └── scaffold-plugin.ts                               ← creates a new plugin folder with stubs
│
└── examples/                                            ← NEW: pre-generated example outputs
    ├── README.md                                        ← explains what these are
    ├── react-vite-express-prisma/                       ← generated output for reference
    ├── next-fullstack-shadcn/
    ├── expo-fastify-jwt/                                ← mobile example
    └── monorepo-saas-turborepo/