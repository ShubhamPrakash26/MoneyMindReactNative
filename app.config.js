import 'dotenv/config';

export default {
  expo: {
    name: "Money Mind",
    slug: "mobile",
    version: '1.0.0',
    orientation: 'portrait',
    icon: "./assets/images/icon.png",
    scheme: 'mobile',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      package: 'com.shubhamprakash26.mobile',
      label: "Money Mind"
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      clerkKey: process.env.CLERK_PUBLISHABLE_KEY,
      eas: {
        projectId: 'b91f00c1-6994-42b4-a091-e162cc708dd6',
      },
    },
  },
};
