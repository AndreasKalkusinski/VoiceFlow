import {
  BaseLLMProvider,
  LLMModel,
  LLMProviderConfig,
  LLMCompletionOptions,
} from './BaseLLMProvider';

export class OpenAILLMProvider extends BaseLLMProvider {
  id = 'openai-llm';
  name = 'OpenAI GPT';
  description = 'Advanced language models from OpenAI';
  requiresApiKey = true;

  models: LLMModel[] = [
    {
      id: 'gpt-4o',
      name: 'GPT-4o',
      description: 'Most capable model, best for complex tasks',
      maxTokens: 4096,
      contextWindow: 128000,
    },
    {
      id: 'gpt-4o-mini',
      name: 'GPT-4o Mini',
      description: 'Fast and affordable for most tasks',
      maxTokens: 4096,
      contextWindow: 128000,
    },
    {
      id: 'gpt-4-turbo',
      name: 'GPT-4 Turbo',
      description: 'Latest GPT-4 with vision capabilities',
      maxTokens: 4096,
      contextWindow: 128000,
    },
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      description: 'Fast and cost-effective',
      maxTokens: 4096,
      contextWindow: 16385,
    },
  ];

  async loadModels(apiKey: string): Promise<LLMModel[]> {
    try {
      this.isLoadingModels = true;

      // Fetch models directly from OpenAI API
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch models');
      }

      const data = await response.json();

      // Filter for chat models (GPT and O1 models)
      const chatModels = data.data
        .filter((m: any) => m.id.includes('gpt') || m.id.includes('o1'))
        .map((m: any) => ({
          id: m.id,
          name: this.formatModelName(m.id),
          description: this.getModelDescription(m.id),
          maxTokens: this.getMaxTokens(m.id),
          contextWindow: this.getContextWindow(m.id),
        }))
        .sort((a: LLMModel, b: LLMModel) => {
          // Sort to put newest models first
          const order = ['gpt-4o', 'gpt-4-turbo', 'gpt-4', 'gpt-3.5', 'o1'];
          const aIndex = order.findIndex((o) => a.id.startsWith(o));
          const bIndex = order.findIndex((o) => b.id.startsWith(o));
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });

      if (chatModels.length > 0) {
        this.models = chatModels;
      }

      return this.models;
    } catch (error) {
      console.log('Failed to load models dynamically, using defaults:', error);
      return this.models;
    } finally {
      this.isLoadingModels = false;
    }
  }

  private formatModelName(modelId: string): string {
    // Format model names to be more readable
    return modelId
      .replace('gpt-4o-mini', 'GPT-4o Mini')
      .replace('gpt-4o', 'GPT-4o')
      .replace('gpt-4-turbo', 'GPT-4 Turbo')
      .replace('gpt-4', 'GPT-4')
      .replace('gpt-3.5-turbo', 'GPT-3.5 Turbo')
      .replace('o1-preview', 'O1 Preview')
      .replace('o1-mini', 'O1 Mini');
  }

  private getModelDescription(modelId: string): string {
    if (modelId.includes('gpt-4o-mini')) return 'Fast and affordable for most tasks';
    if (modelId.includes('gpt-4o')) return 'Most capable model, best for complex tasks';
    if (modelId.includes('gpt-4-turbo')) return 'Latest GPT-4 with vision capabilities';
    if (modelId.includes('gpt-4')) return 'Advanced reasoning and analysis';
    if (modelId.includes('gpt-3.5')) return 'Fast and cost-effective';
    if (modelId.includes('o1-preview')) return 'Advanced reasoning model (preview)';
    if (modelId.includes('o1-mini')) return 'Smaller reasoning model';
    return 'OpenAI language model';
  }

  private getMaxTokens(modelId: string): number {
    if (modelId.includes('gpt-4o')) return 4096;
    if (modelId.includes('gpt-4')) return 8192;
    if (modelId.includes('gpt-3.5-turbo-16k')) return 4096;
    if (modelId.includes('gpt-3.5')) return 4096;
    if (modelId.includes('o1')) return 4096;
    return 4096;
  }

  private getContextWindow(modelId: string): number {
    if (modelId.includes('gpt-4o')) return 128000;
    if (modelId.includes('gpt-4-turbo')) return 128000;
    if (modelId.includes('gpt-4')) return 8192;
    if (modelId.includes('gpt-3.5-turbo-16k')) return 16385;
    if (modelId.includes('gpt-3.5')) return 4096;
    return 4096;
  }

  async complete(options: LLMCompletionOptions): Promise<string> {
    if (!this.config?.apiKey) {
      throw new Error('API key is required');
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          model: this.config.model || 'gpt-4o-mini',
          messages: options.messages,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async validateConfig(config: LLMProviderConfig): Promise<boolean> {
    if (!config.apiKey) return false;

    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}
