// Provider type definitions
export interface STTProvider {
  id: string;
  name: string;
  description: string;
  requiresApiKey: boolean;
  supportedLanguages?: string[];
  models?: STTModel[];
  transcribe(audioUri: string, options: STTOptions): Promise<string>;
  validateConfig?(config: any): Promise<boolean>;
  loadModels?(apiKey: string, forceRefresh?: boolean): Promise<STTModel[]>;
  refreshModels?(apiKey: string): Promise<STTModel[]>;
  isLoadingModels?: boolean;
}

export interface TTSProvider {
  id: string;
  name: string;
  description: string;
  requiresApiKey: boolean;
  supportedLanguages?: string[];
  voices?: TTSVoice[];
  models?: TTSModel[];
  synthesize(text: string, options: TTSOptions): Promise<string>;
  validateConfig?(config: any): Promise<boolean>;
  loadModelsAndVoices?(
    apiKey: string,
    forceRefresh?: boolean,
  ): Promise<{ models: TTSModel[]; voices: TTSVoice[] }>;
  refreshModelsAndVoices?(apiKey: string): Promise<{ models: TTSModel[]; voices: TTSVoice[] }>;
  isLoadingModels?: boolean;
  isLoadingVoices?: boolean;
}

export interface STTModel {
  id: string;
  name: string;
  description?: string;
  languages?: string[];
}

export interface TTSModel {
  id: string;
  name: string;
  description?: string;
}

export interface TTSVoice {
  id: string;
  name: string;
  gender?: 'male' | 'female' | 'neutral';
  language?: string;
  description?: string;
  preview?: string;
}

export interface STTOptions {
  model?: string;
  language?: string;
  apiKey: string;
  [key: string]: unknown;
}

export interface TTSOptions {
  model?: string;
  voice?: string;
  language?: string;
  speed?: number;
  pitch?: number;
  apiKey: string;
  [key: string]: unknown;
}

export interface ProviderConfig {
  provider: string;
  apiKey?: string;
  model?: string;
  voice?: string;
  customEndpoint?: string;
  additionalSettings?: Record<string, any>;
}

// LLM Provider types
export interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LLMCompletionOptions {
  messages: LLMMessage[];
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface LLMProvider {
  id: string;
  name: string;
  description: string;
  requiresApiKey: boolean;
  models?: LLMModel[];
  complete(options: LLMCompletionOptions): Promise<string>;
  validateConfig?(config: any): Promise<boolean>;
  loadModels?(apiKey: string, forceRefresh?: boolean): Promise<LLMModel[]>;
}

export interface LLMModel {
  id: string;
  name: string;
  description?: string;
  contextWindow?: number;
  maxTokens?: number;
}
