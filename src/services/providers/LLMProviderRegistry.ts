import { BaseLLMProvider } from './llm/BaseLLMProvider';
import { OpenAILLMProvider } from './llm/OpenAILLMProvider';
import { AnthropicLLMProvider } from './llm/AnthropicLLMProvider';
import { GoogleGeminiProvider } from './llm/GoogleGeminiProvider';
import { MistralProvider } from './llm/MistralProvider';

export class LLMProviderRegistry {
  private static providers: Map<string, BaseLLMProvider> = new Map();
  private static initialized = false;

  static initialize() {
    if (this.initialized) return;

    // Register all LLM providers
    this.registerProvider(new OpenAILLMProvider());
    this.registerProvider(new AnthropicLLMProvider());
    this.registerProvider(new GoogleGeminiProvider());
    this.registerProvider(new MistralProvider());

    this.initialized = true;
  }

  static registerProvider(provider: BaseLLMProvider) {
    this.providers.set(provider.id, provider);
  }

  static getProvider(id: string): BaseLLMProvider | undefined {
    this.initialize();
    return this.providers.get(id);
  }

  static getAllProviders(): BaseLLMProvider[] {
    this.initialize();
    return Array.from(this.providers.values());
  }

  static getDefaultProvider(): BaseLLMProvider {
    this.initialize();
    return this.providers.get('openai-llm') || this.getAllProviders()[0];
  }
}
