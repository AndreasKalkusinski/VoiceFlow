import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Audio } from 'expo-av';
import * as Clipboard from 'expo-clipboard';
import { RecordingAnimation } from '../components/RecordingAnimation';
import { LogView } from '../components/LogView';
import { StorageService } from '../services/storage';
import { OpenAIService } from '../services/openai';
import { LogMessage, Settings } from '../types';

export const SpeechToTextScreen: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [transcribedText, setTranscribedText] = useState('');
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    loadSettings();
    setupAudio();
  }, []);

  const loadSettings = async () => {
    const loadedSettings = await StorageService.getSettings();
    setSettings(loadedSettings);
  };

  const setupAudio = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
    } catch (error) {
      console.error('Failed to setup audio:', error);
    }
  };

  const addLog = (message: string, type: LogMessage['type']) => {
    const newLog: LogMessage = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date(),
    };
    setLogs((prev) => [...prev, newLog]);
  };

  const clearLogs = () => {
    setTimeout(() => setLogs([]), 3000);
  };

  const startRecording = async () => {
    if (!settings?.openaiApiKey) {
      Alert.alert('Configuration Required', 'Please configure your OpenAI API key in Settings');
      return;
    }

    try {
      setLogs([]);
      addLog('Starting recording...', 'info');

      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        addLog('Microphone permission denied', 'error');
        clearLogs();
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );

      setRecording(recording);
      setIsRecording(true);
      addLog('Recording started', 'success');
    } catch (error) {
      addLog('Failed to start recording', 'error');
      clearLogs();
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      setIsRecording(false);
      setIsProcessing(true);
      addLog('Stopping recording...', 'info');

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      if (uri && settings) {
        addLog('Transcribing audio...', 'info');
        const openaiService = new OpenAIService(settings.openaiApiKey);
        const text = await openaiService.transcribeAudio(uri, settings.sttModel);

        if (transcribedText) {
          setTranscribedText(transcribedText + ' ' + text);
        } else {
          setTranscribedText(text);
        }

        addLog('Transcription completed', 'success');
        clearLogs();
      }

      setRecording(null);
    } catch (error) {
      addLog('Failed to transcribe audio', 'error');
      clearLogs();
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = async () => {
    if (!transcribedText) {
      Alert.alert('No Text', 'There is no text to copy');
      return;
    }

    setLogs([]);
    await Clipboard.setStringAsync(transcribedText);
    addLog('Text copied to clipboard', 'success');
    clearLogs();
  };

  const clearText = () => {
    setTranscribedText('');
    setLogs([]);
    addLog('Text cleared', 'info');
    clearLogs();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LogView messages={logs} />

        <View style={styles.textContainer}>
          <Text style={styles.label}>Transcribed Text</Text>
          <TextInput
            style={styles.textInput}
            multiline
            value={transcribedText}
            onChangeText={setTranscribedText}
            placeholder="Your transcribed text will appear here..."
            placeholderTextColor="#999"
          />
        </View>

        <RecordingAnimation isRecording={isRecording} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.recordButton,
              isRecording && styles.recordButtonActive,
              isProcessing && styles.buttonDisabled,
            ]}
            onPress={isRecording ? stopRecording : startRecording}
            disabled={isProcessing}
          >
            <Text style={styles.recordButtonText}>
              {isProcessing ? 'Processing...' : isRecording ? 'Stop Recording' : 'Start Recording'}
            </Text>
          </TouchableOpacity>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={copyToClipboard}>
              <Text style={styles.actionButtonText}>Copy Text</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, styles.clearButton]} onPress={clearText}>
              <Text style={styles.actionButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  textContainer: {
    flex: 1,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    minHeight: 200,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    marginTop: 20,
  },
  recordButton: {
    backgroundColor: '#3B82F6',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  recordButtonActive: {
    backgroundColor: '#EF4444',
  },
  recordButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#10B981',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  clearButton: {
    backgroundColor: '#6B7280',
    marginRight: 0,
    marginLeft: 10,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
