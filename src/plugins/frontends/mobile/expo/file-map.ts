import type { PluginFileMap } from '../../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'app.json.hbs', outputPath: 'app.json', target: 'frontend' },
    { template: 'app.config.ts.hbs', outputPath: 'app.config.ts', target: 'frontend' },
    { template: 'babel.config.js.hbs', outputPath: 'babel.config.js', target: 'frontend' },
    { template: 'metro.config.js.hbs', outputPath: 'metro.config.js', target: 'frontend' },
    { template: 'tsconfig.json.hbs', outputPath: 'tsconfig.json', target: 'frontend' },
    { template: 'index.ts.hbs', outputPath: 'index.ts', target: 'frontend' },
    {
      template: 'App.react-navigation.tsx.hbs',
      outputPath: 'App.tsx',
      target: 'frontend',
      when: (ctx) => ctx.hasExpo && !ctx.hasExpoRouter,
    },

    {
      template: 'app/_layout.tsx.hbs',
      outputPath: 'app/_layout.tsx',
      target: 'frontend',
      when: (ctx) => ctx.hasExpo && ctx.hasExpoRouter,
    },
    {
      template: 'app/index.tsx.hbs',
      outputPath: 'app/index.tsx',
      target: 'frontend',
      when: (ctx) => ctx.hasExpo && ctx.hasExpoRouter,
    },
    {
      template: 'app/+not-found.tsx.hbs',
      outputPath: 'app/+not-found.tsx',
      target: 'frontend',
      when: (ctx) => ctx.hasExpo && ctx.hasExpoRouter,
    },
    {
      template: 'app/(tabs)/_layout.tsx.hbs',
      outputPath: 'app/(tabs)/_layout.tsx',
      target: 'frontend',
      when: (ctx) => ctx.hasExpo && ctx.hasExpoRouter,
    },
    {
      template: 'app/(tabs)/index.tsx.hbs',
      outputPath: 'app/(tabs)/index.tsx',
      target: 'frontend',
      when: (ctx) => ctx.hasExpo && ctx.hasExpoRouter,
    },
    {
      template: 'app/(tabs)/profile.tsx.hbs',
      outputPath: 'app/(tabs)/profile.tsx',
      target: 'frontend',
      when: (ctx) => ctx.hasExpo && ctx.hasExpoRouter,
    },
    {
      template: 'app/(tabs)/settings.tsx.hbs',
      outputPath: 'app/(tabs)/settings.tsx',
      target: 'frontend',
      when: (ctx) => ctx.hasExpo && ctx.hasExpoRouter,
    },
    {
      template: 'app/(auth)/_layout.tsx.hbs',
      outputPath: 'app/(auth)/_layout.tsx',
      target: 'frontend',
      when: (ctx) => ctx.hasExpo && ctx.hasExpoRouter && ctx.hasAuth,
    },
    {
      template: 'app/(auth)/login.tsx.hbs',
      outputPath: 'app/(auth)/login.tsx',
      target: 'frontend',
      when: (ctx) => ctx.hasExpo && ctx.hasExpoRouter && ctx.hasAuth,
    },
    {
      template: 'app/(auth)/register.tsx.hbs',
      outputPath: 'app/(auth)/register.tsx',
      target: 'frontend',
      when: (ctx) => ctx.hasExpo && ctx.hasExpoRouter && ctx.hasAuth,
    },

    { template: 'screens/HomeScreen.tsx.hbs', outputPath: 'src/screens/HomeScreen.tsx', target: 'frontend' },
    { template: 'screens/ProfileScreen.tsx.hbs', outputPath: 'src/screens/ProfileScreen.tsx', target: 'frontend' },
    { template: 'screens/SettingsScreen.tsx.hbs', outputPath: 'src/screens/SettingsScreen.tsx', target: 'frontend' },
    { template: 'screens/LoginScreen.tsx.hbs', outputPath: 'src/screens/LoginScreen.tsx', target: 'frontend', when: (ctx) => ctx.hasAuth },
    { template: 'screens/RegisterScreen.tsx.hbs', outputPath: 'src/screens/RegisterScreen.tsx', target: 'frontend', when: (ctx) => ctx.hasAuth },

    { template: 'components/Screen.tsx.hbs', outputPath: 'src/components/Screen.tsx', target: 'frontend' },
    { template: 'components/Button.tsx.hbs', outputPath: 'src/components/Button.tsx', target: 'frontend' },
    { template: 'components/Card.tsx.hbs', outputPath: 'src/components/Card.tsx', target: 'frontend' },
    { template: 'components/Input.tsx.hbs', outputPath: 'src/components/Input.tsx', target: 'frontend' },
    { template: 'components/LoadingScreen.tsx.hbs', outputPath: 'src/components/LoadingScreen.tsx', target: 'frontend' },
    { template: 'components/Avatar.tsx.hbs', outputPath: 'src/components/Avatar.tsx', target: 'frontend' },

    { template: 'hooks/useApi.ts.hbs', outputPath: 'src/hooks/useApi.ts', target: 'frontend', when: (ctx) => ctx.hasBackend },
    { template: 'hooks/useAuth.ts.hbs', outputPath: 'src/hooks/useAuth.ts', target: 'frontend', when: (ctx) => ctx.hasAuth },
    { template: 'hooks/useAppState.ts.hbs', outputPath: 'src/hooks/useAppState.ts', target: 'frontend' },

    { template: 'lib/config.ts.hbs', outputPath: 'src/lib/config.ts', target: 'frontend' },
    { template: 'lib/utils.ts.hbs', outputPath: 'src/lib/utils.ts', target: 'frontend' },
    { template: 'types/index.ts.hbs', outputPath: 'src/types/index.ts', target: 'frontend' },
    {
      template: 'types/router.ts.hbs',
      outputPath: 'src/types/router.ts',
      target: 'frontend',
      when: (ctx) => ctx.hasExpo && ctx.hasExpoRouter && !(ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend),
    },
    {
      template: 'types/router.ts.hbs',
      outputPath: 'types/router.ts',
      target: 'frontend',
      when: (ctx) => ctx.hasExpo && ctx.hasExpoRouter && ctx.isSingleApp && ctx.hasFrontend && !ctx.hasBackend,
    },
    { template: 'constants/index.ts.hbs', outputPath: 'src/constants/index.ts', target: 'frontend' },
  ],
  injections: [],
};

export default fileMap;
