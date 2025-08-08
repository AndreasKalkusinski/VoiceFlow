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
import { BlurView } from 'expo-blur';
import { GlassCard } from '../components/GlassCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { StorageService } from '../services/storage';
import { OpenAIService } from '../services/openai';
import { Settings } from '../types';
import { useTheme } from '../hooks/useTheme';

const { width, height } = Dimensions.get('window');

export const ModernSpeechToTextScreen: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [transcribedText, setTranscribedText] = useState('');
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  
  const { colors, theme, isDark } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const waveAnims = useRef(
    Array(5).fill(0).map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    loadSettings();
    setupAudio();
    animateEntry();
  }, []);

  useEffect(() => {
    if (isRecording) {
      animateWaves();
    } else {
      stopWaveAnimation();
    }
  }, [isRecording]);

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
        ])
      ).start();
    });
  };

  const stopWaveAnimation = () => {
    waveAnims.forEach(anim => {
      anim.stopAnimation();
      Animated.timing(anim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const loadSettings = async () => {
    const loadedSettings = await StorageService.getSettings();
    setSettings(loadedSettings);
  };

  const setupAudio = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
    } catch (error) {
      console.error('Failed to setup audio:', error);
    }
  };

  const showStatus = (message: string, duration: number = 3000) => {
    setStatusMessage(message);
    setTimeout(() => setStatusMessage(''), duration);
  };

  const startRecording = async () => {
    if (!settings?.openaiApiKey) {
      Alert.alert('Configuration Required', 'Please configure your OpenAI API key in Settings');
      return;
    }

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      showStatus('Starting recording...');
      
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        showStatus('Microphone permission denied');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      setRecording(recording);
      setIsRecording(true);
      showStatus('Recording... Speak now');
    } catch (error) {
      showStatus('Failed to start recording');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setIsRecording(false);
      setIsProcessing(true);
      showStatus('Processing your speech...');
      
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      
      if (uri && settings) {
        showStatus('Transcribing with AI...');
        const openaiService = new OpenAIService(settings.openaiApiKey);
        const text = await openaiService.transcribeAudio(uri, settings.sttModel);
        
        if (transcribedText) {
          setTranscribedText(transcribedText + ' ' + text);
        } else {
          setTranscribedText(text);
        }
        
        showStatus('Transcription complete!');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      
      setRecording(null);
    } catch (error) {
      showStatus('Failed to transcribe audio');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = async () => {
    if (!transcribedText) {
      Alert.alert('No Text', 'There is no text to copy');
      return;
    }
    
    await Clipboard.setStringAsync(transcribedText);
    showStatus('Copied to clipboard!');
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const clearText = () => {
    setTranscribedText('');
    showStatus('Text cleared');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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

            {/* Main Text Area */}
            <GlassCard style={styles.textCard} gradient>
              <View style={styles.textHeader}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Your Transcription
                </Text>
                <View style={styles.wordCount}>
                  <Text style={[styles.wordCountText, { color: colors.textSecondary }]}>
                    {transcribedText.split(' ').filter(w => w).length} words
                  </Text>
                </View>
              </View>
              
              <TextInput
                style={[styles.textInput, { color: colors.text }]}
                multiline
                value={transcribedText}
                onChangeText={setTranscribedText}
                placeholder="Your voice will be transformed into text here..."
                placeholderTextColor={colors.textMuted}
              />
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
                          backgroundColor: isRecording 
                            ? colors.primary 
                            : colors.secondary,
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
                  title="Copy"
                  onPress={copyToClipboard}
                  variant="glass"
                  size="medium"
                  style={styles.actionButton}
                  icon={<Text>📋</Text>}
                />
                
                <AnimatedButton
                  title="Clear"
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
    flex: 1,
    padding: 20,
    marginBottom: 20,
    minHeight: 300,
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
  wordCount: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  wordCountText: {
    fontSize: 12,
    fontWeight: '600',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
  },
  visualizationContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
  },
  wave: {
    width: 6,
    height: 50,
    borderRadius: 3,
    marginHorizontal: 4,
  },
  buttonContainer: {
    marginTop: 20,
  },
  mainButtonWrapper: {
    alignItems: 'center',
    marginBottom: 30,
  },
  micIcon: {
    fontSize: 32,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});