import {
  OPENAI_API_URL,
  APP_ENV,
  DEBUG_MODE,
  API_TIMEOUT,
  UPLOAD_TIMEOUT,
  ENABLE_ANALYTICS,
  ENABLE_CRASH_REPORTING,
  DEFAULT_STT_MODEL,
  DEFAULT_TTS_MODEL,
  DEFAULT_TTS_VOICE,
} from '@env';

/**
 * Application configuration
 */
export const config = {
  api: {
    openai: {
      baseUrl: OPENAI_API_URL || 'https://api.openai.com/v1',
      timeout: parseInt(API_TIMEOUT || '30000', 10),
      uploadTimeout: parseInt(UPLOAD_TIMEOUT || '60000', 10),
    },
  },
  app: {
    env: APP_ENV || 'development',
    isDebug: DEBUG_MODE === 'true',
    isDevelopment: (APP_ENV || 'development') === 'development',
    isProduction: APP_ENV === 'production',
  },
  features: {
    analytics: ENABLE_ANALYTICS === 'true',
    crashReporting: ENABLE_CRASH_REPORTING === 'true',
  },
  defaults: {
    sttModel: DEFAULT_STT_MODEL || 'whisper-1',
    ttsModel: DEFAULT_TTS_MODEL || 'tts-1',
    ttsVoice: DEFAULT_TTS_VOICE || 'alloy',
  },
};

/**
 * Validate required configuration
 */
export function validateConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Add validation rules here if needed
  // For now, most config has defaults so no strict validation needed

  return {
    isValid: errors.length === 0,
    errors,
  };
}