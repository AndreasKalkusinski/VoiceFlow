import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../hooks/useTheme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  gradient?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  intensity = 30,
  gradient = false,
}) => {
  const { colors, theme, isDark } = useTheme();

  if (gradient) {
    return (
      <LinearGradient
        colors={
          isDark
            ? ['rgba(99, 102, 241, 0.1)', 'rgba(236, 72, 153, 0.1)']
            : ['rgba(99, 102, 241, 0.05)', 'rgba(236, 72, 153, 0.05)']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.container,
          {
            borderColor: colors.border,
            ...theme.effects.glassmorphism,
          },
          style,
        ]}
      >
        <BlurView
          intensity={intensity}
          tint={isDark ? 'dark' : 'light'}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.content}>{children}</View>
      </LinearGradient>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.glassSurface,
          borderColor: colors.border,
          ...theme.effects.glassmorphism,
        },
        style,
      ]}
    >
      <BlurView
        intensity={intensity}
        tint={isDark ? 'dark' : 'light'}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
});
