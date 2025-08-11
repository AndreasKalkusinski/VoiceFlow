import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ModernCard } from '../components/ModernCard';
import { ModernButton } from '../components/ModernButton';
import { ProviderSettings } from '../components/ProviderSettings';
import { StorageService } from '../services/storage';
import { Settings } from '../types';
import { useTheme, ThemeMode } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { changeLanguage, availableLanguages } from '../i18n';
import { designTokens } from '../utils/design-system';
import { vh } from '../utils/responsive-dimensions';
import { getScreenTheme } from '../utils/screen-themes';
import * as Haptics from 'expo-haptics';

export const Modern2025SettingsScreen: React.FC = () => {
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
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const loadAutoSavePreference = async () => {
    try {
      const savedAutoSave = await AsyncStorage.getItem('@voiceflow_autosave');
      if (savedAutoSave !== null) {
        setAutoSave(savedAutoSave === 'true');
      }
    } catch (error) {
      console.error('Failed to load auto-save preference:', error);
    }
  };

  const toggleAutoSave = async (value: boolean) => {
    try {
      await AsyncStorage.setItem('@voiceflow_autosave', value.toString());
      setAutoSave(value);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      console.error('Failed to save auto-save preference:', error);
    }
  };

  const saveSettingsSilently = async () => {
    try {
      await StorageService.saveSettings(settings);
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      await StorageService.saveSettings(settings);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert(t('alerts.settingsSavedTitle'), t('alerts.settingsSavedMessage'));
    } catch (error) {
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
    } catch (error) {
      console.error('Failed to change language:', error);
      setSelectedLanguage(i18n.language);
    }
  };

  const voices = [
    { id: 'alloy', name: t('settings.voices.alloy') },
    { id: 'echo', name: t('settings.voices.echo') },
    { id: 'fable', name: t('settings.voices.fable') },
    { id: 'onyx', name: t('settings.voices.onyx') },
    { id: 'nova', name: t('settings.voices.nova') },
    { id: 'shimmer', name: t('settings.voices.shimmer') },
  ];

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

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          {/* Header with gradient text effect */}
          <View style={styles.header}>
            <Text style={[styles.screenTitle, { color: colors.text }]}>{t('settings.title')}</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {t('settings.subtitle')}
            </Text>
          </View>

          {/* Appearance Section with modern cards */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {t('settings.appearance')}
            </Text>

            <ModernCard variant="glass" style={styles.card}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                {t('settings.theme.title')}
              </Text>
              <View style={styles.segmentedControl}>
                {[
                  { id: 'auto', name: t('settings.theme.auto'), iconName: 'contrast-outline' },
                  { id: 'light', name: t('settings.theme.light'), iconName: 'sunny-outline' },
                  { id: 'dark', name: t('settings.theme.dark'), iconName: 'moon-outline' },
                ].map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.segment,
                      themeMode === option.id && [
                        styles.segmentActive,
                        { backgroundColor: colors.primary + '20' },
                      ],
                    ]}
                    onPress={() => {
                      setTheme(option.id as ThemeMode);
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }}
                  >
                    <Ionicons
                      name={option.iconName as keyof typeof Ionicons.glyphMap}
                      size={16}
                      color={themeMode === option.id ? colors.primary : colors.text}
                    />
                    <Text
                      style={[
                        styles.segmentText,
                        { color: themeMode === option.id ? colors.primary : colors.text },
                      ]}
                    >
                      {option.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ModernCard>

            <ModernCard variant="glass" style={styles.card}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                {t('settings.language')}
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.chipContainer}>
                  {availableLanguages.map((lang) => (
                    <TouchableOpacity
                      key={lang.code}
                      style={[
                        styles.chip,
                        selectedLanguage === lang.code && [
                          styles.chipActive,
                          { backgroundColor: colors.primary },
                        ],
                      ]}
                      onPress={() => handleLanguageChange(lang.code)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          {
                            color:
                              selectedLanguage === lang.code ? colors.textOnPrimary : colors.text,
                          },
                        ]}
                      >
                        {lang.flag} {lang.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </ModernCard>
          </View>

          {/* Providers Section with modern styling */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {t('settings.providers')}
              </Text>
              <View style={[styles.badge, { backgroundColor: colors.success + '20' }]}>
                <Text style={[styles.badgeText, { color: colors.success }]}>2 Active</Text>
              </View>
            </View>

            <ModernCard variant="elevated" style={styles.card}>
              <ProviderSettings
                type="stt"
                selectedProvider={settings.sttProvider || 'openai-stt'}
                apiKeys={settings.apiKeys || {}}
                providerSettings={settings.providerSettings || {}}
                onProviderChange={(providerId) =>
                  setSettings({ ...settings, sttProvider: providerId })
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
              />
            </ModernCard>

            <ModernCard variant="elevated" style={styles.card}>
              <ProviderSettings
                type="tts"
                selectedProvider={settings.ttsProvider || 'openai-tts'}
                apiKeys={settings.apiKeys || {}}
                providerSettings={settings.providerSettings || {}}
                onProviderChange={(providerId) =>
                  setSettings({ ...settings, ttsProvider: providerId })
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
              />
            </ModernCard>
          </View>

          {/* Voice Selection with modern grid */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {t('settings.voiceSelection')}
            </Text>

            <ModernCard variant="gradient" style={styles.card}>
              <View style={styles.voiceGrid}>
                {voices.map((voice) => (
                  <TouchableOpacity
                    key={voice.id}
                    style={[
                      styles.voiceCard,
                      settings.ttsVoice === voice.id && [
                        styles.voiceCardActive,
                        {
                          borderColor: colors.primary,
                          backgroundColor: colors.primary + '10',
                        },
                      ],
                    ]}
                    onPress={() => {
                      setSettings({ ...settings, ttsVoice: voice.id });
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }}
                  >
                    <View
                      style={[
                        styles.voiceIndicator,
                        settings.ttsVoice === voice.id && { backgroundColor: colors.primary },
                      ]}
                    />
                    <Text
                      style={[
                        styles.voiceName,
                        { color: settings.ttsVoice === voice.id ? colors.primary : colors.text },
                      ]}
                    >
                      {voice.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ModernCard>
          </View>

          {/* Auto-Save with modern toggle */}
          <View style={styles.section}>
            <ModernCard variant="surface" style={styles.card}>
              <View style={styles.switchRow}>
                <View style={styles.switchContent}>
                  <View style={styles.switchTextContainer}>
                    <Text style={[styles.label, { color: colors.text }]}>
                      {t('settings.autoSave')}
                    </Text>
                    <Text style={[styles.description, { color: colors.textSecondary }]}>
                      {t('settings.autoSaveDescription')}
                    </Text>
                  </View>
                  <View style={styles.switchContainer}>
                    <Switch
                      value={autoSave}
                      onValueChange={toggleAutoSave}
                      trackColor={{
                        false: colors.border,
                        true: colors.primary + '40',
                      }}
                      thumbColor={autoSave ? colors.primary : '#f4f3f4'}
                      ios_backgroundColor={colors.border}
                    />
                  </View>
                </View>
              </View>
            </ModernCard>
          </View>

          {/* Save Button with gradient */}
          {!autoSave && (
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
        </Animated.View>
      </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: designTokens.spacing.lg,
    paddingTop: designTokens.spacing.xl,
    paddingBottom: vh(12), // Space for tab bar
  },
  header: {
    marginBottom: designTokens.spacing.xl,
  },
  screenTitle: {
    ...designTokens.typography.displaySmall,
    fontWeight: '700',
    marginBottom: designTokens.spacing.xs,
  },
  subtitle: {
    ...designTokens.typography.bodyLarge,
  },
  section: {
    marginBottom: designTokens.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: designTokens.spacing.md,
  },
  sectionTitle: {
    ...designTokens.typography.headlineSmall,
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: designTokens.spacing.sm,
    paddingVertical: designTokens.spacing.xs,
    borderRadius: designTokens.radius.full,
  },
  badgeText: {
    ...designTokens.typography.labelSmall,
    fontWeight: '600',
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
  },
  segmentActive: {
    ...designTokens.elevation.sm,
  },
  segmentIcon: {
    fontSize: 16,
    marginRight: designTokens.spacing.xs,
  },
  segmentText: {
    ...designTokens.typography.labelMedium,
    fontWeight: '600',
  },
  chipContainer: {
    flexDirection: 'row',
    gap: designTokens.spacing.sm,
  },
  chip: {
    paddingVertical: designTokens.spacing.sm,
    paddingHorizontal: designTokens.spacing.md,
    borderRadius: designTokens.radius.full,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  chipActive: {
    ...designTokens.elevation.sm,
  },
  chipText: {
    ...designTokens.typography.labelMedium,
    fontWeight: '500',
  },
  voiceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: designTokens.spacing.sm,
  },
  voiceCard: {
    paddingVertical: designTokens.spacing.sm,
    paddingHorizontal: designTokens.spacing.md,
    borderRadius: designTokens.radius.md,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  voiceCardActive: {
    borderWidth: 2,
  },
  voiceIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginRight: designTokens.spacing.sm,
  },
  voiceName: {
    ...designTokens.typography.labelLarge,
    fontWeight: '500',
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
  saveSection: {
    marginTop: designTokens.spacing.lg,
  },
});
