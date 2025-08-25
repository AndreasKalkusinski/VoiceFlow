import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MinimalCard } from '../components/MinimalCard';
import { SimpleButton } from '../components/SimpleButton';
import { ProviderSettings } from '../components/ProviderSettings';
import { StorageService } from '../services/storage';
import { Settings } from '../types';
import { useTheme, ThemeMode } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { changeLanguage, availableLanguages } from '../i18n';

export const CleanSettingsScreen: React.FC = () => {
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

  const { colors, themeMode, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  useEffect(() => {
    loadSettings();
    loadAutoSavePreference();
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
  }, [settings, autoSave, saveSettingsSilently]);

  const loadSettings = async () => {
    try {
      const loadedSettings = await StorageService.getSettings();
      const migratedSettings = {
        ...loadedSettings,
        sttProvider: loadedSettings.sttProvider || 'openai-stt',
        ttsProvider: loadedSettings.ttsProvider || 'openai-tts',
        llmProvider: loadedSettings.llmProvider || 'openai-llm',
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

  const toggleAutoSave = async (value: boolean) => {
    try {
      await AsyncStorage.setItem('@voiceflow_autosave', value.toString());
      setAutoSave(value);
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
      Alert.alert(t('alerts.settingsSavedTitle'), t('alerts.settingsSavedMessage'));
    } catch {
      Alert.alert(t('common.error'), t('settings.status.failed'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleLanguageChange = async (languageCode: string) => {
    try {
      setSelectedLanguage(languageCode);
      await changeLanguage(languageCode);
    } catch {
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
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={[styles.screenTitle, { color: colors.text }]}>{t('settings.title')}</Text>

          {/* Appearance Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {t('settings.appearance')}
            </Text>

            <MinimalCard variant="outlined" style={styles.card}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                {t('settings.theme.title')}
              </Text>
              <View style={styles.optionGroup}>
                {[
                  { id: 'auto', name: t('settings.theme.auto') },
                  { id: 'light', name: t('settings.theme.light') },
                  { id: 'dark', name: t('settings.theme.dark') },
                ].map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.option,
                      themeMode === option.id && styles.optionSelected,
                      { borderColor: themeMode === option.id ? colors.primary : colors.border },
                    ]}
                    onPress={() => setTheme(option.id as ThemeMode)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        { color: themeMode === option.id ? colors.primary : colors.text },
                      ]}
                    >
                      {option.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </MinimalCard>

            <MinimalCard variant="outlined" style={styles.card}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                {t('settings.language')}
              </Text>
              <View style={styles.optionGroup}>
                {availableLanguages.map((lang) => (
                  <TouchableOpacity
                    key={lang.code}
                    style={[
                      styles.option,
                      selectedLanguage === lang.code && styles.optionSelected,
                      {
                        borderColor:
                          selectedLanguage === lang.code ? colors.primary : colors.border,
                      },
                    ]}
                    onPress={() => handleLanguageChange(lang.code)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        { color: selectedLanguage === lang.code ? colors.primary : colors.text },
                      ]}
                    >
                      {lang.flag} {lang.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </MinimalCard>
          </View>

          {/* Providers Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {t('settings.providers')}
            </Text>

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

            <View style={styles.spacer} />

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
          </View>

          {/* Voice Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {t('settings.voiceSelection')}
            </Text>

            <MinimalCard variant="outlined" style={styles.card}>
              <View style={styles.voiceGrid}>
                {voices.map((voice) => (
                  <TouchableOpacity
                    key={voice.id}
                    style={[
                      styles.voiceOption,
                      settings.ttsVoice === voice.id && styles.voiceSelected,
                      {
                        borderColor:
                          settings.ttsVoice === voice.id ? colors.primary : colors.border,
                      },
                    ]}
                    onPress={() => setSettings({ ...settings, ttsVoice: voice.id })}
                  >
                    <Text
                      style={[
                        styles.voiceText,
                        { color: settings.ttsVoice === voice.id ? colors.primary : colors.text },
                      ]}
                    >
                      {voice.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </MinimalCard>
          </View>

          {/* Auto-Save */}
          <View style={styles.section}>
            <MinimalCard variant="outlined" style={styles.card}>
              <View style={styles.switchRow}>
                <View style={styles.switchText}>
                  <Text style={[styles.label, { color: colors.text }]}>
                    {t('settings.autoSave')}
                  </Text>
                  <Text style={[styles.description, { color: colors.textSecondary }]}>
                    {t('settings.autoSaveDescription')}
                  </Text>
                </View>
                <Switch
                  value={autoSave}
                  onValueChange={toggleAutoSave}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={autoSave ? '#ffffff' : '#f4f3f4'}
                />
              </View>
            </MinimalCard>
          </View>

          {/* Save Button */}
          {!autoSave && (
            <View style={styles.saveSection}>
              <SimpleButton
                title={t('settings.saveSettings')}
                onPress={saveSettings}
                variant="primary"
                size="large"
                loading={isSaving}
                fullWidth
              />
            </View>
          )}
        </View>
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
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 100,
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  description: {
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  optionGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  option: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  optionSelected: {
    borderWidth: 2,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  voiceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  voiceOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  voiceSelected: {
    borderWidth: 2,
  },
  voiceText: {
    fontSize: 14,
    fontWeight: '500',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchText: {
    flex: 1,
    marginRight: 16,
  },
  spacer: {
    height: 16,
  },
  saveSection: {
    marginTop: 24,
  },
});
