import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ModernCard } from './ModernCard';
import { ModernButton } from './ModernButton';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { designTokens } from '../utils/design-system';
import * as Haptics from 'expo-haptics';
import { ProviderRegistry } from '../services/providers/ProviderRegistry';
import { LLMProviderRegistry } from '../services/providers/LLMProviderRegistry';
import { BaseLLMProvider } from '../services/providers/llm/BaseLLMProvider';

interface ProviderConfigModalProps {
  type: 'stt' | 'tts' | 'llm';
  selectedProvider: string;
  apiKeys: Record<string, string>;
  providerSettings: Record<string, any>;
  onProviderChange: (providerId: string) => void;
  onApiKeyChange: (providerId: string, key: string) => void;
  onSettingChange: (providerId: string, setting: string, value: any) => void;
  onClose: () => void;
}

export const ProviderConfigModal: React.FC<ProviderConfigModalProps> = ({
  type,
  selectedProvider,
  apiKeys,
  providerSettings,
  onProviderChange,
  onApiKeyChange,
  onSettingChange,
  onClose,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<'valid' | 'invalid' | null>(null);
  const [currentStep, setCurrentStep] = useState<'provider' | 'config'>('provider');
  const [loadedModels, setLoadedModels] = useState<any[]>([]);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [modelSearchQuery, setModelSearchQuery] = useState('');

  const providers =
    type === 'stt'
      ? ProviderRegistry.getAllSTTProviders()
      : type === 'tts'
        ? ProviderRegistry.getAllTTSProviders()
        : LLMProviderRegistry.getAllProviders();

  const currentProvider = providers.find((p: any) => p.id === selectedProvider);
  const isLLMProvider = (provider: any): provider is BaseLLMProvider => {
    return type === 'llm' && provider && 'loadModels' in provider;
  };

  useEffect(() => {
    // Reset validation status when provider changes
    setValidationStatus(null);
    setLoadedModels([]);

    // Load models for LLM providers if API key exists
    if (isLLMProvider(currentProvider)) {
      const apiKey = getApiKeyForProvider(currentProvider.id);
      if (apiKey) {
        loadModelsForProvider(apiKey);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvider, type]);

  // Load models when entering config step
  useEffect(() => {
    if (currentStep === 'config' && isLLMProvider(currentProvider)) {
      const apiKey = getApiKeyForProvider(currentProvider.id);
      if (apiKey && loadedModels.length === 0) {
        loadModelsForProvider(apiKey);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const loadModelsForProvider = async (apiKey: string) => {
    if (!isLLMProvider(currentProvider)) return;

    setIsLoadingModels(true);
    try {
      const models = await currentProvider.loadModels(apiKey);
      setLoadedModels(models);
    } catch (error) {
      console.error('Failed to load models:', error);
      // Fall back to default models
      setLoadedModels(currentProvider.models || []);
    } finally {
      setIsLoadingModels(false);
    }
  };

  const getApiKeyForProvider = (providerId: string): string => {
    if (providerId.startsWith('openai')) return apiKeys.openai || '';
    if (providerId.startsWith('google')) return apiKeys.google || '';
    if (providerId.startsWith('elevenlabs')) return apiKeys.elevenlabs || '';
    if (providerId.startsWith('anthropic')) return apiKeys.anthropic || '';
    if (providerId === 'mistral' || providerId.startsWith('mistral')) return apiKeys.mistral || '';
    return '';
  };

  const handleApiKeyChange = (providerId: string, value: string) => {
    let keyName = '';
    if (providerId.startsWith('openai')) keyName = 'openai';
    else if (providerId.startsWith('google')) keyName = 'google';
    else if (providerId.startsWith('elevenlabs')) keyName = 'elevenlabs';
    else if (providerId.startsWith('anthropic')) keyName = 'anthropic';
    else if (providerId === 'mistral' || providerId.startsWith('mistral')) keyName = 'mistral';

    if (keyName) {
      onApiKeyChange(keyName, value);
      setValidationStatus(null); // Reset validation when key changes

      // Load models for LLM providers when API key changes
      if (value && isLLMProvider(currentProvider)) {
        loadModelsForProvider(value);
      }
    }
  };

  const validateApiKey = async () => {
    if (!currentProvider) return;

    const apiKey = getApiKeyForProvider(currentProvider.id);
    if (!apiKey) {
      Alert.alert(t('alerts.error'), t('alerts.enterApiKey'));
      return;
    }

    setIsValidating(true);
    try {
      const isValid = currentProvider.validateConfig
        ? await currentProvider.validateConfig({ apiKey })
        : false;
      setValidationStatus(isValid ? 'valid' : 'invalid');

      if (isValid) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    } catch {
      setValidationStatus('invalid');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsValidating(false);
    }
  };

  const handleProviderSelect = (providerId: string) => {
    onProviderChange(providerId);
    setCurrentStep('config');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Load models when selecting an LLM provider
    if (type === 'llm') {
      const provider = providers.find((p: any) => p.id === providerId);
      if (provider && 'loadModels' in provider) {
        const apiKey = getApiKeyForProvider(providerId);
        if (apiKey) {
          setIsLoadingModels(true);
          (provider as BaseLLMProvider)
            .loadModels(apiKey)
            .then((models: any) => {
              setLoadedModels(models);
              setIsLoadingModels(false);
            })
            .catch(() => {
              setLoadedModels((provider as BaseLLMProvider).models || []);
              setIsLoadingModels(false);
            });
        }
      }
    }
  };

  const renderProviderOption = (provider: any) => {
    const isSelected = selectedProvider === provider.id;
    const hasApiKey = !!getApiKeyForProvider(provider.id);

    return (
      <TouchableOpacity
        key={provider.id}
        style={[
          styles.providerOption,
          isSelected && [styles.providerOptionSelected, { borderColor: colors.primary }],
        ]}
        onPress={() => handleProviderSelect(provider.id)}
      >
        <View style={styles.providerHeader}>
          <View style={styles.providerInfo}>
            <Text style={[styles.providerName, { color: colors.text }]}>{provider.name}</Text>
            <Text style={[styles.providerDescription, { color: colors.textSecondary }]}>
              {provider.description}
            </Text>
          </View>
          <View style={styles.providerStatus}>
            {isSelected && (
              <View style={[styles.selectedBadge, { backgroundColor: colors.primary }]}>
                <Ionicons name="checkmark" size={16} color="#fff" />
              </View>
            )}
            {provider.requiresApiKey && (
              <View
                style={[
                  styles.apiKeyIndicator,
                  { backgroundColor: hasApiKey ? colors.success + '20' : colors.warning + '20' },
                ]}
              >
                <Ionicons
                  name={hasApiKey ? 'key' : 'key-outline'}
                  size={14}
                  color={hasApiKey ? colors.success : colors.warning}
                />
              </View>
            )}
          </View>
        </View>

        {provider.features && (
          <View style={styles.featuresList}>
            {provider.features.map((feature: string, index: number) => (
              <View key={index} style={styles.featureItem}>
                <Ionicons name="checkmark-circle-outline" size={14} color={colors.primary} />
                <Text style={[styles.featureText, { color: colors.textSecondary }]}>{feature}</Text>
              </View>
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderProviderSelection = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={[styles.stepTitle, { color: colors.text }]}>
          {t('settings.chooseProvider')}
        </Text>
        <Text style={[styles.stepSubtitle, { color: colors.textSecondary }]}>
          {type === 'stt'
            ? t('settings.selectSTTService')
            : type === 'tts'
              ? t('settings.selectTTSService')
              : t('settings.selectLLMService')}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.providerList}>
        {providers.map(renderProviderOption)}
      </ScrollView>
    </View>
  );

  const renderConfiguration = () => {
    if (!currentProvider) return null;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.stepContainer}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => setCurrentStep('provider')}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
          <Text style={[styles.backText, { color: colors.text }]}>
            {t('settings.backToProviders')}
          </Text>
        </TouchableOpacity>

        <View style={styles.stepHeader}>
          <Text style={[styles.stepTitle, { color: colors.text }]}>{currentProvider.name}</Text>
          <Text style={[styles.stepSubtitle, { color: colors.textSecondary }]}>
            {t('settings.configureSettings', { provider: currentProvider.name })}
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* API Key Section */}
          {currentProvider.requiresApiKey && (
            <ModernCard variant="surface" style={styles.configCard}>
              <View style={styles.configHeader}>
                <Ionicons name="key-outline" size={20} color={colors.primary} />
                <Text style={[styles.configTitle, { color: colors.text }]}>
                  {t('settings.apiKey')}
                </Text>
                {validationStatus && (
                  <View
                    style={[
                      styles.validationBadge,
                      {
                        backgroundColor:
                          validationStatus === 'valid'
                            ? colors.success + '20'
                            : colors.error + '20',
                      },
                    ]}
                  >
                    <Ionicons
                      name={validationStatus === 'valid' ? 'checkmark-circle' : 'close-circle'}
                      size={16}
                      color={validationStatus === 'valid' ? colors.success : colors.error}
                    />
                    <Text
                      style={[
                        styles.validationText,
                        { color: validationStatus === 'valid' ? colors.success : colors.error },
                      ]}
                    >
                      {validationStatus === 'valid' ? t('settings.valid') : t('settings.invalid')}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                  value={getApiKeyForProvider(currentProvider.id)}
                  onChangeText={(text) => handleApiKeyChange(currentProvider.id, text)}
                  placeholder={t('settings.enterApiKey', { provider: currentProvider.name })}
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry={!apiKeyVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setApiKeyVisible(!apiKeyVisible)}
                >
                  <Ionicons
                    name={apiKeyVisible ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.apiKeyActions}>
                <ModernButton
                  title={isValidating ? t('settings.validating') : t('settings.validateKey')}
                  onPress={validateApiKey}
                  variant="glass"
                  size="small"
                  disabled={isValidating || !getApiKeyForProvider(currentProvider.id)}
                  icon={
                    isValidating ? (
                      <ActivityIndicator size="small" color={colors.primary} />
                    ) : (
                      <Ionicons name="shield-checkmark-outline" size={16} color={colors.primary} />
                    )
                  }
                />

                <TouchableOpacity
                  style={styles.helpLink}
                  onPress={() =>
                    Alert.alert(
                      t('settings.getApiKey'),
                      t('settings.visitProvider', { provider: currentProvider.name }),
                    )
                  }
                >
                  <Ionicons name="help-circle-outline" size={16} color={colors.primary} />
                  <Text style={[styles.helpText, { color: colors.primary }]}>
                    {t('settings.whereToGetIt')}
                  </Text>
                </TouchableOpacity>
              </View>
            </ModernCard>
          )}

          {/* Model Selection */}
          {currentProvider.models && currentProvider.models.length > 0 && (
            <ModernCard variant="surface" style={styles.configCard}>
              <View style={styles.configHeader}>
                <Ionicons name="cube-outline" size={20} color={colors.primary} />
                <Text style={[styles.configTitle, { color: colors.text }]}>
                  {t('settings.model')}
                </Text>
                {isLoadingModels && <ActivityIndicator size="small" color={colors.primary} />}
              </View>

              {/* Search Bar for Models */}
              {(loadedModels.length > 5 || currentProvider.models.length > 5) && (
                <View style={styles.searchContainer}>
                  <Ionicons name="search-outline" size={18} color={colors.textMuted} />
                  <TextInput
                    style={[styles.searchInput, { color: colors.text }]}
                    placeholder={t('settings.searchModels') || 'Search models...'}
                    placeholderTextColor={colors.textMuted}
                    value={modelSearchQuery}
                    onChangeText={setModelSearchQuery}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {modelSearchQuery.length > 0 && (
                    <TouchableOpacity
                      onPress={() => setModelSearchQuery('')}
                      style={styles.clearButton}
                    >
                      <Ionicons name="close-circle" size={18} color={colors.textMuted} />
                    </TouchableOpacity>
                  )}
                </View>
              )}

              <ScrollView style={styles.modelsList} showsVerticalScrollIndicator={false}>
                <View style={styles.optionsGrid}>
                  {(loadedModels.length > 0 ? loadedModels : currentProvider.models)
                    .filter(
                      (model: any) =>
                        model.id.toLowerCase().includes(modelSearchQuery.toLowerCase()) ||
                        model.name.toLowerCase().includes(modelSearchQuery.toLowerCase()) ||
                        (model.description &&
                          model.description.toLowerCase().includes(modelSearchQuery.toLowerCase())),
                    )
                    .map((model: any) => {
                      const isSelected =
                        providerSettings[currentProvider.id]?.model === model.id ||
                        (!providerSettings[currentProvider.id]?.model &&
                          currentProvider.models?.[0]?.id === model.id);

                      return (
                        <TouchableOpacity
                          key={model.id}
                          style={[
                            styles.optionCard,
                            isSelected && [
                              styles.optionCardSelected,
                              { borderColor: colors.primary },
                            ],
                          ]}
                          onPress={() => {
                            onSettingChange(currentProvider.id, 'model', model.id);
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                          }}
                        >
                          <Text style={[styles.optionName, { color: colors.text }]}>
                            {model.name}
                          </Text>
                          {model.description && (
                            <Text
                              style={[styles.optionDescription, { color: colors.textSecondary }]}
                            >
                              {model.description}
                            </Text>
                          )}
                          {isSelected && (
                            <View
                              style={[
                                styles.selectedIndicator,
                                { backgroundColor: colors.primary },
                              ]}
                            >
                              <Ionicons name="checkmark" size={12} color="#fff" />
                            </View>
                          )}
                        </TouchableOpacity>
                      );
                    })}
                </View>
              </ScrollView>
            </ModernCard>
          )}

          {/* Voice Selection for TTS */}
          {type === 'tts' && 'voices' in currentProvider && currentProvider.voices && (
            <ModernCard variant="surface" style={styles.configCard}>
              <View style={styles.configHeader}>
                <Ionicons name="mic-outline" size={20} color={colors.primary} />
                <Text style={[styles.configTitle, { color: colors.text }]}>
                  {t('settings.voice')}
                </Text>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.voicesList}>
                  {currentProvider.voices.map((voice: any) => {
                    const isSelected =
                      providerSettings[currentProvider.id]?.voice === voice.id ||
                      (!providerSettings[currentProvider.id]?.voice &&
                        currentProvider.voices?.[0]?.id === voice.id);

                    return (
                      <TouchableOpacity
                        key={voice.id}
                        style={[
                          styles.voiceCard,
                          isSelected && [styles.voiceCardSelected, { borderColor: colors.primary }],
                        ]}
                        onPress={() => {
                          onSettingChange(currentProvider.id, 'voice', voice.id);
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        }}
                      >
                        <View style={styles.voiceIcon}>
                          <Ionicons
                            name={voice.gender === 'male' ? 'man-outline' : 'woman-outline'}
                            size={24}
                            color={isSelected ? colors.primary : colors.textSecondary}
                          />
                        </View>
                        <Text style={[styles.voiceName, { color: colors.text }]}>{voice.name}</Text>
                        {voice.description && (
                          <Text style={[styles.voiceDescription, { color: colors.textSecondary }]}>
                            {voice.description}
                          </Text>
                        )}
                        {isSelected && (
                          <View style={[styles.selectedBadge, { backgroundColor: colors.primary }]}>
                            <Ionicons name="checkmark" size={14} color="#fff" />
                          </View>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </ModernCard>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <ModernButton
            title={t('settings.done')}
            onPress={onClose}
            variant="primary"
            size="large"
            fullWidth
            icon={<Ionicons name="checkmark" size={20} color="#fff" />}
          />
        </View>
      </KeyboardAvoidingView>
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}
    >
      {/* Modal Header with Close Button */}
      <View style={styles.modalHeader}>
        <View style={{ width: 40 }} />
        <Text style={[styles.modalTitle, { color: colors.text }]}>
          {type === 'stt'
            ? t('settings.speechToTextProvider')
            : type === 'tts'
              ? t('settings.textToSpeechProvider')
              : t('settings.llmProvider')}
        </Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              backgroundColor: colors.primary,
              width: currentStep === 'provider' ? '50%' : '100%',
            },
          ]}
        />
      </View>

      {currentStep === 'provider' ? renderProviderSelection() : renderConfiguration()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: designTokens.radius.xl,
    borderTopRightRadius: designTokens.radius.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: designTokens.spacing.lg,
    paddingVertical: designTokens.spacing.md,
  },
  modalTitle: {
    ...designTokens.typography.headlineSmall,
    fontWeight: '600',
  },
  closeButton: {
    padding: designTokens.spacing.xs,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  stepContainer: {
    flex: 1,
    padding: designTokens.spacing.lg,
  },
  stepHeader: {
    marginBottom: designTokens.spacing.xl,
  },
  stepTitle: {
    ...designTokens.typography.headlineMedium,
    fontWeight: '700',
    marginBottom: designTokens.spacing.xs,
  },
  stepSubtitle: {
    ...designTokens.typography.bodyMedium,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: designTokens.spacing.md,
    gap: designTokens.spacing.sm,
  },
  backText: {
    ...designTokens.typography.bodyMedium,
    fontWeight: '500',
  },
  providerList: {
    flex: 1,
  },
  providerOption: {
    padding: designTokens.spacing.md,
    borderRadius: designTokens.radius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    marginBottom: designTokens.spacing.md,
  },
  providerOptionSelected: {
    borderWidth: 2,
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
  },
  providerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    ...designTokens.typography.titleMedium,
    fontWeight: '600',
    marginBottom: designTokens.spacing.xs,
  },
  providerDescription: {
    ...designTokens.typography.bodySmall,
    lineHeight: 18,
  },
  providerStatus: {
    flexDirection: 'row',
    gap: designTokens.spacing.xs,
  },
  selectedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  apiKeyIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuresList: {
    marginTop: designTokens.spacing.sm,
    gap: designTokens.spacing.xs,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: designTokens.spacing.xs,
  },
  featureText: {
    ...designTokens.typography.bodySmall,
    fontSize: 12,
  },
  configCard: {
    marginBottom: designTokens.spacing.md,
  },
  configHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: designTokens.spacing.md,
    gap: designTokens.spacing.sm,
  },
  configTitle: {
    ...designTokens.typography.titleSmall,
    flex: 1,
  },
  validationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: designTokens.spacing.sm,
    paddingVertical: designTokens.spacing.xs,
    borderRadius: designTokens.radius.full,
    gap: designTokens.spacing.xs,
  },
  validationText: {
    ...designTokens.typography.labelSmall,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: designTokens.radius.md,
    padding: designTokens.spacing.md,
    ...designTokens.typography.bodyMedium,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  eyeButton: {
    position: 'absolute',
    right: designTokens.spacing.md,
    padding: designTokens.spacing.xs,
  },
  apiKeyActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: designTokens.spacing.md,
  },
  helpLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: designTokens.spacing.xs,
  },
  helpText: {
    ...designTokens.typography.bodySmall,
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderRadius: designTokens.radius.md,
    paddingHorizontal: designTokens.spacing.md,
    paddingVertical: designTokens.spacing.sm,
    marginBottom: designTokens.spacing.md,
    gap: designTokens.spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...designTokens.typography.bodyMedium,
    padding: 0,
  },
  clearButton: {
    padding: designTokens.spacing.xs,
  },
  modelsList: {
    maxHeight: 300,
  },
  optionsGrid: {
    gap: designTokens.spacing.sm,
  },
  optionCard: {
    padding: designTokens.spacing.md,
    borderRadius: designTokens.radius.md,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    marginBottom: designTokens.spacing.sm,
    position: 'relative',
  },
  optionCardSelected: {
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
  },
  optionName: {
    ...designTokens.typography.titleSmall,
    fontWeight: '600',
    marginBottom: designTokens.spacing.xs,
  },
  optionDescription: {
    ...designTokens.typography.bodySmall,
    fontSize: 12,
    lineHeight: 16,
  },
  selectedIndicator: {
    position: 'absolute',
    top: designTokens.spacing.sm,
    right: designTokens.spacing.sm,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voicesList: {
    flexDirection: 'row',
    gap: designTokens.spacing.sm,
    paddingVertical: designTokens.spacing.xs,
  },
  voiceCard: {
    width: 100,
    padding: designTokens.spacing.md,
    borderRadius: designTokens.radius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    alignItems: 'center',
    position: 'relative',
  },
  voiceCardSelected: {
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
  },
  voiceIcon: {
    marginBottom: designTokens.spacing.sm,
  },
  voiceName: {
    ...designTokens.typography.labelMedium,
    fontWeight: '600',
    textAlign: 'center',
  },
  voiceDescription: {
    ...designTokens.typography.bodySmall,
    fontSize: 10,
    textAlign: 'center',
    marginTop: designTokens.spacing.xs,
  },
  footer: {
    paddingTop: designTokens.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
});
