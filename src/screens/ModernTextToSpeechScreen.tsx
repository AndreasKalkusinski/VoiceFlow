import React, { useState, useEffect, useRef, useCallback } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LegacyAudioService from '../services/LegacyAudioService';
import { AVPlaybackStatus } from 'expo-av';
const Audio = LegacyAudioService.Audio;
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard } from '../components/GlassCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { StorageService } from '../services/storage';
import { Settings } from '../types';
import { ProviderRegistry } from '../services/providers/ProviderRegistry';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { wp, hp, spacing, fontSizes, componentHeights, adaptiveSpacing } from '../utils/responsive';
import { useFocusEffect } from '@react-navigation/native';

export const ModernTextToSpeechScreen: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);
  const [audioUri, setAudioUri] = useState<string | null>(null);

  const { colors, isDark } = useTheme();
  const { t } = useTranslation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  // const progressAnim = useRef(new Animated.Value(0)).current;
  const waveformAnims = useRef([...Array(15)].map(() => new Animated.Value(0.3))).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const animateEntry = useCallback(() => {
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
  }, [fadeAnim, slideAnim]);

  const startWaveformAnimation = useCallback(() => {
    waveformAnims.forEach((anim, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 300 + Math.random() * 200,
            useNativeDriver: true,
            delay: index * 50,
          }),
          Animated.timing(anim, {
            toValue: 0.3,
            duration: 300 + Math.random() * 200,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    });
  }, [waveformAnims]);

  const stopWaveformAnimation = useCallback(() => {
    waveformAnims.forEach((anim) => {
      anim.stopAnimation();
      Animated.timing(anim, {
        toValue: 0.3,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [waveformAnims]);

  const startPulseAnimation = useCallback(() => {
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
  }, [pulseAnim]);

  const stopPulseAnimation = useCallback(() => {
    pulseAnim.stopAnimation();
    Animated.timing(pulseAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [pulseAnim]);

  const setupAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch {
      /* ignore */
    }
  };

  const loadSettings = async () => {
    try {
      const loadedSettings = await StorageService.getSettings();
      setSettings(loadedSettings);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    animateEntry();
    setupAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [animateEntry, sound]);

  useEffect(() => {
    if (isPlaying) {
      startWaveformAnimation();
      startPulseAnimation();
    } else {
      stopWaveformAnimation();
      stopPulseAnimation();
    }
  }, [
    isPlaying,
    startPulseAnimation,
    startWaveformAnimation,
    stopPulseAnimation,
    stopWaveformAnimation,
  ]);

  // Reload settings when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadSettings();
    }, []),
  );

  const showStatus = (message: string, duration: number = 3000) => {
    setStatusMessage(message);
    setTimeout(() => setStatusMessage(''), duration);
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await Clipboard.getStringAsync();
      if (text) {
        setInputText(text);
        showStatus(t('textToSpeech.status.pasteSuccess'));
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } else {
        Alert.alert(t('alerts.clipboardEmptyTitle'), t('alerts.clipboardEmptyMessage'));
      }
    } catch {
      showStatus(t('textToSpeech.status.pasteFailed'));
    }
  };

  const generateSpeech = async () => {
    // Reload settings to ensure we have the latest
    const currentSettings = await StorageService.getSettings();
    setSettings(currentSettings);

    if (!currentSettings?.openaiApiKey) {
      Alert.alert(t('alerts.configRequired'), t('errors.noApiKey'));
      return;
    }

    if (!inputText.trim()) {
      Alert.alert(t('alerts.noTextTitle'), t('alerts.noTextMessage'));
      return;
    }

    try {
      setIsGenerating(true);
      showStatus(t('textToSpeech.status.generating'));
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

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

      showStatus(t('textToSpeech.status.loading'));

      if (sound) {
        await sound.unloadAsync();
      }

      // Setup audio mode for playback
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        {
          shouldPlay: false,
          volume: 1.0,
          isMuted: false,
          isLooping: false,
        },
        onPlaybackStatusUpdate,
      );

      setSound(newSound);
      setAudioUri(audioUri); // Store the URI for download
      showStatus(t('textToSpeech.status.ready'));
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      showStatus(t('textToSpeech.status.failed'));
      Alert.alert(t('common.error'), t('textToSpeech.status.failed'));
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsGenerating(false);
    }
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setPlaybackPosition(status.positionMillis || 0);
      setPlaybackDuration(status.durationMillis || 0);

      if ('isPlaying' in status && status.isPlaying) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }

      if (status.didJustFinish) {
        setIsPlaying(false);
        setPlaybackPosition(0);
        showStatus(t('textToSpeech.status.completed'));
      }
    }
  };

  const playPause = async () => {
    if (!sound) {
      Alert.alert(t('alerts.noAudioTitle'), t('alerts.noAudioMessage'));
      return;
    }

    try {
      const status = await sound.getStatusAsync();

      if (status.isLoaded) {
        if (isPlaying) {
          await sound.pauseAsync();
          showStatus(t('textToSpeech.status.paused'));
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } else {
          // Ensure audio mode is set for playback
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: true,
            staysActiveInBackground: true,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
          });

          await sound.setVolumeAsync(1.0);
          await sound.playAsync();
          showStatus(t('textToSpeech.status.playing'));
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
      }
    } catch {
      showStatus(t('textToSpeech.status.error'));
    }
  };

  const stopPlayback = async () => {
    if (sound) {
      try {
        await sound.stopAsync();
        setPlaybackPosition(0);
        showStatus(t('textToSpeech.status.stopped'));
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {
        showStatus(t('textToSpeech.status.stopFailed'));
      }
    }
  };

  const clearAll = () => {
    setInputText('');
    if (sound) {
      sound.unloadAsync();
      setSound(null);
    }
    setIsPlaying(false);
    setPlaybackPosition(0);
    setPlaybackDuration(0);
    setAudioUri(null);
    showStatus(t('textToSpeech.status.cleared'));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const downloadAudio = async () => {
    if (!audioUri) {
      Alert.alert(t('alerts.noAudioTitle'), t('alerts.noAudioMessage'));
      return;
    }

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // Check if sharing is available
      const isAvailable = await Sharing.isAvailableAsync();

      if (!isAvailable) {
        Alert.alert(t('alerts.error'), t('textToSpeech.downloadNotAvailable'));
        return;
      }

      // Create a permanent file with a user-friendly name
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
      const fileName = `VoiceFlow_TTS_${timestamp}.mp3`;
      const permanentUri = FileSystem.documentDirectory + fileName;

      // Copy the file to a permanent location with a proper name
      await FileSystem.copyAsync({
        from: audioUri,
        to: permanentUri,
      });

      // Share the file (this will show save options on iOS)
      await Sharing.shareAsync(permanentUri, {
        mimeType: 'audio/mpeg',
        dialogTitle: t('textToSpeech.saveAudio'),
        UTI: 'public.mp3',
      });

      showStatus(t('textToSpeech.status.downloaded'));
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      showStatus(t('textToSpeech.status.downloadFailed'));
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

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

              {/* Text Input Area */}
              <GlassCard style={styles.textCard} gradient>
                <View style={styles.textHeader}>
                  <Text style={[styles.label, { color: colors.text }]}>
                    {t('textToSpeech.title')}
                  </Text>
                  <AnimatedButton
                    title={t('textToSpeech.pasteText')}
                    onPress={pasteFromClipboard}
                    variant="glass"
                    size="small"
                    icon={<Text>📋</Text>}
                  />
                </View>

                <TextInput
                  style={[styles.textInput, { color: colors.text }]}
                  multiline
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder={t('textToSpeech.placeholder')}
                  placeholderTextColor={colors.textMuted}
                />

                <View style={styles.characterCount}>
                  <Text style={[styles.characterCountText, { color: colors.textSecondary }]}>
                    {inputText.length} {t('common.characters')}
                  </Text>
                </View>
              </GlassCard>

              {/* Audio Player */}
              {sound && (
                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                  <GlassCard style={styles.playerCard} gradient>
                    {/* Animated Title */}
                    <View style={styles.playerHeader}>
                      <LinearGradient
                        colors={isDark ? ['#6366F1', '#EC4899'] : ['#8B5CF6', '#EC4899']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.playerTitleGradient}
                      >
                        <Text style={styles.playerTitle}>{t('textToSpeech.audioPlayer')}</Text>
                      </LinearGradient>
                    </View>

                    {/* Waveform Visualization */}
                    <View style={styles.waveformContainer}>
                      {waveformAnims.map((anim, i) => (
                        <Animated.View
                          key={i}
                          style={[
                            styles.waveBar,
                            {
                              transform: [
                                {
                                  scaleY: anim,
                                },
                              ],
                            },
                          ]}
                        >
                          <LinearGradient
                            colors={
                              isPlaying
                                ? ['#6366F1', '#EC4899']
                                : isDark
                                  ? ['#374151', '#4B5563']
                                  : ['#D1D5DB', '#E5E7EB']
                            }
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={StyleSheet.absoluteFillObject}
                          />
                        </Animated.View>
                      ))}
                    </View>

                    {/* Voice Info Section */}
                    <View style={styles.voiceInfoSection}>
                      <View style={styles.voiceCard}>
                        <LinearGradient
                          colors={['#6366F1', '#8B5CF6']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.voiceIconGradient}
                        >
                          <Text style={styles.voiceIcon}>🎤</Text>
                        </LinearGradient>
                        <View style={styles.voiceDetails}>
                          <Text style={[styles.voiceLabel, { color: colors.textSecondary }]}>
                            {t('textToSpeech.voice')}
                          </Text>
                          <Text style={[styles.voiceName, { color: colors.text }]}>
                            {settings?.ttsVoice
                              ? settings.ttsVoice.charAt(0).toUpperCase() +
                                settings.ttsVoice.slice(1)
                              : 'alloy'}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.modelBadge}>
                        <Text style={[styles.modelText, { color: colors.primary }]}>
                          {settings?.ttsModel || 'tts-1'}
                        </Text>
                      </View>
                    </View>

                    {/* Progress Section */}
                    <View style={styles.progressSection}>
                      <View
                        style={[
                          styles.progressBar,
                          isDark ? styles.progressBarDark : styles.progressBarLight,
                        ]}
                      >
                        <Animated.View
                          style={[
                            styles.progressFill,
                            {
                              width: `${(playbackPosition / playbackDuration) * 100 || 0}%`,
                            },
                          ]}
                        >
                          <LinearGradient
                            colors={['#6366F1', '#EC4899']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={StyleSheet.absoluteFillObject}
                          />
                        </Animated.View>
                        <Animated.View
                          style={[
                            styles.progressThumb,
                            {
                              left: `${(playbackPosition / playbackDuration) * 100 || 0}%`,
                              transform: [{ scale: isPlaying ? pulseAnim : 1 }],
                            },
                          ]}
                        />
                      </View>
                      <View style={styles.timeContainer}>
                        <View style={styles.timeCard}>
                          <Text style={[styles.timeLabel, { color: colors.textSecondary }]}>
                            {t('common.current')}
                          </Text>
                          <Text style={[styles.timeText, { color: colors.primary }]}>
                            {formatTime(playbackPosition)}
                          </Text>
                        </View>
                        <View style={styles.timeDivider} />
                        <View style={styles.timeCard}>
                          <Text style={[styles.timeLabel, { color: colors.textSecondary }]}>
                            {t('common.duration')}
                          </Text>
                          <Text style={[styles.timeText, { color: colors.text }]}>
                            {formatTime(playbackDuration)}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Modern Control Buttons */}
                    <View style={styles.modernControls}>
                      <View style={styles.controlsRow}>
                        {/* Stop Button */}
                        <TouchableOpacity
                          onPress={stopPlayback}
                          style={styles.sideButton}
                          activeOpacity={0.7}
                        >
                          <LinearGradient
                            colors={isDark ? ['#1F2937', '#374151'] : ['#F3F4F6', '#E5E7EB']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.sideButtonGradient}
                          >
                            <Text style={styles.sideButtonIcon}>⏹</Text>
                          </LinearGradient>
                        </TouchableOpacity>

                        {/* Play/Pause Button */}
                        <TouchableOpacity
                          onPress={playPause}
                          style={styles.mainControlButton}
                          activeOpacity={0.8}
                        >
                          <Animated.View
                            style={[
                              styles.mainControlOuter,
                              {
                                transform: [{ scale: isPlaying ? 0.95 : 1 }],
                              },
                            ]}
                          >
                            <LinearGradient
                              colors={['rgba(99, 102, 241, 0.1)', 'rgba(236, 72, 153, 0.1)']}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 1 }}
                              style={styles.mainControlRing}
                            />
                            <LinearGradient
                              colors={isPlaying ? ['#EC4899', '#6366F1'] : ['#6366F1', '#EC4899']}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 1 }}
                              style={styles.mainControlGradient}
                            >
                              <Text style={styles.mainControlIcon}>{isPlaying ? '⏸' : '▶️'}</Text>
                            </LinearGradient>
                          </Animated.View>
                        </TouchableOpacity>

                        {/* Download Button */}
                        <TouchableOpacity
                          onPress={downloadAudio}
                          style={styles.sideButton}
                          activeOpacity={0.7}
                        >
                          <LinearGradient
                            colors={isDark ? ['#1F2937', '#374151'] : ['#F3F4F6', '#E5E7EB']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.sideButtonGradient}
                          >
                            <Text style={styles.sideButtonIcon}>💾</Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </GlassCard>
                </Animated.View>
              )}

              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                <AnimatedButton
                  title={
                    isGenerating ? t('textToSpeech.generating') : t('textToSpeech.generateSpeech')
                  }
                  onPress={generateSpeech}
                  variant="primary"
                  size="large"
                  disabled={isGenerating}
                  icon={<Text>🎙</Text>}
                />

                <AnimatedButton
                  title={t('textToSpeech.clearAll')}
                  onPress={clearAll}
                  variant="glass"
                  size="medium"
                  style={styles.clearButton}
                  icon={<Text>🗑</Text>}
                />
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
    padding: adaptiveSpacing.cardPadding,
    marginBottom: spacing.md,
    minHeight: componentHeights.textInput,
    maxHeight: hp(45),
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
  textInput: {
    flex: 1,
    fontSize: fontSizes.medium,
    lineHeight: fontSizes.medium * 1.5,
    textAlignVertical: 'top',
    minHeight: componentHeights.textInput * 0.6,
  },
  characterCount: {
    marginTop: spacing.sm,
    alignItems: 'flex-end',
  },
  characterCountText: {
    fontSize: fontSizes.tiny,
    fontWeight: '600',
  },
  playerCard: {
    padding: spacing.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.1)',
  },
  playerHeader: {
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  playerTitleGradient: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    borderRadius: 20,
  },
  playerTitle: {
    fontSize: fontSizes.small,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  waveformContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp(8),
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  waveBar: {
    width: wp(2),
    height: hp(8),
    borderRadius: wp(1),
    marginHorizontal: wp(0.3),
    overflow: 'hidden',
  },
  voiceInfoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  voiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  voiceIconGradient: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceIcon: {
    fontSize: wp(5),
  },
  voiceDetails: {
    gap: spacing.xs / 2,
  },
  voiceLabel: {
    fontSize: fontSizes.tiny,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  voiceName: {
    fontSize: fontSizes.medium,
    fontWeight: '700',
  },
  modelBadge: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: 12,
  },
  modelText: {
    fontSize: fontSizes.tiny,
    fontWeight: '600',
  },
  progressSection: {
    marginBottom: spacing.xl,
  },
  progressBar: {
    height: hp(1),
    borderRadius: hp(0.5),
    overflow: 'visible',
    position: 'relative',
  },
  progressBarDark: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  progressBarLight: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  progressFill: {
    height: '100%',
    borderRadius: hp(0.5),
    overflow: 'hidden',
  },
  progressThumb: {
    position: 'absolute',
    top: -hp(0.75),
    width: hp(2.5),
    height: hp(2.5),
    borderRadius: hp(1.25),
    backgroundColor: '#FFFFFF',
    marginLeft: -hp(1.25),
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#6366F1',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
    gap: spacing.lg,
  },
  timeCard: {
    alignItems: 'center',
    gap: spacing.xs / 2,
  },
  timeLabel: {
    fontSize: fontSizes.tiny,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  timeText: {
    fontSize: fontSizes.large,
    fontWeight: '700',
  },
  timeDivider: {
    width: 1,
    height: hp(4),
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
  },
  modernControls: {
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl,
  },
  mainControlButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainControlOuter: {
    width: wp(24),
    height: wp(24),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mainControlRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: wp(12),
  },
  mainControlGradient: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(9),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  mainControlIcon: {
    fontSize: wp(7),
    color: '#FFFFFF',
  },
  sideButton: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(7),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sideButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideButtonIcon: {
    fontSize: wp(5),
  },
  buttonContainer: {
    marginTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  clearButton: {
    marginTop: spacing.sm,
  },
});
