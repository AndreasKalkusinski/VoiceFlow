import {
  BaseLLMProvider,
  LLMModel,
  LLMProviderConfig,
  LLMCompletionOptions,
} from './BaseLLMProvider';

export class GoogleGeminiProvider extends BaseLLMProvider {
  id = 'google-gemini';
  name = 'Google Gemini';
  description = "Google's most capable AI models";
  requiresApiKey = true;

  models: LLMModel[] = [
    {
      id: 'gemini-1.5-pro',
      name: 'Gemini 1.5 Pro',
      description: 'Most capable model for complex tasks',
      contextWindow: 2097152, // 2M tokens
      maxTokens: 8192,
    },
    {
      id: 'gemini-1.5-flash',
      name: 'Gemini 1.5 Flash',
      description: 'Fast and versatile performance',
      contextWindow: 1048576, // 1M tokens
      maxTokens: 8192,
    },
    {
      id: 'gemini-1.0-pro',
      name: 'Gemini 1.0 Pro',
      description: 'Balanced performance and efficiency',
      contextWindow: 32768,
      maxTokens: 8192,
    },
  ];

  async complete(options: LLMCompletionOptions): Promise<string> {
    if (!this.config?.apiKey) {
      throw new Error('API key is required');
    }

    const model = this.getSelectedModel();
    const baseUrl = 'https://generativelanguage.googleapis.com/v1';

    try {
      // Convert messages to Gemini format
      const contents = options.messages.map((msg) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }));

      // Handle system message differently for Gemini
      const systemMessage = options.messages.find((m) => m.role === 'system');

      const finalContents = contents.filter((c) => c.role !== 'system');
      if (systemMessage) {
        // Prepend system message to first user message
        if (finalContents.length > 0 && finalContents[0].role === 'user') {
          finalContents[0].parts[0].text = `${systemMessage.content}\n\n${finalContents[0].parts[0].text}`;
        }
      }

      const response = await fetch(
        `${baseUrl}/models/${model}:generateContent?key=${this.config.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: finalContents,
            safetySettings: [
              {
                category: 'HARM_CATEGORY_HATE_SPEECH',
                threshold: 'BLOCK_ONLY_HIGH',
              },
              {
                category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                threshold: 'BLOCK_ONLY_HIGH',
              },
              {
                category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                threshold: 'BLOCK_ONLY_HIGH',
              },
              {
                category: 'HARM_CATEGORY_HARASSMENT',
                threshold: 'BLOCK_ONLY_HIGH',
              },
            ],
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No response generated');
      }

      const content = data.candidates[0].content?.parts?.[0]?.text;
      if (!content) {
        throw new Error('Empty response from Gemini');
      }

      return content.trim();
    } catch (error) {
      this.handleError(error);
    }
  }

  async validateConfig(config: LLMProviderConfig): Promise<boolean> {
    if (!config.apiKey) {
      return false;
    }

    try {
      // Test with a simple prompt
      await this.complete({
        messages: [{ role: 'user', content: 'Say "test" if you are working.' }],
      });
      return true;
    } catch {
      return false;
    }
  }

  async loadModels(apiKey: string): Promise<LLMModel[]> {
    try {
      this.isLoadingModels = true;

      // List available models from Google API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch models');
      }

      const data = await response.json();

      // Filter for Gemini models
      const geminiModels =
        data.models
          ?.filter((m: any) => m.name.includes('gemini'))
          ?.map((m: any) => ({
            id: m.name.replace('models/', ''),
            name: m.displayName || m.name.replace('models/', ''),
            description: m.description || `${m.name} model`,
            contextWindow: m.inputTokenLimit || 32768,
            maxTokens: m.outputTokenLimit || 8192,
          })) || [];

      if (geminiModels.length > 0) {
        this.models = geminiModels;
      }

      return this.models;
    } catch {
      // Return default models if API call fails
      return this.models;
    } finally {
      this.isLoadingModels = false;
    }
  }
}
