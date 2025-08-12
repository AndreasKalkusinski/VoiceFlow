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
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { ModernCard } from '../components/ModernCard';
import { StorageService } from '../services/storage';
import { OpenAIService } from '../services/openai';
import { Settings } from '../types';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { designTokens } from '../utils/design-system';
import { vh, vw } from '../utils/responsive-dimensions';
import { getScreenTheme } from '../utils/screen-themes';
import { useFocusEffect } from '@react-navigation/native';

export const Modern2025SpeechToTextScreen: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [transcribedText, setTranscribedText] = useState('');
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const { isDark } = useTheme();
  const colors = isDark ? designTokens.colors.dark : designTokens.colors.light;
  const screenTheme = getScreenTheme('Speech to Text', isDark);
  const { t } = useTranslation();

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

  useEffect(() => {
    setupAudio();
    animateEntry();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadSettings();
    }, []),
  );

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
                  </View>
                </View>
              </ModernCard>
            </Animated.View>

            {/* Modern Record Button */}
            <View style={styles.recordButtonContainer}>
              <TouchableOpacity
                onPress={isRecording ? stopRecording : startRecording}
                disabled={isProcessing}
                activeOpacity={0.8}
                style={styles.recordButtonWrapper}
              >
                <Animated.View
                  style={[
                    styles.recordButton,
                    {
                      transform: [{ scale: pulseAnim }],
                      borderColor: isRecording ? colors.error : colors.primary,
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
                      isRecording
                        ? [colors.error + '20', colors.error + '10']
                        : isDark
                          ? ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']
                          : ['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.3)']
                    }
                    style={StyleSheet.absoluteFillObject}
                  />
                  <Ionicons
                    name={isProcessing ? 'hourglass-outline' : isRecording ? 'stop' : 'mic'}
                    size={vw(7)}
                    color={isRecording ? colors.error : colors.primary}
                  />
                </Animated.View>
              </TouchableOpacity>

              {/* Tips below button */}
              {!transcribedText && !isRecording && (
                <View style={styles.tipsContainer}>
                  <Ionicons name="bulb-outline" size={16} color={colors.accent} />
                  <Text style={[styles.tipsTextSmall, { color: colors.textSecondary }]}>
                    {t('speechToText.tips.description')}
                  </Text>
                </View>
              )}

              {isRecording && (
                <Animated.View style={[styles.recordingIndicatorNew, { opacity: pulseAnim }]}>
                  <View style={[styles.recordingDotNew, { backgroundColor: colors.error }]} />
                  <Text style={[styles.recordingTextNew, { color: colors.text }]}>
                    {t('speechToText.recording')}
                  </Text>
                </Animated.View>
              )}
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* FAB removed - using integrated button instead */}
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
  tipsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: designTokens.spacing.md,
    paddingHorizontal: designTokens.spacing.lg,
    gap: designTokens.spacing.sm,
    maxWidth: '80%',
  },
  tipsTextSmall: {
    ...designTokens.typography.bodySmall,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  recordButtonContainer: {
    alignItems: 'center',
    marginTop: designTokens.spacing.lg,
    marginBottom: designTokens.spacing.sm,
  },
  recordButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButton: {
    width: vw(18),
    height: vw(18),
    borderRadius: vw(9),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    overflow: 'hidden',
    ...designTokens.elevation.lg,
  },
  recordingIndicatorNew: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: designTokens.spacing.md,
    gap: designTokens.spacing.sm,
  },
  recordingDotNew: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  recordingTextNew: {
    ...designTokens.typography.labelMedium,
    fontWeight: '600',
  },
});
