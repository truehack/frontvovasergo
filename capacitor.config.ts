import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'myApp',
  webDir: 'dist',          // обязательно папка dist
  bundledWebRuntime: false // оставь false
};

export default config;

