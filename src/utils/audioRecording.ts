import LegacyAudioService from '../services/LegacyAudioService';
const Audio = LegacyAudioService.Audio;

// Helper functions for audio recording

export async function requestRecordingPermissions() {
  const { status } = await Audio.requestPermissionsAsync();
  return status === 'granted';
}

export async function startRecording() {
  const hasPermission = await requestRecordingPermissions();
  if (!hasPermission) {
    throw new Error('Microphone permission not granted');
  }

  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
  });

  const { recording } = await Audio.Recording.createAsync(
    Audio.RecordingOptionsPresets.HIGH_QUALITY,
  );

  return recording;
}

export async function stopRecording(recording: Audio.Recording) {
  await recording.stopAndUnloadAsync();
  const uri = recording.getURI();
  return uri;
}
