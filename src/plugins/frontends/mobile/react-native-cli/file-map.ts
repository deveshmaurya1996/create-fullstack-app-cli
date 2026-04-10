import type { PluginFileMap } from '../../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'app.json.hbs', outputPath: 'app.json', target: 'frontend' },
    { template: 'babel.config.js.hbs', outputPath: 'babel.config.js', target: 'frontend' },
    { template: 'App.tsx.hbs', outputPath: 'App.tsx', target: 'frontend' },
    { template: 'metro.config.js.hbs', outputPath: 'metro.config.js', target: 'frontend' },
    { template: 'tsconfig.json.hbs', outputPath: 'tsconfig.json', target: 'frontend' },
    { template: 'index.js.hbs', outputPath: 'index.js', target: 'frontend' },
    { template: 'react-native.config.js.hbs', outputPath: 'react-native.config.js', target: 'frontend' },
    { template: 'Gemfile.hbs', outputPath: 'Gemfile', target: 'frontend' },

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

    {
      template: 'navigation/RootNavigator.tsx.hbs',
      outputPath: 'src/navigation/RootNavigator.tsx',
      target: 'frontend',
      when: (ctx) => !ctx.hasReactNavigation,
    },
    {
      template: 'navigation/types.ts.hbs',
      outputPath: 'src/navigation/types.ts',
      target: 'frontend',
      when: (ctx) => !ctx.hasReactNavigation,
    },

    { template: 'hooks/useApi.ts.hbs', outputPath: 'src/hooks/useApi.ts', target: 'frontend', when: (ctx) => ctx.hasBackend },
    { template: 'hooks/useAuth.ts.hbs', outputPath: 'src/hooks/useAuth.ts', target: 'frontend', when: (ctx) => ctx.hasAuth },
    { template: 'lib/config.ts.hbs', outputPath: 'src/lib/config.ts', target: 'frontend' },
    { template: 'types/env.d.ts.hbs', outputPath: 'src/types/env.d.ts', target: 'frontend' },
    { template: 'lib/utils.ts.hbs', outputPath: 'src/lib/utils.ts', target: 'frontend' },
    { template: 'types/index.ts.hbs', outputPath: 'src/types/index.ts', target: 'frontend' },
    { template: 'constants/index.ts.hbs', outputPath: 'src/constants/index.ts', target: 'frontend' },
  ],
  injections: [],
};

export default fileMap;