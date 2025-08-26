// Legacy Audio Service using expo-av (deprecated)
// This maintains compatibility until we can fully migrate to expo-audio
import { Audio } from 'expo-av';

// Re-export types
export type { AVPlaybackStatus } from 'expo-av';
export type Recording = Audio.Recording;
export type Sound = Audio.Sound;

export const LegacyAudioService = {
  Audio,

  async requestPermissionsAsync() {
    return Audio.requestPermissionsAsync();
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async setAudioModeAsync(mode: any) {
    return Audio.setAudioModeAsync(mode);
  },

  Recording: Audio.Recording,
  RecordingOptionsPresets: Audio.RecordingOptionsPresets,
  Sound: Audio.Sound,
};

export default LegacyAudioService;
