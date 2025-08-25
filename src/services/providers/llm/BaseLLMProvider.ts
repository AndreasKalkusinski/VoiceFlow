export interface LLMModel {
  id: string;
  name: string;
  description?: string;
  maxTokens?: number;
  contextWindow?: number;
}

export interface LLMProviderConfig {
  apiKey: string;
  model?: string;
  baseUrl?: string;
  temperature?: number;
  maxTokens?: number;
}

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

export abstract class BaseLLMProvider {
  abstract id: string;
  abstract name: string;
  abstract description: string;
  abstract requiresApiKey: boolean;
  abstract models: LLMModel[];

  protected config?: LLMProviderConfig;
  protected isLoadingModels = false;

  async initialize(config: LLMProviderConfig): Promise<void> {
    this.config = config;
  }

  abstract complete(options: LLMCompletionOptions): Promise<string>;

  abstract validateConfig(config: LLMProviderConfig): Promise<boolean>;

  async loadModels(_apiKey: string): Promise<LLMModel[]> {
    // Default implementation - override in providers that support dynamic model loading
    return this.models;
  }

  getSelectedModel(): string {
    return this.config?.model || this.models[0]?.id || '';
  }

  protected handleError(error: any): never {
    console.error(`[${this.name}] Error:`, error);
    throw new Error(`${this.name} error: ${error.message || 'Unknown error'}`);
  }
}
