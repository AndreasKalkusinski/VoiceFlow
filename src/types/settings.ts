export interface Settings {
  // Legacy fields for backward compatibility
  openaiApiKey: string;
  sttModel: string;
  ttsModel: string;
  ttsVoice: string;

  // New provider-based settings
  sttProvider?: string;
  ttsProvider?: string;

  // Provider-specific API keys
  apiKeys?: {
    openai?: string;
    elevenlabs?: string;
    google?: string;
    azure?: string;
    aws?: string;
    deepgram?: string;
    assemblyai?: string;
  };

  // Provider-specific settings
  providerSettings?: {
    [providerId: string]: {
      model?: string;
      voice?: string;
      language?: string;
      additionalSettings?: Record<string, any>;
    };
  };
}
