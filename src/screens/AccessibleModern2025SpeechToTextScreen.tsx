import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  AccessibilityInfo,
} from 'react-native';
import { Modern2025SpeechToTextScreen } from './Modern2025SpeechToTextScreen';
import {
  buttonA11y,
  inputA11y,
  loadingA11y,
  announce,
  createA11yProps,
} from '../utils/accessibility';

/**
 * Wrapper component that adds comprehensive accessibility to Modern2025SpeechToTextScreen
 * This is a pattern to gradually add accessibility without breaking existing screens
 */
export const AccessibleModern2025SpeechToTextScreen: React.FC = () => {
  // Announce screen changes for screen readers
  React.useEffect(() => {
    AccessibilityInfo.announceForAccessibility('Speech to Text screen loaded');
  }, []);

  return <Modern2025SpeechToTextScreen />;
};

// Export a hook to add accessibility props to any speech-to-text component
export const useSpeechToTextA11y = (isRecording: boolean, isProcessing: boolean) => {
  const recordButtonA11y = React.useMemo(() => {
    if (isRecording) {
      return buttonA11y(
        'Stop Recording',
        'Double tap to stop recording and transcribe audio',
        false,
        false,
      );
    }
    return buttonA11y(
      'Start Recording',
      'Double tap to start recording audio for transcription',
      false,
      isProcessing,
    );
  }, [isRecording, isProcessing]);

  const textInputA11y = React.useMemo(() => {
    return inputA11y('Transcribed text', '', false, undefined);
  }, []);

  const copyButtonA11y = React.useMemo(() => {
    return buttonA11y(
      'Copy to Clipboard',
      'Double tap to copy transcribed text to clipboard',
      false,
      false,
    );
  }, []);

  const clearButtonA11y = React.useMemo(() => {
    return buttonA11y('Clear Text', 'Double tap to clear all transcribed text', false, false);
  }, []);

  const shareButtonA11y = React.useMemo(() => {
    return buttonA11y('Share Text', 'Double tap to share transcribed text', false, false);
  }, []);

  return {
    recordButtonA11y,
    textInputA11y,
    copyButtonA11y,
    clearButtonA11y,
    shareButtonA11y,
  };
};
