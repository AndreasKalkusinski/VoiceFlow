import React, { useState } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';
import './src/i18n';
// import { runAppGroupTestOnStartup } from './src/utils/testAppGroup'; // Removed unused import

// Import screens
import { Modern2025SpeechToTextScreen } from './src/screens/Modern2025SpeechToTextScreen';
import { Modern2025TextToSpeechScreen } from './src/screens/Modern2025TextToSpeechScreen';
import { Modern2025SettingsScreen } from './src/screens/Modern2025SettingsScreen';
import { LiquidTabBar } from './src/components/LiquidTabBar';
import { SharedAudioProvider, useSharedAudio } from './src/contexts/SharedAudioContext';
import { SplashScreen } from './src/screens/SplashScreen';
import { setupNetworkInterceptor } from './src/utils/network-security';

// Initialize network security on app start
setupNetworkInterceptor();

const Tab = createBottomTabNavigator();

function ThemedApp() {
  const { isDark } = useTheme();
  const { t, i18n } = useTranslation();
  const { setSharedAudioUri } = useSharedAudio();
  const navigationRef = React.useRef<NavigationContainerRef<any>>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [showSplash, setShowSplash] = useState(true);

  // Check for shared data from app group on app launch and when app becomes active
  React.useEffect(() => {
    // Removed automatic test on startup - can be triggered manually in Settings

    const checkSharedData = async () => {
      // eslint-disable-next-line no-console
      console.log('[App] checkSharedData called, navigationRef.current:', !!navigationRef.current);
      if (!navigationRef.current) return;

      try {
        // Use the safe wrapper that handles Expo Go gracefully
        const AppGroupService = (await import('./src/services/AppGroupServiceWrapper')).default;

        // eslint-disable-next-line no-console
        console.log('[App] AppGroupService available:', AppGroupService.isAvailable());

        if (!AppGroupService.isAvailable()) {
          // eslint-disable-next-line no-console
          console.log('[App] AppGroup not available - running in Expo Go or native module missing');
          return;
        }

        // Only test if module is available (not in Expo Go)
        const testResult = await AppGroupService.test();
        // eslint-disable-next-line no-console
        console.log('[App] Module test result:', testResult);

        const sharedContent = await AppGroupService.checkForSharedContent();
        // eslint-disable-next-line no-console
        console.log('[App] Shared content:', sharedContent);

        if (sharedContent.hasAudio && sharedContent.audioData) {
          // eslint-disable-next-line no-console
          console.log(
            '[App] Navigating to Speech to Text with audio:',
            sharedContent.audioData.path,
          );
          // Navigate to Speech to Text with the audio
          setSharedAudioUri(sharedContent.audioData.path);
          navigationRef.current.navigate('Speech to Text');
        } else if (sharedContent.hasText && sharedContent.textData) {
          // eslint-disable-next-line no-console
          console.log('[App] Navigating to Text to Speech with text');
          // Navigate to Text to Speech with the text
          navigationRef.current.navigate('Text to Speech', {
            sharedText: sharedContent.textData.text,
          });
        }
      } catch (error) {
        // Silently fail if module is not available
        // eslint-disable-next-line no-console
        console.log('[App] AppGroupService error:', error);
      }
    };

    // Check on mount
    checkSharedData();

    // Setup listener for app state changes
    let subscription: any; // eslint-disable-line @typescript-eslint/no-explicit-any

    (async () => {
      // Check when app becomes active (from background)
      const { AppState } = await import('react-native');
      subscription = AppState.addEventListener('change', (nextAppState: string) => {
        if (nextAppState === 'active') {
          checkSharedData();
        }
      });
    })();

    return () => {
      subscription?.remove();
    };
  }, [setSharedAudioUri]);

  // Handle incoming URLs (shared audio files and text)
  React.useEffect(() => {
    const handleUrl = async (url: string) => {
      // Handle audio files
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
      // Handle custom URL scheme for shared content
      else if (url && url.startsWith('de.jeantools.voiceflow://')) {
        const urlObj = new URL(url);
        const path = urlObj.hostname;
        const params = new URLSearchParams(urlObj.search);

        if (path === 'shared') {
          // Handle shared content from Share Extension
          // eslint-disable-next-line no-console
          console.log('[App] Handling shared content from URL scheme');
          // Will be handled by the useEffect that checks shared data
        } else if (path === 'audio') {
          const audioUrl = params.get('url');
          if (audioUrl) {
            // Decode the URL
            const decodedUrl = decodeURIComponent(audioUrl);
            setSharedAudioUri(decodedUrl);
            if (navigationRef.current) {
              navigationRef.current.navigate('Speech to Text');
            }
          }
        } else if (path === 'text') {
          const content = params.get('content');
          if (content && navigationRef.current) {
            // Decode and navigate to Text to Speech with the shared text
            const decodedContent = decodeURIComponent(content);
            navigationRef.current.navigate('Text to Speech', { sharedText: decodedContent });
          }
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

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Tab.Navigator
        tabBar={(props: BottomTabBarProps) => <LiquidTabBar {...(props as any)} />} // eslint-disable-line @typescript-eslint/no-explicit-any
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
