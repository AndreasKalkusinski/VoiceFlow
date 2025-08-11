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
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import * as Clipboard from 'expo-clipboard';
import { MinimalCard } from '../components/MinimalCard';
import { SimpleButton } from '../components/SimpleButton';
import { StorageService } from '../services/storage';
import { OpenAIService } from '../services/openai';
import { Settings } from '../types';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';

export const CleanSpeechToTextScreen: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [transcribedText, setTranscribedText] = useState('');
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const { colors } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    setupAudio();
  }, []);

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
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
    } catch {
      /* ignore */
    }
  };

  const showStatus = (message: string, duration: number = 3000) => {
    setStatusMessage(message);
    setTimeout(() => setStatusMessage(''), duration);
  };

  const startRecording = async () => {
    const currentSettings = await StorageService.getSettings();
    setSettings(currentSettings);

    if (!currentSettings?.openaiApiKey) {
      Alert.alert(t('alerts.configRequired'), t('errors.noApiKey'));
      return;
    }

    try {
      showStatus(t('speechToText.status.starting'));

      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        showStatus(t('speechToText.status.microphoneDenied'));
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );

      setRecording(recording);
      setIsRecording(true);
      showStatus(t('speechToText.status.recording'));
    } catch {
      showStatus(t('speechToText.status.failed'));
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      setIsRecording(false);
      setIsProcessing(true);
      showStatus(t('speechToText.status.processing'));

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      if (uri && settings) {
        showStatus(t('speechToText.status.transcribing'));
        const openaiService = new OpenAIService(settings.openaiApiKey);
        const text = await openaiService.transcribeAudio(uri, settings.sttModel);

        if (transcribedText) {
          setTranscribedText(transcribedText + ' ' + text);
        } else {
          setTranscribedText(text);
        }

        showStatus(t('speechToText.status.complete'));
      }

      setRecording(null);
    } catch {
      showStatus(t('speechToText.status.failed'));
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = async () => {
    if (!transcribedText) {
      Alert.alert(t('alerts.noTextTitle'), t('alerts.noTextMessage'));
      return;
    }

    await Clipboard.setStringAsync(transcribedText);
    showStatus(t('speechToText.copiedToClipboard'));
  };

  const clearText = () => {
    setTranscribedText('');
    showStatus(t('speechToText.textCleared'));
  };

  const wordCount = transcribedText.split(' ').filter((w) => w).length;

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
              {t('speechToText.title')}
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
                  {t('speechToText.subtitle')}
                </Text>
                <View style={[styles.wordBadge, { backgroundColor: colors.primary + '20' }]}>
                  <Text style={[styles.wordCount, { color: colors.primary }]}>
                    {wordCount} {t('common.words')}
                  </Text>
                </View>
              </View>

              <TextInput
                style={[styles.textInput, { color: colors.text }]}
                multiline
                value={transcribedText}
                onChangeText={setTranscribedText}
                placeholder={t('speechToText.placeholder')}
                placeholderTextColor={colors.textMuted}
                textAlignVertical="top"
              />
            </MinimalCard>

            {/* Recording Status */}
            {(isRecording || isProcessing) && (
              <MinimalCard variant="outlined" style={styles.recordingCard}>
                <View style={styles.recordingIndicator}>
                  <View
                    style={[
                      styles.recordingDot,
                      { backgroundColor: isRecording ? '#FF4444' : colors.primary },
                    ]}
                  />
                  <Text style={[styles.recordingText, { color: colors.text }]}>
                    {isRecording ? t('speechToText.recording') : t('speechToText.processing')}
                  </Text>
                </View>
              </MinimalCard>
            )}

            {/* Main Action Button */}
            <View style={styles.mainAction}>
              <TouchableOpacity
                style={[
                  styles.recordButton,
                  { backgroundColor: isRecording ? '#FF4444' : colors.primary },
                  (isProcessing || !settings?.openaiApiKey) && styles.disabled,
                ]}
                onPress={isRecording ? stopRecording : startRecording}
                disabled={isProcessing || !settings?.openaiApiKey}
                activeOpacity={0.8}
              >
                <Text style={styles.recordButtonText}>
                  {isProcessing ? '...' : isRecording ? '◼' : '●'}
                </Text>
              </TouchableOpacity>
              <Text style={[styles.recordLabel, { color: colors.textSecondary }]}>
                {isRecording ? t('speechToText.tapToStop') : t('speechToText.tapToRecord')}
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actions}>
              <SimpleButton
                title={t('speechToText.copyText')}
                onPress={copyToClipboard}
                variant="secondary"
                size="medium"
                style={styles.actionButton}
              />

              <SimpleButton
                title={t('speechToText.clearText')}
                onPress={clearText}
                variant="text"
                size="medium"
                style={styles.actionButton}
              />
            </View>
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
    marginBottom: 24,
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
  wordBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  wordCount: {
    fontSize: 12,
    fontWeight: '600',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    minHeight: 150,
  },
  recordingCard: {
    marginBottom: 24,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  recordingText: {
    fontSize: 14,
    fontWeight: '500',
  },
  mainAction: {
    alignItems: 'center',
    marginBottom: 32,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  recordButtonText: {
    fontSize: 32,
    color: '#FFFFFF',
  },
  recordLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
});
