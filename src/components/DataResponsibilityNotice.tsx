import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { ModernCard } from './ModernCard';
import { designTokens } from '../utils/design-system';

interface DataResponsibilityNoticeProps {
  onDismiss?: () => void;
  compact?: boolean;
}

export const DataResponsibilityNotice: React.FC<DataResponsibilityNoticeProps> = ({
  onDismiss,
  compact = false,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const openPrivacyPolicy = () => {
    Linking.openURL('https://github.com/AndreasKalkusinski/VoiceFlow/blob/main/docs/PRIVACY.md');
  };

  if (compact) {
    return (
      <TouchableOpacity onPress={openPrivacyPolicy} style={styles.compactContainer}>
        <Ionicons name="shield-checkmark-outline" size={16} color={colors.primary} />
        <Text style={[styles.compactText, { color: colors.textSecondary }]}>
          {t('privacy.compact')}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <ModernCard variant="surface" style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="information-circle-outline" size={24} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>{t('privacy.title')}</Text>
        {onDismiss && (
          <TouchableOpacity onPress={onDismiss} style={styles.closeButton}>
            <Ionicons name="close" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.point}>
          <Ionicons name="lock-closed-outline" size={18} color={colors.success} />
          <Text style={[styles.pointText, { color: colors.text }]}>{t('privacy.localOnly')}</Text>
        </View>

        <View style={styles.point}>
          <Ionicons name="key-outline" size={18} color={colors.warning} />
          <Text style={[styles.pointText, { color: colors.text }]}>{t('privacy.yourKeys')}</Text>
        </View>

        <View style={styles.point}>
          <Ionicons name="alert-circle-outline" size={18} color={colors.info} />
          <Text style={[styles.pointText, { color: colors.text }]}>
            {t('privacy.yourResponsibility')}
          </Text>
        </View>

        <TouchableOpacity onPress={openPrivacyPolicy} style={styles.linkContainer}>
          <Text style={[styles.linkText, { color: colors.primary }]}>{t('privacy.readMore')}</Text>
          <Ionicons name="open-outline" size={14} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </ModernCard>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: designTokens.spacing.md,
    padding: designTokens.spacing.md,
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: designTokens.spacing.xs,
    paddingVertical: designTokens.spacing.xs,
  },
  compactText: {
    ...designTokens.typography.labelSmall,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: designTokens.spacing.sm,
    marginBottom: designTokens.spacing.md,
  },
  title: {
    ...designTokens.typography.titleMedium,
    flex: 1,
  },
  closeButton: {
    padding: designTokens.spacing.xs,
  },
  content: {
    gap: designTokens.spacing.sm,
  },
  point: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: designTokens.spacing.sm,
  },
  pointText: {
    ...designTokens.typography.bodySmall,
    flex: 1,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: designTokens.spacing.xs,
    marginTop: designTokens.spacing.sm,
    alignSelf: 'flex-start',
  },
  linkText: {
    ...designTokens.typography.bodySmall,
    fontWeight: '600',
  },
});
