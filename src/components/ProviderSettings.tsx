import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { GlassCard } from './GlassCard';
import { AnimatedButton } from './AnimatedButton';
import { ProviderCard } from './ProviderCard';
import { ModelDropdown } from './ModelDropdown';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { ProviderRegistry } from '../services/providers/ProviderRegistry';
import { wp, spacing, fontSizes } from '../utils/responsive';
import * as Haptics from 'expo-haptics';

interface ProviderSettingsProps {
  type: 'stt' | 'tts';
  selectedProvider: string;
  apiKeys: Record<string, string>;
  providerSettings: Record<string, any>;
  onProviderChange: (providerId: string) => void;
  onApiKeyChange: (providerId: string, key: string) => void;
  onSettingChange: (providerId: string, setting: string, value: any) => void;
}

export const ProviderSettings: React.FC<ProviderSettingsProps> = ({
  type,
  selectedProvider,
  apiKeys,
  providerSettings,
  onProviderChange,
  onApiKeyChange,
  onSettingChange,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [apiKeyVisible, setApiKeyVisible] = useState<Record<string, boolean>>({});

  const providers =
    type === 'stt' ? ProviderRegistry.getAllSTTProviders() : ProviderRegistry.getAllTTSProviders();

  const currentProvider = providers.find((p) => p.id === selectedProvider);

  const getApiKeyForProvider = (providerId: string): string => {
    // Map provider ID to API key field
    if (providerId.startsWith('openai')) return apiKeys.openai || '';
    if (providerId.startsWith('google')) return apiKeys.google || '';
    if (providerId.startsWith('elevenlabs')) return apiKeys.elevenlabs || '';
    return '';
  };

  const handleApiKeyChange = (providerId: string, value: string) => {
    let keyName = '';
    if (providerId.startsWith('openai')) keyName = 'openai';
    else if (providerId.startsWith('google')) keyName = 'google';
    else if (providerId.startsWith('elevenlabs')) keyName = 'elevenlabs';

    if (keyName) {
      onApiKeyChange(keyName, value);
    }
  };

  const toggleApiKeyVisibility = (providerId: string) => {
    setApiKeyVisible((prev) => ({
      ...prev,
      [providerId]: !prev[providerId],
    }));
  };

  const validateApiKey = async (provider: any) => {
    const apiKey = getApiKeyForProvider(provider.id);
    if (!apiKey) {
      Alert.alert(t('alerts.error'), t('alerts.enterApiKey'));
      return;
    }

    try {
      const isValid = await provider.validateConfig({ apiKey });
      if (isValid) {
        Alert.alert(t('alerts.success'), t('alerts.apiKeyValidMessage'));
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        Alert.alert(t('alerts.error'), t('alerts.apiKeyInvalidMessage'));
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    } catch (error) {
      Alert.alert(t('alerts.error'), t('alerts.apiKeyInvalidMessage'));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        {type === 'stt' ? t('settings.speechToTextProvider') : t('settings.textToSpeechProvider')}
      </Text>

      {/* Provider Selection */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.providerList}>
        {providers.map((provider) => (
          <View key={provider.id} style={styles.providerCardWrapper}>
            <ProviderCard
              id={provider.id}
              name={provider.name}
              description={provider.description}
              isSelected={selectedProvider === provider.id}
              requiresApiKey={provider.requiresApiKey}
              hasApiKey={!!getApiKeyForProvider(provider.id)}
              onPress={() => onProviderChange(provider.id)}
            />
          </View>
        ))}
      </ScrollView>

      {/* Selected Provider Settings */}
      {currentProvider && (
        <GlassCard style={styles.settingsCard}>
          <Text style={[styles.settingsTitle, { color: colors.text }]}>
            {currentProvider.name} {t('settings.configuration')}
          </Text>

          {/* API Key Input */}
          {currentProvider.requiresApiKey && (
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                {t('settings.apiKey')}
              </Text>
              <View style={styles.apiKeyContainer}>
                <TextInput
                  style={[styles.input, { color: colors.text, flex: 1 }]}
                  value={getApiKeyForProvider(currentProvider.id)}
                  onChangeText={(text) => handleApiKeyChange(currentProvider.id, text)}
                  placeholder={`Enter ${currentProvider.name} API Key`}
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry={!apiKeyVisible[currentProvider.id]}
                  autoCapitalize="none"
                />
                <AnimatedButton
                  title={apiKeyVisible[currentProvider.id] ? '👁' : '👁‍🗨'}
                  onPress={() => toggleApiKeyVisibility(currentProvider.id)}
                  variant="glass"
                  size="small"
                  style={styles.eyeButton}
                />
              </View>
              <AnimatedButton
                title={t('settings.validateApiKey')}
                onPress={() => validateApiKey(currentProvider)}
                variant="success"
                size="small"
                style={styles.validateButton}
                icon={<Text>✓</Text>}
              />
            </View>
          )}

          {/* Model Selection */}
          {currentProvider.models && currentProvider.models.length > 0 && (
            <ModelDropdown
              label={t('settings.model')}
              value={providerSettings[currentProvider.id]?.model || currentProvider.models[0].id}
              options={currentProvider.models.map((m) => ({
                id: m.id,
                name: m.name,
                description: m.description,
              }))}
              onValueChange={(value) => onSettingChange(currentProvider.id, 'model', value)}
            />
          )}

          {/* Voice Selection for TTS */}
          {type === 'tts' &&
            'voices' in currentProvider &&
            currentProvider.voices &&
            currentProvider.voices.length > 0 && (
              <ModelDropdown
                label={t('settings.voice')}
                value={providerSettings[currentProvider.id]?.voice || currentProvider.voices[0]?.id}
                options={currentProvider.voices.map((v: any) => ({
                  id: v.id,
                  name: v.name,
                  description: `${v.gender || ''} ${v.description || ''}`.trim(),
                }))}
                onValueChange={(value) => onSettingChange(currentProvider.id, 'voice', value)}
              />
            )}
        </GlassCard>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSizes.xl,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  providerList: {
    marginBottom: spacing.md,
  },
  providerCardWrapper: {
    width: wp(75),
    marginRight: spacing.sm,
  },
  settingsCard: {
    padding: spacing.md,
  },
  settingsTitle: {
    fontSize: fontSizes.large,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSizes.small,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  apiKeyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    borderRadius: spacing.sm,
    padding: spacing.sm,
    fontSize: fontSizes.medium,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  eyeButton: {
    marginLeft: spacing.xs,
    width: wp(12),
  },
  validateButton: {
    marginTop: spacing.sm,
  },
});
