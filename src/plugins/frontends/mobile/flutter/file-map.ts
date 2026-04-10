import type { PluginFileMap } from '../../../../shared/types.js';

const fileMap: PluginFileMap = {
  files: [
    { template: 'pubspec.yaml.hbs', outputPath: 'pubspec.yaml', target: 'frontend' },
    { template: 'analysis_options.yaml.hbs', outputPath: 'analysis_options.yaml', target: 'frontend' },

    { template: 'lib/main.dart.hbs', outputPath: 'lib/main.dart', target: 'frontend' },
    { template: 'lib/app.dart.hbs', outputPath: 'lib/app.dart', target: 'frontend' },
    { template: 'lib/router.dart.hbs', outputPath: 'lib/router.dart', target: 'frontend' },

    { template: 'lib/screens/home_screen.dart.hbs', outputPath: 'lib/screens/home_screen.dart', target: 'frontend' },
    { template: 'lib/screens/profile_screen.dart.hbs', outputPath: 'lib/screens/profile_screen.dart', target: 'frontend' },
    { template: 'lib/screens/settings_screen.dart.hbs', outputPath: 'lib/screens/settings_screen.dart', target: 'frontend' },
    { template: 'lib/screens/login_screen.dart.hbs', outputPath: 'lib/screens/login_screen.dart', target: 'frontend', when: (ctx) => ctx.hasAuth },

    { template: 'lib/widgets/app_button.dart.hbs', outputPath: 'lib/widgets/app_button.dart', target: 'frontend' },
    { template: 'lib/widgets/app_card.dart.hbs', outputPath: 'lib/widgets/app_card.dart', target: 'frontend' },
    { template: 'lib/widgets/app_input.dart.hbs', outputPath: 'lib/widgets/app_input.dart', target: 'frontend' },
    { template: 'lib/widgets/loading_indicator.dart.hbs', outputPath: 'lib/widgets/loading_indicator.dart', target: 'frontend' },

    { template: 'lib/models/user.dart.hbs', outputPath: 'lib/models/user.dart', target: 'frontend' },
    { template: 'lib/providers/app_provider.dart.hbs', outputPath: 'lib/providers/app_provider.dart', target: 'frontend' },
    { template: 'lib/providers/auth_provider.dart.hbs', outputPath: 'lib/providers/auth_provider.dart', target: 'frontend', when: (ctx) => ctx.hasAuth },

    { template: 'lib/services/api_service.dart.hbs', outputPath: 'lib/services/api_service.dart', target: 'frontend' },
    { template: 'lib/services/auth_service.dart.hbs', outputPath: 'lib/services/auth_service.dart', target: 'frontend', when: (ctx) => ctx.hasAuth },
    { template: 'lib/services/storage_service.dart.hbs', outputPath: 'lib/services/storage_service.dart', target: 'frontend' },

    { template: 'lib/utils/constants.dart.hbs', outputPath: 'lib/utils/constants.dart', target: 'frontend' },
    { template: 'lib/theme/app_theme.dart.hbs', outputPath: 'lib/theme/app_theme.dart', target: 'frontend' },
  ],
  injections: [],
};

export default fileMap;