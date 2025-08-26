// Legacy Audio Service using expo-av (deprecated)
// This maintains compatibility until we can fully migrate to expo-audio
import { Audio } from 'expo-av';

export const LegacyAudioService = {
  Audio,

  async requestPermissionsAsync() {
    return Audio.requestPermissionsAsync();
  },

  async setAudioModeAsync(mode: any) {
    return Audio.setAudioModeAsync(mode);
  },

  Recording: Audio.Recording,
  RecordingOptionsPresets: Audio.RecordingOptionsPresets,
  Sound: Audio.Sound,
};

export default LegacyAudioService;
