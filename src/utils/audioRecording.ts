import * as Audio from 'expo-audio';

// Helper functions for audio recording that work with the new expo-audio API

export async function requestRecordingPermissions() {
  const [permissionResponse, requestPermission] = await Audio.getPermissionsAsync();
  if (permissionResponse.status !== 'granted') {
    const result = await requestPermission();
    return result.status === 'granted';
  }
  return true;
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

  const recording = new Audio.Recording();
  await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
  await recording.startAsync();

  return recording;
}

export async function stopRecording(recording: Audio.Recording) {
  await recording.stopAndUnloadAsync();
  const uri = recording.getURI();
  return uri;
}
