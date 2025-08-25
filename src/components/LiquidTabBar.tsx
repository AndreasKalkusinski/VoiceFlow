import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// SVG imports removed - using Ionicons instead
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { vw, vh } from '../utils/responsive-dimensions';
import { getScreenTheme } from '../utils/screen-themes';
import { TabBarProps, TabBarState } from '../types/navigation';

const { width } = Dimensions.get('window');

export const LiquidTabBar: React.FC<TabBarProps> = ({ state, navigation }) => {
  const { isDark, colors } = useTheme();
  const insets = useSafeAreaInsets();
  const currentRoute = state.routes[state.index].name;
  const currentTheme = getScreenTheme(currentRoute, isDark);

  const icons: {
    [key: string]: {
      outline: keyof typeof Ionicons.glyphMap;
      filled: keyof typeof Ionicons.glyphMap;
    };
  } = {
    'Speech to Text': { outline: 'mic-outline', filled: 'mic' },
    'Text to Speech': { outline: 'volume-high-outline', filled: 'volume-high' },
    Settings: { outline: 'settings-outline', filled: 'settings-sharp' },
  };

  const translateX = useRef(new Animated.Value(0)).current;
  const scaleAnims = useRef(state.routes.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    // Animate blob position
    const tabWidth = width / state.routes.length;
    const toValue = state.index * tabWidth;

    Animated.spring(translateX, {
      toValue,
      damping: 20,
      stiffness: 300,
      useNativeDriver: true,
    }).start();

    // Animate icon scales
    state.routes.forEach((route: TabBarState['routes'][0], index: number) => {
      Animated.spring(scaleAnims[index], {
        toValue: index === state.index ? 1.2 : 1,
        damping: 15,
        stiffness: 200,
        useNativeDriver: true,
      }).start();
    });
  }, [state.index, scaleAnims, state.routes, translateX]);

  const handlePress = (route: TabBarState['routes'][0], index: number, isFocused: boolean) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const tabWidth = width / state.routes.length;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/* Enhanced glassmorphism background */}
      <BlurView
        intensity={isDark ? 85 : 80}
        tint={isDark ? 'dark' : 'light'}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Glass overlay with subtle gradient */}
      <LinearGradient
        colors={
          isDark
            ? ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']
            : ['rgba(255,255,255,0.7)', 'rgba(255,255,255,0.5)']
        }
        style={[StyleSheet.absoluteFillObject, styles.glassOverlay]}
      />

      {/* Subtle color accent from current screen */}
      {currentTheme && (
        <View style={[styles.colorAccent, { backgroundColor: currentTheme.primary + '08' }]} />
      )}

      {/* Modern active indicator */}
      <Animated.View
        style={[
          styles.activeIndicator,
          {
            transform: [{ translateX }],
            width: tabWidth,
          },
        ]}
      >
        {/* Glow effect */}
        <View
          style={[
            styles.glowEffect,
            {
              backgroundColor: currentTheme?.primary || '#6366F1',
              shadowColor: currentTheme?.primary || '#6366F1',
            },
          ]}
        />

        {/* Bottom line indicator */}
        <View
          style={[styles.lineIndicator, { backgroundColor: currentTheme?.primary || '#6366F1' }]}
        />
      </Animated.View>

      {/* Tab items */}
      <View style={styles.tabContainer}>
        {state.routes.map((route: TabBarState['routes'][0], index: number) => {
          const isFocused = state.index === index;
          const routeTheme = getScreenTheme(route.name, isDark);

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={() => handlePress(route, index, isFocused)}
              style={styles.tab}
              activeOpacity={0.7}
            >
              <Animated.View
                style={[
                  styles.iconContainer,
                  {
                    transform: [{ scale: scaleAnims[index] }],
                  },
                ]}
              >
                {/* Glass effect for active icon */}
                {isFocused && (
                  <Animated.View
                    style={[
                      styles.iconGlassEffect,
                      isDark ? styles.iconGlassEffectDark : styles.iconGlassEffectLight,
                      {
                        borderColor: routeTheme?.primary + '30',
                      },
                    ]}
                  />
                )}

                {/* Modern Icon */}
                <Ionicons
                  name={isFocused ? icons[route.name].filled : icons[route.name].outline}
                  size={vw(6.5)}
                  color={isFocused ? routeTheme?.primary || colors.primary : colors.textSecondary}
                  style={styles.icon}
                />
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
    height: vh(10),
    backgroundColor: 'transparent',
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  glassOverlay: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  colorAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    paddingBottom: vh(1),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: vw(14),
    height: vw(14),
  },
  icon: {
    textAlign: 'center',
  },
  iconGlassEffect: {
    position: 'absolute',
    width: vw(11),
    height: vw(11),
    borderRadius: vw(3),
    borderWidth: 1,
    // backdropFilter: 'blur(10px)', // Not supported in React Native
  },
  activeIndicator: {
    position: 'absolute',
    bottom: vh(3.5),
    height: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowEffect: {
    position: 'absolute',
    bottom: 0,
    width: vw(15),
    height: 20,
    opacity: 0.3,
    borderRadius: vw(7.5),
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  lineIndicator: {
    position: 'absolute',
    bottom: 0,
    width: vw(8),
    height: 3,
    borderRadius: 1.5,
  },
  iconGlassEffectDark: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  iconGlassEffectLight: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});
