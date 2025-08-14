import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
  TouchableOpacity,
  Animated,
  Platform,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ModernCard } from '../components/ModernCard';
import { ModernButton } from '../components/ModernButton';
import { ProviderConfigModal } from '../components/ProviderConfigModal';
import { StorageService } from '../services/storage';
import { Settings } from '../types';
import { useTheme, ThemeMode } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { changeLanguage, availableLanguages } from '../i18n';
import { designTokens } from '../utils/design-system';
import { vh } from '../utils/responsive-dimensions';
import { getScreenTheme } from '../utils/screen-themes';
import * as Haptics from 'expo-haptics';
import { HistoryStorage, HistorySettings } from '../services/historyStorage';
import Modal from 'react-native-modal';

type TabType = 'general' | 'providers' | 'about';

// App Info - Dynamically loaded from version utils
import Constants from 'expo-constants';
import { APP_VERSION, BUILD_NUMBER } from '../utils/version';
const GITHUB_URL = 'https://github.com/AndreasKalkusinski/VoiceFlow';
const PRIVACY_URL = 'https://github.com/AndreasKalkusinski/VoiceFlow/wiki/Privacy-Policy';
const TERMS_URL = 'https://github.com/AndreasKalkusinski/VoiceFlow/wiki/Terms-of-Service';
const WIKI_URL = 'https://github.com/AndreasKalkusinski/VoiceFlow/wiki';
const ISSUES_URL = 'https://github.com/AndreasKalkusinski/VoiceFlow/issues';
const DISCUSSIONS_URL = 'https://github.com/AndreasKalkusinski/VoiceFlow/discussions';
const RELEASES_URL = 'https://github.com/AndreasKalkusinski/VoiceFlow/releases';
const CONTRIBUTING_URL = 'https://github.com/AndreasKalkusinski/VoiceFlow/wiki/Contributing';

export const Modern2025SettingsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [settings, setSettings] = useState<Settings>({
    openaiApiKey: '',
    sttModel: 'whisper-1',
    ttsModel: 'tts-1',
    ttsVoice: 'alloy',
    sttProvider: 'openai-stt',
    ttsProvider: 'openai-tts',
    llmProvider: 'openai-llm',
    apiKeys: {
      openai: '',
      google: '',
      elevenlabs: '',
      mistral: '',
      anthropic: '',
    },
    providerSettings: {},
  });
  const [historySettings, setHistorySettings] = useState<HistorySettings>({
    enabled: true,
    maxItems: 25,
  });
  const [showProviderModal, setShowProviderModal] = useState(false);
  const [providerModalType, setProviderModalType] = useState<'stt' | 'tts' | 'llm'>('stt');

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const { isDark, themeMode, setTheme } = useTheme();
  const colors = isDark ? designTokens.colors.dark : designTokens.colors.light;
  const screenTheme = getScreenTheme('Settings', isDark);
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  useEffect(() => {
    loadSettings();
    loadHistorySettings();

    // Smooth fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: designTokens.animation.normal,
      useNativeDriver: true,
    }).start();
  }, []);

  // Auto-save settings whenever they change
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (settings.openaiApiKey || settings.apiKeys?.openai) {
        saveSettingsSilently();
      }
    }, 1000);

    return () => clearTimeout(saveTimer);
  }, [settings]);

  // Helper functions to get provider display names
  const getSTTProviderName = (provider: string | undefined) => {
    switch (provider) {
      case 'openai-stt':
        return 'OpenAI Whisper';
      case 'google-stt':
        return 'Google Cloud';
      default:
        return provider || 'Not configured';
    }
  };

  const getTTSProviderName = (provider: string | undefined) => {
    switch (provider) {
      case 'openai-tts':
        return 'OpenAI TTS';
      case 'google-tts':
        return 'Google Cloud';
      case 'elevenlabs':
        return 'ElevenLabs';
      default:
        return provider || 'Not configured';
    }
  };

  const getLLMProviderName = (provider: string | undefined) => {
    switch (provider) {
      case 'openai-llm':
        return 'OpenAI GPT';
      case 'anthropic-llm':
        return 'Anthropic Claude';
      case 'google-gemini':
        return 'Google Gemini';
      case 'mistral':
        return 'Mistral AI';
      default:
        return provider || 'Not configured';
    }
  };

  // Helper functions to get current models
  const getSTTModel = () => {
    const provider = settings.sttProvider;
    if (provider && settings.providerSettings?.[provider]?.model) {
      const model = settings.providerSettings[provider].model;
      // Validate model exists
      if (model && typeof model === 'string' && model.length > 0) {
        return model;
      }
    }
    // Fallback to legacy field or default
    return settings.sttModel || 'whisper-1';
  };

  const getTTSModel = () => {
    const provider = settings.ttsProvider;
    if (provider && settings.providerSettings?.[provider]?.model) {
      const model = settings.providerSettings[provider].model;
      // Validate model exists
      if (model && typeof model === 'string' && model.length > 0) {
        return model;
      }
    }
    // Fallback to legacy field or default
    return settings.ttsModel || 'tts-1';
  };

  const getTTSVoice = () => {
    const provider = settings.ttsProvider;
    if (provider && settings.providerSettings?.[provider]?.voice) {
      const voice = settings.providerSettings[provider].voice;
      // Validate voice exists
      if (voice && typeof voice === 'string' && voice.length > 0) {
        return voice;
      }
    }
    // Fallback to legacy field or default
    return settings.ttsVoice || 'alloy';
  };

  const getLLMModel = () => {
    const provider = settings.llmProvider;
    const model = provider ? settings.providerSettings?.[provider]?.model : undefined;

    // Return model if it exists and is valid
    if (model && typeof model === 'string' && model.length > 0) {
      return model;
    }

    // Return default model based on provider
    return getDefaultModelForProvider(provider);
  };

  const getDefaultModelForProvider = (provider: string | undefined) => {
    switch (provider) {
      case 'openai-llm':
        return 'gpt-4o-mini';
      case 'anthropic-llm':
        return 'claude-3-haiku-20240307';
      case 'google-gemini':
        return 'gemini-1.5-flash';
      case 'mistral':
        return 'mistral-small-latest';
      default:
        return 'gpt-4o-mini';
    }
  };

  const loadSettings = async () => {
    try {
      const loadedSettings = await StorageService.getSettings();
      const migratedSettings = {
        ...loadedSettings,
        sttProvider: loadedSettings.sttProvider || 'openai-stt',
        ttsProvider: loadedSettings.ttsProvider || 'openai-tts',
        llmProvider: loadedSettings.llmProvider || 'openai-llm',
        apiKeys: {
          openai: loadedSettings.apiKeys?.openai || loadedSettings.openaiApiKey || '',
          google: loadedSettings.apiKeys?.google || '',
          elevenlabs: loadedSettings.apiKeys?.elevenlabs || '',
          mistral: loadedSettings.apiKeys?.mistral || '',
          anthropic: loadedSettings.apiKeys?.anthropic || '',
          ...loadedSettings.apiKeys,
        },
        providerSettings: loadedSettings.providerSettings || {},
      };
      setSettings(migratedSettings);
    } catch {
      /* ignore */
    }
  };

  const loadHistorySettings = async () => {
    try {
      const settings = await HistoryStorage.getSettings();
      setHistorySettings(settings);
    } catch {
      /* ignore */
    }
  };

  const updateHistorySettings = async (newSettings: HistorySettings) => {
    setHistorySettings(newSettings);
    await HistoryStorage.saveSettings(newSettings);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const clearHistory = async () => {
    Alert.alert(t('history.clearTitle'), t('history.clearMessage'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.clear'),
        style: 'destructive',
        onPress: async () => {
          await HistoryStorage.clearHistory();
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          Alert.alert(t('common.success'), t('history.cleared'));
        },
      },
    ]);
  };

  const saveSettingsSilently = async () => {
    try {
      await StorageService.saveSettings(settings);
    } catch {
      /* ignore */
    }
  };

  const handleLanguageChange = async (languageCode: string) => {
    try {
      setSelectedLanguage(languageCode);
      await changeLanguage(languageCode);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      setSelectedLanguage(i18n.language);
    }
  };

  const openProviderConfig = (type: 'stt' | 'tts' | 'llm') => {
    setProviderModalType(type);
    setShowProviderModal(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const openURL = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert(t('common.error'), 'Could not open URL');
    }
  };

  const renderTabButton = (tab: TabType, icon: string, label: string) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        activeTab === tab && [styles.tabButtonActive, { backgroundColor: colors.primary + '20' }],
      ]}
      onPress={() => {
        setActiveTab(tab);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }}
    >
      <Ionicons
        name={icon as keyof typeof Ionicons.glyphMap}
        size={20}
        color={activeTab === tab ? colors.primary : colors.textSecondary}
      />
      <Text
        style={[
          styles.tabButtonText,
          { color: activeTab === tab ? colors.primary : colors.textSecondary },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderGeneralTab = () => (
    <Animated.View style={{ opacity: fadeAnim }}>
      {/* Appearance Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t('settings.appearance')}
        </Text>

        <ModernCard variant="glass" style={styles.card}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            {t('settings.theme.title')}
          </Text>
          <View style={styles.themeSelector}>
            {[
              {
                id: 'auto',
                name: t('settings.theme.auto'),
                iconName: 'contrast-outline',
                gradient: ['#6366F1', '#8B5CF6'],
              },
              {
                id: 'light',
                name: t('settings.theme.light'),
                iconName: 'sunny-outline',
                gradient: ['#FCD34D', '#F59E0B'],
              },
              {
                id: 'dark',
                name: t('settings.theme.dark'),
                iconName: 'moon-outline',
                gradient: ['#4B5563', '#1F2937'],
              },
            ].map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[styles.themeOption, themeMode === option.id && styles.themeOptionActive]}
                onPress={() => {
                  setTheme(option.id as ThemeMode);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              >
                <LinearGradient
                  colors={
                    themeMode === option.id
                      ? (option.gradient as [string, string])
                      : ['#F3F4F6', '#E5E7EB']
                  }
                  style={styles.themeIconContainer}
                >
                  <Ionicons
                    name={option.iconName as keyof typeof Ionicons.glyphMap}
                    size={20}
                    color={themeMode === option.id ? '#FFFFFF' : '#6B7280'}
                  />
                </LinearGradient>
                <Text
                  style={[
                    styles.themeText,
                    { color: themeMode === option.id ? colors.primary : colors.text },
                    themeMode === option.id && { fontWeight: '600' },
                  ]}
                >
                  {option.name}
                </Text>
                {themeMode === option.id && (
                  <View style={[styles.activeIndicator, { backgroundColor: colors.primary }]} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ModernCard>

        <ModernCard variant="glass" style={styles.card}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            {t('settings.language')}
          </Text>
          <View style={styles.languageSelector}>
            {availableLanguages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageOption,
                  selectedLanguage === lang.code && styles.languageOptionActive,
                ]}
                onPress={() => handleLanguageChange(lang.code)}
              >
                <View
                  style={[
                    styles.languageIconContainer,
                    selectedLanguage === lang.code && { backgroundColor: colors.primary + '20' },
                  ]}
                >
                  <Text style={styles.flagEmoji}>{lang.flag}</Text>
                </View>
                <Text
                  style={[
                    styles.languageText,
                    { color: selectedLanguage === lang.code ? colors.primary : colors.text },
                    selectedLanguage === lang.code && { fontWeight: '600' },
                  ]}
                >
                  {lang.name}
                </Text>
                {selectedLanguage === lang.code && (
                  <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ModernCard>
      </View>

      {/* Data & Privacy Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t('settings.dataPrivacy')}
        </Text>

        {/* History Settings */}
        <ModernCard variant="surface" style={styles.card}>
          <View style={styles.switchRow}>
            <View style={styles.switchContent}>
              <View style={styles.switchTextContainer}>
                <Text style={[styles.label, { color: colors.text }]}>{t('history.enable')}</Text>
                <Text style={[styles.description, { color: colors.textSecondary }]}>
                  {t('history.enableDescription')}
                </Text>
              </View>
              <Switch
                value={historySettings.enabled}
                onValueChange={(value) =>
                  updateHistorySettings({ ...historySettings, enabled: value })
                }
                trackColor={{
                  false: '#E5E7EB',
                  true: colors.primary + '60',
                }}
                thumbColor={historySettings.enabled ? colors.primary : '#FFFFFF'}
                ios_backgroundColor="#E5E7EB"
              />
            </View>
          </View>

          {historySettings.enabled && (
            <View style={styles.historyOptions}>
              <Text style={[styles.label, { color: colors.textSecondary, marginTop: 16 }]}>
                {t('history.maxItems')}
              </Text>

              <View style={styles.segmentedControl}>
                {[10, 25, 50, 'unlimited'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.segment,
                      {
                        backgroundColor:
                          historySettings.maxItems === option ? colors.primary : colors.surface,
                        borderColor: colors.border,
                      },
                    ]}
                    onPress={() => {
                      updateHistorySettings({
                        ...historySettings,
                        maxItems: option as number | 'unlimited',
                      });
                    }}
                  >
                    <Text
                      style={[
                        styles.segmentText,
                        {
                          color:
                            historySettings.maxItems === option ? colors.background : colors.text,
                        },
                      ]}
                    >
                      {option === 'unlimited' ? t('history.unlimited') : option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={[styles.dangerButton, { backgroundColor: colors.error + '20' }]}
                onPress={clearHistory}
              >
                <Ionicons name="trash-outline" size={20} color={colors.error} />
                <Text style={[styles.dangerButtonText, { color: colors.error }]}>
                  {t('history.clearAll')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ModernCard>
      </View>
    </Animated.View>
  );

  const renderProvidersTab = () => (
    <Animated.View style={{ opacity: fadeAnim }}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t('settings.aiProviders')}
        </Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
          {t('settings.aiProvidersDescription')}
        </Text>

        {/* Speech-to-Text Provider */}
        <ModernCard variant="elevated" style={styles.card}>
          <View style={styles.providerHeader}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: colors.text }]}>
                {t('settings.speechToTextProvider')}
              </Text>
              <Text style={[styles.providerName, { color: colors.textSecondary }]}>
                {getSTTProviderName(settings.sttProvider)}
              </Text>
              <Text style={[styles.modelText, { color: colors.textSecondary }]}>
                {t('settings.model')}: {getSTTModel()}
              </Text>
            </View>
            <View style={styles.providerStatus}>
              {(settings.sttProvider?.includes('openai') &&
                (settings.apiKeys?.openai || settings.openaiApiKey)) ||
              (settings.sttProvider?.includes('google') && settings.apiKeys?.google) ? (
                <View style={[styles.statusBadge, { backgroundColor: colors.success + '20' }]}>
                  <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                  <Text style={[styles.statusText, { color: colors.success }]}>
                    {t('settings.configured')}
                  </Text>
                </View>
              ) : (
                <View style={[styles.statusBadge, { backgroundColor: colors.warning + '20' }]}>
                  <Ionicons name="warning" size={16} color={colors.warning} />
                  <Text style={[styles.statusText, { color: colors.warning }]}>
                    {t('settings.setupRequired')}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <ModernButton
            title={t('settings.configure')}
            onPress={() => openProviderConfig('stt')}
            variant="glass"
            size="small"
            fullWidth
            icon={<Ionicons name="settings-outline" size={18} color={colors.text} />}
          />
        </ModernCard>

        {/* Text-to-Speech Provider */}
        <ModernCard variant="elevated" style={styles.card}>
          <View style={styles.providerHeader}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: colors.text }]}>
                {t('settings.textToSpeechProvider')}
              </Text>
              <Text style={[styles.providerName, { color: colors.textSecondary }]}>
                {getTTSProviderName(settings.ttsProvider)}
              </Text>
              <Text style={[styles.modelText, { color: colors.textSecondary }]}>
                {t('settings.model')}: {getTTSModel()} • {t('settings.voice')}: {getTTSVoice()}
              </Text>
            </View>
            <View style={styles.providerStatus}>
              {(settings.ttsProvider?.includes('openai') &&
                (settings.apiKeys?.openai || settings.openaiApiKey)) ||
              (settings.ttsProvider?.includes('google') && settings.apiKeys?.google) ||
              (settings.ttsProvider?.includes('elevenlabs') && settings.apiKeys?.elevenlabs) ? (
                <View style={[styles.statusBadge, { backgroundColor: colors.success + '20' }]}>
                  <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                  <Text style={[styles.statusText, { color: colors.success }]}>
                    {t('settings.configured')}
                  </Text>
                </View>
              ) : (
                <View style={[styles.statusBadge, { backgroundColor: colors.warning + '20' }]}>
                  <Ionicons name="warning" size={16} color={colors.warning} />
                  <Text style={[styles.statusText, { color: colors.warning }]}>
                    {t('settings.setupRequired')}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <ModernButton
            title={t('settings.configure')}
            onPress={() => openProviderConfig('tts')}
            variant="glass"
            size="small"
            fullWidth
            icon={<Ionicons name="settings-outline" size={18} color={colors.text} />}
          />
        </ModernCard>

        {/* AI Assistant Provider */}
        <ModernCard variant="elevated" style={styles.card}>
          <View style={styles.providerHeader}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: colors.text }]}>
                {t('settings.llmProvider')}
              </Text>
              <Text style={[styles.providerName, { color: colors.textSecondary }]}>
                {getLLMProviderName(settings.llmProvider)}
              </Text>
              <Text style={[styles.modelText, { color: colors.textSecondary }]}>
                {t('settings.model')}: {getLLMModel()}
              </Text>
            </View>
            <View style={styles.providerStatus}>
              {(settings.llmProvider?.includes('openai') &&
                (settings.apiKeys?.openai || settings.openaiApiKey)) ||
              (settings.llmProvider?.includes('anthropic') && settings.apiKeys?.anthropic) ||
              (settings.llmProvider?.includes('google') && settings.apiKeys?.google) ||
              (settings.llmProvider?.includes('mistral') && settings.apiKeys?.mistral) ? (
                <View style={[styles.statusBadge, { backgroundColor: colors.success + '20' }]}>
                  <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                  <Text style={[styles.statusText, { color: colors.success }]}>
                    {t('settings.configured')}
                  </Text>
                </View>
              ) : (
                <View style={[styles.statusBadge, { backgroundColor: colors.warning + '20' }]}>
                  <Ionicons name="alert-circle" size={16} color={colors.warning} />
                  <Text style={[styles.statusText, { color: colors.warning }]}>
                    {t('settings.setupRequired')}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <ModernButton
            title={t('settings.configure')}
            onPress={() => openProviderConfig('llm')}
            variant="glass"
            size="small"
            fullWidth
            icon={<Ionicons name="settings-outline" size={18} color={colors.text} />}
          />
        </ModernCard>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color={colors.accent} />
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            {t('settings.apiKeysInfo')}
          </Text>
        </View>
      </View>
    </Animated.View>
  );

  const renderAboutTab = () => (
    <Animated.View style={{ opacity: fadeAnim }}>
      <View style={styles.section}>
        {/* App Info */}
        <View style={styles.appInfoContainer}>
          <LinearGradient colors={[colors.primary, colors.accent]} style={styles.appIcon}>
            <Ionicons name="mic" size={40} color="#fff" />
          </LinearGradient>
          <Text style={[styles.appName, { color: colors.text }]}>VoiceFlow</Text>
          <Text style={[styles.appVersion, { color: colors.textSecondary }]}>
            {t('settings.version')} {APP_VERSION} ({t('settings.build')} {BUILD_NUMBER})
          </Text>
        </View>

        {/* Open Source Badge */}
        <ModernCard variant="glass" style={styles.openSourceCard}>
          <LinearGradient
            colors={[colors.success + '15', colors.primary + '15']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.badgeGradient}
          >
            <View style={styles.badgeContent}>
              <Ionicons name="heart" size={20} color={colors.success} />
              <Text style={[styles.badgeTitle, { color: colors.text }]}>
                {t('settings.openSource')}
              </Text>
              <Ionicons name="code-slash" size={20} color={colors.primary} />
            </View>
            <Text style={[styles.badgeSubtitle, { color: colors.textSecondary }]}>
              {t('settings.freeForever')}
            </Text>
            <View style={styles.transparencyRow}>
              <Ionicons name="eye-outline" size={16} color={colors.primary} />
              <Text style={[styles.transparencyText, { color: colors.textSecondary }]}>
                {t('settings.fullTransparency')}
              </Text>
            </View>
          </LinearGradient>
        </ModernCard>

        {/* Links */}
        <ModernCard variant="glass" style={styles.card}>
          <TouchableOpacity style={styles.linkRow} onPress={() => openURL(GITHUB_URL)}>
            <Ionicons name="logo-github" size={22} color={colors.text} />
            <Text style={[styles.linkText, { color: colors.text }]}>
              {t('settings.githubRepository')}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <TouchableOpacity style={styles.linkRow} onPress={() => openURL(ISSUES_URL)}>
            <Ionicons name="bug-outline" size={22} color={colors.text} />
            <Text style={[styles.linkText, { color: colors.text }]}>
              {t('settings.reportIssue')}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => Alert.alert('Rate App', 'Thank you for your support!')}
          >
            <Ionicons name="star-outline" size={22} color={colors.text} />
            <Text style={[styles.linkText, { color: colors.text }]}>
              {t('settings.rateThisApp')}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </ModernCard>

        {/* Legal */}
        <ModernCard variant="surface" style={styles.card}>
          <TouchableOpacity style={styles.linkRow} onPress={() => openURL(PRIVACY_URL)}>
            <Ionicons name="shield-checkmark-outline" size={22} color={colors.text} />
            <Text style={[styles.linkText, { color: colors.text }]}>
              {t('settings.privacyPolicy')}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <TouchableOpacity style={styles.linkRow} onPress={() => openURL(TERMS_URL)}>
            <Ionicons name="document-text-outline" size={22} color={colors.text} />
            <Text style={[styles.linkText, { color: colors.text }]}>
              {t('settings.termsOfService')}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </ModernCard>

        {/* Community & Support */}
        <ModernCard variant="surface" style={styles.card}>
          <TouchableOpacity style={styles.linkRow} onPress={() => openURL(WIKI_URL)}>
            <Ionicons name="book-outline" size={22} color={colors.text} />
            <Text style={[styles.linkText, { color: colors.text }]}>
              {t('settings.documentation')}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <TouchableOpacity style={styles.linkRow} onPress={() => openURL(DISCUSSIONS_URL)}>
            <Ionicons name="chatbubbles-outline" size={22} color={colors.text} />
            <Text style={[styles.linkText, { color: colors.text }]}>{t('settings.community')}</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <TouchableOpacity style={styles.linkRow} onPress={() => openURL(ISSUES_URL)}>
            <Ionicons name="bug-outline" size={22} color={colors.text} />
            <Text style={[styles.linkText, { color: colors.text }]}>
              {t('settings.reportIssue')}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <TouchableOpacity style={styles.linkRow} onPress={() => openURL(CONTRIBUTING_URL)}>
            <Ionicons name="heart-outline" size={22} color={colors.text} />
            <Text style={[styles.linkText, { color: colors.text }]}>
              {t('settings.contribute')}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </ModernCard>

        {/* Technical Info */}
        <ModernCard variant="surface" style={styles.card}>
          <View style={styles.techInfoRow}>
            <Text style={[styles.techLabel, { color: colors.textSecondary }]}>
              {t('settings.platform')}
            </Text>
            <Text style={[styles.techValue, { color: colors.text }]}>
              {Platform.OS === 'ios' ? 'iOS' : 'Android'} {Platform.Version}
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.techInfoRow}>
            <Text style={[styles.techLabel, { color: colors.textSecondary }]}>
              {t('settings.expoSDK')}
            </Text>
            <Text style={[styles.techValue, { color: colors.text }]}>
              SDK {Constants.expoConfig?.sdkVersion || 'N/A'}
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <TouchableOpacity style={styles.linkRow} onPress={() => openURL(RELEASES_URL)}>
            <Ionicons name="download-outline" size={22} color={colors.text} />
            <Text style={[styles.linkText, { color: colors.text }]}>
              {t('settings.checkUpdates')}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </ModernCard>

        {/* Developer */}
        <View style={styles.developerInfo}>
          <Text style={[styles.developerText, { color: colors.textSecondary }]}>
            {t('settings.madeWithLove')} Andreas Kalkusinski
          </Text>
          <Text style={[styles.copyrightText, { color: colors.textMuted }]}>
            © 2024 VoiceFlow. All rights reserved.
          </Text>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Screen-specific gradient background */}
      <LinearGradient
        colors={
          screenTheme
            ? (screenTheme.gradient as [string, string])
            : [colors.background, colors.background]
        }
        style={StyleSheet.absoluteFillObject}
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.screenTitle, { color: colors.text }]}>{t('settings.title')}</Text>
      </View>

      {/* Tab Bar */}
      <View style={[styles.tabBar, { backgroundColor: colors.surface + '80' }]}>
        {renderTabButton('general', 'options-outline', t('settings.general'))}
        {renderTabButton('providers', 'cloud-outline', t('settings.providers'))}
        {renderTabButton('about', 'information-circle-outline', t('settings.about'))}
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {activeTab === 'general' && renderGeneralTab()}
        {activeTab === 'providers' && renderProvidersTab()}
        {activeTab === 'about' && renderAboutTab()}
      </ScrollView>

      {/* Provider Configuration Modal */}
      <Modal
        isVisible={showProviderModal}
        onBackdropPress={() => setShowProviderModal(false)}
        style={styles.modal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
      >
        <ProviderConfigModal
          type={providerModalType}
          selectedProvider={
            providerModalType === 'stt'
              ? settings.sttProvider || 'openai-stt'
              : providerModalType === 'tts'
                ? settings.ttsProvider || 'openai-tts'
                : settings.llmProvider || 'openai-llm'
          }
          apiKeys={settings.apiKeys || {}}
          providerSettings={settings.providerSettings || {}}
          onProviderChange={(providerId) =>
            setSettings({
              ...settings,
              [providerModalType === 'stt'
                ? 'sttProvider'
                : providerModalType === 'tts'
                  ? 'ttsProvider'
                  : 'llmProvider']: providerId,
            })
          }
          onApiKeyChange={(provider, key) =>
            setSettings({
              ...settings,
              apiKeys: { ...settings.apiKeys, [provider]: key },
              openaiApiKey: provider === 'openai' ? key : settings.openaiApiKey,
            })
          }
          onSettingChange={(providerId, setting, value) => {
            setSettings({
              ...settings,
              providerSettings: {
                ...settings.providerSettings,
                [providerId]: {
                  ...settings.providerSettings?.[providerId],
                  [setting]: value,
                },
              },
            });
          }}
          onClose={() => {
            setShowProviderModal(false);
            // Reload settings to refresh status
            loadSettings();
          }}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    ...Platform.select({
      android: {
        paddingTop: 0,
      },
    }),
  },
  header: {
    paddingHorizontal: designTokens.spacing.lg,
    paddingTop: designTokens.spacing.md,
    paddingBottom: designTokens.spacing.sm,
  },
  screenTitle: {
    ...designTokens.typography.displaySmall,
    fontWeight: '700',
  },
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: designTokens.spacing.lg,
    marginBottom: designTokens.spacing.md,
    borderRadius: designTokens.radius.lg,
    padding: designTokens.spacing.sm,
    ...designTokens.elevation.sm,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: designTokens.spacing.md,
    borderRadius: designTokens.radius.md,
    gap: designTokens.spacing.xs,
  },
  tabButtonActive: {
    ...designTokens.elevation.sm,
  },
  tabButtonText: {
    ...designTokens.typography.labelMedium,
    fontWeight: '600',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: designTokens.spacing.lg,
    paddingBottom: vh(12),
  },
  section: {
    marginBottom: designTokens.spacing.xl,
  },
  sectionTitle: {
    ...designTokens.typography.headlineSmall,
    fontWeight: '600',
    marginBottom: designTokens.spacing.sm,
  },
  sectionSubtitle: {
    ...designTokens.typography.bodyMedium,
    marginBottom: designTokens.spacing.md,
  },
  card: {
    marginBottom: designTokens.spacing.md,
  },
  label: {
    ...designTokens.typography.titleSmall,
    marginBottom: designTokens.spacing.md,
  },
  description: {
    ...designTokens.typography.bodySmall,
    marginTop: designTokens.spacing.xs,
    lineHeight: 18,
  },
  // Old styles kept for history section
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderRadius: designTokens.radius.md,
    padding: designTokens.spacing.xs,
  },
  segment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: designTokens.spacing.sm,
    paddingHorizontal: designTokens.spacing.md,
    borderRadius: designTokens.radius.sm,
    gap: designTokens.spacing.xs,
  },
  segmentText: {
    ...designTokens.typography.labelMedium,
    fontWeight: '600',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchTextContainer: {
    flex: 1,
    marginRight: designTokens.spacing.md,
  },
  historyOptions: {
    marginTop: designTokens.spacing.sm,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: designTokens.spacing.md,
    borderRadius: designTokens.radius.lg,
    marginTop: designTokens.spacing.lg,
    gap: designTokens.spacing.sm,
  },
  dangerButtonText: {
    ...designTokens.typography.bodyMedium,
    fontWeight: '600',
  },
  providerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: designTokens.spacing.md,
  },
  providerName: {
    ...designTokens.typography.bodySmall,
    marginTop: designTokens.spacing.xs,
  },
  modelText: {
    ...designTokens.typography.labelSmall,
    marginTop: designTokens.spacing.xs / 2,
    fontSize: 12,
  },
  providerStatus: {
    alignItems: 'flex-end',
    flex: 0,
    marginLeft: 'auto',
    minWidth: 120,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: designTokens.spacing.xs,
    paddingVertical: 4,
    borderRadius: designTokens.radius.full,
    gap: 4,
  },
  statusText: {
    ...designTokens.typography.labelSmall,
    fontWeight: '600',
    fontSize: 11,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: designTokens.spacing.md,
    backgroundColor: 'rgba(0, 123, 255, 0.05)',
    borderRadius: designTokens.radius.md,
    gap: designTokens.spacing.sm,
    marginTop: designTokens.spacing.md,
  },
  infoText: {
    ...designTokens.typography.bodySmall,
    flex: 1,
    lineHeight: 18,
  },
  appInfoContainer: {
    alignItems: 'center',
    marginBottom: designTokens.spacing.xl,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: designTokens.spacing.md,
  },
  appName: {
    ...designTokens.typography.headlineMedium,
    fontWeight: '700',
  },
  appVersion: {
    ...designTokens.typography.bodyMedium,
    marginTop: designTokens.spacing.xs,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: designTokens.spacing.md,
    gap: designTokens.spacing.md,
  },
  linkText: {
    ...designTokens.typography.bodyMedium,
    flex: 1,
  },
  divider: {
    height: 1,
    opacity: 0.2,
  },
  developerInfo: {
    alignItems: 'center',
    marginTop: designTokens.spacing.xl,
  },
  developerText: {
    ...designTokens.typography.bodyMedium,
  },
  copyrightText: {
    ...designTokens.typography.bodySmall,
    marginTop: designTokens.spacing.xs,
  },
  techInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: designTokens.spacing.sm,
  },
  techLabel: {
    ...designTokens.typography.bodyMedium,
  },
  techValue: {
    ...designTokens.typography.bodyMedium,
    fontWeight: '600',
  },
  openSourceCard: {
    marginBottom: designTokens.spacing.md,
    padding: 0,
    overflow: 'hidden',
  },
  badgeGradient: {
    padding: designTokens.spacing.lg,
    alignItems: 'center',
  },
  badgeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: designTokens.spacing.sm,
  },
  badgeTitle: {
    ...designTokens.typography.titleMedium,
    fontWeight: '700',
  },
  badgeSubtitle: {
    ...designTokens.typography.bodyMedium,
    marginTop: designTokens.spacing.xs,
    textAlign: 'center',
  },
  transparencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: designTokens.spacing.xs,
    marginTop: designTokens.spacing.sm,
    paddingTop: designTokens.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  transparencyText: {
    ...designTokens.typography.bodySmall,
    fontStyle: 'italic',
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },

  // Theme Selector Styles
  themeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: designTokens.spacing.sm,
  },
  themeOption: {
    flex: 1,
    alignItems: 'center',
    padding: designTokens.spacing.md,
    borderRadius: designTokens.radius.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  themeOptionActive: {
    borderColor: 'rgba(99, 102, 241, 0.3)',
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
  },
  themeIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: designTokens.spacing.xs,
  },
  themeText: {
    ...designTokens.typography.labelSmall,
    marginTop: designTokens.spacing.xs,
  },
  activeIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: designTokens.spacing.xs,
  },

  // Language Selector Styles
  languageSelector: {
    gap: designTokens.spacing.sm,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: designTokens.spacing.md,
    borderRadius: designTokens.radius.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: designTokens.spacing.xs,
  },
  languageOptionActive: {
    borderColor: 'rgba(99, 102, 241, 0.3)',
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
  },
  languageIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginRight: designTokens.spacing.md,
  },
  flagEmoji: {
    fontSize: 20,
  },
  languageText: {
    ...designTokens.typography.bodyMedium,
    flex: 1,
  },
});
