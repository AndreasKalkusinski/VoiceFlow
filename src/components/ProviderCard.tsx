import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard } from './GlassCard';
import { useTheme } from '../hooks/useTheme';
import * as Haptics from 'expo-haptics';
import { spacing, fontSizes } from '../utils/responsive';

interface ProviderCardProps {
  id: string;
  name: string;
  description: string;
  isSelected: boolean;
  requiresApiKey: boolean;
  hasApiKey: boolean;
  onPress: () => void;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  id,
  name,
  description,
  isSelected,
  requiresApiKey,
  hasApiKey,
  onPress,
}) => {
  const { colors } = useTheme();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const getProviderIcon = () => {
    switch (id) {
      case 'openai-stt':
      case 'openai-tts':
        return '🤖';
      case 'google-stt':
      case 'google-tts':
        return '🔍';
      case 'elevenlabs-tts':
        return '🎭';
      default:
        return '🎯';
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <GlassCard style={StyleSheet.flatten([styles.card, isSelected && styles.selectedCard])}>
        {isSelected && (
          <LinearGradient
            colors={['#6366F1', '#EC4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.selectedGradient}
          />
        )}

        <View style={styles.header}>
          <Text style={styles.icon}>{getProviderIcon()}</Text>
          <View style={styles.titleContainer}>
            <Text style={[styles.name, { color: colors.text }]}>{name}</Text>
            {isSelected && (
              <View style={styles.selectedBadge}>
                <Text style={styles.selectedText}>Active</Text>
              </View>
            )}
          </View>
        </View>

        <Text style={[styles.description, { color: colors.textSecondary }]}>{description}</Text>

        {requiresApiKey && (
          <View style={styles.footer}>
            <View
              style={[
                styles.apiKeyStatus,
                hasApiKey ? styles.apiKeyStatusValid : styles.apiKeyStatusMissing,
              ]}
            >
              <Text style={styles.apiKeyText}>{hasApiKey ? '✓ API Key' : '✗ No Key'}</Text>
            </View>
          </View>
        )}
      </GlassCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: '#6366F1',
  },
  selectedGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.05,
    borderRadius: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  icon: {
    fontSize: fontSizes.xxl,
    marginRight: spacing.sm,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: fontSizes.large,
    fontWeight: '600',
  },
  selectedBadge: {
    backgroundColor: '#6366F1',
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs / 2,
    borderRadius: 12,
  },
  selectedText: {
    color: '#FFFFFF',
    fontSize: fontSizes.tiny,
    fontWeight: '600',
  },
  description: {
    fontSize: fontSizes.small,
    lineHeight: fontSizes.small * 1.4,
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.xs,
  },
  apiKeyStatus: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: 12,
  },
  apiKeyText: {
    color: '#FFFFFF',
    fontSize: fontSizes.tiny,
    fontWeight: '600',
  },
  apiKeyStatusValid: {
    backgroundColor: '#10B981',
  },
  apiKeyStatusMissing: {
    backgroundColor: '#EF4444',
  },
});
