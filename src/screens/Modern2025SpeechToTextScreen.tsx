import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Animated,
  TouchableOpacity,
  RefreshControl,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { ModernCard } from '../components/ModernCard';
import { StorageService } from '../services/storage';
import { Settings } from '../types';
import { useTheme } from '../hooks/useTheme';
import { ProviderRegistry } from '../services/providers/ProviderRegistry';
import { useTranslation } from 'react-i18next';
import { designTokens } from '../utils/design-system';
import { vh } from '../utils/responsive-dimensions';
import { getScreenTheme } from '../utils/screen-themes';
import { useFocusEffect } from '@react-navigation/native';
import { useSharedAudio } from '../contexts/SharedAudioContext';
import { HistoryStorage, TranscriptionHistoryItem } from '../services/historyStorage';
import { TranscriptionHistory } from '../components/TranscriptionHistory';
import Modal from 'react-native-modal';
import { TranscriptionProgress } from '../components/TranscriptionProgress';
import { AIQuickActions } from '../components/AIQuickActions';

export const Modern2025SpeechToTextScreen: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [transcribedText, setTranscribedText] = useState('');
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<TranscriptionHistoryItem[]>([]);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const recordingStartTime = useRef<number | null>(null);

  const { isDark } = useTheme();
  const colors = isDark ? designTokens.colors.dark : designTokens.colors.light;
  const screenTheme = getScreenTheme('Speech to Text', isDark);
  const { t } = useTranslation();
  const { sharedAudioUri, clearSharedAudio, hasSharedAudio } = useSharedAudio();

  // Keep screen awake while recording
  useEffect(() => {
    if (isRecording) {
      activateKeepAwakeAsync();
    } else {
      deactivateKeepAwake();
    }

    return () => {
      deactivateKeepAwake();
    };
  }, [isRecording]);

  // Use useRef for Animated values to work in release builds
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const buttonBottomAnim = useRef(new Animated.Value(140)).current;

  useEffect(() => {
    setupAudio();
    animateEntry();

    // Keyboard listeners
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        Animated.spring(buttonBottomAnim, {
          toValue: e.endCoordinates.height + 20,
          useNativeDriver: false,
          friction: 8,
        }).start();
      },
    );

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        Animated.spring(buttonBottomAnim, {
          toValue: 140,
          useNativeDriver: false,
          friction: 8,
        }).start();
      },
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadSettings();

      // Check if there's a shared audio file to process
      if (hasSharedAudio && sharedAudioUri) {
        processSharedAudio();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasSharedAudio, sharedAudioUri]),
  );

  const processSharedAudio = async () => {
    if (!sharedAudioUri || !settings) return;

    try {
      setIsProcessing(true);
      showStatus(t('speechToText.status.transcribing'));

      // Get the selected STT provider
      const providerId = settings.sttProvider || 'openai-stt';
      const provider = ProviderRegistry.getSTTProvider(providerId);

      if (!provider) {
        throw new Error(`STT provider ${providerId} not found`);
      }

      // Get the API key for the selected provider
      const apiKey = providerId.includes('openai')
        ? settings.apiKeys?.openai || settings.openaiApiKey
        : providerId.includes('google')
          ? settings.apiKeys?.google
          : '';

      if (!apiKey) {
        throw new Error(`API key not configured for ${provider.name}`);
      }

      // Transcribe the shared audio file
      const text = await provider.transcribe(sharedAudioUri, {
        apiKey,
        model: settings.providerSettings?.[providerId]?.model || settings.sttModel || 'whisper-1',
        // Don't specify language to enable auto-detection
      });

      if (text) {
        setTranscribedText(text);

        // Save to history
        await HistoryStorage.addItem({
          text,
          timestamp: Date.now(),
          audioUri: sharedAudioUri,
          source: 'shared',
        });

        showStatus(t('speechToText.status.complete'));
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      // Clear the shared audio after processing
      clearSharedAudio();
    } catch (error) {
      console.error('Error processing shared audio:', error);
      showStatus(t('speechToText.status.failed'));
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (isRecording) {
      animatePulse();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isRecording]);

  const animateEntry = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: designTokens.animation.normal,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animatePulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const loadSettings = async () => {
    try {
      const loadedSettings = await StorageService.getSettings();
      setSettings(loadedSettings);
    } catch {
      /* ignore */
    }
  };

  const loadHistory = async () => {
    try {
      const loadedHistory = await HistoryStorage.getHistory();
      setHistory(loadedHistory);
    } catch {
      /* ignore */
    }
  };

  const handleSelectHistoryItem = (item: TranscriptionHistoryItem) => {
    setTranscribedText(item.text);
    setShowHistory(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleDeleteHistoryItem = async (id: string) => {
    await HistoryStorage.deleteItem(id);
    await loadHistory();
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
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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
      recordingStartTime.current = Date.now();
      showStatus(t('speechToText.status.recording'));
    } catch {
      showStatus(t('speechToText.status.failed'));
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setIsRecording(false);

      // Calculate recording duration
      const duration = recordingStartTime.current
        ? Math.floor((Date.now() - recordingStartTime.current) / 1000)
        : 0;
      setRecordingDuration(duration);
      recordingStartTime.current = null;

      setIsProcessing(true);
      showStatus(t('speechToText.status.processing'));

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      if (uri && settings) {
        showStatus(t('speechToText.status.transcribing'));

        // Get the selected STT provider
        const providerId = settings.sttProvider || 'openai-stt';
        const provider = ProviderRegistry.getSTTProvider(providerId);

        if (!provider) {
          throw new Error(`STT provider ${providerId} not found`);
        }

        // Get the API key for the selected provider
        const apiKey = providerId.includes('openai')
          ? settings.apiKeys?.openai || settings.openaiApiKey
          : providerId.includes('google')
            ? settings.apiKeys?.google
            : '';

        if (!apiKey) {
          throw new Error(`API key not configured for ${provider.name}`);
        }

        // Transcribe using the selected provider
        const text = await provider.transcribe(uri, {
          apiKey,
          model: settings.providerSettings?.[providerId]?.model || settings.sttModel || 'whisper-1',
          // Don't specify language to enable auto-detection
        });

        const fullText = transcribedText ? transcribedText + ' ' + text : text;
        setTranscribedText(fullText);

        // Save to history
        await HistoryStorage.addItem({
          text: fullText,
          timestamp: Date.now(),
          audioUri: uri,
          source: 'recording',
        });

        showStatus(t('speechToText.status.complete'));
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      setRecording(null);
    } catch {
      showStatus(t('speechToText.status.failed'));
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
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
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const clearText = () => {
    setTranscribedText('');
    showStatus(t('speechToText.textCleared'));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      // Reset animations
      fadeAnim.setValue(1);
      slideAnim.setValue(0);

      // Reload settings and show a brief status
      await loadSettings();
      showStatus(t('speechToText.refreshed'), 1500);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      /* ignore */
    } finally {
      // Ensure refresh state is reset
      setRefreshing(false);
    }
  };

  const wordCount = transcribedText.split(' ').filter((w) => w).length;
  const charCount = transcribedText.length;

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

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
              progressBackgroundColor={isDark ? colors.surface : colors.background}
            />
          }
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
            {/* Header */}
            <View style={styles.header}>
              <Text style={[styles.screenTitle, { color: colors.text }]}>
                {t('speechToText.title')}
              </Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                {t('speechToText.subtitle')}
              </Text>
            </View>

            {/* Main Text Area with modern styling */}
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <ModernCard variant={isRecording ? 'gradient' : 'glass'} style={styles.textCard}>
                <View style={styles.textHeader}>
                  <Text style={[styles.label, { color: colors.textSecondary }]}>
                    {t('speechToText.transcription')}
                  </Text>
                  <View style={styles.statsContainer}>
                    <View style={[styles.statBadge, { backgroundColor: colors.primary + '15' }]}>
                      <Text style={[styles.statText, { color: colors.primary }]}>
                        {wordCount} {t('common.words')}
                      </Text>
                    </View>
                    <View style={[styles.statBadge, { backgroundColor: colors.accent + '15' }]}>
                      <Text style={[styles.statText, { color: colors.accent }]}>
                        {charCount} {t('common.characters')}
                      </Text>
                    </View>
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

                {/* Transcription Progress Indicator */}
                {isProcessing && recordingDuration > 0 && (
                  <TranscriptionProgress isVisible={isProcessing} duration={recordingDuration} />
                )}

                {/* AI Quick Actions */}
                {transcribedText && !isProcessing && !isRecording && (
                  <AIQuickActions
                    text={transcribedText}
                    onResult={(result) => setTranscribedText(result)}
                  />
                )}

                {/* Modern recording indicator */}
                {isRecording && (
                  <View style={styles.recordingIndicator}>
                    <View style={[styles.recordingDot, { backgroundColor: colors.error }]} />
                    <Text style={[styles.recordingText, { color: colors.text }]}>
                      {t('speechToText.recording')}
                    </Text>
                  </View>
                )}

                {/* Footer Actions inside card with status area */}
                <View style={styles.cardFooter}>
                  {/* Status Message Area - Always reserved space */}
                  <View style={styles.statusArea}>
                    {statusMessage !== '' ? (
                      <View style={styles.statusContent}>
                        <View
                          style={[styles.statusIndicator, { backgroundColor: colors.primary }]}
                        />
                        <Text style={[styles.statusText, { color: colors.text }]}>
                          {statusMessage}
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.statusPlaceholder} />
                    )}
                  </View>

                  {/* Action Buttons */}
                  <View style={styles.footerActions}>
                    <TouchableOpacity
                      onPress={copyToClipboard}
                      style={styles.footerAction}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="copy-outline" size={22} color={colors.text} />
                    </TouchableOpacity>

                    <View style={[styles.footerDivider, { backgroundColor: colors.border }]} />

                    <TouchableOpacity
                      onPress={clearText}
                      style={styles.footerAction}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="trash-outline" size={22} color={colors.text} />
                    </TouchableOpacity>

                    <View style={[styles.footerDivider, { backgroundColor: colors.border }]} />

                    <TouchableOpacity
                      onPress={() => {
                        loadHistory();
                        setShowHistory(true);
                      }}
                      style={styles.footerAction}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="time-outline" size={22} color={colors.text} />
                    </TouchableOpacity>
                  </View>
                </View>
              </ModernCard>
            </Animated.View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* History Modal */}
      <Modal
        isVisible={showHistory}
        onBackdropPress={() => setShowHistory(false)}
        style={styles.modal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
      >
        <TranscriptionHistory
          history={history}
          onSelectItem={handleSelectHistoryItem}
          onDeleteItem={handleDeleteHistoryItem}
          onClose={() => setShowHistory(false)}
        />
      </Modal>

      {/* Floating Record Button */}
      <Animated.View
        style={[
          styles.floatingRecordButton,
          {
            bottom: buttonBottomAnim,
          },
        ]}
      >
        <TouchableOpacity
          onPress={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          activeOpacity={0.9}
          style={[
            styles.floatingRecordButtonInner,
            {
              backgroundColor: isRecording ? colors.error : colors.primary,
              shadowColor: isRecording ? colors.error : colors.primary,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.floatingButtonContent,
              {
                transform: [{ scale: pulseAnim }],
              },
            ]}
          >
            <Ionicons
              name={isProcessing ? 'hourglass-outline' : isRecording ? 'stop' : 'mic'}
              size={28}
              color="white"
            />
          </Animated.View>

          {/* Recording indicator dot */}
          {isRecording && (
            <Animated.View
              style={[
                styles.floatingRecordingDot,
                {
                  backgroundColor: colors.error,
                  opacity: pulseAnim,
                },
              ]}
            />
          )}
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    ...Platform.select({
      android: {
        paddingTop: 0, // SafeAreaView handles this
      },
    }),
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: vh(15), // Space for custom tab bar only
  },
  content: {
    paddingHorizontal: designTokens.spacing.lg,
    paddingTop: designTokens.spacing.xl,
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
  statusArea: {
    minHeight: 32,
    justifyContent: 'center',
    marginBottom: designTokens.spacing.sm,
  },
  statusContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusPlaceholder: {
    height: 32,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: designTokens.spacing.sm,
  },
  statusText: {
    ...designTokens.typography.labelMedium,
    fontWeight: '500',
  },
  textCard: {
    marginBottom: designTokens.spacing.lg,
    minHeight: 250,
  },
  textHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: designTokens.spacing.md,
  },
  label: {
    ...designTokens.typography.titleSmall,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: designTokens.spacing.sm,
  },
  statBadge: {
    paddingHorizontal: designTokens.spacing.sm,
    paddingVertical: designTokens.spacing.xs,
    borderRadius: designTokens.radius.full,
  },
  statText: {
    ...designTokens.typography.labelSmall,
    fontWeight: '600',
  },
  textInput: {
    flex: 1,
    ...designTokens.typography.bodyLarge,
    lineHeight: 24,
    minHeight: 180,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: designTokens.spacing.md,
    paddingTop: designTokens.spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 0, 0, 0.1)',
  },
  recordingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: designTokens.spacing.sm,
  },
  recordingText: {
    ...designTokens.typography.labelMedium,
    fontWeight: '500',
  },
  cardFooter: {
    marginTop: designTokens.spacing.md,
    paddingTop: designTokens.spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  footerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerAction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: designTokens.spacing.sm,
  },
  footerDivider: {
    width: 1,
    height: 20,
    opacity: 0.3,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  floatingRecordButton: {
    position: 'absolute',
    right: 20,
  },
  floatingRecordButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingRecordingDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
