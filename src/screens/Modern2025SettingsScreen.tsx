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
import AsyncStorage from '@react-native-async-storage/async-storage';
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

// App Info
const APP_VERSION = '1.1.0';
const BUILD_NUMBER = '42';
const GITHUB_URL = 'https://github.com/AndreasKalkusinski/VoiceFlow';
const PRIVACY_URL = 'https://example.com/privacy';
const TERMS_URL = 'https://example.com/terms';

export const Modern2025SettingsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [settings, setSettings] = useState<Settings>({
    openaiApiKey: '',
    sttModel: 'whisper-1',
    ttsModel: 'tts-1',
    ttsVoice: 'alloy',
    sttProvider: 'openai-stt',
    ttsProvider: 'openai-tts',
    apiKeys: {
      openai: '',
      google: '',
      elevenlabs: '',
    },
    providerSettings: {},
  });
  const [isSaving, setIsSaving] = useState(false);
  const [autoSave, setAutoSave] = useState(false);
  const [historySettings, setHistorySettings] = useState<HistorySettings>({
    enabled: true,
    maxItems: 25,
  });
  const [showProviderModal, setShowProviderModal] = useState(false);
  const [providerModalType, setProviderModalType] = useState<'stt' | 'tts'>('stt');

  const saveTimeout = React.useRef<NodeJS.Timeout | null>(null);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const { isDark, themeMode, setTheme } = useTheme();
  const colors = isDark ? designTokens.colors.dark : designTokens.colors.light;
  const screenTheme = getScreenTheme('Settings', isDark);
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  useEffect(() => {
    loadSettings();
    loadAutoSavePreference();
    loadHistorySettings();

    // Smooth fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: designTokens.animation.normal,
      useNativeDriver: true,
    }).start();

    return () => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (autoSave && settings.openaiApiKey) {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
      saveTimeout.current = setTimeout(() => {
        saveSettingsSilently();
      }, 1000);
    }
  }, [settings, autoSave]);

  const loadSettings = async () => {
    try {
      const loadedSettings = await StorageService.getSettings();
      const migratedSettings = {
        ...loadedSettings,
        sttProvider: loadedSettings.sttProvider || 'openai-stt',
        ttsProvider: loadedSettings.ttsProvider || 'openai-tts',
        apiKeys: loadedSettings.apiKeys || {
          openai: loadedSettings.openaiApiKey || '',
          google: '',
          elevenlabs: '',
        },
        providerSettings: loadedSettings.providerSettings || {},
      };
      setSettings(migratedSettings);
    } catch {
      /* ignore */
    }
  };

  const loadAutoSavePreference = async () => {
    try {
      const savedAutoSave = await AsyncStorage.getItem('@voiceflow_autosave');
      if (savedAutoSave !== null) {
        setAutoSave(savedAutoSave === 'true');
      }
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

  const toggleAutoSave = async (value: boolean) => {
    try {
      await AsyncStorage.setItem('@voiceflow_autosave', value.toString());
      setAutoSave(value);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      /* ignore */
    }
  };

  const saveSettingsSilently = async () => {
    try {
      await StorageService.saveSettings(settings);
    } catch {
      /* ignore */
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      await StorageService.saveSettings(settings);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert(t('alerts.settingsSavedTitle'), t('alerts.settingsSavedMessage'));
    } catch {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert(t('common.error'), t('settings.status.failed'));
    } finally {
      setIsSaving(false);
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

  const openProviderConfig = (type: 'stt' | 'tts') => {
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

        {/* Auto-Save */}
        <ModernCard variant="surface" style={styles.card}>
          <View style={styles.switchRow}>
            <View style={styles.switchContent}>
              <View style={styles.switchTextContainer}>
                <Text style={[styles.label, { color: colors.text }]}>{t('settings.autoSave')}</Text>
                <Text style={[styles.description, { color: colors.textSecondary }]}>
                  {t('settings.autoSaveDescription')}
                </Text>
              </View>
              <View style={styles.switchContainer}>
                <Switch
                  value={autoSave}
                  onValueChange={toggleAutoSave}
                  trackColor={{
                    false: '#E5E7EB',
                    true: colors.primary + '60',
                  }}
                  thumbColor={autoSave ? colors.primary : '#FFFFFF'}
                  ios_backgroundColor="#E5E7EB"
                />
              </View>
            </View>
          </View>
        </ModernCard>

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
            <View>
              <Text style={[styles.label, { color: colors.text }]}>
                {t('settings.speechToTextProvider')}
              </Text>
              <Text style={[styles.providerName, { color: colors.textSecondary }]}>
                {settings.sttProvider === 'openai-stt'
                  ? 'OpenAI Whisper'
                  : settings.sttProvider === 'google-stt'
                    ? 'Google Cloud'
                    : settings.sttProvider}
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
            <View>
              <Text style={[styles.label, { color: colors.text }]}>
                {t('settings.textToSpeechProvider')}
              </Text>
              <Text style={[styles.providerName, { color: colors.textSecondary }]}>
                {settings.ttsProvider === 'openai-tts'
                  ? 'OpenAI TTS'
                  : settings.ttsProvider === 'google-tts'
                    ? 'Google Cloud'
                    : settings.ttsProvider === 'elevenlabs'
                      ? 'ElevenLabs'
                      : settings.ttsProvider}
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

          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => Alert.alert('Report Issue', 'Feature coming soon!')}
          >
            <Ionicons name="bug-outline" size={22} color={colors.text} />
            <Text style={[styles.linkText, { color: colors.text }]}>Report an Issue</Text>
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

        {/* Save Button (visible when auto-save is off and on general tab) */}
        {!autoSave && activeTab === 'general' && (
          <View style={styles.saveSection}>
            <ModernButton
              title={t('settings.saveSettings')}
              onPress={saveSettings}
              variant="glass"
              size="large"
              loading={isSaving}
              fullWidth
              icon={<Ionicons name="save-outline" size={20} color={colors.text} />}
            />
          </View>
        )}
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
              : settings.ttsProvider || 'openai-tts'
          }
          apiKeys={settings.apiKeys || {}}
          providerSettings={settings.providerSettings || {}}
          onProviderChange={(providerId) =>
            setSettings({
              ...settings,
              [providerModalType === 'stt' ? 'sttProvider' : 'ttsProvider']: providerId,
            })
          }
          onApiKeyChange={(provider, key) =>
            setSettings({
              ...settings,
              apiKeys: { ...settings.apiKeys, [provider]: key },
              openaiApiKey: provider === 'openai' ? key : settings.openaiApiKey,
            })
          }
          onSettingChange={(providerId, setting, value) =>
            setSettings({
              ...settings,
              providerSettings: {
                ...settings.providerSettings,
                [providerId]: {
                  ...settings.providerSettings?.[providerId],
                  [setting]: value,
                },
              },
            })
          }
          onClose={() => setShowProviderModal(false)}
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
  switchContainer: {
    alignItems: 'flex-end',
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
  providerStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: designTokens.spacing.sm,
    paddingVertical: designTokens.spacing.xs,
    borderRadius: designTokens.radius.full,
    gap: designTokens.spacing.xs,
  },
  statusText: {
    ...designTokens.typography.labelSmall,
    fontWeight: '600',
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
  saveSection: {
    marginTop: designTokens.spacing.lg,
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
