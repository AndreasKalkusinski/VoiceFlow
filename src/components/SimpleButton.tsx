import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface SimpleButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const SimpleButton: React.FC<SimpleButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const { colors, isDark } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      opacity: disabled || loading ? 0.5 : 1,
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: colors.primary,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        };
      case 'text':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {};

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          color: '#FFFFFF',
        };
      case 'secondary':
      case 'text':
        return {
          ...baseStyle,
          color: colors.text,
        };
      default:
        return baseStyle;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return {
          button: styles.smallButton,
          text: styles.smallText,
        };
      case 'large':
        return {
          button: styles.largeButton,
          text: styles.largeText,
        };
      default:
        return {
          button: styles.mediumButton,
          text: styles.mediumText,
        };
    }
  };

  const sizeStyles = getSizeStyle();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        sizeStyles.button,
        getButtonStyle(),
        fullWidth && styles.fullWidth,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : colors.text} />
      ) : (
        <Text style={[styles.text, sizeStyles.text, getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  smallButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    minHeight: 32,
  },
  mediumButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    minHeight: 44,
  },
  largeButton: {
    paddingHorizontal: 28,
    paddingVertical: 16,
    minHeight: 52,
  },
  text: {
    fontWeight: '600',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
});
