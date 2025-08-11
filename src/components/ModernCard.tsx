import React from 'react';
import { View, StyleSheet, ViewStyle, Animated, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../hooks/useTheme';
import { designTokens } from '../utils/design-system';
import { vw, responsiveDimensions } from '../utils/responsive-dimensions';
import * as Haptics from 'expo-haptics';

interface ModernCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'surface' | 'elevated' | 'glass' | 'gradient';
  onPress?: () => void;
  haptic?: boolean;
  animated?: boolean;
}

export const ModernCard: React.FC<ModernCardProps> = ({
  children,
  style,
  variant = 'surface',
  onPress,
  haptic = true,
  animated = false, // Disable animation by default to avoid freezing issues
}) => {
  const { isDark } = useTheme();
  const colors = isDark ? designTokens.colors.dark : designTokens.colors.light;
  
  // Create animation value for scale only
  const [scaleAnim] = React.useState(() => new Animated.Value(1));

  const handlePressIn = () => {
    if (onPress && animated) {
      Animated.spring(scaleAnim, {
        toValue: 0.98,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (onPress && animated) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 100,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePress = () => {
    if (haptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress?.();
  };

  const getCardStyle = () => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: colors.surfaceElevated,
          ...designTokens.elevation.md,
        };
      case 'glass':
        return {
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.4)',
          borderWidth: 1,
          borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden' as const,
        };
      case 'gradient':
        return {
          overflow: 'hidden' as const,
        };
      default:
        return {
          backgroundColor: colors.surface,
          ...designTokens.elevation.sm,
        };
    }
  };

  const content = (
    <>
      {variant === 'glass' && (
        <>
          <BlurView
            intensity={isDark ? 75 : 70}
            tint={isDark ? 'dark' : 'light'}
            style={StyleSheet.absoluteFillObject}
          />
          <LinearGradient
            colors={
              isDark 
                ? ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']
                : ['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.3)']
            }
            style={StyleSheet.absoluteFillObject}
          />
        </>
      )}
      {variant === 'gradient' && (
        <LinearGradient
          colors={isDark 
            ? ['rgba(124, 124, 255, 0.1)', 'rgba(124, 124, 255, 0.05)']
            : ['rgba(94, 92, 230, 0.05)', 'rgba(94, 92, 230, 0.02)']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      <View style={styles.content}>
        {children}
      </View>
    </>
  );

  if (onPress) {
    return (
      <Animated.View
        style={[
          { 
            transform: [{ scale: animated ? scaleAnim : 1 }],
          },
        ]}
      >
        <Pressable
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[
            styles.card,
            getCardStyle(),
            style,
          ]}
        >
          {content}
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <View
      style={[
        styles.card,
        getCardStyle(),
        style,
      ]}
    >
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: vw(4),
    padding: responsiveDimensions.padding.card,
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});