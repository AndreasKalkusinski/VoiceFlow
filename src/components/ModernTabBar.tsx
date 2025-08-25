import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { vw, vh } from '../utils/responsive-dimensions';

import { TabBarProps, TabBarState } from '../types/navigation';

export const ModernTabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const colors = isDark
    ? {
        bg: 'rgba(28, 28, 31, 0.98)',
        active: '#7C7CFF',
        inactive: '#8E8E93',
        glow: 'rgba(124, 124, 255, 0.3)',
      }
    : {
        bg: 'rgba(255, 255, 255, 0.98)',
        active: '#5E5CE6',
        inactive: '#8E8E93',
        glow: 'rgba(94, 92, 230, 0.2)',
      };

  const animations = useRef(
    state.routes.map(() => ({
      scale: new Animated.Value(1),
      translateY: new Animated.Value(0),
      opacity: new Animated.Value(0),
    })),
  ).current;

  const icons: { [key: string]: string } = {
    'Speech to Text': '🎙️',
    'Text to Speech': '🔊',
    Settings: '⚙️',
  };

  const handlePress = (route: TabBarState['routes'][0], index: number, isFocused: boolean) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      // Animate the pressed tab
      Animated.sequence([
        Animated.parallel([
          Animated.spring(animations[index].scale, {
            toValue: 0.9,
            useNativeDriver: true,
            // duration: 100, // Not valid for spring animation
          }),
          Animated.timing(animations[index].translateY, {
            toValue: -2,
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.spring(animations[index].scale, {
            toValue: 1,
            useNativeDriver: true,
            friction: 4,
          }),
          Animated.spring(animations[index].translateY, {
            toValue: 0,
            useNativeDriver: true,
            friction: 4,
          }),
        ]),
      ]).start();
    }
  };

  useEffect(() => {
    state.routes.forEach((route: TabBarState['routes'][0], index: number) => {
      const isFocused = state.index === index;
      Animated.timing(animations[index].opacity, {
        toValue: isFocused ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  }, [state.index, animations, state.routes]);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom, backgroundColor: colors.bg }]}>
      <BlurView
        intensity={90}
        tint={isDark ? 'dark' : 'light'}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.tabContainer}>
        {state.routes.map((route: TabBarState['routes'][0], index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={() => handlePress(route, index, isFocused)}
              style={styles.tab}
              activeOpacity={0.7}
            >
              <Animated.View
                style={[
                  styles.tabContent,
                  {
                    transform: [
                      { scale: animations[index].scale },
                      { translateY: animations[index].translateY },
                    ],
                  },
                ]}
              >
                {/* Active indicator glow */}
                {isFocused && (
                  <Animated.View
                    style={[
                      styles.activeGlow,
                      {
                        backgroundColor: colors.glow,
                        opacity: animations[index].opacity,
                      },
                    ]}
                  />
                )}

                {/* Icon container with gradient when active */}
                <View style={styles.iconContainer}>
                  {isFocused && (
                    <LinearGradient
                      colors={
                        isDark
                          ? ['rgba(124, 124, 255, 0.2)', 'rgba(124, 124, 255, 0.1)']
                          : ['rgba(94, 92, 230, 0.15)', 'rgba(94, 92, 230, 0.05)']
                      }
                      style={styles.iconGradient}
                    />
                  )}
                  <Text
                    style={[
                      styles.icon,
                      {
                        fontSize: isFocused ? vw(7) : vw(6),
                        transform: [{ scale: isFocused ? 1.1 : 1 }],
                      },
                    ]}
                  >
                    {icons[route.name]}
                  </Text>
                </View>

                {/* Label with modern styling */}
                <Animated.Text
                  style={[
                    styles.label,
                    isFocused ? styles.labelActive : styles.labelInactive,
                    {
                      color: isFocused ? colors.active : colors.inactive,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {label}
                </Animated.Text>

                {/* Active dot indicator */}
                {isFocused && (
                  <Animated.View
                    style={[
                      styles.activeDot,
                      {
                        backgroundColor: colors.active,
                        opacity: animations[index].opacity,
                      },
                    ]}
                  />
                )}
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    height: vh(9),
    paddingHorizontal: vw(2),
    paddingTop: vh(0.5),
    paddingBottom: vh(1),
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  iconContainer: {
    width: vw(12),
    height: vw(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vh(0.5),
    borderRadius: vw(6),
    overflow: 'hidden',
  },
  iconGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: vw(6),
  },
  icon: {
    textAlign: 'center',
  },
  label: {
    fontSize: vw(2.8),
    textAlign: 'center',
  },
  activeGlow: {
    position: 'absolute',
    width: vw(16),
    height: vw(16),
    borderRadius: vw(8),
    top: -vh(1),
  },
  activeDot: {
    width: vw(1.5),
    height: vw(1.5),
    borderRadius: vw(0.75),
    marginTop: vh(0.5),
  },
  labelInactive: {
    opacity: 0.7,
    fontWeight: '500',
  },
  labelActive: {
    opacity: 1,
    fontWeight: '600',
  },
});
