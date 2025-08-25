import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-audio';
import * as Clipboard from 'expo-clipboard';
import { MinimalCard } from '../components/MinimalCard';
import { SimpleButton } from '../components/SimpleButton';
import { StorageService } from '../services/storage';
import { Settings } from '../types';
import { ProviderRegistry } from '../services/providers/ProviderRegistry';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';

export const CleanTextToSpeechScreen: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  const { colors } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    setupAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useFocusEffect(
    React.useCallback(() => {
      loadSettings();
    }, []),
  );

  const loadSettings = async () => {
    try {
      const loadedSettings = await StorageService.getSettings();
      setSettings(loadedSettings);
    } catch {
      /* ignore */
    }
  };

  const setupAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
      });
    } catch {
      /* ignore */
    }
  };

  const showStatus = (message: string, duration: number = 3000) => {
    setStatusMessage(message);
    setTimeout(() => setStatusMessage(''), duration);
  };

  const generateSpeech = async () => {
    const currentSettings = await StorageService.getSettings();
    setSettings(currentSettings);

    if (!currentSettings?.openaiApiKey) {
      Alert.alert(t('alerts.configRequired'), t('errors.noApiKey'));
      return;
    }

    if (!inputText.trim()) {
      Alert.alert(t('alerts.noTextTitle'), t('errors.noText'));
      return;
    }

    setIsGenerating(true);
    showStatus(t('textToSpeech.status.generating'));

    try {
      // Get the selected TTS provider
      const providerId = currentSettings.ttsProvider || 'openai-tts';
      const provider = ProviderRegistry.getTTSProvider(providerId);

      if (!provider) {
        throw new Error(`TTS provider ${providerId} not found`);
      }

      // Get the API key for the selected provider
      const apiKey = providerId.includes('openai')
        ? currentSettings.apiKeys?.openai || currentSettings.openaiApiKey
        : providerId.includes('google')
          ? currentSettings.apiKeys?.google
          : providerId.includes('elevenlabs')
            ? currentSettings.apiKeys?.elevenlabs
            : '';

      if (!apiKey) {
        throw new Error('API key is missing');
      }

      // Get model and voice from providerSettings
      const ttsModel =
        currentSettings.providerSettings?.[providerId]?.model ||
        currentSettings.ttsModel ||
        'tts-1';
      const ttsVoice =
        currentSettings.providerSettings?.[providerId]?.voice ||
        currentSettings.ttsVoice ||
        'alloy';

      // Synthesize using the selected provider
      const audioUri = await provider.synthesize(inputText, {
        apiKey,
        model: ttsModel,
        voice: ttsVoice,
        speed: 1.0,
      });

      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true },
      );

      setSound(newSound);
      setIsPlaying(true);
      showStatus(t('textToSpeech.status.playing'));

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
          showStatus(t('textToSpeech.status.complete'));
        }
      });
    } catch {
      showStatus(t('textToSpeech.status.failed'));
      Alert.alert(t('common.error'), t('textToSpeech.status.failed'));
    } finally {
      setIsGenerating(false);
    }
  };

  const stopPlayback = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
      showStatus(t('textToSpeech.status.stopped'));
    }
  };

  const pasteFromClipboard = async () => {
    const text = await Clipboard.getStringAsync();
    if (text) {
      setInputText(text);
      showStatus(t('textToSpeech.textPasted'));
    } else {
      Alert.alert(t('alerts.noTextTitle'), t('alerts.clipboardEmpty'));
    }
  };

  const clearText = () => {
    setInputText('');
    showStatus(t('textToSpeech.textCleared'));
  };

  const characterCount = inputText.length;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <Text style={[styles.screenTitle, { color: colors.text }]}>
              {t('textToSpeech.title')}
            </Text>

            {/* Status Message */}
            {statusMessage !== '' && (
              <MinimalCard variant="elevated" style={styles.statusCard}>
                <Text style={[styles.statusText, { color: colors.text }]}>{statusMessage}</Text>
              </MinimalCard>
            )}

            {/* Text Input Area */}
            <MinimalCard variant="elevated" style={styles.textCard}>
              <View style={styles.textHeader}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  {t('textToSpeech.subtitle')}
                </Text>
                <View style={[styles.charBadge, { backgroundColor: colors.primary + '20' }]}>
                  <Text style={[styles.charCount, { color: colors.primary }]}>
                    {characterCount} {t('common.characters')}
                  </Text>
                </View>
              </View>

              <TextInput
                style={[styles.textInput, { color: colors.text }]}
                multiline
                value={inputText}
                onChangeText={setInputText}
                placeholder={t('textToSpeech.placeholder')}
                placeholderTextColor={colors.textMuted}
                textAlignVertical="top"
              />
            </MinimalCard>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <SimpleButton
                title={t('textToSpeech.pasteText')}
                onPress={pasteFromClipboard}
                variant="secondary"
                size="small"
                style={styles.quickButton}
              />

              <SimpleButton
                title={t('textToSpeech.clearText')}
                onPress={clearText}
                variant="text"
                size="small"
                style={styles.quickButton}
              />
            </View>

            {/* Main Action Buttons */}
            <View style={styles.mainActions}>
              {!isPlaying ? (
                <SimpleButton
                  title={t('textToSpeech.generateSpeech')}
                  onPress={generateSpeech}
                  variant="primary"
                  size="large"
                  loading={isGenerating}
                  disabled={!inputText.trim() || !settings?.openaiApiKey}
                  fullWidth
                />
              ) : (
                <SimpleButton
                  title={t('textToSpeech.stopPlayback')}
                  onPress={stopPlayback}
                  variant="secondary"
                  size="large"
                  fullWidth
                />
              )}
            </View>

            {/* Info Card */}
            {settings && (
              <MinimalCard variant="outlined" style={styles.infoCard}>
                <Text style={[styles.infoTitle, { color: colors.text }]}>
                  {t('textToSpeech.currentSettings')}
                </Text>
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                    {t('settings.models.textToSpeech')}:
                  </Text>
                  <Text style={[styles.infoValue, { color: colors.text }]}>
                    {settings.ttsModel}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                    {t('settings.voiceSelection')}:
                  </Text>
                  <Text style={[styles.infoValue, { color: colors.text }]}>
                    {settings.ttsVoice}
                  </Text>
                </View>
              </MinimalCard>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  keyboardAvoid: {
    flex: 1,
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
  statusCard: {
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  textCard: {
    marginBottom: 16,
    minHeight: 200,
  },
  textHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  charBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  charCount: {
    fontSize: 12,
    fontWeight: '600',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    minHeight: 150,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  quickButton: {
    flex: 1,
  },
  mainActions: {
    marginBottom: 24,
  },
  infoCard: {
    padding: 16,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 13,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '500',
  },
});
