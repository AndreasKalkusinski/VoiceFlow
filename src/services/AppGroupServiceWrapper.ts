import { Platform, NativeModules } from 'react-native';

// Safe wrapper that doesn't throw when module is not available
class AppGroupServiceWrapper {
  private service: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any

  constructor() {
    // Only try to load the service if the native module exists
    if (Platform.OS === 'ios' && NativeModules.AppGroupModule) {
      try {
        // Use require instead of import to avoid bundler issues
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const AppGroupService = require('./AppGroupService').default;
        this.service = new AppGroupService();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('[AppGroupServiceWrapper] Failed to load AppGroupService:', error);
      }
    }
  }

  isAvailable(): boolean {
    return this.service !== null && this.service.isAvailable();
  }

  async test(): Promise<string | null> {
    if (!this.service) return null;
    return this.service.test();
  }

  async checkForSharedContent(): Promise<any> {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    if (!this.service) {
      return { hasAudio: false, hasText: false };
    }
    return this.service.checkForSharedContent();
  }
}

export default new AppGroupServiceWrapper();
