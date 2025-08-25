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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard } from '../components/GlassCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { StorageService } from '../services/storage';
import { Settings } from '../types';
import { ProviderRegistry } from '../services/providers/ProviderRegistry';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { wp, hp, spacing, fontSizes, componentHeights, adaptiveSpacing } from '../utils/responsive';
import { useFocusEffect } from '@react-navigation/native';
import { TranscriptionProgress } from '../components/TranscriptionProgress';
import { AIQuickActions } from '../components/AIQuickActions';

export const ModernSpeechToTextScreen: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [transcribedText, setTranscribedText] = useState('');
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [recordingDuration, setRecordingDuration] = useState(0);
  const recordingStartTime = useRef<number | null>(null);

  const { colors, isDark } = useTheme();
  const { t } = useTranslation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const waveAnims = useRef(
    Array(5)
      .fill(0)
      .map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    setupAudio();
    animateEntry();
  }, [animateEntry]);

  // Reload settings when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadSettings();
    }, []),
  );

  useEffect(() => {
    if (isRecording) {
      animateWaves();
    } else {
      stopWaveAnimation();
    }
  }, [isRecording, animateWaves, stopWaveAnimation]);

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

  const animateWaves = () => {
    waveAnims.forEach((anim, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 100),
          Animated.timing(anim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    });
  };

  const stopWaveAnimation = () => {
    waveAnims.forEach((anim) => {
      anim.stopAnimation();
      Animated.timing(anim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

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
    // Reload settings to ensure we have the latest
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

        if (transcribedText) {
          setTranscribedText(transcribedText + ' ' + text);
        } else {
          setTranscribedText(text);
        }

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

  const wordCount = transcribedText ? transcribedText.split(' ').filter((w) => w).length : 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={isDark ? ['#0F0F23', '#1A1A3E', '#0F0F23'] : ['#F0F4FF', '#FFFFFF', '#F0F4FF']}
        style={styles.container}
      >
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
                    <Text style={[styles.statusText, { color: colors.text }]}>{statusMessage}</Text>
                  </GlassCard>
                </Animated.View>
              )}

              {/* Main Text Area */}
              <GlassCard style={styles.textCard} gradient>
                <View style={styles.textHeader}>
                  <Text style={[styles.label, { color: colors.text }]}>
                    {t('speechToText.subtitle')}
                  </Text>
                  <View style={styles.wordCount}>
                    <Text style={[styles.wordCountText, { color: colors.textSecondary }]}>
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
              </GlassCard>

              {/* Recording Visualization */}
              {(isRecording || isProcessing) && (
                <View style={styles.visualizationContainer}>
                  <View style={styles.waveContainer}>
                    {waveAnims.map((anim, index) => (
                      <Animated.View
                        key={index}
                        style={[
                          styles.wave,
                          {
                            backgroundColor: isRecording ? colors.primary : colors.secondary,
                            transform: [
                              {
                                scaleY: anim.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [0.3, 1.5],
                                }),
                              },
                              {
                                scaleX: anim.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [1, 1.2],
                                }),
                              },
                            ],
                            opacity: anim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0.6, 1],
                            }),
                          },
                        ]}
                      />
                    ))}
                  </View>
                </View>
              )}

              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                <View style={styles.mainButtonWrapper}>
                  <FloatingActionButton
                    onPress={isRecording ? stopRecording : startRecording}
                    isActive={isRecording}
                    icon={
                      <Text style={styles.micIcon}>
                        {isProcessing ? '⏳' : isRecording ? '⏹' : '🎤'}
                      </Text>
                    }
                  />
                </View>

                <View style={styles.actionButtons}>
                  <AnimatedButton
                    title={t('speechToText.copyText')}
                    onPress={copyToClipboard}
                    variant="glass"
                    size="medium"
                    style={styles.actionButton}
                    icon={<Text>📋</Text>}
                  />

                  <AnimatedButton
                    title={t('speechToText.clearText')}
                    onPress={clearText}
                    variant="glass"
                    size="medium"
                    style={styles.actionButton}
                    icon={<Text>🗑</Text>}
                  />
                </View>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardAvoid: {
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
  textCard: {
    flex: 1,
    padding: adaptiveSpacing.cardPadding,
    marginBottom: spacing.md,
    minHeight: componentHeights.textInput,
    maxHeight: hp(50),
  },
  textHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSizes.xl,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  wordCount: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  wordCountText: {
    fontSize: fontSizes.tiny,
    fontWeight: '600',
  },
  textInput: {
    flex: 1,
    fontSize: fontSizes.medium,
    lineHeight: fontSizes.medium * 1.5,
    textAlignVertical: 'top',
  },
  visualizationContainer: {
    height: componentHeights.visualization,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: componentHeights.visualization * 0.7,
  },
  wave: {
    width: wp(1.5),
    height: componentHeights.visualization * 0.4,
    borderRadius: 3,
    marginHorizontal: spacing.xs / 2,
  },
  buttonContainer: {
    marginTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  mainButtonWrapper: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  micIcon: {
    fontSize: fontSizes.xxxl,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
});
