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
  ActivityIndicator,
} from 'react-native';
import LegacyAudioService from '../services/LegacyAudioService';
const Audio = LegacyAudioService.Audio;
import * as Clipboard from 'expo-clipboard';
import { LogView } from '../components/LogView';
import { StorageService } from '../services/storage';
import { OpenAIService } from '../services/openai';
import { LogMessage, Settings } from '../types';

export const TextToSpeechScreen: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    loadSettings();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const loadSettings = async () => {
    const loadedSettings = await StorageService.getSettings();
    setSettings(loadedSettings);
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

  const pasteFromClipboard = async () => {
    try {
      const text = await Clipboard.getStringAsync();
      if (text) {
        setInputText(text);
        setLogs([]);
        addLog('Text pasted from clipboard', 'success');
        clearLogs();
      } else {
        Alert.alert('Clipboard Empty', 'No text found in clipboard');
      }
    } catch {
      addLog('Failed to paste from clipboard', 'error');
      clearLogs();
    }
  };

  const generateSpeech = async () => {
    if (!settings?.openaiApiKey) {
      Alert.alert('Configuration Required', 'Please configure your OpenAI API key in Settings');
      return;
    }

    if (!inputText.trim()) {
      Alert.alert('No Text', 'Please enter or paste some text');
      return;
    }

    try {
      setIsGenerating(true);
      setLogs([]);
      addLog('Generating speech...', 'info');

      const openaiService = new OpenAIService(settings.openaiApiKey);
      const audioUri = await openaiService.textToSpeech(
        inputText,
        settings.ttsModel,
        settings.ttsVoice,
      );

      addLog('Speech generated successfully', 'success');
      addLog('Loading audio...', 'info');

      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: false },
      );

      setSound(newSound);
      addLog('Ready to play', 'success');
      clearLogs();
    } catch {
      addLog('Failed to generate speech', 'error');
      Alert.alert('Error', 'Failed to generate speech');
      clearLogs();
    } finally {
      setIsGenerating(false);
    }
  };

  const playPause = async () => {
    if (!sound) {
      Alert.alert('No Audio', 'Please generate speech first');
      return;
    }

    try {
      const status = await sound.getStatusAsync();

      if (status.isLoaded) {
        if (isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
          addLog('Playback paused', 'info');
        } else {
          await sound.playAsync();
          setIsPlaying(true);
          addLog('Playing audio', 'info');

          sound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded && status.didJustFinish) {
              setIsPlaying(false);
              setLogs([]);
            }
          });
        }
        clearLogs();
      }
    } catch {
      addLog('Playback error', 'error');
      clearLogs();
    }
  };

  const stopPlayback = async () => {
    if (sound) {
      try {
        await sound.stopAsync();
        setIsPlaying(false);
        setLogs([]);
        addLog('Playback stopped', 'info');
        clearLogs();
      } catch {
        addLog('Failed to stop playback', 'error');
        clearLogs();
      }
    }
  };

  const clearText = () => {
    setInputText('');
    if (sound) {
      sound.unloadAsync();
      setSound(null);
    }
    setIsPlaying(false);
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
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Input Text</Text>
            <TouchableOpacity style={styles.pasteButton} onPress={pasteFromClipboard}>
              <Text style={styles.pasteButtonText}>Paste</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.textInput}
            multiline
            value={inputText}
            onChangeText={setInputText}
            placeholder="Enter or paste text here to convert to speech..."
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.generateButton, isGenerating && styles.buttonDisabled]}
            onPress={generateSpeech}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.generateButtonText}>Generate Speech</Text>
            )}
          </TouchableOpacity>

          {sound && (
            <View style={styles.playbackControls}>
              <TouchableOpacity
                style={[styles.playButton, isPlaying && styles.pauseButton]}
                onPress={playPause}
              >
                <Text style={styles.playButtonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.stopButton} onPress={stopPlayback}>
                <Text style={styles.stopButtonText}>Stop</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.clearButton} onPress={clearText}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
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
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  pasteButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  pasteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
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
  generateButton: {
    backgroundColor: '#10B981',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  playbackControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  playButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  pauseButton: {
    backgroundColor: '#F59E0B',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  stopButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
  },
  stopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: '#6B7280',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
