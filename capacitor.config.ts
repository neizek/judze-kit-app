import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.judze.app',
  appName: 'Judze',
  webDir: 'build',
  backgroundColor: '2e333a',
  plugins: {
      LocalNotifications: {},
      SplashScreen: {
        launchShowDuration: 2000,
        launchAutoHide: true, 
        launchFadeOutDuration: 500,
        splashFullScreen: true,
        splashImmersive: true,
        androidScaleType: "FIT_CENTER",
        // androidSplashResourceName: "splash",
      },
  },
  ios: {
    limitsNavigationsToAppBoundDomains: false,
    allowsLinkPreview: true
  },
};

export default config;
