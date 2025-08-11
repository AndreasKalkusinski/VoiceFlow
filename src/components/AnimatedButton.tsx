import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  View,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../hooks/useTheme';

interface AnimatedButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'glass';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  icon?: React.ReactNode;
  haptic?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  disabled = false,
  icon,
  haptic = true,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const { colors, theme, isDark } = useTheme();

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  const handlePress = (e: GestureResponderEvent) => {
    if (haptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  const getGradientColors = (): [string, string] => {
    switch (variant) {
      case 'primary':
        return colors.primaryGradient as [string, string];
      case 'secondary':
        return colors.secondaryGradient as [string, string];
      case 'success':
        return [colors.success, colors.success];
      case 'danger':
        return [colors.error, colors.error];
      case 'glass':
        return isDark 
          ? ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']
          : ['rgba(0, 0, 0, 0.05)', 'rgba(0, 0, 0, 0.02)'];
      default:
        return colors.primaryGradient as [string, string];
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
          minHeight: 40,
        };
      case 'large':
        return {
          paddingVertical: theme.spacing.lg,
          paddingHorizontal: theme.spacing.xl,
          minHeight: 64,
        };
      default:
        return {
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
          minHeight: 52,
        };
    }
  };

  const getTextColor = () => {
    if (variant === 'glass') {
      return colors.text;
    }
    return '#FFFFFF';
  };

  return (
    <Animated.View
      style={[
        { transform: [{ scale: scaleAnim }] },
        styles.container,
        disabled && styles.disabled,
        style,
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={0.9}
        style={styles.touchable}
      >
        <LinearGradient
          colors={getGradientColors()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.gradient,
            getSizeStyles(),
            {
              borderRadius: theme.borderRadius.lg,
              ...(variant === 'glass' && {
                borderWidth: 1,
                borderColor: colors.border,
              }),
            },
          ]}
        >
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text
            style={[
              styles.text,
              {
                color: getTextColor(),
                fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  touchable: {
    width: '100%',
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  icon: {
    marginRight: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});