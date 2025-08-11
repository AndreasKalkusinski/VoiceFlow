import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  Animated,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../hooks/useTheme';
import { designTokens } from '../utils/design-system';
import { buttonA11y } from '../utils/accessibility';

interface ModernButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient' | 'glass';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
  haptic?: boolean;
  accessibilityHint?: string;
  testID?: string;
}

export const ModernButton: React.FC<ModernButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
  fullWidth = false,
  haptic = true,
  accessibilityHint,
  testID,
}) => {
  const { isDark } = useTheme();
  const colors = isDark ? designTokens.colors.dark : designTokens.colors.light;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (haptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      opacity: disabled || loading ? 0.5 : 1,
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: colors.primary,
          ...designTokens.elevation.sm,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.7)',
          borderWidth: 1,
          borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.5)',
          // backdropFilter: 'blur(10px)', // Not supported in React Native
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      case 'gradient':
        return {
          ...baseStyle,
          overflow: 'hidden',
        };
      case 'glass':
        return {
          ...baseStyle,
          backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.3)',
          borderWidth: 1,
          borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.4)',
          // backdropFilter: 'blur(20px)', // Not supported in React Native
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    let textColor: string;

    switch (variant) {
      case 'primary':
      case 'gradient':
        textColor = colors.textOnPrimary;
        break;
      case 'secondary':
      case 'ghost':
      case 'glass':
        textColor = colors.text;
        break;
      default:
        textColor = colors.text;
    }

    let typography;
    switch (size) {
      case 'small':
        typography = designTokens.typography.labelMedium;
        break;
      case 'large':
        typography = designTokens.typography.titleMedium;
        break;
      default:
        typography = designTokens.typography.labelLarge;
    }

    return {
      ...typography,
      color: textColor,
      fontWeight: '600',
    };
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return {
          button: styles.smallButton,
          spacing: designTokens.spacing.xs,
        };
      case 'large':
        return {
          button: styles.largeButton,
          spacing: designTokens.spacing.sm,
        };
      default:
        return {
          button: styles.mediumButton,
          spacing: designTokens.spacing.sm,
        };
    }
  };

  const sizeStyles = getSizeStyle();

  const buttonContent = (
    <>
      {variant === 'gradient' && (
        <LinearGradient
          colors={colors.accentGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {(variant === 'secondary' || variant === 'glass') && (
        <>
          <BlurView
            intensity={variant === 'glass' ? 70 : 50}
            tint={isDark ? 'dark' : 'light'}
            style={StyleSheet.absoluteFillObject}
          />
          {variant === 'glass' && (
            <LinearGradient
              colors={
                isDark
                  ? ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.02)']
                  : ['rgba(255,255,255,0.5)', 'rgba(255,255,255,0.2)']
              }
              style={StyleSheet.absoluteFillObject}
            />
          )}
        </>
      )}
      <View style={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator
            color={
              variant === 'primary' || variant === 'gradient' ? colors.textOnPrimary : colors.text
            }
          />
        ) : (
          <>
            {icon && <View style={{ marginRight: sizeStyles.spacing }}>{icon}</View>}
            <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
          </>
        )}
      </View>
    </>
  );

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, fullWidth && styles.fullWidth]}>
      <TouchableOpacity
        style={[
          styles.button,
          sizeStyles.button,
          getButtonStyle(),
          fullWidth && styles.fullWidth,
          style,
        ]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.8}
        testID={testID}
        {...buttonA11y(title, accessibilityHint, disabled, loading)}
      >
        {buttonContent}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: designTokens.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  smallButton: {
    paddingHorizontal: designTokens.spacing.md,
    paddingVertical: designTokens.spacing.sm,
    minHeight: 36,
  },
  mediumButton: {
    paddingHorizontal: designTokens.spacing.lg,
    paddingVertical: designTokens.spacing.md,
    minHeight: 48,
  },
  largeButton: {
    paddingHorizontal: designTokens.spacing.xl,
    paddingVertical: designTokens.spacing.lg,
    minHeight: 56,
  },
  text: {
    textAlign: 'center',
  },
});
