import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { StorageService } from '../services/storage';
import { OpenAIService } from '../services/openai';
import { Settings } from '../types';
import { LogView } from '../components/LogView';
import { LogMessage } from '../types';

export const SettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    openaiApiKey: '',
    sttModel: 'whisper-1',
    ttsModel: 'tts-1',
    ttsVoice: 'alloy',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [logs, setLogs] = useState<LogMessage[]>([]);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    addLog('Loading settings...', 'info');
    try {
      const loadedSettings = await StorageService.getSettings();
      setSettings(loadedSettings);
      addLog('Settings loaded successfully', 'success');
    } catch (error) {
      addLog('Failed to load settings', 'error');
    } finally {
      setIsLoading(false);
      setTimeout(() => setLogs([]), 2000);
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

  const validateApiKey = async () => {
    if (!settings.openaiApiKey) {
      Alert.alert('Error', 'Please enter an API key');
      return;
    }

    setIsValidating(true);
    setLogs([]);
    addLog('Validating API key...', 'info');

    try {
      const openaiService = new OpenAIService(settings.openaiApiKey);
      const isValid = await openaiService.validateApiKey();

      if (isValid) {
        addLog('API key is valid', 'success');
        Alert.alert('Success', 'API key is valid!');
      } else {
        addLog('API key is invalid', 'error');
        Alert.alert('Error', 'API key is invalid');
      }
    } catch (error) {
      addLog('Failed to validate API key', 'error');
      Alert.alert('Error', 'Failed to validate API key');
    } finally {
      setIsValidating(false);
      setTimeout(() => setLogs([]), 3000);
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    setLogs([]);
    addLog('Saving settings...', 'info');

    try {
      await StorageService.saveSettings(settings);
      addLog('Settings saved successfully', 'success');
      Alert.alert('Success', 'Settings saved successfully');
    } catch (error) {
      addLog('Failed to save settings', 'error');
      Alert.alert('Error', 'Failed to save settings');
    } finally {
      setIsSaving(false);
      setTimeout(() => setLogs([]), 2000);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  const voices = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <LogView messages={logs} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>OpenAI Configuration</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>API Key</Text>
          <TextInput
            style={styles.input}
            value={settings.openaiApiKey}
            onChangeText={(text) => setSettings({ ...settings, openaiApiKey: text })}
            placeholder="sk-..."
            secureTextEntry={true}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={[styles.validateButton, isValidating && styles.buttonDisabled]}
            onPress={validateApiKey}
            disabled={isValidating}
          >
            {isValidating ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.validateButtonText}>Validate API Key</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Speech-to-Text Model</Text>
          <TextInput
            style={styles.input}
            value={settings.sttModel}
            onChangeText={(text) => setSettings({ ...settings, sttModel: text })}
            placeholder="whisper-1"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Text-to-Speech Model</Text>
          <TextInput
            style={styles.input}
            value={settings.ttsModel}
            onChangeText={(text) => setSettings({ ...settings, ttsModel: text })}
            placeholder="tts-1"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>TTS Voice</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.voiceSelector}
          >
            {voices.map((voice) => (
              <TouchableOpacity
                key={voice}
                style={[
                  styles.voiceOption,
                  settings.ttsVoice === voice && styles.voiceOptionSelected,
                ]}
                onPress={() => setSettings({ ...settings, ttsVoice: voice })}
              >
                <Text
                  style={[
                    styles.voiceOptionText,
                    settings.ttsVoice === voice && styles.voiceOptionTextSelected,
                  ]}
                >
                  {voice}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.saveButton, isSaving && styles.buttonDisabled]}
        onPress={saveSettings}
        disabled={isSaving}
      >
        {isSaving ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Save Settings</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  voiceSelector: {
    flexDirection: 'row',
    marginTop: 8,
  },
  voiceOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
    backgroundColor: '#f9f9f9',
  },
  voiceOptionSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  voiceOptionText: {
    color: '#666',
    fontSize: 14,
  },
  voiceOptionTextSelected: {
    color: '#fff',
  },
  validateButton: {
    backgroundColor: '#10B981',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  validateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
