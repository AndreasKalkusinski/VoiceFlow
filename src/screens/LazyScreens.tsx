import { lazy, Suspense } from 'react';
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

/**
 * Loading component for lazy loaded screens
 */
const ScreenLoader = () => (
  <View style={styles.loader}>
    <ActivityIndicator size="large" color="#007AFF" />
  </View>
);

/**
 * Lazy loaded screen components
 * These are loaded on-demand to improve initial app load time
 */

// Modern screens
export const LazyModernSpeechToTextScreen = lazy(() =>
  import('./ModernSpeechToTextScreen').then((m) => ({ default: m.ModernSpeechToTextScreen })),
);

export const LazyModernTextToSpeechScreen = lazy(() =>
  import('./ModernTextToSpeechScreen').then((m) => ({ default: m.ModernTextToSpeechScreen })),
);

export const LazyModernSettingsScreen = lazy(() =>
  import('./ModernSettingsScreen').then((m) => ({ default: m.ModernSettingsScreen })),
);

// Clean screens
export const LazyCleanSpeechToTextScreen = lazy(() =>
  import('./CleanSpeechToTextScreen').then((m) => ({ default: m.CleanSpeechToTextScreen })),
);

export const LazyCleanTextToSpeechScreen = lazy(() =>
  import('./CleanTextToSpeechScreen').then((m) => ({ default: m.CleanTextToSpeechScreen })),
);

export const LazyCleanSettingsScreen = lazy(() =>
  import('./CleanSettingsScreen').then((m) => ({ default: m.CleanSettingsScreen })),
);

// Modern2025 screens
export const LazyModern2025SpeechToTextScreen = lazy(() =>
  import('./Modern2025SpeechToTextScreen').then((m) => ({
    default: m.Modern2025SpeechToTextScreen,
  })),
);

export const LazyModern2025TextToSpeechScreen = lazy(() =>
  import('./Modern2025TextToSpeechScreen').then((m) => ({
    default: m.Modern2025TextToSpeechScreen,
  })),
);

export const LazyModern2025SettingsScreen = lazy(() =>
  import('./Modern2025SettingsScreen').then((m) => ({ default: m.Modern2025SettingsScreen })),
);

/**
 * HOC to wrap lazy loaded components with Suspense
 */
export function withSuspense<P extends object>(
  LazyComponent: React.LazyExoticComponent<React.ComponentType<P>>,
) {
  return (props: P) => (
    <Suspense fallback={<ScreenLoader />}>
      <LazyComponent {...(props as any)} />
    </Suspense>
  );
}

// Export wrapped components ready to use
export const SuspenseModernSpeechToTextScreen = withSuspense(LazyModernSpeechToTextScreen);
export const SuspenseModernTextToSpeechScreen = withSuspense(LazyModernTextToSpeechScreen);
export const SuspenseModernSettingsScreen = withSuspense(LazyModernSettingsScreen);

export const SuspenseCleanSpeechToTextScreen = withSuspense(LazyCleanSpeechToTextScreen);
export const SuspenseCleanTextToSpeechScreen = withSuspense(LazyCleanTextToSpeechScreen);
export const SuspenseCleanSettingsScreen = withSuspense(LazyCleanSettingsScreen);

export const SuspenseModern2025SpeechToTextScreen = withSuspense(LazyModern2025SpeechToTextScreen);
export const SuspenseModern2025TextToSpeechScreen = withSuspense(LazyModern2025TextToSpeechScreen);
export const SuspenseModern2025SettingsScreen = withSuspense(LazyModern2025SettingsScreen);

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
});
