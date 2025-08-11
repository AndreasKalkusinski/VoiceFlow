import * as Sentry from '@sentry/react-native';
import { config } from '../config';

/**
 * Initialize Sentry for crash reporting and error monitoring
 * Only enabled in production
 */
export const initSentry = () => {
  // Only initialize in production
  if (!config.app.isProduction || !config.features.crashReporting) {
    console.log('Sentry disabled in development or by config');
    return;
  }

  Sentry.init({
    dsn: process.env.SENTRY_DSN || '', // Add your Sentry DSN to .env
    debug: config.app.isDebug,
    environment: config.app.env,
    tracesSampleRate: 1.0,
    integrations: [
      // Add integrations here if needed
    ],
  });
};

/**
 * Capture exception with additional context
 */
export const captureException = (
  error: Error,
  context?: Record<string, any>,
  level: 'error' | 'warning' | 'info' | 'debug' = 'error',
) => {
  if (!config.app.isProduction || !config.features.crashReporting) {
    // In development, just log to console
    console.error('Error captured:', error, context);
    return;
  }

  Sentry.withScope((scope) => {
    if (context) {
      scope.setContext('additional', context);
    }
    scope.setLevel(level);
    Sentry.captureException(error);
  });
};

/**
 * Capture message for non-error events
 */
export const captureMessage = (
  message: string,
  level: 'error' | 'warning' | 'info' | 'debug' = 'info',
  context?: Record<string, any>,
) => {
  if (!config.app.isProduction || !config.features.crashReporting) {
    console.log(`[${level}] ${message}`, context);
    return;
  }

  Sentry.withScope((scope) => {
    if (context) {
      scope.setContext('additional', context);
    }
    scope.setLevel(level);
    Sentry.captureMessage(message, level);
  });
};

/**
 * Set user context for better error tracking
 */
export const setUserContext = (
  user: {
    id?: string;
    email?: string;
    username?: string;
  } | null,
) => {
  if (!config.app.isProduction || !config.features.crashReporting) {
    return;
  }

  Sentry.setUser(user);
};

/**
 * Add breadcrumb for better error context
 */
export const addBreadcrumb = (breadcrumb: {
  message: string;
  category?: string;
  level?: 'error' | 'warning' | 'info' | 'debug';
  data?: Record<string, any>;
}) => {
  if (!config.app.isProduction || !config.features.crashReporting) {
    return;
  }

  Sentry.addBreadcrumb({
    ...breadcrumb,
    timestamp: Date.now() / 1000,
  });
};

/**
 * Start a new Sentry span for performance monitoring
 */
export const startSpan = (_name: string, _op: string) => {
  if (!config.app.isProduction || !config.features.crashReporting) {
    return null;
  }

  // Note: startTransaction is deprecated in newer versions
  // Using startSpan or similar APIs as recommended
  return null; // Placeholder - implement with newer Sentry API if needed
};

/**
 * Wrap async functions with error handling
 */
export const wrapAsync = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context?: string,
): T => {
  return (async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      captureException(error as Error, { function: fn.name, context, args }, 'error');
      throw error;
    }
  }) as T;
};
