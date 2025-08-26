import { TTSProvider, TTSModel, TTSVoice } from '../types';
import axios from 'axios';

export class MistralTTSProvider implements TTSProvider {
  readonly id = 'mistral-tts';
  readonly name = 'Mistral AI TTS';
  readonly requiresApiKey = true;
  readonly supportsStreaming = true;
  readonly supportsSSML = false;
  readonly description = 'Mistral AI Text-to-Speech service';

  private apiKey: string = '';
  private baseURL = 'https://api.mistral.ai/v1';

  private _models: TTSModel[] = [];
  private _voices: TTSVoice[] = [];

  // Static models as fallback
  private fallbackModels: TTSModel[] = [
    {
      id: 'mistral-tts-v1',
      name: 'Mistral TTS v1',
      description: 'Standard quality Mistral TTS model',
    },
    {
      id: 'mistral-tts-hd',
      name: 'Mistral TTS HD',
      description: 'High quality Mistral TTS model',
    },
  ];

  // Static voices as fallback
  private fallbackVoices: TTSVoice[] = [
    {
      id: 'emma',
      name: 'Emma',
      gender: 'female' as const,
      language: 'en',
      description: 'Clear and friendly female voice',
    },
    {
      id: 'sophia',
      name: 'Sophia',
      gender: 'female' as const,
      language: 'en',
      description: 'Professional British female voice',
    },
    {
      id: 'clara',
      name: 'Clara',
      gender: 'female' as const,
      language: 'fr',
      description: 'Natural French female voice',
    },
    {
      id: 'james',
      name: 'James',
      gender: 'male' as const,
      language: 'en',
      description: 'Deep and clear male voice',
    },
    {
      id: 'oliver',
      name: 'Oliver',
      gender: 'male' as const,
      language: 'en',
      description: 'British male voice',
    },
    {
      id: 'pierre',
      name: 'Pierre',
      gender: 'male' as const,
      language: 'fr',
      description: 'French male voice',
    },
    {
      id: 'alex',
      name: 'Alex',
      gender: 'neutral' as const,
      language: 'en',
      description: 'Neutral voice suitable for any content',
    },
  ];

  // Properties for UI display
  get models(): TTSModel[] {
    return this._models || this.fallbackModels;
  }

  get voices(): TTSVoice[] {
    return this._voices || this.fallbackVoices;
  }

  // Load models and voices dynamically from API
  async loadModelsAndVoices(apiKey: string): Promise<{ models: TTSModel[]; voices: TTSVoice[] }> {
    try {
      const response = await axios.get(`${this.baseURL}/models`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        timeout: 5000,
      });

      // Filter for TTS models if API returns them
      const ttsModels =
        response.data.data
          ?.filter((model: any) => model.id.includes('tts') || model.id.includes('speech'))
          .map((model: any) => ({
            id: model.id,
            name: model.id.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
            description: `Mistral ${model.id} model`,
          })) || [];

      // Use API models if found, otherwise use fallback
      this._models = ttsModels.length > 0 ? ttsModels : this.fallbackModels;
      this._voices = this.fallbackVoices; // Voices are still static for now

      return { models: this._models, voices: this._voices };
    } catch {
      console.log('Using fallback Mistral TTS models and voices');
      this._models = this.fallbackModels;
      this._voices = this.fallbackVoices;
      return { models: this.fallbackModels, voices: this.fallbackVoices };
    }
  }

  async initialize(config: { apiKey: string }): Promise<void> {
    this.apiKey = config.apiKey;
    if (!this.apiKey) {
      throw new Error('Mistral API key is required');
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseURL}/models`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
        timeout: 5000,
      });
      return response.status === 200;
    } catch {
      return false;
    }
  }

  async getAvailableModels(): Promise<TTSModel[]> {
    return [
      {
        id: 'mistral-tts-v1',
        name: 'Mistral TTS v1',
        description: 'Standard quality Mistral TTS model',
      },
      {
        id: 'mistral-tts-hd',
        name: 'Mistral TTS HD',
        description: 'High quality Mistral TTS model',
      },
    ];
  }

  async getAvailableVoices(_model?: string): Promise<TTSVoice[]> {
    // Mistral TTS voices
    return [
      // Female voices
      {
        id: 'emma',
        name: 'Emma',
        gender: 'female',
        language: 'en',
        description: 'Clear and friendly female voice',
      },
      {
        id: 'sophia',
        name: 'Sophia',
        gender: 'female',
        language: 'en',
        description: 'Professional British female voice',
      },
      {
        id: 'clara',
        name: 'Clara',
        gender: 'female',
        language: 'fr',
        description: 'Natural French female voice',
      },
      // Male voices
      {
        id: 'james',
        name: 'James',
        gender: 'male',
        language: 'en',
        description: 'Deep and clear male voice',
      },
      {
        id: 'oliver',
        name: 'Oliver',
        gender: 'male',
        language: 'en',
        description: 'British male voice',
      },
      {
        id: 'pierre',
        name: 'Pierre',
        gender: 'male',
        language: 'fr',
        description: 'French male voice',
      },
      // Neutral voice
      {
        id: 'alex',
        name: 'Alex',
        gender: 'neutral',
        language: 'en',
        description: 'Neutral voice suitable for any content',
      },
    ];
  }

  async synthesize(
    text: string,
    options?: {
      apiKey?: string;
      voice?: string;
      model?: string;
      speed?: number;
      pitch?: number;
      format?: 'mp3' | 'wav' | 'ogg';
      sampleRate?: number;
    },
  ): Promise<any> {
    const apiKey = options?.apiKey || this.apiKey;
    if (!apiKey) {
      throw new Error('Mistral API key not configured');
    }

    try {
      // Note: Mistral doesn't have a real TTS API endpoint yet
      // This is a placeholder implementation
      throw new Error(
        'Mistral TTS is not yet available. Mistral AI currently only provides LLM services.',
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('Invalid Mistral API key');
        }
        if (error.response?.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }
        throw new Error(error.response?.data?.error?.message || 'Synthesis failed');
      }
      throw error;
    }
  }

  async synthesizeStream(
    text: string,
    options?: {
      apiKey?: string;
      voice?: string;
      model?: string;
      speed?: number;
    },
  ): Promise<ReadableStream> {
    const apiKey = options?.apiKey || this.apiKey;
    if (!apiKey) {
      throw new Error('Mistral API key not configured');
    }

    const response = await fetch(`${this.baseURL}/audio/speech`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: options?.model || 'mistral-tts-v1',
        input: text,
        voice: options?.voice || 'emma',
        response_format: 'mp3',
        speed: options?.speed || 1.0,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Mistral TTS streaming failed: ${response.statusText}`);
    }

    return response.body!;
  }

  async validateConfig(config: { apiKey: string }): Promise<boolean> {
    if (!config.apiKey) return false;

    try {
      const response = await axios.get(`${this.baseURL}/models`, {
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
        },
        timeout: 5000,
      });
      return response.status === 200;
    } catch {
      return false;
    }
  }

  dispose(): void {
    this.apiKey = '';
  }
}
