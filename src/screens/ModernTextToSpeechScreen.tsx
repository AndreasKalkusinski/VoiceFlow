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
  Dimensions,
} from 'react-native';
import { Audio } from 'expo-av';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard } from '../components/GlassCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { StorageService } from '../services/storage';
import { OpenAIService } from '../services/openai';
import { Settings } from '../types';
import { useTheme } from '../hooks/useTheme';

const { width } = Dimensions.get('window');

export const ModernTextToSpeechScreen: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);
  
  const { colors, theme, isDark } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadSettings();
    animateEntry();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

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
    const loadedSettings = await StorageService.getSettings();
    setSettings(loadedSettings);
  };

  const showStatus = (message: string, duration: number = 3000) => {
    setStatusMessage(message);
    setTimeout(() => setStatusMessage(''), duration);
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await Clipboard.getStringAsync();
      if (text) {
        setInputText(text);
        showStatus('Text pasted successfully');
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } else {
        Alert.alert('Clipboard Empty', 'No text found in clipboard');
      }
    } catch (error) {
      showStatus('Failed to paste from clipboard');
    }
  };

  const generateSpeech = async () => {
    if (!settings?.openaiApiKey) {
      Alert.alert('Configuration Required', 'Please configure your OpenAI API key in Settings');
      return;
    }

    if (!inputText.trim()) {
      Alert.alert('No Text', 'Please enter or paste some text');
      return;
    }

    try {
      setIsGenerating(true);
      showStatus('Generating speech with AI...');
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      const openaiService = new OpenAIService(settings.openaiApiKey);
      const audioUri = await openaiService.textToSpeech(
        inputText,
        settings.ttsModel,
        settings.ttsVoice
      );

      showStatus('Loading audio...');

      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      showStatus('Ready to play!');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      showStatus('Failed to generate speech');
      Alert.alert('Error', 'Failed to generate speech');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsGenerating(false);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPlaybackPosition(status.positionMillis || 0);
      setPlaybackDuration(status.durationMillis || 0);
      
      if (status.isPlaying) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
      
      if (status.didJustFinish) {
        setIsPlaying(false);
        setPlaybackPosition(0);
        showStatus('Playback completed');
      }
    }
  };

  const playPause = async () => {
    if (!sound) {
      Alert.alert('No Audio', 'Please generate speech first');
      return;
    }

    try {
      const status = await sound.getStatusAsync();
      
      if (status.isLoaded) {
        if (isPlaying) {
          await sound.pauseAsync();
          showStatus('Paused');
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } else {
          await sound.playAsync();
          showStatus('Playing...');
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
      }
    } catch (error) {
      showStatus('Playback error');
    }
  };

  const stopPlayback = async () => {
    if (sound) {
      try {
        await sound.stopAsync();
        setPlaybackPosition(0);
        showStatus('Stopped');
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch (error) {
        showStatus('Failed to stop playback');
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
    showStatus('All cleared');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <LinearGradient
      colors={isDark 
        ? ['#0F0F23', '#1A1A3E', '#0F0F23']
        : ['#F0F4FF', '#FFFFFF', '#F0F4FF']
      }
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
                  <Text style={[styles.statusText, { color: colors.text }]}>
                    {statusMessage}
                  </Text>
                </GlassCard>
              </Animated.View>
            )}

            {/* Text Input Area */}
            <GlassCard style={styles.textCard} gradient>
              <View style={styles.textHeader}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Text to Speech
                </Text>
                <AnimatedButton
                  title="Paste"
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
                placeholder="Enter or paste your text here to convert it into natural speech..."
                placeholderTextColor={colors.textMuted}
              />
              
              <View style={styles.characterCount}>
                <Text style={[styles.characterCountText, { color: colors.textSecondary }]}>
                  {inputText.length} characters
                </Text>
              </View>
            </GlassCard>

            {/* Audio Player */}
            {sound && (
              <GlassCard style={styles.playerCard}>
                <View style={styles.playerHeader}>
                  <Text style={[styles.playerTitle, { color: colors.text }]}>
                    Audio Player
                  </Text>
                  <Text style={[styles.voiceLabel, { color: colors.textSecondary }]}>
                    Voice: {settings?.ttsVoice}
                  </Text>
                </View>

                {/* Progress Bar */}
                <View style={styles.progressContainer}>
                  <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                    <Animated.View
                      style={[
                        styles.progressFill,
                        {
                          backgroundColor: colors.primary,
                          width: `${(playbackPosition / playbackDuration) * 100 || 0}%`,
                        },
                      ]}
                    />
                  </View>
                  <View style={styles.timeContainer}>
                    <Text style={[styles.timeText, { color: colors.textSecondary }]}>
                      {formatTime(playbackPosition)}
                    </Text>
                    <Text style={[styles.timeText, { color: colors.textSecondary }]}>
                      {formatTime(playbackDuration)}
                    </Text>
                  </View>
                </View>

                {/* Player Controls */}
                <View style={styles.playerControls}>
                  <AnimatedButton
                    title={isPlaying ? "Pause" : "Play"}
                    onPress={playPause}
                    variant={isPlaying ? "secondary" : "primary"}
                    size="medium"
                    style={styles.playButton}
                    icon={<Text>{isPlaying ? '⏸' : '▶️'}</Text>}
                  />
                  
                  <AnimatedButton
                    title="Stop"
                    onPress={stopPlayback}
                    variant="glass"
                    size="medium"
                    style={styles.stopButton}
                    icon={<Text>⏹</Text>}
                  />
                </View>
              </GlassCard>
            )}

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <AnimatedButton
                title={isGenerating ? "Generating..." : "Generate Speech"}
                onPress={generateSpeech}
                variant="primary"
                size="large"
                disabled={isGenerating}
                icon={<Text>🎙</Text>}
              />
              
              <AnimatedButton
                title="Clear All"
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statusContainer: {
    position: 'absolute',
    top: 10,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  statusCard: {
    padding: 12,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  textCard: {
    padding: 20,
    marginBottom: 20,
    minHeight: 250,
  },
  textHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
    minHeight: 150,
  },
  characterCount: {
    marginTop: 12,
    alignItems: 'flex-end',
  },
  characterCountText: {
    fontSize: 12,
    fontWeight: '600',
  },
  playerCard: {
    padding: 20,
    marginBottom: 20,
  },
  playerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  playerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  voiceLabel: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  playerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  playButton: {
    flex: 1,
    marginRight: 8,
  },
  stopButton: {
    flex: 1,
    marginLeft: 8,
  },
  buttonContainer: {
    marginTop: 20,
  },
  clearButton: {
    marginTop: 12,
  },
});