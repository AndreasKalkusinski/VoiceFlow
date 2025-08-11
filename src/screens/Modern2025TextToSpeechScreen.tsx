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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { ModernCard } from '../components/ModernCard';
import { StorageService } from '../services/storage';
import { OpenAIService } from '../services/openai';
import { Settings } from '../types';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { designTokens } from '../utils/design-system';
import { vw, vh, responsiveDimensions } from '../utils/responsive-dimensions';
import { getScreenTheme } from '../utils/screen-themes';
import { useFocusEffect } from '@react-navigation/native';

export const Modern2025TextToSpeechScreen: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [playbackPosition, setPlaybackPosition] = useState(0);

  const { isDark } = useTheme();
  const colors = isDark ? designTokens.colors.dark : designTokens.colors.light;
  const screenTheme = getScreenTheme('Text to Speech', isDark);
  const { t } = useTranslation();

  // Use useRef for Animated values to work in release builds
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setupAudio();
    animateEntry();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadSettings();
    }, []),
  );

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

    if (!currentSettings?.apiKeys?.openai && !currentSettings?.openaiApiKey) {
      Alert.alert(t('alerts.configRequired'), t('errors.noApiKey'));
      return;
    }

    if (!inputText.trim()) {
      Alert.alert(t('alerts.noTextTitle'), t('errors.noText'));
      return;
    }

    setIsGenerating(true);
    showStatus(t('textToSpeech.status.generating'));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      const apiKey = currentSettings.apiKeys?.openai || currentSettings.openaiApiKey;

      // Get model and voice from providerSettings or fallback to defaults
      const ttsModel =
        currentSettings.providerSettings?.['openai-tts']?.model ||
        currentSettings.ttsModel ||
        'tts-1';
      const ttsVoice =
        currentSettings.providerSettings?.['openai-tts']?.voice ||
        currentSettings.ttsVoice ||
        'alloy';

      console.log('TTS Settings:', {
        apiKey: apiKey ? 'Set (hidden)' : 'Not set',
        model: ttsModel,
        voice: ttsVoice,
        inputLength: inputText.length,
        providerSettings: currentSettings.providerSettings?.['openai-tts'],
      });

      if (!apiKey) {
        throw new Error('API key is missing');
      }

      const openaiService = new OpenAIService(apiKey);
      const newAudioUri = await openaiService.textToSpeech(inputText, ttsModel, ttsVoice);

      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: newAudioUri },
        { shouldPlay: true },
      );

      setSound(newSound);
      setAudioUri(newAudioUri);
      setIsPlaying(true);
      showStatus(t('textToSpeech.status.playing'));

      newSound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded) {
          if (status.didJustFinish) {
            setIsPlaying(false);

            setPlaybackPosition(0);
            progressAnim.setValue(0);
            showStatus(t('textToSpeech.status.complete'));
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            // Rewind to beginning
            await newSound.setPositionAsync(0);
          } else if (status.positionMillis && status.durationMillis) {
            const progress = status.positionMillis / status.durationMillis;

            setPlaybackPosition(status.positionMillis);
            setDuration(status.durationMillis);
            progressAnim.setValue(progress);
          }
          setIsPlaying(status.isPlaying);
        }
      });
    } catch (error: any) {
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        stack: error.stack,
      });
      showStatus(t('textToSpeech.status.failed'));
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

      // More specific error message
      const errorMessage =
        error.response?.data?.error?.message || error.message || t('textToSpeech.status.failed');
      Alert.alert(t('common.error'), errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const pasteFromClipboard = async () => {
    const text = await Clipboard.getStringAsync();
    if (text) {
      setInputText(text);
      showStatus(t('textToSpeech.textPasted'));
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      Alert.alert(t('alerts.noTextTitle'), t('alerts.clipboardEmpty'));
    }
  };

  const clearText = () => {
    setInputText('');
    showStatus(t('textToSpeech.textCleared'));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const togglePlayPause = async () => {
    if (!sound || !audioUri) {
      // If no sound object but we have audio URI, recreate the sound
      if (audioUri) {
        try {
          const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: audioUri },
            { shouldPlay: true },
          );

          setSound(newSound);
          setIsPlaying(true);

          newSound.setOnPlaybackStatusUpdate(async (status) => {
            if (status.isLoaded) {
              if (status.didJustFinish) {
                setIsPlaying(false);

                setPlaybackPosition(0);
                progressAnim.setValue(0);
                // Rewind to beginning
                await newSound.setPositionAsync(0);
              } else if (status.positionMillis && status.durationMillis) {
                const progress = status.positionMillis / status.durationMillis;

                setPlaybackPosition(status.positionMillis);
                setDuration(status.durationMillis);
                progressAnim.setValue(progress);
              }
              setIsPlaying(status.isPlaying);
            }
          });
        } catch {
          /* ignore */
        }
      }
      return;
    }

    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const seekToPosition = async (progress: number) => {
    if (!sound || !duration) return;

    const position = progress * duration;
    await sound.setPositionAsync(position);

    setPlaybackPosition(position);
    progressAnim.setValue(progress);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const downloadAudio = async () => {
    if (!audioUri) return;

    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        // Create a copy with a proper filename
        const filename = `voiceflow_${Date.now()}.mp3`;
        const newUri = FileSystem.documentDirectory + filename;
        await FileSystem.copyAsync({
          from: audioUri,
          to: newUri,
        });

        await Sharing.shareAsync(newUri, {
          mimeType: 'audio/mpeg',
          dialogTitle: t('textToSpeech.downloadAudio'),
        });
        showStatus(t('textToSpeech.status.downloaded'));
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        Alert.alert(t('common.error'), t('textToSpeech.status.downloadFailed'));
      }
    } catch {
      Alert.alert(t('common.error'), t('textToSpeech.status.downloadFailed'));
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      // Reset animations
      fadeAnim.setValue(1);
      slideAnim.setValue(0);

      // Reload settings and show a brief status
      await loadSettings();
      showStatus(t('textToSpeech.refreshed'), 1500);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      /* ignore */
    } finally {
      // Ensure refresh state is reset
      setRefreshing(false);
    }
  };

  const characterCount = inputText.length;
  const estimatedDuration = Math.ceil(inputText.split(' ').length / 150); // ~150 words per minute

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
                {t('textToSpeech.title')}
              </Text>
            </View>

            {/* Main Text Input with modern design */}
            <ModernCard variant={isPlaying ? 'gradient' : 'glass'} style={styles.textCard}>
              <View style={styles.textHeader}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  {t('textToSpeech.inputLabel')}
                </Text>
                <View style={styles.statsContainer}>
                  <View style={[styles.statBadge, { backgroundColor: colors.accent + '15' }]}>
                    <Text style={[styles.statText, { color: colors.accent }]}>
                      {characterCount} {t('common.characters')}
                    </Text>
                  </View>
                  {inputText && (
                    <View style={[styles.statBadge, { backgroundColor: colors.info + '15' }]}>
                      <Text style={[styles.statText, { color: colors.info }]}>
                        ~{estimatedDuration} min
                      </Text>
                    </View>
                  )}
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

              {/* Footer Actions inside card with status area */}
              <View style={styles.cardFooter}>
                {/* Status Message Area - Always reserved space */}
                <View style={styles.statusArea}>
                  {statusMessage !== '' ? (
                    <View style={styles.statusContent}>
                      <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
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
                    onPress={pasteFromClipboard}
                    style={styles.footerAction}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="clipboard-outline" size={22} color={colors.text} />
                  </TouchableOpacity>

                  <View style={[styles.footerDivider, { backgroundColor: colors.border }]} />

                  <TouchableOpacity
                    onPress={clearText}
                    style={styles.footerAction}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="trash-outline" size={22} color={colors.text} />
                  </TouchableOpacity>
                </View>
              </View>
            </ModernCard>

            {/* Audio Player - Always visible */}
            <ModernCard
              variant="glass"
              style={StyleSheet.flatten([styles.audioPlayerCard, audioUri ? {} : { opacity: 0.5 }])}
            >
              <View style={styles.audioPlayerHeader}>
                <Ionicons
                  name="musical-notes-outline"
                  size={20}
                  color={audioUri ? colors.primary : colors.textMuted}
                />
                <Text
                  style={[
                    styles.audioPlayerTitle,
                    { color: audioUri ? colors.text : colors.textMuted },
                  ]}
                >
                  {t('textToSpeech.audioPlayer')}
                </Text>
              </View>

              {/* Playback Controls */}
              <View style={styles.audioControls}>
                <TouchableOpacity
                  onPress={togglePlayPause}
                  style={[
                    styles.audioControlButton,
                    {
                      backgroundColor: audioUri ? colors.primary + '15' : colors.border + '20',
                    },
                  ]}
                  activeOpacity={audioUri ? 0.7 : 1}
                  disabled={!audioUri}
                >
                  <Ionicons
                    name={isPlaying ? 'pause' : 'play'}
                    size={24}
                    color={audioUri ? colors.primary : colors.textMuted}
                  />
                </TouchableOpacity>

                {/* Progress Bar - Seekable */}
                <TouchableOpacity
                  style={styles.audioProgressContainer}
                  activeOpacity={audioUri ? 1 : 1}
                  disabled={!audioUri}
                  onPress={(e) => {
                    if (!audioUri) return;
                    const { locationX } = e.nativeEvent;
                    e.currentTarget.measure?.((x, y, width) => {
                      const progress = Math.max(0, Math.min(1, locationX / width));
                      seekToPosition(progress);
                    });
                  }}
                >
                  <View style={[styles.audioProgressBar, { backgroundColor: colors.border }]}>
                    {audioUri && (
                      <>
                        <Animated.View
                          style={[
                            styles.audioProgressFill,
                            {
                              backgroundColor: colors.primary,
                              width: progressAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0%', '100%'],
                              }),
                            },
                          ]}
                        />
                        {/* Progress indicator dot */}
                        <Animated.View
                          style={[
                            styles.progressIndicator,
                            {
                              backgroundColor: colors.primary,
                              left: progressAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0%', '100%'],
                              }),
                            },
                          ]}
                        />
                      </>
                    )}
                  </View>
                  <Text
                    style={[
                      styles.durationText,
                      { color: audioUri ? colors.textSecondary : colors.textMuted },
                    ]}
                  >
                    {audioUri && duration > 0
                      ? `${Math.floor(playbackPosition / 1000)}s / ${Math.floor(duration / 1000)}s`
                      : '0s / 0s'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={downloadAudio}
                  style={[
                    styles.audioControlButton,
                    {
                      backgroundColor: audioUri ? colors.success + '15' : colors.border + '20',
                    },
                  ]}
                  activeOpacity={audioUri ? 0.7 : 1}
                  disabled={!audioUri}
                >
                  <Ionicons
                    name="download-outline"
                    size={24}
                    color={audioUri ? colors.success : colors.textMuted}
                  />
                </TouchableOpacity>
              </View>
            </ModernCard>

            {/* Modern Generate Button */}
            <View style={styles.playButtonContainer}>
              <TouchableOpacity
                onPress={generateSpeech}
                disabled={
                  isGenerating ||
                  !inputText.trim() ||
                  (!settings?.apiKeys?.openai && !settings?.openaiApiKey)
                }
                activeOpacity={0.8}
                style={styles.playButtonWrapper}
              >
                <Animated.View
                  style={[
                    styles.playButton,
                    {
                      opacity:
                        isGenerating ||
                        !inputText.trim() ||
                        (!settings?.apiKeys?.openai && !settings?.openaiApiKey)
                          ? 0.5
                          : 1,
                      borderColor: colors.primary,
                    },
                  ]}
                >
                  <BlurView
                    intensity={70}
                    tint={isDark ? 'dark' : 'light'}
                    style={StyleSheet.absoluteFillObject}
                  />
                  <LinearGradient
                    colors={
                      isDark
                        ? ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']
                        : ['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.3)']
                    }
                    style={StyleSheet.absoluteFillObject}
                  />
                  <Ionicons
                    name={isGenerating ? 'hourglass-outline' : 'volume-high-outline'}
                    size={vw(5.5)}
                    color={colors.primary}
                  />
                </Animated.View>
              </TouchableOpacity>

              {/* Tips below button */}
              {!audioUri && inputText && (
                <View style={styles.playInfo}>
                  <Text style={[styles.playInfoText, { color: colors.textSecondary }]}>
                    {t('textToSpeech.tapToPlay')}
                  </Text>
                </View>
              )}
            </View>

            {/* Settings Info - compact version */}
            {settings && (
              <View style={styles.settingsInfo}>
                <Ionicons
                  name="settings-outline"
                  size={14}
                  color={colors.textMuted}
                  style={styles.settingsIcon}
                />
                <Text style={[styles.settingsInfoText, { color: colors.textSecondary }]}>
                  {settings.providerSettings?.['openai-tts']?.model || settings.ttsModel || 'tts-1'}{' '}
                  •{' '}
                  {settings.providerSettings?.['openai-tts']?.voice || settings.ttsVoice || 'alloy'}
                </Text>
              </View>
            )}
          </Animated.View>
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
    paddingBottom: vh(15), // Reduced space for tab bar
  },
  content: {
    paddingHorizontal: responsiveDimensions.padding.screen,
    paddingTop: vh(2), // Dynamic top padding
  },
  header: {
    marginBottom: vh(2), // Dynamic margin based on screen height
  },
  screenTitle: {
    fontSize: responsiveDimensions.fontSize.title,
    fontWeight: '700',
    marginBottom: responsiveDimensions.padding.small,
  },
  statusArea: {
    minHeight: vh(3.5),
    justifyContent: 'center',
    marginBottom: vh(0.5),
  },
  statusContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusPlaceholder: {
    height: vh(3.5),
  },
  statusDot: {
    width: vw(2),
    height: vw(2),
    borderRadius: vw(1),
    marginRight: responsiveDimensions.padding.small,
  },
  statusText: {
    fontSize: responsiveDimensions.fontSize.small,
    fontWeight: '500',
  },
  textCard: {
    marginBottom: vh(2),
    minHeight: vh(30), // Dynamic height based on screen
    padding: responsiveDimensions.padding.card,
  },
  textHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveDimensions.padding.medium,
  },
  label: {
    fontSize: responsiveDimensions.fontSize.medium,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: responsiveDimensions.padding.small,
  },
  statBadge: {
    paddingHorizontal: responsiveDimensions.padding.medium,
    paddingVertical: responsiveDimensions.padding.small,
    borderRadius: vw(5),
  },
  statText: {
    fontSize: responsiveDimensions.fontSize.small,
    fontWeight: '600',
  },
  textInput: {
    flex: 1,
    fontSize: responsiveDimensions.fontSize.medium,
    lineHeight: responsiveDimensions.fontSize.medium * 1.5,
    minHeight: vh(15), // Dynamic based on screen height
  },
  cardFooter: {
    marginTop: responsiveDimensions.padding.medium,
    paddingTop: responsiveDimensions.padding.medium,
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
    paddingVertical: responsiveDimensions.padding.small,
  },
  footerDivider: {
    width: 1,
    height: 20,
    opacity: 0.3,
  },
  settingsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vh(1),
    gap: responsiveDimensions.padding.small,
  },
  settingsIcon: {
    opacity: 0.6,
  },
  settingsInfoText: {
    fontSize: responsiveDimensions.fontSize.small,
    fontWeight: '500',
  },
  playButtonContainer: {
    alignItems: 'center',
    marginTop: vh(2),
    marginBottom: vh(1.5),
  },
  playButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: vw(15),
    height: vw(15),
    borderRadius: vw(7.5),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    overflow: 'hidden',
    ...designTokens.elevation.lg,
  },
  playInfo: {
    marginTop: responsiveDimensions.padding.medium,
  },
  playInfoText: {
    fontSize: responsiveDimensions.fontSize.small,
    fontWeight: '500',
  },
  audioPlayerCard: {
    marginBottom: vh(2),
    padding: vh(2),
  },
  audioPlayerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveDimensions.padding.small,
    marginBottom: responsiveDimensions.padding.medium,
  },
  audioPlayerTitle: {
    fontSize: responsiveDimensions.fontSize.medium,
    fontWeight: '600',
  },
  audioControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveDimensions.padding.medium,
  },
  audioControlButton: {
    width: vw(12),
    height: vw(12),
    borderRadius: vw(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioProgressContainer: {
    flex: 1,
  },
  audioProgressBar: {
    height: vw(1.5),
    borderRadius: vw(0.75),
    overflow: 'hidden',
    position: 'relative',
  },
  audioProgressFill: {
    height: '100%',
    borderRadius: vw(0.75),
  },
  progressIndicator: {
    position: 'absolute',
    width: vw(4),
    height: vw(4),
    borderRadius: vw(2),
    top: -vw(1.25),
    marginLeft: -vw(2),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  durationText: {
    fontSize: responsiveDimensions.fontSize.small,
    marginTop: responsiveDimensions.padding.small,
  },
});
