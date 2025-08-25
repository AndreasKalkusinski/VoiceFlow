/**
 * Centralized error handling utilities
 */

export enum ErrorType {
  NETWORK = 'NETWORK',
  API = 'API',
  VALIDATION = 'VALIDATION',
  PERMISSION = 'PERMISSION',
  STORAGE = 'STORAGE',
  UNKNOWN = 'UNKNOWN',
}

export interface AppError {
  type: ErrorType;
  message: string;
  code?: string;
  details?: unknown;
  timestamp: Date;
}

/**
 * Custom error class for application-specific errors
 */
export class ApplicationError extends Error {
  public type: ErrorType;
  public code?: string;
  public details?: unknown;
  public timestamp: Date;

  constructor(type: ErrorType, message: string, code?: string, details?: unknown) {
    super(message);
    this.name = 'ApplicationError';
    this.type = type;
    this.code = code;
    this.details = details;
    this.timestamp = new Date();
  }

  toJSON(): AppError {
    return {
      type: this.type,
      message: this.message,
      code: this.code,
      details: this.details,
      timestamp: this.timestamp,
    };
  }
}

/**
 * Error handler for API responses
 */
export function handleApiError(error: unknown): ApplicationError {
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const data = error.response.data;

    if (status === 401) {
      return new ApplicationError(
        ErrorType.API,
        'Authentication failed. Please check your API key.',
        'AUTH_ERROR',
        data,
      );
    } else if (status === 429) {
      return new ApplicationError(
        ErrorType.API,
        'Rate limit exceeded. Please try again later.',
        'RATE_LIMIT',
        data,
      );
    } else if (status === 400) {
      return new ApplicationError(
        ErrorType.API,
        data?.error?.message || 'Invalid request. Please check your input.',
        'BAD_REQUEST',
        data,
      );
    } else if (status >= 500) {
      return new ApplicationError(
        ErrorType.API,
        'Server error. Please try again later.',
        'SERVER_ERROR',
        data,
      );
    }

    return new ApplicationError(
      ErrorType.API,
      data?.error?.message || `Request failed with status ${status}`,
      `HTTP_${status}`,
      data,
    );
  } else if (error.request) {
    // Request made but no response received
    return new ApplicationError(
      ErrorType.NETWORK,
      'Network error. Please check your internet connection.',
      'NETWORK_ERROR',
      error.request,
    );
  } else {
    // Something else happened
    return new ApplicationError(
      ErrorType.UNKNOWN,
      error.message || 'An unexpected error occurred.',
      'UNKNOWN_ERROR',
      error,
    );
  }
}

/**
 * Error handler for storage operations
 */
export function handleStorageError(error: unknown): ApplicationError {
  return new ApplicationError(
    ErrorType.STORAGE,
    'Failed to access local storage. Please try again.',
    'STORAGE_ERROR',
    error,
  );
}

/**
 * Error handler for permission requests
 */
export function handlePermissionError(permission: string): ApplicationError {
  return new ApplicationError(
    ErrorType.PERMISSION,
    `Permission denied: ${permission}. Please enable this permission in your device settings.`,
    'PERMISSION_DENIED',
    { permission },
  );
}

/**
 * Generic error handler
 */
export function handleError(error: unknown): ApplicationError {
  if (error instanceof ApplicationError) {
    return error;
  }

  if (error.response || error.request) {
    return handleApiError(error);
  }

  return new ApplicationError(
    ErrorType.UNKNOWN,
    error.message || 'An unexpected error occurred.',
    'UNKNOWN_ERROR',
    error,
  );
}

/**
 * User-friendly error messages
 */
export function getUserFriendlyMessage(error: ApplicationError): string {
  switch (error.type) {
    case ErrorType.NETWORK:
      return 'Connection problem. Please check your internet and try again.';
    case ErrorType.API:
      if (error.code === 'AUTH_ERROR') {
        return 'Invalid API key. Please check your settings.';
      }
      if (error.code === 'RATE_LIMIT') {
        return 'Too many requests. Please wait a moment and try again.';
      }
      return error.message;
    case ErrorType.VALIDATION:
      return 'Please check your input and try again.';
    case ErrorType.PERMISSION:
      return error.message;
    case ErrorType.STORAGE:
      return 'Unable to save data. Please check your device storage.';
    default:
      return 'Something went wrong. Please try again.';
  }
}

/**
 * Error logging service (can be extended to send to external service)
 */
export class ErrorLogger {
  static log(error: ApplicationError, context?: unknown): void {
    if (__DEV__) {
      console.error('Application Error:', {
        ...error.toJSON(),
        context,
      });
    }

    // In production, you could send this to a service like Sentry
    // Sentry.captureException(error, { extra: context });
  }

  static logWarning(message: string, details?: unknown): void {
    if (__DEV__) {
      console.warn('Warning:', message, details);
    }
  }
}
