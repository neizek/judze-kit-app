import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.judze.app',
  appName: 'Judze',
  webDir: 'build',
  backgroundColor: '2e333a',
  plugins: {
      SwipeBack: {
        enabled: true
      },
      LocalNotifications: {},
      SplashScreen: {
        launchShowDuration: 2000,
        launchAutoHide: true, 
        launchFadeOutDuration: 500,
        splashFullScreen: true,
        splashImmersive: true,
        androidScaleType: "CENTER_CROP",
        androidSplashResourceName: "splash",
        // "backgroundColor": "#ffffffff",
        // "showSpinner": true,
        // "androidSpinnerStyle": "large",
        // "iosSpinnerStyle": "small",
        // "spinnerColor": "#999999",
      },
  }
};

export default config;
