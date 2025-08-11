import { memo } from 'react';
import { ModernCard } from './ModernCard';
import { ModernButton } from './ModernButton';
import { GlassCard } from './GlassCard';
import { MinimalCard } from './MinimalCard';
import { RecordingAnimation } from './RecordingAnimation';

/**
 * Optimized ModernCard component with memoization
 */
export const OptimizedModernCard = memo(ModernCard, (prevProps, nextProps) => {
  return (
    prevProps.children === nextProps.children &&
    prevProps.style === nextProps.style &&
    prevProps.variant === nextProps.variant &&
    prevProps.onPress === nextProps.onPress &&
    prevProps.haptic === nextProps.haptic &&
    prevProps.animated === nextProps.animated
  );
});

/**
 * Optimized ModernButton component with memoization
 */
export const OptimizedModernButton = memo(ModernButton, (prevProps, nextProps) => {
  return (
    prevProps.title === nextProps.title &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.loading === nextProps.loading &&
    prevProps.variant === nextProps.variant &&
    prevProps.size === nextProps.size
  );
});

/**
 * Optimized GlassCard component with memoization
 */
export const OptimizedGlassCard = memo(GlassCard, (prevProps, nextProps) => {
  return (
    prevProps.children === nextProps.children &&
    prevProps.style === nextProps.style &&
    prevProps.intensity === nextProps.intensity &&
    prevProps.gradient === nextProps.gradient
  );
});

/**
 * Optimized MinimalCard component with memoization
 */
export const OptimizedMinimalCard = memo(MinimalCard, (prevProps, nextProps) => {
  return (
    prevProps.children === nextProps.children &&
    prevProps.style === nextProps.style &&
    prevProps.variant === nextProps.variant
  );
});

/**
 * Optimized RecordingAnimation component with memoization
 * Only re-renders when isRecording changes
 */
export const OptimizedRecordingAnimation = memo(RecordingAnimation, (prevProps, nextProps) => {
  return prevProps.isRecording === nextProps.isRecording;
});

// Export display names for debugging
OptimizedModernCard.displayName = 'OptimizedModernCard';
OptimizedModernButton.displayName = 'OptimizedModernButton';
OptimizedGlassCard.displayName = 'OptimizedGlassCard';
OptimizedMinimalCard.displayName = 'OptimizedMinimalCard';
OptimizedRecordingAnimation.displayName = 'OptimizedRecordingAnimation';
