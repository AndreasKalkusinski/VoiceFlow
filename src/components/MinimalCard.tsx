import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface MinimalCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined';
  noPadding?: boolean;
}

export const MinimalCard: React.FC<MinimalCardProps> = ({
  children,
  style,
  variant = 'default',
  noPadding = false,
}) => {
  const { colors, isDark } = useTheme();

  const getCardStyle = () => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: isDark ? colors.surface : '#FFFFFF',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isDark ? 0.3 : 0.08,
          shadowRadius: 8,
          elevation: 4,
        };
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
        };
      default:
        return {
          backgroundColor: isDark ? colors.surface : '#FFFFFF',
        };
    }
  };

  return (
    <View
      style={[
        styles.card,
        getCardStyle(),
        !noPadding && styles.padding,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  padding: {
    padding: 20,
  },
});