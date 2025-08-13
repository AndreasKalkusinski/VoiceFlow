import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';
import './src/i18n';

// Import screens
import { Modern2025SpeechToTextScreen } from './src/screens/Modern2025SpeechToTextScreen';
import { Modern2025TextToSpeechScreen } from './src/screens/Modern2025TextToSpeechScreen';
import { Modern2025SettingsScreen } from './src/screens/Modern2025SettingsScreen';
import { LiquidTabBar } from './src/components/LiquidTabBar';
import { SharedAudioProvider, useSharedAudio } from './src/contexts/SharedAudioContext';

const Tab = createBottomTabNavigator();

function ThemedApp() {
  const { isDark } = useTheme();
  const { t, i18n } = useTranslation();
  const { setSharedAudioUri } = useSharedAudio();
  const navigationRef = React.useRef<any>(null);

  // Handle incoming URLs (shared audio files)
  React.useEffect(() => {
    const handleUrl = async (url: string) => {
      if (
        url &&
        (url.includes('.m4a') ||
          url.includes('.mp3') ||
          url.includes('.wav') ||
          url.includes('.aac'))
      ) {
        // Store the audio URI and navigate to Speech to Text screen
        setSharedAudioUri(url);
        if (navigationRef.current) {
          navigationRef.current.navigate('Speech to Text');
        }
      }
    };

    // Handle initial URL
    Linking.getInitialURL().then((url) => {
      if (url) handleUrl(url);
    });

    // Handle URL changes while app is open
    const subscription = Linking.addEventListener('url', (event) => {
      handleUrl(event.url);
    });

    return () => {
      subscription.remove();
    };
  }, [setSharedAudioUri]);

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

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Tab.Navigator
        tabBar={(props: any) => <LiquidTabBar {...props} />}
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

export default function App() {
  React.useEffect(() => {
    // App mounted successfully
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <ThemeProvider>
          <SharedAudioProvider>
            <ThemedApp />
          </SharedAudioProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
