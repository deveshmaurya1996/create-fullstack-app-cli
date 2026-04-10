import type { PluginFileMap } from '../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'backend/jwt.utils.ts.hbs', outputPath: 'src/lib/jwt.utils.ts', target: 'backend', when: (ctx) => ctx.hasBackend },
    {
      template: 'backend/auth.service.ts.hbs',
      outputPath: 'src/services/auth.service.ts',
      target: 'backend',
      when: (ctx) => ctx.hasBackend,
    },
    { template: 'backend/auth.middleware.ts.hbs', outputPath: 'src/middleware/auth.middleware.ts', target: 'backend', when: (ctx) => ctx.hasBackend },
    { template: 'backend/auth.routes.ts.hbs', outputPath: 'src/routes/auth.routes.ts', target: 'backend', when: (ctx) => ctx.hasBackend },
    { template: 'backend/route-import.hbs', outputPath: 'src/routes/fragments/auth.route-import.ts', target: 'backend', when: (ctx) => ctx.hasBackend },
    {
      template: 'backend/route-register.hbs',
      outputPath: 'src/routes/fragments/auth.route-register.ts',
      target: 'backend',
      when: (ctx) => ctx.hasBackend,
    },

    { template: 'frontend/web/AuthProvider.tsx.hbs', outputPath: 'src/auth/AuthProvider.tsx', target: 'frontend', when: (ctx) => ctx.hasWeb && !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend) },
    { template: 'frontend/web/AuthProvider.tsx.hbs', outputPath: 'auth/AuthProvider.tsx', target: 'frontend', when: (ctx) => ctx.hasWeb && ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend },
    { template: 'frontend/web/LoginPage.tsx.hbs', outputPath: 'src/auth/LoginPage.tsx', target: 'frontend', when: (ctx) => ctx.hasWeb && !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend) },
    { template: 'frontend/web/LoginPage.tsx.hbs', outputPath: 'auth/LoginPage.tsx', target: 'frontend', when: (ctx) => ctx.hasWeb && ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend },
    { template: 'frontend/web/RegisterPage.tsx.hbs', outputPath: 'src/auth/RegisterPage.tsx', target: 'frontend', when: (ctx) => ctx.hasWeb && !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend) },
    { template: 'frontend/web/RegisterPage.tsx.hbs', outputPath: 'auth/RegisterPage.tsx', target: 'frontend', when: (ctx) => ctx.hasWeb && ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend },
    { template: 'frontend/web/ProtectedRoute.tsx.hbs', outputPath: 'src/auth/ProtectedRoute.tsx', target: 'frontend', when: (ctx) => ctx.hasWeb && !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend) },
    { template: 'frontend/web/ProtectedRoute.tsx.hbs', outputPath: 'auth/ProtectedRoute.tsx', target: 'frontend', when: (ctx) => ctx.hasWeb && ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend },

    { template: 'frontend/mobile/AuthProvider.tsx.hbs', outputPath: 'src/auth/AuthProvider.tsx', target: 'frontend', when: (ctx) => ctx.hasMobile && !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend) },
    { template: 'frontend/mobile/AuthProvider.tsx.hbs', outputPath: 'auth/AuthProvider.tsx', target: 'frontend', when: (ctx) => ctx.hasMobile && ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend },
    { template: 'frontend/mobile/LoginScreen.tsx.hbs', outputPath: 'src/auth/LoginScreen.tsx', target: 'frontend', when: (ctx) => ctx.hasMobile && !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend) },
    { template: 'frontend/mobile/LoginScreen.tsx.hbs', outputPath: 'auth/LoginScreen.tsx', target: 'frontend', when: (ctx) => ctx.hasMobile && ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend },
    { template: 'frontend/mobile/RegisterScreen.tsx.hbs', outputPath: 'src/auth/RegisterScreen.tsx', target: 'frontend', when: (ctx) => ctx.hasMobile && !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend) },
    { template: 'frontend/mobile/RegisterScreen.tsx.hbs', outputPath: 'auth/RegisterScreen.tsx', target: 'frontend', when: (ctx) => ctx.hasMobile && ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend },
    { template: 'frontend/mobile/auth-layout.tsx.hbs', outputPath: 'src/auth/auth-layout.tsx', target: 'frontend', when: (ctx) => ctx.hasMobile && !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend) },
    { template: 'frontend/mobile/auth-layout.tsx.hbs', outputPath: 'auth/auth-layout.tsx', target: 'frontend', when: (ctx) => ctx.hasMobile && ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend },
  ],
  injections: [],
};

export default fileMap;
