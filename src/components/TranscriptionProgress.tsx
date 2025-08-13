import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { designTokens } from '../utils/design-system';

const { width } = Dimensions.get('window');

interface TranscriptionProgressProps {
  isVisible: boolean;
  duration?: number; // Recording duration in seconds
}

export const TranscriptionProgress: React.FC<TranscriptionProgressProps> = ({
  isVisible,
  duration = 0,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const dotAnim1 = useRef(new Animated.Value(0)).current;
  const dotAnim2 = useRef(new Animated.Value(0)).current;
  const dotAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Start progress animation
      Animated.loop(
        Animated.timing(progressAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ).start();

      // Start pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
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

      // Animate dots
      const animateDot = (anim: Animated.Value, delay: number) => {
        setTimeout(() => {
          Animated.loop(
            Animated.sequence([
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
        }, delay);
      };

      animateDot(dotAnim1, 0);
      animateDot(dotAnim2, 200);
      animateDot(dotAnim3, 400);
    } else {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const progressTranslate = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  const getEstimatedTime = () => {
    // Rough estimate: 1 second of audio = ~2 seconds processing
    const estimated = Math.max(5, duration * 2);
    return `~${estimated}s`;
  };

  const getProcessingMessage = () => {
    if (duration > 30) {
      return t('speechToText.status.processingLong');
    } else if (duration > 10) {
      return t('speechToText.status.processingMedium');
    }
    return t('speechToText.status.processing');
  };

  if (!isVisible) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <BlurView intensity={80} style={styles.blurContainer}>
        <View style={[styles.content, { backgroundColor: colors.background + 'F0' }]}>
          {/* Animated Icon */}
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <LinearGradient colors={[colors.primary, colors.accent]} style={styles.iconContainer}>
              <Ionicons name="mic-outline" size={32} color="white" />
            </LinearGradient>
          </Animated.View>

          {/* Processing Text */}
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: colors.text }]}>
              {t('speechToText.status.transcribing')}
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {getProcessingMessage()}
            </Text>
          </View>

          {/* Animated Dots */}
          <View style={styles.dotsContainer}>
            <Animated.View
              style={[
                styles.dot,
                {
                  backgroundColor: colors.primary,
                  opacity: dotAnim1,
                  transform: [
                    {
                      translateY: dotAnim1.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -8],
                      }),
                    },
                  ],
                },
              ]}
            />
            <Animated.View
              style={[
                styles.dot,
                {
                  backgroundColor: colors.primary,
                  opacity: dotAnim2,
                  transform: [
                    {
                      translateY: dotAnim2.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -8],
                      }),
                    },
                  ],
                },
              ]}
            />
            <Animated.View
              style={[
                styles.dot,
                {
                  backgroundColor: colors.primary,
                  opacity: dotAnim3,
                  transform: [
                    {
                      translateY: dotAnim3.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -8],
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>

          {/* Progress Bar */}
          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  transform: [{ translateX: progressTranslate }],
                },
              ]}
            >
              <LinearGradient
                colors={[colors.primary + '00', colors.primary, colors.primary + '00']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.progressGradient}
              />
            </Animated.View>
          </View>

          {/* Estimated Time */}
          {duration > 0 && (
            <Text style={[styles.estimatedTime, { color: colors.textMuted }]}>
              {t('speechToText.estimatedTime')}: {getEstimatedTime()}
            </Text>
          )}
        </View>
      </BlurView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  blurContainer: {
    borderRadius: designTokens.radius.xl,
    overflow: 'hidden',
  },
  content: {
    padding: designTokens.spacing.xl,
    borderRadius: designTokens.radius.xl,
    alignItems: 'center',
    minWidth: 280,
    ...designTokens.elevation.lg,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: designTokens.spacing.lg,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: designTokens.spacing.lg,
  },
  title: {
    ...designTokens.typography.titleMedium,
    fontWeight: '600',
    marginBottom: designTokens.spacing.xs,
  },
  subtitle: {
    ...designTokens.typography.bodyMedium,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: designTokens.spacing.sm,
    height: 24,
    alignItems: 'center',
    marginBottom: designTokens.spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  progressBar: {
    width: 200,
    height: 3,
    borderRadius: 1.5,
    overflow: 'hidden',
    marginBottom: designTokens.spacing.sm,
  },
  progressFill: {
    width: 100,
    height: '100%',
  },
  progressGradient: {
    flex: 1,
  },
  estimatedTime: {
    ...designTokens.typography.labelSmall,
    marginTop: designTokens.spacing.xs,
  },
});
