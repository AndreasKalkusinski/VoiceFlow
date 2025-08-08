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
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard } from '../components/GlassCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { StorageService } from '../services/storage';
import { OpenAIService } from '../services/openai';
import { Settings } from '../types';
import { useTheme, ThemeMode } from '../hooks/useTheme';

const { width } = Dimensions.get('window');

export const ModernSettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    openaiApiKey: '',
    sttModel: 'whisper-1',
    ttsModel: 'tts-1',
    ttsVoice: 'alloy',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  
  const { colors, theme, isDark, themeMode, setTheme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    loadSettings();
    animateEntry();
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
    setIsLoading(true);
    showStatus('Loading settings...');
    try {
      const loadedSettings = await StorageService.getSettings();
      setSettings(loadedSettings);
      showStatus('Settings loaded');
    } catch (error) {
      showStatus('Failed to load settings');
    } finally {
      setIsLoading(false);
    }
  };

  const showStatus = (message: string, duration: number = 3000) => {
    setStatusMessage(message);
    setTimeout(() => setStatusMessage(''), duration);
  };

  const validateApiKey = async () => {
    if (!settings.openaiApiKey) {
      Alert.alert('Error', 'Please enter an API key');
      return;
    }

    setIsValidating(true);
    showStatus('Validating API key...');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    try {
      const openaiService = new OpenAIService(settings.openaiApiKey);
      const isValid = await openaiService.validateApiKey();
      
      if (isValid) {
        showStatus('API key is valid ✅');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert('Success', 'API key is valid!');
      } else {
        showStatus('API key is invalid ❌');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert('Error', 'API key is invalid');
      }
    } catch (error) {
      showStatus('Failed to validate API key');
      Alert.alert('Error', 'Failed to validate API key');
    } finally {
      setIsValidating(false);
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    showStatus('Saving settings...');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    try {
      await StorageService.saveSettings(settings);
      showStatus('Settings saved successfully ✅');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert('Success', 'Settings saved successfully');
    } catch (error) {
      showStatus('Failed to save settings');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Error', 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const voices = [
    { id: 'alloy', name: 'Alloy', description: 'Neutral and balanced' },
    { id: 'echo', name: 'Echo', description: 'British accent' },
    { id: 'fable', name: 'Fable', description: 'Expressive and dynamic' },
    { id: 'onyx', name: 'Onyx', description: 'Deep and authoritative' },
    { id: 'nova', name: 'Nova', description: 'Warm and friendly' },
    { id: 'shimmer', name: 'Shimmer', description: 'Soft and gentle' },
  ];

  const themeOptions = [
    { id: 'auto', name: 'Auto', icon: '🌓' },
    { id: 'light', name: 'Light', icon: '☀️' },
    { id: 'dark', name: 'Dark', icon: '🌙' },
  ];

  return (
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

          {/* Theme Settings */}
          <GlassCard style={styles.section} gradient>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Appearance
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
          </GlassCard>

          {/* API Configuration */}
          <GlassCard style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              OpenAI Configuration
            </Text>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                API Key
              </Text>
              <View style={styles.apiKeyContainer}>
                <TextInput
                  style={[styles.input, { color: colors.text, flex: 1 }]}
                  value={settings.openaiApiKey}
                  onChangeText={(text) => setSettings({ ...settings, openaiApiKey: text })}
                  placeholder="sk-..."
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry={!apiKeyVisible}
                  autoCapitalize="none"
                />
                <AnimatedButton
                  title={apiKeyVisible ? '👁' : '👁‍🗨'}
                  onPress={() => setApiKeyVisible(!apiKeyVisible)}
                  variant="glass"
                  size="small"
                  style={styles.eyeButton}
                />
              </View>
              <AnimatedButton
                title="Validate API Key"
                onPress={validateApiKey}
                variant="success"
                size="medium"
                disabled={isValidating}
                style={styles.validateButton}
                icon={<Text>✓</Text>}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Speech-to-Text Model
              </Text>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                value={settings.sttModel}
                onChangeText={(text) => setSettings({ ...settings, sttModel: text })}
                placeholder="whisper-1"
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Text-to-Speech Model
              </Text>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                value={settings.ttsModel}
                onChangeText={(text) => setSettings({ ...settings, ttsModel: text })}
                placeholder="tts-1"
                placeholderTextColor={colors.textMuted}
              />
            </View>
          </GlassCard>

          {/* Voice Selection */}
          <GlassCard style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Voice Selection
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.voiceGrid}>
                {voices.map((voice) => (
                  <AnimatedButton
                    key={voice.id}
                    title={voice.name}
                    onPress={() => {
                      setSettings({ ...settings, ttsVoice: voice.id });
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }}
                    variant={settings.ttsVoice === voice.id ? 'primary' : 'glass'}
                    size="small"
                    style={styles.voiceCard}
                  />
                ))}
              </View>
            </ScrollView>
          </GlassCard>

          {/* Save Button */}
          <AnimatedButton
            title="Save Settings"
            onPress={saveSettings}
            variant="primary"
            size="large"
            disabled={isSaving}
            icon={<Text>💾</Text>}
          />
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
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
  section: {
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  themeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  themeButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  apiKeyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeButton: {
    marginLeft: 8,
    width: 50,
  },
  validateButton: {
    marginTop: 12,
  },
  voiceGrid: {
    flexDirection: 'row',
  },
  voiceCard: {
    width: 120,
    marginRight: 12,
    padding: 0,
  },
  voiceContent: {
    padding: 12,
    alignItems: 'center',
  },
  voiceName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  voiceDescription: {
    fontSize: 11,
    textAlign: 'center',
  },
});