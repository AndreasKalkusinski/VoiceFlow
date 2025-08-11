import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { useTranslation } from 'react-i18next';
import './src/i18n';

// Import screens
import { Modern2025SpeechToTextScreen } from './src/screens/Modern2025SpeechToTextScreen';
import { Modern2025TextToSpeechScreen } from './src/screens/Modern2025TextToSpeechScreen';
import { Modern2025SettingsScreen } from './src/screens/Modern2025SettingsScreen';
import { LiquidTabBar } from './src/components/LiquidTabBar';

const Tab = createBottomTabNavigator();

function ThemedApp() {
  const { isDark } = useTheme();
  const { t, i18n, ready } = useTranslation();

  React.useEffect(() => {
    if (!__DEV__) {
      Alert.alert('Debug', `ThemedApp mounted, i18n ready: ${ready}`);
    }
  }, [ready]);

  // Force re-render when language changes
  React.useEffect(() => {
    const handleLanguageChange = () => {
      // This will trigger a re-render
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  // Don't wait for i18n in release builds
  if (!ready && __DEV__) {
    return <LoadingFallback />;
  }

  return (
    <NavigationContainer>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Tab.Navigator
        tabBar={(props) => <LiquidTabBar {...(props as any)} />}
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Hide the default tab bar
        }}
      >
        <Tab.Screen
          name="Speech to Text"
          component={Modern2025SpeechToTextScreen}
          options={{
            tabBarLabel: t('speechToText.title'),
          }}
        />
        <Tab.Screen
          name="Text to Speech"
          component={Modern2025TextToSpeechScreen}
          options={{
            tabBarLabel: t('textToSpeech.title'),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Modern2025SettingsScreen}
          options={{
            tabBarLabel: t('settings.title'),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function LoadingFallback() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}

export default function App() {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    // Show debug info in release
    if (!__DEV__) {
      Alert.alert('Debug', 'App mounted, starting initialization');
    }

    if (__DEV__) {
      console.log('App mounted successfully');
    }

    // Delay initialization to avoid hang
    setTimeout(() => {
      setIsReady(true);
    }, 100);
  }, []);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <ThemeProvider>
          <ThemedApp />
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
});
