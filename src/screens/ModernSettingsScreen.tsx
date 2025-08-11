import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard } from '../components/GlassCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { ModelDropdown } from '../components/ModelDropdown';
import { ProviderSettings } from '../components/ProviderSettings';
import { StorageService } from '../services/storage';
import { OpenAIService, Model } from '../services/openai';
import { Settings } from '../types';
import { useTheme, ThemeMode } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { changeLanguage, availableLanguages } from '../i18n';
import { wp, hp, spacing, fontSize, fontSizes, componentHeights, adaptiveSpacing } from '../utils/responsive';
import { useFocusEffect } from '@react-navigation/native';

export const ModernSettingsScreen: React.FC = () => {
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
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [whisperModels, setWhisperModels] = useState<Model[]>([]);
  const [ttsModels, setTtsModels] = useState<Model[]>([]);
  const [modelsLoading, setModelsLoading] = useState(false);
  const [autoSave, setAutoSave] = useState(false);
  const modelRefreshInterval = useRef<NodeJS.Timeout | null>(null);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  
  const { colors, theme, isDark, themeMode, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  useEffect(() => {
    loadSettings();
    loadAutoSavePreference();
    animateEntry();
    return () => {
      if (modelRefreshInterval.current) {
        clearInterval(modelRefreshInterval.current);
      }
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
    };
  }, []);

  // Auto-save when settings change
  useEffect(() => {
    if (autoSave && settings.openaiApiKey) {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
      saveTimeout.current = setTimeout(() => {
        saveSettingsSilently();
      }, 1000); // Save after 1 second of inactivity
    }
  }, [settings, autoSave]);

  // Fetch models when screen is focused and API key is available
  useFocusEffect(
    React.useCallback(() => {
      if (settings?.openaiApiKey) {
        fetchAvailableModels();
        // Refresh models every 30 seconds while screen is focused
        modelRefreshInterval.current = setInterval(() => {
          fetchAvailableModels(true);
        }, 30000);
      }
      return () => {
        if (modelRefreshInterval.current) {
          clearInterval(modelRefreshInterval.current);
        }
      };
    }, [settings?.openaiApiKey])
  );

  const animateEntry = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const loadSettings = async () => {
    setIsLoading(true);
    showStatus(t('settings.status.loading'));
    try {
      const loadedSettings = await StorageService.getSettings();
      // Migrate old settings to new structure
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
      showStatus(t('settings.status.loaded'));
      
      // Fetch models if API key is available
      if (migratedSettings.apiKeys?.openai || loadedSettings.openaiApiKey) {
        fetchAvailableModels();
      }
    } catch (error) {
      showStatus(t('settings.status.failed'));
    } finally {
      setIsLoading(false);
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
      if (value) {
        showStatus(t('settings.autoSaveEnabled'), 2000);
      } else {
        showStatus(t('settings.autoSaveDisabled'), 2000);
      }
    } catch (error) {
      console.error('Failed to save auto-save preference:', error);
    }
  };

  const saveSettingsSilently = async () => {
    try {
      await StorageService.saveSettings(settings);
      showStatus(t('settings.status.autoSaved'), 1500);
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  };

  const fetchAvailableModels = async (silent = false) => {
    if (!settings?.openaiApiKey) return;
    
    if (!silent) {
      setModelsLoading(true);
    }
    
    try {
      const openaiService = new OpenAIService(settings.openaiApiKey);
      
      // Fetch models in parallel
      const [whisper, tts] = await Promise.all([
        openaiService.getWhisperModels(),
        openaiService.getTTSModels(),
      ]);
      
      // Add default models if not in list
      const defaultWhisper = { id: 'whisper-1', object: 'model', created: 0, owned_by: 'openai' };
      const defaultTTS = { id: 'tts-1', object: 'model', created: 0, owned_by: 'openai' };
      const defaultTTSHD = { id: 'tts-1-hd', object: 'model', created: 0, owned_by: 'openai' };
      
      if (!whisper.find(m => m.id === 'whisper-1')) {
        whisper.push(defaultWhisper);
      }
      
      if (!tts.find(m => m.id === 'tts-1')) {
        tts.push(defaultTTS);
      }
      if (!tts.find(m => m.id === 'tts-1-hd')) {
        tts.push(defaultTTSHD);
      }
      
      setWhisperModels(whisper);
      setTtsModels(tts);
      
      if (!silent) {
        showStatus('Models loaded', 2000);
      }
    } catch (error) {
      console.error('Failed to fetch models:', error);
      // Set default models on error
      setWhisperModels([{ id: 'whisper-1', object: 'model', created: 0, owned_by: 'openai' }]);
      setTtsModels([
        { id: 'tts-1', object: 'model', created: 0, owned_by: 'openai' },
        { id: 'tts-1-hd', object: 'model', created: 0, owned_by: 'openai' },
      ]);
    } finally {
      setModelsLoading(false);
    }
  };

  const showStatus = (message: string, duration: number = 3000) => {
    setStatusMessage(message);
    setTimeout(() => setStatusMessage(''), duration);
  };

  const validateApiKey = async () => {
    if (!settings.openaiApiKey) {
      Alert.alert(t('alerts.apiKeyInvalidTitle'), t('alerts.enterApiKey'));
      return;
    }

    setIsValidating(true);
    showStatus(t('settings.status.validating'));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    try {
      const openaiService = new OpenAIService(settings.openaiApiKey);
      const isValid = await openaiService.validateApiKey();
      
      if (isValid) {
        showStatus(t('settings.status.apiKeyValid'));
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert(t('alerts.apiKeyValidTitle'), t('alerts.apiKeyValidMessage'));
      } else {
        showStatus(t('settings.status.apiKeyInvalid'));
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert(t('alerts.apiKeyInvalidTitle'), t('alerts.apiKeyInvalidMessage'));
      }
    } catch (error) {
      showStatus(t('settings.status.failed'));
      Alert.alert(t('common.error'), t('settings.status.failed'));
    } finally {
      setIsValidating(false);
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    showStatus(t('settings.status.saving'));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    try {
      await StorageService.saveSettings(settings);
      showStatus(t('settings.status.saved'));
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert(t('alerts.settingsSavedTitle'), t('alerts.settingsSavedMessage'));
    } catch (error) {
      showStatus(t('settings.status.failed'));
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
      showStatus(`${availableLanguages.find(l => l.code === languageCode)?.name} selected`, 2000);
    } catch (error) {
      console.error('Failed to change language:', error);
      setSelectedLanguage(i18n.language); // Revert to current language
    }
  };

  const themeOptions = [
    { id: 'auto', name: t('settings.theme.auto'), icon: '🌓' },
    { id: 'light', name: t('settings.theme.light'), icon: '☀️' },
    { id: 'dark', name: t('settings.theme.dark'), icon: '🌙' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={isDark 
          ? ['#0F0F23', '#1A1A3E', '#0F0F23']
          : ['#F0F4FF', '#FFFFFF', '#F0F4FF']
        }
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Status Message */}
          {statusMessage !== '' && (
            <Animated.View style={styles.statusContainer}>
              <GlassCard style={styles.statusCard}>
                <Text style={[styles.statusText, { color: colors.text }]}>
                  {statusMessage}
                </Text>
              </GlassCard>
            </Animated.View>
          )}

          {/* Appearance Settings */}
          <GlassCard style={styles.section} gradient>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {t('settings.appearance')}
            </Text>
            
            {/* Theme Selection */}
            <Text style={[styles.subsectionTitle, { color: colors.textSecondary }]}>
              {t('settings.appearance')}
            </Text>
            <View style={styles.themeContainer}>
              {themeOptions.map((option) => (
                <AnimatedButton
                  key={option.id}
                  title={`${option.icon} ${option.name}`}
                  onPress={() => {
                    setTheme(option.id as ThemeMode);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  variant={themeMode === option.id ? 'primary' : 'glass'}
                  size="small"
                  style={styles.themeButton}
                />
              ))}
            </View>

            {/* Language Selection */}
            <Text style={[styles.subsectionTitle, { color: colors.textSecondary, marginTop: 20 }]}>
              {t('settings.language')}
            </Text>
            <View style={styles.languageContainer}>
              {availableLanguages.map((lang) => (
                <AnimatedButton
                  key={lang.code}
                  title={`${lang.flag} ${lang.name}`}
                  onPress={() => handleLanguageChange(lang.code)}
                  variant={selectedLanguage === lang.code ? 'primary' : 'glass'}
                  size="small"
                  style={styles.languageButton}
                />
              ))}
            </View>
          </GlassCard>

          {/* Provider Selection */}
          <ProviderSettings
            type="stt"
            selectedProvider={settings.sttProvider || 'openai-stt'}
            apiKeys={settings.apiKeys || {}}
            providerSettings={settings.providerSettings || {}}
            onProviderChange={(providerId) => setSettings({ ...settings, sttProvider: providerId })}
            onApiKeyChange={(provider, key) => setSettings({
              ...settings,
              apiKeys: { ...settings.apiKeys, [provider]: key },
              openaiApiKey: provider === 'openai' ? key : settings.openaiApiKey,
            })}
            onSettingChange={(providerId, setting, value) => setSettings({
              ...settings,
              providerSettings: {
                ...settings.providerSettings,
                [providerId]: {
                  ...settings.providerSettings?.[providerId],
                  [setting]: value,
                },
              },
            })}
          />

          <ProviderSettings
            type="tts"
            selectedProvider={settings.ttsProvider || 'openai-tts'}
            apiKeys={settings.apiKeys || {}}
            providerSettings={settings.providerSettings || {}}
            onProviderChange={(providerId) => setSettings({ ...settings, ttsProvider: providerId })}
            onApiKeyChange={(provider, key) => setSettings({
              ...settings,
              apiKeys: { ...settings.apiKeys, [provider]: key },
              openaiApiKey: provider === 'openai' ? key : settings.openaiApiKey,
            })}
            onSettingChange={(providerId, setting, value) => setSettings({
              ...settings,
              providerSettings: {
                ...settings.providerSettings,
                [providerId]: {
                  ...settings.providerSettings?.[providerId],
                  [setting]: value,
                },
              },
            })}
          />


          {/* Auto-Save Toggle */}
          <GlassCard style={styles.section}>
            <View style={styles.autoSaveContainer}>
              <View style={styles.autoSaveText}>
                <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: spacing.xs }]}>
                  {t('settings.autoSave')}
                </Text>
                <Text style={[styles.autoSaveDescription, { color: colors.textSecondary }]}>
                  {t('settings.autoSaveDescription')}
                </Text>
              </View>
              <Switch
                value={autoSave}
                onValueChange={toggleAutoSave}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={autoSave ? '#ffffff' : '#f4f3f4'}
                ios_backgroundColor={colors.border}
              />
            </View>
          </GlassCard>

          {/* Save Button (visible when auto-save is off) */}
          {!autoSave && (
            <View style={styles.saveButtonContainer}>
              <AnimatedButton
                title={t('settings.saveSettings')}
                onPress={saveSettings}
                variant="primary"
                size="large"
                disabled={isSaving}
                icon={<Text>💾</Text>}
              />
            </View>
          )}
        </Animated.View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
    ...Platform.select({
      android: {
        paddingTop: 0,
      },
    }),
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: componentHeights.tabBar + spacing.xl,
  },
  content: {
    flex: 1,
    paddingHorizontal: adaptiveSpacing.screenPadding,
    paddingTop: componentHeights.header + spacing.md,
  },
  statusContainer: {
    position: 'absolute',
    top: hp(1),
    left: adaptiveSpacing.screenPadding,
    right: adaptiveSpacing.screenPadding,
    zIndex: 1000,
  },
  statusCard: {
    padding: spacing.sm,
    alignItems: 'center',
  },
  statusText: {
    fontSize: fontSizes.small,
    fontWeight: '600',
  },
  section: {
    padding: adaptiveSpacing.cardPadding,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSizes.xl,
    fontWeight: '700',
    marginBottom: spacing.md,
    letterSpacing: -0.5,
  },
  subsectionTitle: {
    fontSize: fontSizes.small,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  themeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  themeButton: {
    flex: 1,
    marginHorizontal: spacing.xs / 2,
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  languageButton: {
    flex: 1,
    marginHorizontal: spacing.xs / 2,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSizes.small,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    borderRadius: spacing.sm,
    padding: spacing.sm,
    fontSize: fontSizes.medium,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  apiKeyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeButton: {
    marginLeft: spacing.xs,
    width: wp(12),
  },
  validateButton: {
    marginTop: spacing.sm,
  },
  saveButtonContainer: {
    marginBottom: spacing.md,
  },
  autoSaveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  autoSaveText: {
    flex: 1,
    marginRight: spacing.md,
  },
  autoSaveDescription: {
    fontSize: fontSizes.small,
    lineHeight: fontSizes.small * 1.4,
  },
});