import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { designTokens } from '../utils/design-system';
import * as Haptics from 'expo-haptics';
import * as Clipboard from 'expo-clipboard';
import Modal from 'react-native-modal';
import { Audio } from 'expo-av';
import { StorageService } from '../services/storage';
import { LLMProviderRegistry } from '../services/providers/LLMProviderRegistry';

interface AIAction {
  id: string;
  icon: string;
  title: string;
  gradient: [string, string];
  prompt?: string;
}

interface AIQuickActionsProps {
  text: string;
  onResult?: (result: string) => void;
}

export const AIQuickActions: React.FC<AIQuickActionsProps> = ({ text, onResult }) => {
  const { colors, isDark } = useTheme();
  const { t } = useTranslation();
  const [processingAction, setProcessingAction] = useState<string | null>(null);
  const [processedResult, setProcessedResult] = useState<string>('');
  const [showMagicQuill, setShowMagicQuill] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [settings, setSettings] = useState<any>(null);
  const [isRecordingPrompt, setIsRecordingPrompt] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  React.useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const loadedSettings = await StorageService.getSettings();
    setSettings(loadedSettings);
  };

  const quickActions: AIAction[] = [
    {
      id: 'summarize',
      icon: 'document-text-outline',
      title: t('ai.actions.summarize.title'),
      gradient: ['#667eea', '#764ba2'],
      prompt: 'Summarize this text concisely, keeping the most important points:',
    },
    {
      id: 'todos',
      icon: 'checkbox-outline',
      title: t('ai.actions.todos.title'),
      gradient: ['#f093fb', '#f5576c'],
      prompt: 'Extract all action items and to-dos from this text as a numbered list:',
    },
    {
      id: 'rewrite',
      icon: 'create-outline',
      title: t('ai.actions.rewrite.title'),
      gradient: ['#4facfe', '#00f2fe'],
      prompt: 'Rewrite this text to be clearer and better structured:',
    },
    {
      id: 'friendly',
      icon: 'happy-outline',
      title: t('ai.actions.friendly.title'),
      gradient: ['#43e97b', '#38f9d7'],
      prompt: 'Rewrite this text in a more friendly and warm tone:',
    },
    {
      id: 'keypoints',
      icon: 'key-outline',
      title: t('ai.actions.keypoints.title'),
      gradient: ['#fa709a', '#fee140'],
      prompt: 'Extract the key points from this text as bullet points:',
    },
    {
      id: 'translate',
      icon: 'language-outline',
      title: t('ai.actions.translate.title'),
      gradient: ['#30cfd0', '#330867'],
      prompt: 'Translate this text to English (if not in English) or to German (if in English):',
    },
    {
      id: 'formal',
      icon: 'business-outline',
      title: t('ai.actions.formal.title'),
      gradient: ['#a8edea', '#fed6e3'],
      prompt: 'Rewrite this text in a more formal and professional tone:',
    },
    {
      id: 'simplify',
      icon: 'bulb-outline',
      title: t('ai.actions.simplify.title'),
      gradient: ['#ffecd2', '#fcb69f'],
      prompt: 'Simplify this text to make it easier to understand:',
    },
  ];

  const processWithAI = async (prompt: string, actionId: string = 'custom') => {
    if (!settings?.llmProvider) {
      Alert.alert(t('alerts.configRequired'), t('errors.noLLMProvider'));
      return;
    }

    setProcessingAction(actionId);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    try {
      const provider = LLMProviderRegistry.getProvider(settings.llmProvider);
      if (!provider) {
        throw new Error('Provider not found');
      }

      const apiKey = settings.llmProvider.includes('openai')
        ? settings.apiKeys?.openai || settings.openaiApiKey
        : settings.llmProvider.includes('anthropic')
          ? settings.apiKeys?.anthropic
          : settings.llmProvider.includes('google')
            ? settings.apiKeys?.google
            : null;

      if (!apiKey) {
        Alert.alert(t('alerts.configRequired'), t('errors.noApiKey'));
        setProcessingAction(null);
        return;
      }

      await provider.initialize({
        apiKey,
        model: settings.providerSettings?.[settings.llmProvider]?.model,
      });

      const result = await provider.complete({
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant that processes text according to specific instructions. Be concise and clear.',
          },
          {
            role: 'user',
            content: `${prompt}\n\n${text}`,
          },
        ],
      });

      setProcessedResult(result);
      onResult?.(result);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.error('AI processing error:', error);
      Alert.alert(t('alerts.error'), t('ai.processingError'));
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setProcessingAction(null);
    }
  };

  const handleQuickAction = (action: AIAction) => {
    if (action.prompt) {
      processWithAI(action.prompt, action.id);
    }
  };

  const handleMagicQuill = () => {
    if (customPrompt.trim()) {
      processWithAI(customPrompt, 'magic');
      setShowMagicQuill(false);
      setCustomPrompt('');
    }
  };

  const copyResult = async () => {
    await Clipboard.setStringAsync(processedResult);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const clearResult = () => {
    setProcessedResult('');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const startRecordingPrompt = async () => {
    try {
      // Request permissions
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(t('alerts.error'), t('errors.microphoneRequired'));
        return;
      }

      // Configure audio
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // Start recording
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );

      setRecording(recording);
      setIsRecordingPrompt(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.error('Failed to start recording:', error);
      Alert.alert(t('alerts.error'), t('speechToText.status.failed'));
    }
  };

  const stopRecordingPrompt = async () => {
    if (!recording) return;

    try {
      setIsRecordingPrompt(false);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      if (uri && settings) {
        // Transcribe the audio
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        // Use OpenAI directly for transcription
        const { OpenAIService } = await import('../services/openai');
        const apiKey = settings.apiKeys?.openai || settings.openaiApiKey;

        if (apiKey) {
          try {
            const transcription = await OpenAIService.transcribe(uri, apiKey, 'whisper-1');
            setCustomPrompt(transcription);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          } catch (transcribeError) {
            console.error('Transcription error:', transcribeError);
            Alert.alert(t('alerts.error'), t('speechToText.status.failed'));
          }
        } else {
          Alert.alert(t('alerts.configRequired'), t('errors.noApiKey'));
        }
      }

      setRecording(null);
    } catch (error) {
      console.error('Failed to stop recording:', error);
      Alert.alert(t('alerts.error'), t('speechToText.status.failed'));
    }
  };

  return (
    <View style={styles.container}>
      {/* Compact Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.headerIcon}
          >
            <Ionicons name="sparkles" size={16} color="white" />
          </LinearGradient>
          <Text style={[styles.headerTitle, { color: colors.text }]}>{t('ai.quickActions')}</Text>
        </View>
      </View>

      {/* Subtitle on separate line */}
      <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
        {t('ai.quickActionsSubtitle')}
      </Text>

      {/* Magic Quill Button at top */}
      <TouchableOpacity
        style={[
          styles.magicQuillCard,
          {
            backgroundColor: colors.primary + '10',
            borderColor: colors.primary,
          },
        ]}
        onPress={() => setShowMagicQuill(true)}
        disabled={!!processingAction}
      >
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.magicQuillCardIcon}>
          <Ionicons name="color-wand" size={18} color="white" />
        </LinearGradient>
        <View style={styles.magicQuillContent}>
          <Text style={[styles.magicQuillTitle, { color: colors.primary }]}>
            {t('ai.magicQuill')}
          </Text>
          <Text style={[styles.magicQuillHint, { color: colors.textSecondary }]}>
            {t('ai.customPromptHint')}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.primary} />
      </TouchableOpacity>

      {/* Quick Action Badges in Wrap Layout */}
      <View style={styles.actionsGrid}>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={[
              styles.actionBadge,
              {
                backgroundColor: isDark ? colors.surface : 'white',
                borderColor: colors.border,
                opacity: processingAction && processingAction !== action.id ? 0.5 : 1,
              },
            ]}
            onPress={() => handleQuickAction(action)}
            disabled={!!processingAction}
          >
            <LinearGradient colors={action.gradient} style={styles.badgeIcon}>
              {processingAction === action.id ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Ionicons
                  name={action.icon as keyof typeof Ionicons.glyphMap}
                  size={14}
                  color="white"
                />
              )}
            </LinearGradient>
            <Text style={[styles.badgeText, { color: colors.text }]}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Result Display */}
      {processedResult && (
        <View style={[styles.resultContainer, { backgroundColor: colors.surface }]}>
          <View style={styles.resultHeader}>
            <Text style={[styles.resultTitle, { color: colors.text }]}>{t('ai.result')}</Text>
            <View style={styles.resultActions}>
              <TouchableOpacity
                style={[styles.resultButton, { backgroundColor: colors.primary + '20' }]}
                onPress={copyResult}
              >
                <Ionicons name="copy-outline" size={16} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.resultButton, { backgroundColor: colors.error + '20' }]}
                onPress={clearResult}
              >
                <Ionicons name="close-outline" size={16} color={colors.error} />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={styles.resultScroll} showsVerticalScrollIndicator={false}>
            <Text style={[styles.resultText, { color: colors.text }]}>{processedResult}</Text>
          </ScrollView>
        </View>
      )}

      {/* Magic Quill Modal */}
      <Modal
        isVisible={showMagicQuill}
        onBackdropPress={() => setShowMagicQuill(false)}
        style={styles.modal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        avoidKeyboard
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[styles.modalContent, { backgroundColor: colors.background }]}
        >
          <View style={styles.modalHeader}>
            <LinearGradient colors={['#667eea', '#764ba2']} style={styles.modalIcon}>
              <Ionicons name="color-wand" size={24} color="white" />
            </LinearGradient>
            <Text style={[styles.modalTitle, { color: colors.text }]}>{t('ai.magicQuill')}</Text>
            <TouchableOpacity onPress={() => setShowMagicQuill(false)}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <Text style={[styles.modalSubtitle, { color: colors.textSecondary }]}>
            {t('ai.magicQuillDescription')}
          </Text>

          <View style={styles.promptInputContainer}>
            <TextInput
              style={[
                styles.promptInput,
                {
                  color: colors.text,
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
              placeholder={t('ai.magicQuillPlaceholder')}
              placeholderTextColor={colors.textMuted}
              value={customPrompt}
              onChangeText={setCustomPrompt}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              autoFocus
            />
            <TouchableOpacity
              style={[
                styles.micButton,
                {
                  backgroundColor: isRecordingPrompt ? colors.error : colors.primary,
                },
              ]}
              onPress={isRecordingPrompt ? stopRecordingPrompt : startRecordingPrompt}
            >
              <Ionicons name={isRecordingPrompt ? 'stop' : 'mic'} size={20} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: colors.surface }]}
              onPress={() => setShowMagicQuill(false)}
            >
              <Text style={[styles.modalButtonText, { color: colors.text }]}>
                {t('common.cancel')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: colors.primary }]}
              onPress={handleMagicQuill}
              disabled={!customPrompt.trim() || !!processingAction}
            >
              {processingAction === 'magic' ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={[styles.modalButtonText, { color: 'white' }]}>{t('ai.process')}</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: designTokens.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: designTokens.spacing.xs,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: designTokens.spacing.xs,
  },
  headerIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...designTokens.typography.titleSmall,
    fontWeight: '600',
  },
  headerSubtitle: {
    ...designTokens.typography.bodySmall,
    marginBottom: designTokens.spacing.md,
    lineHeight: 18,
  },
  magicQuillCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: designTokens.spacing.md,
    borderRadius: designTokens.radius.lg,
    borderWidth: 1,
    borderStyle: 'dashed',
    marginBottom: designTokens.spacing.md,
    ...designTokens.elevation.sm,
  },
  magicQuillCardIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: designTokens.spacing.md,
  },
  magicQuillContent: {
    flex: 1,
  },
  magicQuillTitle: {
    ...designTokens.typography.titleSmall,
    fontWeight: '600',
    marginBottom: 2,
  },
  magicQuillHint: {
    ...designTokens.typography.bodySmall,
    fontSize: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: designTokens.spacing.sm,
  },
  actionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: designTokens.spacing.sm,
    paddingVertical: designTokens.spacing.xs,
    borderRadius: designTokens.radius.full,
    borderWidth: 1,
    gap: designTokens.spacing.xs,
    ...designTokens.elevation.sm,
    minWidth: '30%',
    maxWidth: '48%',
  },
  badgeIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    ...designTokens.typography.labelSmall,
    fontWeight: '500',
    flexShrink: 1,
  },
  resultContainer: {
    marginTop: designTokens.spacing.md,
    padding: designTokens.spacing.md,
    borderRadius: designTokens.radius.lg,
    maxHeight: 200,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: designTokens.spacing.sm,
  },
  resultTitle: {
    ...designTokens.typography.titleSmall,
    fontWeight: '600',
  },
  resultActions: {
    flexDirection: 'row',
    gap: designTokens.spacing.xs,
  },
  resultButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultScroll: {
    maxHeight: 150,
  },
  resultText: {
    ...designTokens.typography.bodyMedium,
    lineHeight: 22,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    borderTopLeftRadius: designTokens.radius.xl,
    borderTopRightRadius: designTokens.radius.xl,
    padding: designTokens.spacing.lg,
    paddingBottom: designTokens.spacing.xl * 2, // Extra padding for home indicator
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: designTokens.spacing.md,
  },
  modalIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    ...designTokens.typography.headlineSmall,
    fontWeight: '600',
    flex: 1,
    marginLeft: designTokens.spacing.md,
  },
  modalSubtitle: {
    ...designTokens.typography.bodyMedium,
    marginBottom: designTokens.spacing.lg,
  },
  promptInputContainer: {
    position: 'relative',
    marginBottom: designTokens.spacing.lg,
  },
  promptInput: {
    borderWidth: 1,
    borderRadius: designTokens.radius.md,
    padding: designTokens.spacing.md,
    paddingRight: designTokens.spacing.xl * 2.5,
    ...designTokens.typography.bodyMedium,
    minHeight: 100,
  },
  micButton: {
    position: 'absolute',
    right: designTokens.spacing.sm,
    bottom: designTokens.spacing.sm,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...designTokens.elevation.sm,
  },
  modalActions: {
    flexDirection: 'row',
    gap: designTokens.spacing.md,
    marginBottom: designTokens.spacing.lg, // Extra space above buttons
  },
  modalButton: {
    flex: 1,
    padding: designTokens.spacing.md,
    borderRadius: designTokens.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    ...designTokens.typography.bodyMedium,
    fontWeight: '600',
  },
});
