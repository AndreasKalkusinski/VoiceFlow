import React, { useRef, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  View,
  Text,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../hooks/useTheme';
import { designTokens } from '../utils/design-system';
import { vw, vh, contentVH, responsiveDimensions } from '../utils/responsive-dimensions';

interface ModernFABProps {
  onPress: () => void;
  icon: React.ReactNode;
  variant?: 'primary' | 'extended' | 'surface' | 'glass';
  position?: 'bottom-right' | 'bottom-center' | 'center';
  label?: string;
  disabled?: boolean;
  isActive?: boolean;
}

export const ModernFAB: React.FC<ModernFABProps> = ({
  onPress,
  icon,
  variant = 'primary',
  position = 'bottom-center',
  label,
  disabled = false,
  isActive = false,
}) => {
  const { isDark } = useTheme();
  const colors = isDark ? designTokens.colors.dark : designTokens.colors.light;
  
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entry animation
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 100,
      useNativeDriver: true,
    }).start();

    // Pulse animation when active
    if (isActive) {
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
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isActive]);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.9,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  const getPositionStyle = () => {
    switch (position) {
      case 'bottom-right':
        return styles.bottomRight;
      case 'bottom-center':
        return styles.bottomCenter;
      case 'center':
        return styles.center;
      default:
        return styles.bottomCenter;
    }
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const transforms = [
    { scale: scaleAnim },
    { rotate: rotation },
  ];
  
  if (isActive) {
    transforms.push({ scale: pulseAnim });
  }

  return (
    <Animated.View
      style={[
        styles.container,
        getPositionStyle(),
        {
          transform: transforms,
        },
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={0.9}
        style={[
          styles.fab,
          variant === 'extended' && styles.extended,
          disabled && styles.disabled,
        ]}
      >
        {variant === 'surface' || variant === 'glass' ? (
          <>
            <BlurView
              intensity={variant === 'glass' ? 75 : 90}
              tint={isDark ? 'dark' : 'light'}
              style={StyleSheet.absoluteFillObject}
            />
            {variant === 'glass' && (
              <LinearGradient
                colors={
                  isDark 
                    ? ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.05)']
                    : ['rgba(255,255,255,0.7)', 'rgba(255,255,255,0.4)']
                }
                style={StyleSheet.absoluteFillObject}
              />
            )}
          </>
        ) : (
          <LinearGradient
            colors={isActive ? (colors.accentGradient as [string, string]) : [colors.primary, colors.primaryDark] as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
        )}
        
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            {icon}
          </View>
          {label && variant === 'extended' && (
            <Text style={[styles.label, { color: colors.textOnPrimary }]}>
              {label}
            </Text>
          )}
        </View>

        {/* Ripple effect indicator */}
        {isActive && (
          <View style={[styles.ripple, { borderColor: colors.primary }]} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: designTokens.zIndex.sticky,
  },
  bottomRight: {
    bottom: responsiveDimensions.fab.bottom,
    right: responsiveDimensions.padding.screen,
  },
  bottomCenter: {
    bottom: vh(11), // Above custom tab bar
    left: '50%',
    transform: [{ translateX: -(responsiveDimensions.fab.size / 2) }],
  },
  center: {
    top: '50%',
    left: '50%',
    transform: [{ translateX: -(responsiveDimensions.fab.size / 2) }, { translateY: -(responsiveDimensions.fab.size / 2) }],
  },
  fab: {
    width: responsiveDimensions.fab.size,
    height: responsiveDimensions.fab.size,
    borderRadius: responsiveDimensions.fab.size / 2,
    alignItems: 'center',
    justifyContent: 'center',
    ...designTokens.elevation.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  extended: {
    width: 'auto',
    paddingHorizontal: responsiveDimensions.padding.large,
    flexDirection: 'row',
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginLeft: responsiveDimensions.padding.small,
    fontSize: responsiveDimensions.fontSize.medium,
    fontWeight: '600',
  },
  ripple: {
    position: 'absolute',
    width: responsiveDimensions.fab.size * 1.4,
    height: responsiveDimensions.fab.size * 1.4,
    borderRadius: responsiveDimensions.fab.size * 0.7,
    borderWidth: 2,
    opacity: 0.3,
  },
});