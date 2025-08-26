import {
  useAudioPlayer,
  useAudioRecorder,
  AudioPlayer,
  AudioRecorder,
  setAudioModeAsync,
  requestRecordingPermissionsAsync,
  RecordingPresets,
} from 'expo-audio';

// Audio Service for expo-audio API
// This service provides a unified interface for audio recording and playback
// that works with Expo Go

export class AudioService {
  private static audioPlayers = new Map<string, AudioPlayer>();

  // Recording functions
  static async requestRecordingPermissions(): Promise<boolean> {
    const { status } = await requestRecordingPermissionsAsync();
    return status === 'granted';
  }

  static async setupRecordingMode(): Promise<void> {
    await setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
  }

  static async setupPlaybackMode(): Promise<void> {
    await setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
    });
  }

  // Get recording options
  static getRecordingOptions() {
    return RecordingPresets.HIGH_QUALITY;
  }
}

export { useAudioPlayer, useAudioRecorder, AudioPlayer, AudioRecorder };
