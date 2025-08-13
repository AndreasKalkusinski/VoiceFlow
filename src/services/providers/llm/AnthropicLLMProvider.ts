import {
  BaseLLMProvider,
  LLMModel,
  LLMProviderConfig,
  LLMCompletionOptions,
} from './BaseLLMProvider';

export class AnthropicLLMProvider extends BaseLLMProvider {
  id = 'anthropic-llm';
  name = 'Anthropic Claude';
  description = 'Claude AI models from Anthropic';
  requiresApiKey = true;

  models: LLMModel[] = [
    {
      id: 'claude-3-5-sonnet-20241022',
      name: 'Claude 3.5 Sonnet',
      description: 'Most intelligent model, best for complex tasks',
      maxTokens: 8192,
      contextWindow: 200000,
    },
    {
      id: 'claude-3-5-haiku-20241022',
      name: 'Claude 3.5 Haiku',
      description: 'Fast and efficient for everyday tasks',
      maxTokens: 8192,
      contextWindow: 200000,
    },
    {
      id: 'claude-3-opus-20240229',
      name: 'Claude 3 Opus',
      description: 'Powerful model for complex analysis',
      maxTokens: 4096,
      contextWindow: 200000,
    },
    {
      id: 'claude-3-sonnet-20240229',
      name: 'Claude 3 Sonnet',
      description: 'Balanced performance and cost',
      maxTokens: 4096,
      contextWindow: 200000,
    },
    {
      id: 'claude-3-haiku-20240307',
      name: 'Claude 3 Haiku',
      description: 'Fastest and most affordable',
      maxTokens: 4096,
      contextWindow: 200000,
    },
  ];

  async complete(options: LLMCompletionOptions): Promise<string> {
    if (!this.config?.apiKey) {
      throw new Error('API key is required');
    }

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.config.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: this.config.model || 'claude-3-5-haiku-20241022',
          messages: options.messages.filter((m) => m.role !== 'system'), // Anthropic doesn't use system role
          system: options.messages.find((m) => m.role === 'system')?.content,
          max_tokens: 1000, // Fixed value for Anthropic
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async validateConfig(config: LLMProviderConfig): Promise<boolean> {
    if (!config.apiKey) return false;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          messages: [{ role: 'user', content: 'Hi' }],
          max_tokens: 1,
        }),
      });

      // Anthropic returns 401 for invalid API keys
      return response.status !== 401;
    } catch {
      return false;
    }
  }
}
