import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Animated, useColorScheme } from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { ModernSpeechToTextScreen } from './src/screens/ModernSpeechToTextScreen';
import { ModernTextToSpeechScreen } from './src/screens/ModernTextToSpeechScreen';
import { ModernSettingsScreen } from './src/screens/ModernSettingsScreen';
import { useTheme } from './src/hooks/useTheme';

const Tab = createBottomTabNavigator();

function AnimatedTabIcon({ name, focused }: { name: string; focused: boolean }) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const { colors } = useTheme();
  
  const icons: { [key: string]: string } = {
    'Speech to Text': '🎤',
    'Text to Speech': '🔊',
    'Settings': '⚙️',
  };

  React.useEffect(() => {
    if (focused) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      Animated.spring(scaleAnim, {
        toValue: 1.2,
        friction: 3,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    }
  }, [focused]);

  return (
    <Animated.View 
      style={[
        styles.tabIconContainer,
        { transform: [{ scale: scaleAnim }] }
      ]}
    >
      {focused && (
        <LinearGradient
          colors={['#6366F1', '#EC4899']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.tabIconGradient}
        />
      )}
      <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
        {icons[name]}
      </Text>
      <Text style={[
        styles.tabLabel, 
        focused && styles.tabLabelFocused,
        { color: focused ? '#6366F1' : colors.textSecondary }
      ]}>
        {name.split(' ')[0]}
      </Text>
    </Animated.View>
  );
}

function ThemedApp() {
  const { colors, isDark } = useTheme();
  
  return (
    <NavigationContainer>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: [
            styles.tabBar,
            {
              backgroundColor: isDark ? 'rgba(15, 15, 35, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              borderTopColor: colors.border,
            }
          ],
          tabBarShowLabel: false,
          headerShown: true,
          headerTransparent: true,
          headerBackground: () => (
            <BlurView 
              intensity={80} 
              tint={isDark ? 'dark' : 'light'}
              style={StyleSheet.absoluteFillObject}
            />
          ),
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 20,
            letterSpacing: -0.5,
          },
        }}
      >
        <Tab.Screen
          name="Speech to Text"
          component={ModernSpeechToTextScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <AnimatedTabIcon name="Speech to Text" focused={focused} />
            ),
            headerTitle: 'Voice to Text',
          }}
        />
        <Tab.Screen
          name="Text to Speech"
          component={ModernTextToSpeechScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <AnimatedTabIcon name="Text to Speech" focused={focused} />
            ),
            headerTitle: 'Text to Voice',
          }}
        />
        <Tab.Screen
          name="Settings"
          component={ModernSettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <AnimatedTabIcon name="Settings" focused={focused} />
            ),
            headerTitle: 'Settings',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return <ThemedApp />;
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 85,
    paddingBottom: 20,
    paddingTop: 10,
    borderTopWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 50,
  },
  tabIconGradient: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    opacity: 0.1,
  },
  tabIcon: {
    fontSize: 28,
  },
  tabIconFocused: {
    fontSize: 32,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },
  tabLabelFocused: {
    fontWeight: '700',
  },
});