// Stub service for Expo Go - no native module access
class AppGroupServiceStub {
  isAvailable(): boolean {
    return false;
  }

  async test(): Promise<string | null> {
    return null;
  }

  async checkForSharedContent(): Promise<any> {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    return { hasAudio: false, hasText: false };
  }

  async getSharedAudioPath(): Promise<any> {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    return null;
  }

  async getSharedText(): Promise<any> {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    return null;
  }

  async clearSharedData(): Promise<void> {
    // no-op
  }
}

export default new AppGroupServiceStub();
