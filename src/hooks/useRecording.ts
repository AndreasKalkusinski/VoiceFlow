import { useState, useCallback, useRef } from 'react';
import {
  useAudioRecorder,
  RecordingPresets,
  setAudioModeAsync,
  requestRecordingPermissionsAsync,
} from 'expo-audio';

export interface RecordingHook {
  isRecording: boolean;
  isProcessing: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<string | null>;
  recordingDuration: number;
}

export function useRecording(): RecordingHook {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const recordingStartTime = useRef<number | null>(null);

  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  const startRecording = useCallback(async () => {
    try {
      // Request permissions
      const { status } = await requestRecordingPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Microphone permission denied');
      }

      // Setup audio mode for recording
      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentModeIOS: true,
      });

      // Start recording
      recorder.record();
      setIsRecording(true);
      recordingStartTime.current = Date.now();
    } catch (error) {
      console.error('Failed to start recording:', error);
      throw error;
    }
  }, [recorder]);

  const stopRecording = useCallback(async (): Promise<string | null> => {
    try {
      if (!isRecording) return null;

      setIsRecording(false);

      // Calculate duration
      const duration = recordingStartTime.current
        ? Math.floor((Date.now() - recordingStartTime.current) / 1000)
        : 0;
      setRecordingDuration(duration);
      recordingStartTime.current = null;

      setIsProcessing(true);

      // Stop recording
      await recorder.stop();

      // Get the URI
      const uri = recorder.uri;

      setIsProcessing(false);

      return uri;
    } catch (error) {
      console.error('Failed to stop recording:', error);
      setIsProcessing(false);
      return null;
    }
  }, [recorder, isRecording]);

  return {
    isRecording,
    isProcessing,
    startRecording,
    stopRecording,
    recordingDuration,
  };
}
