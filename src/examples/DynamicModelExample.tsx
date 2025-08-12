/**
 * Example Implementation: How to integrate dynamic model loading into your screens
 *
 * This file demonstrates how to replace hardcoded model selections with dynamic model loading
 * that fetches available models from provider APIs.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { DynamicModelConfig } from '../components/DynamicModelConfig';
import { ModelService } from '../services/ModelService';
import { useTheme } from '../hooks/useTheme';
import { spacing, fontSizes } from '../utils/responsive';

interface ExampleSettings {
  openaiApiKey: string;
  googleApiKey: string;
  elevenlabsApiKey: string;
  selectedTTSProvider: 'openai-tts' | 'google-tts' | 'elevenlabs-tts';
  selectedSTTProvider: 'openai-stt';
  selectedModel: string;
  selectedVoice: string;
}

export const DynamicModelExample: React.FC = () => {
  const { colors } = useTheme();
  const [settings, setSettings] = useState<ExampleSettings>({
    openaiApiKey: '',
    googleApiKey: '',
    elevenlabsApiKey: '',
    selectedTTSProvider: 'openai-tts',
    selectedSTTProvider: 'openai-stt',
    selectedModel: '',
    selectedVoice: '',
  });

  const modelService = ModelService.getInstance();

  // Get the appropriate API key for the selected provider
  const getApiKey = (providerId: string): string => {
    switch (providerId) {
      case 'openai-stt':
      case 'openai-tts':
        return settings.openaiApiKey;
      case 'google-tts':
        return settings.googleApiKey;
      case 'elevenlabs-tts':
        return settings.elevenlabsApiKey;
      default:
        return '';
    }
  };

  const handleClearCache = async () => {
    try {
      await modelService.clearAllCache();
      Alert.alert('Success', 'All cached models have been cleared.');
    } catch {
      Alert.alert('Error', 'Failed to clear cache.');
    }
  };

  const handleClearProviderCache = async (providerId: string) => {
    try {
      await modelService.clearProviderCache(providerId);
      Alert.alert('Success', `Cache cleared for ${providerId}`);
    } catch {
      Alert.alert('Error', `Failed to clear cache for ${providerId}`);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Dynamic Model Loading Example</Text>

      <Text style={[styles.description, { color: colors.textSecondary }]}>
        This example shows how to integrate dynamic model loading with your providers. Models are
        fetched from APIs, cached locally, and fall back to defaults if needed.
      </Text>

      {/* API Keys Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>API Keys</Text>
        <Text style={[styles.note, { color: colors.textMuted }]}>
          Enter your API keys to enable dynamic model loading
        </Text>
        {/* In a real app, you'd have TextInput components here for API keys */}
      </View>

      {/* Text-to-Speech Provider */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Text-to-Speech</Text>

        <DynamicModelConfig
          providerId={settings.selectedTTSProvider}
          apiKey={getApiKey(settings.selectedTTSProvider)}
          selectedModel={settings.selectedModel}
          selectedVoice={settings.selectedVoice}
          onModelChange={(model) => setSettings((prev) => ({ ...prev, selectedModel: model }))}
          onVoiceChange={(voice) => setSettings((prev) => ({ ...prev, selectedVoice: voice }))}
        />
      </View>

      {/* Speech-to-Text Provider */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Speech-to-Text</Text>

        <DynamicModelConfig
          providerId={settings.selectedSTTProvider}
          apiKey={getApiKey(settings.selectedSTTProvider)}
          selectedModel={settings.selectedModel}
          onModelChange={(model) => setSettings((prev) => ({ ...prev, selectedModel: model }))}
        />
      </View>

      {/* Cache Management */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Cache Management</Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleClearCache}
        >
          <Text style={[styles.buttonText, { color: colors.surface }]}>Clear All Cache</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.secondary }]}
          onPress={() => handleClearProviderCache(settings.selectedTTSProvider)}
        >
          <Text style={[styles.buttonText, { color: colors.surface }]}>
            Clear TTS Provider Cache
          </Text>
        </TouchableOpacity>
      </View>

      {/* Implementation Notes */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Implementation Notes</Text>

        <Text style={[styles.implementationNote, { color: colors.textSecondary }]}>
          • Models are cached for 24 hours by default • Automatic fallback to hardcoded models if
          API fails • Pull-to-refresh functionality in model dropdowns • Real-time loading states
          and error handling • Graceful degradation when offline
        </Text>
      </View>

      {/* Integration Guide */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>How to Integrate</Text>

        <Text
          style={[styles.codeExample, { color: colors.textMuted, backgroundColor: colors.surface }]}
        >
          {`// 1. Replace static ModelDropdown with DynamicModelConfig
<DynamicModelConfig
  providerId="openai-tts"
  apiKey={apiKey}
  selectedModel={selectedModel}
  selectedVoice={selectedVoice}
  onModelChange={setSelectedModel}
  onVoiceChange={setSelectedVoice}
/>

// 2. Use the useModelLoader hook for custom implementations
const { models, loading, refreshModels } = useModelLoader({
  providerId: 'openai-tts',
  apiKey: apiKey,
});

// 3. Providers now have dynamic loading methods
const provider = new OpenAITTSProvider();
await provider.loadModelsAndVoices(apiKey);`}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  title: {
    fontSize: fontSizes.xxl,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    fontSize: fontSizes.medium,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 22,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSizes.large,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  note: {
    fontSize: fontSizes.small,
    marginBottom: spacing.md,
    fontStyle: 'italic',
  },
  button: {
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  buttonText: {
    fontSize: fontSizes.medium,
    fontWeight: '600',
    textAlign: 'center',
  },
  implementationNote: {
    fontSize: fontSizes.medium,
    lineHeight: 22,
  },
  codeExample: {
    fontFamily: 'Courier',
    fontSize: fontSizes.small,
    padding: spacing.md,
    borderRadius: 8,
    marginTop: spacing.sm,
  },
});
