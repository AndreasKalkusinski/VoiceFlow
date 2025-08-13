import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { ModelDropdown } from './ModelDropdown';
import { useModelLoader } from '../hooks/useModelLoader';
import { useTheme } from '../hooks/useTheme';
import { spacing, fontSizes } from '../utils/responsive';
import { TTSVoice } from '../services/providers/types';

interface DynamicModelConfigProps {
  providerId: string;
  apiKey: string;
  selectedModel?: string;
  selectedVoice?: string;
  onModelChange: (model: string) => void;
  onVoiceChange?: (voice: string) => void;
}

export const DynamicModelConfig: React.FC<DynamicModelConfigProps> = ({
  providerId,
  apiKey,
  selectedModel,
  selectedVoice,
  onModelChange,
  onVoiceChange,
}) => {
  const { colors } = useTheme();
  const { models, voices, loading, error, refreshModels, lastRefresh } = useModelLoader({
    providerId,
    apiKey,
    autoLoad: true,
  });

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (!apiKey) {
      Alert.alert('API Key Required', 'Please enter your API key first to load models.');
      return;
    }

    setRefreshing(true);
    try {
      await refreshModels();
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Convert models and voices to ModelDropdown format
  const modelOptions = models.map((model) => ({
    id: model.id,
    name: model.name,
    description: model.description,
  }));

  const voiceOptions = voices.map((voice: TTSVoice) => ({
    id: voice.id,
    name: voice.name,
    description: voice.description,
  }));

  if (!apiKey) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.warning + '20', borderColor: colors.warning },
        ]}
      >
        <Text style={[styles.warningText, { color: colors.warning }]}>
          Enter your API key to load available models
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error && !loading && (
        <View
          style={[
            styles.errorBanner,
            { backgroundColor: colors.error + '15', borderColor: colors.error + '30' },
          ]}
        >
          <Text style={[styles.errorBannerText, { color: colors.error }]}>
            Failed to load models from API. Using fallback models.
          </Text>
        </View>
      )}

      <ModelDropdown
        label="Model"
        value={selectedModel || ''}
        options={modelOptions}
        onValueChange={onModelChange}
        loading={loading}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        lastRefresh={lastRefresh}
        error={error}
        placeholder="Select a model"
      />

      {voices.length > 0 && onVoiceChange && (
        <ModelDropdown
          label="Voice"
          value={selectedVoice || ''}
          options={voiceOptions}
          onValueChange={onVoiceChange}
          loading={loading}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          lastRefresh={lastRefresh}
          error={error}
          placeholder="Select a voice"
        />
      )}

      {lastRefresh && (
        <Text style={[styles.lastUpdateText, { color: colors.textMuted }]}>
          Models last updated: {lastRefresh.toLocaleString()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
  warningText: {
    fontSize: fontSizes.small,
    textAlign: 'center',
    padding: spacing.md,
  },
  errorBanner: {
    padding: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  errorBannerText: {
    fontSize: fontSizes.small,
    textAlign: 'center',
    fontWeight: '500',
  },
  lastUpdateText: {
    fontSize: fontSizes.tiny,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
