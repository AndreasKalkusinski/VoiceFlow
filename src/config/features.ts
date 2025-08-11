/**
 * Feature Flags for VoiceFlow
 *
 * Use these flags to enable/disable features without branching
 * This allows us to merge incomplete features to main safely
 */

interface FeatureFlags {
  // Core Features
  OFFLINE_MODE: boolean;
  ADVANCED_VOICE_SETTINGS: boolean;
  CLOUD_SYNC: boolean;

  // Experimental Features
  NEW_VOICE_ENGINE: boolean;
  AI_VOICE_ENHANCEMENT: boolean;
  BATCH_PROCESSING: boolean;

  // UI Features
  ANIMATED_WAVEFORMS: boolean;
  GESTURE_CONTROLS: boolean;

  // Platform Specific
  ANDROID_SPECIFIC_FEATURES: boolean;
  IOS_LIVE_ACTIVITIES: boolean;
}

// Environment-based feature flags
const isDevelopment = __DEV__;
const isStaging = process.env.APP_ENV === 'staging';
const isProduction = process.env.APP_ENV === 'production';

export const FEATURES: FeatureFlags = {
  // Stable features (enabled in production)
  OFFLINE_MODE: true,
  ADVANCED_VOICE_SETTINGS: true,
  ANIMATED_WAVEFORMS: true,

  // Beta features (enabled in staging)
  CLOUD_SYNC: isStaging || isDevelopment,
  GESTURE_CONTROLS: isStaging || isDevelopment,

  // Development only features
  NEW_VOICE_ENGINE: isDevelopment,
  AI_VOICE_ENHANCEMENT: isDevelopment,
  BATCH_PROCESSING: isDevelopment,

  // Platform specific
  ANDROID_SPECIFIC_FEATURES: false, // Enable when Android is ready
  IOS_LIVE_ACTIVITIES: isDevelopment,
};

/**
 * Helper function to check if a feature is enabled
 */
export function isFeatureEnabled(feature: keyof FeatureFlags): boolean {
  return FEATURES[feature] ?? false;
}

/**
 * Hook for using feature flags in components
 */
import { useMemo } from 'react';

export function useFeature(feature: keyof FeatureFlags): boolean {
  return useMemo(() => isFeatureEnabled(feature), [feature]);
}

/**
 * HOC for conditionally rendering components based on feature flags
 */
import React from 'react';

export function withFeature<P extends object>(
  feature: keyof FeatureFlags,
  Component: React.ComponentType<P>,
  Fallback?: React.ComponentType<P>,
): React.ComponentType<P> {
  return (props: P) => {
    if (isFeatureEnabled(feature)) {
      return React.createElement(Component, props);
    }
    return Fallback ? React.createElement(Fallback, props) : null;
  };
}

// Usage Example:
/*
// In a component:
import { useFeature, withFeature } from '@/config/features';

function MyComponent() {
  const hasNewEngine = useFeature('NEW_VOICE_ENGINE');
  
  if (hasNewEngine) {
    return <NewVoiceEngine />;
  }
  
  return <OldVoiceEngine />;
}

// Or with HOC:
const EnhancedSettings = withFeature(
  'ADVANCED_VOICE_SETTINGS',
  AdvancedSettings,
  BasicSettings
);
*/
