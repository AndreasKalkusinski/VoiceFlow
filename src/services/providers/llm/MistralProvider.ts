import {
  BaseLLMProvider,
  LLMModel,
  LLMCompletionOptions,
  LLMProviderConfig,
} from './BaseLLMProvider';

export class MistralProvider extends BaseLLMProvider {
  id = 'mistral';
  name = 'Mistral AI';
  description = 'European AI provider with GDPR compliance';
  requiresApiKey = true;

  models: LLMModel[] = [
    {
      id: 'mistral-large-latest',
      name: 'Mistral Large',
      description: 'Most capable model, best for complex tasks',
      contextWindow: 128000,
    },
    {
      id: 'mistral-medium-latest',
      name: 'Mistral Medium',
      description: 'Balanced performance and cost',
      contextWindow: 32000,
    },
    {
      id: 'mistral-small-latest',
      name: 'Mistral Small',
      description: 'Fast and cost-effective',
      contextWindow: 32000,
    },
    {
      id: 'open-mistral-7b',
      name: 'Mistral 7B',
      description: 'Open-source 7B parameter model',
      contextWindow: 32000,
    },
    {
      id: 'open-mixtral-8x7b',
      name: 'Mixtral 8x7B',
      description: 'Open-source mixture of experts model',
      contextWindow: 32000,
    },
    {
      id: 'open-mixtral-8x22b',
      name: 'Mixtral 8x22B',
      description: 'Large open-source mixture of experts',
      contextWindow: 64000,
    },
    {
      id: 'codestral-latest',
      name: 'Codestral',
      description: 'Specialized for code generation',
      contextWindow: 32000,
    },
  ];

  private baseUrl = 'https://api.mistral.ai/v1';

  async complete(options: LLMCompletionOptions): Promise<string> {
    if (!this.config?.apiKey) {
      throw new Error('Mistral API key is required');
    }

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model: this.getSelectedModel(),
        messages: options.messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens ?? 2000,
        stream: options.stream ?? false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Mistral API error: ${error}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  async validateConfig(config: LLMProviderConfig): Promise<boolean> {
    if (!config.apiKey) return false;

    try {
      // Test with a simple completion
      const testOptions: LLMCompletionOptions = {
        messages: [{ role: 'user', content: 'Hi' }],
        maxTokens: 10,
      };

      // Temporarily set config for validation
      const originalConfig = this.config;
      this.config = config;

      await this.complete(testOptions);

      this.config = originalConfig;
      return true;
    } catch (error) {
      console.error('Mistral API key validation failed:', error);
      return false;
    }
  }

  async loadModels(apiKey: string): Promise<LLMModel[]> {
    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        console.error('Failed to load Mistral models, using defaults');
        return this.models;
      }

      const data = await response.json();

      // Map Mistral API response to our model format
      const dynamicModels =
        data.data?.map((model: any) => ({
          id: model.id,
          name: this.formatModelName(model.id),
          description: this.getModelDescription(model.id),
          contextWindow: this.getContextWindow(model.id),
        })) || this.models;

      return dynamicModels;
    } catch (error) {
      console.error('Error loading Mistral models:', error);
      return this.models;
    }
  }

  private formatModelName(modelId: string): string {
    return modelId
      .replace(/-latest$/, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l: string) => l.toUpperCase());
  }

  private getModelDescription(modelId: string): string {
    const descriptions: Record<string, string> = {
      'mistral-large-latest': 'Most capable model, best for complex tasks',
      'mistral-medium-latest': 'Balanced performance and cost',
      'mistral-small-latest': 'Fast and cost-effective',
      'open-mistral-7b': 'Open-source 7B parameter model',
      'open-mixtral-8x7b': 'Open-source mixture of experts model',
      'open-mixtral-8x22b': 'Large open-source mixture of experts',
      'codestral-latest': 'Specialized for code generation',
    };
    return descriptions[modelId] || 'Mistral AI model';
  }

  private getContextWindow(modelId: string): number {
    const contextWindows: Record<string, number> = {
      'mistral-large-latest': 128000,
      'mistral-medium-latest': 32000,
      'mistral-small-latest': 32000,
      'open-mistral-7b': 32000,
      'open-mixtral-8x7b': 32000,
      'open-mixtral-8x22b': 64000,
      'codestral-latest': 32000,
    };
    return contextWindows[modelId] || 32000;
  }

  getConfigInstructions(): string {
    return `
# Mistral AI Configuration

1. Visit https://console.mistral.ai/
2. Sign up or log in (European data residency)
3. Go to API Keys section
4. Create a new API key
5. Copy the key and add it to your settings

## Available Models:
- **Mistral Large**: Most capable, for complex tasks
- **Mistral Medium**: Balanced performance
- **Mistral Small**: Fast and efficient
- **Codestral**: Specialized for code
- **Open models**: 7B, 8x7B, 8x22B Mixtral

## Privacy & Compliance:
- 🇪🇺 Data stored in Europe (France)
- GDPR compliant
- No training on user data
- European AI Act compliant
    `.trim();
  }
}
