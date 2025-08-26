import { NativeModules, Platform } from 'react-native';

// Safely access the native module - it won't exist in Expo Go
const AppGroupModule = NativeModules.AppGroupModule || null;

export interface SharedAudioData {
  path: string;
  timestamp: number;
}

export interface SharedTextData {
  text: string;
  timestamp: number;
}

class AppGroupService {
  isAvailable(): boolean {
    return Platform.OS === 'ios' && AppGroupModule != null;
  }

  async test(): Promise<string | null> {
    if (!this.isAvailable()) {
      return null;
    }

    try {
      const result = await AppGroupModule.test();
      console.log('[AppGroupService] Test result:', result);
      return result;
    } catch (error) {
      console.error('[AppGroupService] Test error:', error);
      return null;
    }
  }

  async getSharedAudioPath(): Promise<SharedAudioData | null> {
    console.log('[AppGroupService] getSharedAudioPath called');
    if (!this.isAvailable()) {
      console.log('[AppGroupService] Module not available');
      return null;
    }

    try {
      console.log('[AppGroupService] Calling native module...');
      const result = await AppGroupModule.getSharedAudioPath();
      console.log('[AppGroupService] Native module returned:', result);
      return result;
    } catch (error) {
      console.error('[AppGroupService] Error getting shared audio path:', error);
      return null;
    }
  }

  async getSharedText(): Promise<SharedTextData | null> {
    if (!this.isAvailable()) {
      return null;
    }

    try {
      const result = await AppGroupModule.getSharedText();
      return result;
    } catch (error) {
      console.error('Error getting shared text:', error);
      return null;
    }
  }

  async checkForSharedContent(): Promise<{
    hasAudio: boolean;
    hasText: boolean;
    audioData?: SharedAudioData;
    textData?: SharedTextData;
  }> {
    console.log('[AppGroupService] checkForSharedContent called');
    const [audioData, textData] = await Promise.all([
      this.getSharedAudioPath(),
      this.getSharedText(),
    ]);

    const result = {
      hasAudio: audioData !== null,
      hasText: textData !== null,
      audioData: audioData || undefined,
      textData: textData || undefined,
    };

    console.log('[AppGroupService] checkForSharedContent result:', result);
    return result;
  }
}

export default new AppGroupService();
