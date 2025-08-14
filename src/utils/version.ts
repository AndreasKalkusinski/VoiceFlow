import Constants from 'expo-constants';

// Get version from app.json
export const APP_VERSION = Constants.expoConfig?.version || '2.1.1';
export const BUILD_NUMBER =
  Constants.expoConfig?.ios?.buildNumber || Constants.expoConfig?.android?.versionCode || '1';

// Helper to format version string
export const getVersionString = () => `v${APP_VERSION}`;
export const getFullVersionString = () => `v${APP_VERSION} (${BUILD_NUMBER})`;
