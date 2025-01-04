import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.judze.app',
  appName: 'Judze',
  webDir: 'build',
  backgroundColor: '2e333a',
  bundledWebRuntime: false,
  plugins: {
      SwipeBack: {
        enabled: true
      }
  }
};

export default config;
