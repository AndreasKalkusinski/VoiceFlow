import { STTProvider, STTModel } from '../types';
import axios from 'axios';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

export class MistralSTTProvider implements STTProvider {
  readonly id = 'mistral-stt';
  readonly name = 'Mistral AI STT';
  readonly requiresApiKey = true;
  readonly supportsStreaming = false;
  readonly description = 'Mistral AI Speech-to-Text service';

  private apiKey: string = '';
  private baseURL = 'https://api.mistral.ai/v1';
  private _models: STTModel[] | null = null;

  // Static models as fallback - based on Mistral's Voxtral models
  private fallbackModels: STTModel[] = [
    {
      id: 'voxtral-mini-latest',
      name: 'Voxtral Mini Transcribe',
      description: 'State-of-the-art transcription model',
    },
    {
      id: 'voxtral-small-latest',
      name: 'Voxtral Small',
      description: 'State-of-the-art performance on speech and audio understanding',
    },
  ];

  // Property for UI display
  get models(): STTModel[] {
    return this._models || this.fallbackModels;
  }

  // Load models dynamically from API
  async loadModels(apiKey: string): Promise<STTModel[]> {
    try {
      const response = await axios.get(`${this.baseURL}/models`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        timeout: 5000,
      });

      // Filter for Voxtral STT models
      const sttModels =
        response.data.data
          ?.filter((model: any) => model.id.includes('voxtral'))
          .map((model: any) => ({
            id: model.id,
            name: this.formatModelName(model.id),
            description: this.getModelDescription(model.id),
          })) || [];

      // Deduplicate models by NAME (not ID) to avoid showing duplicates like voxtral-mini-latest and voxtral-mini-2507
      const modelMap = new Map<string, STTModel>();

      // Sort models to prefer 'latest' versions
      const sortedModels = sttModels.sort((a: STTModel, b: STTModel) => {
        if (a.id.includes('latest')) return -1;
        if (b.id.includes('latest')) return 1;
        return 0;
      });

      // Add models, deduplicating by name
      sortedModels.forEach((model: STTModel) => {
        const key = model.name; // Use name as key to deduplicate
        if (!modelMap.has(key)) {
          modelMap.set(key, model);
        }
      });

      // Convert Map back to array
      const uniqueModels = Array.from(modelMap.values());

      // If no API models found, use fallback
      this._models = uniqueModels.length > 0 ? uniqueModels : this.fallbackModels;
      return this._models;
    } catch {
      console.log('Using fallback Mistral STT models');
      this._models = this.fallbackModels;
      return this.fallbackModels;
    }
  }

  private formatModelName(modelId: string): string {
    switch (modelId) {
      case 'voxtral-mini-latest':
      case 'voxtral-mini-2507':
        return 'Voxtral Mini Transcribe';
      case 'voxtral-small-latest':
      case 'voxtral-small-2507':
        return 'Voxtral Small';
      default:
        return modelId.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
    }
  }

  private getModelDescription(modelId: string): string {
    if (modelId.includes('voxtral-mini')) {
      return 'State-of-the-art transcription model';
    } else if (modelId.includes('voxtral-small')) {
      return 'State-of-the-art performance on speech and audio understanding';
    }
    return `Mistral ${modelId} model`;
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

  async getAvailableModels(): Promise<STTModel[]> {
    // Mistral currently has one STT model
    return [
      {
        id: 'mistral-stt-v1',
        name: 'Mistral STT v1',
        description: 'Mistral AI speech recognition model',
        languages: ['en', 'fr', 'de', 'es', 'it', 'pt', 'nl', 'pl', 'ru', 'zh', 'ja', 'ko'],
      },
    ];
  }

  async transcribe(
    audioUri: string,
    options?: {
      apiKey?: string;
      language?: string;
      model?: string;
      prompt?: string;
    },
  ): Promise<string> {
    const apiKey = options?.apiKey || this.apiKey;
    if (!apiKey) {
      throw new Error('Mistral API key not configured');
    }

    try {
      const formData = new FormData();

      // Read the audio file
      if (Platform.OS === 'web') {
        const response = await fetch(audioUri);
        const blob = await response.blob();
        formData.append('file', blob, 'audio.m4a');
      } else {
        const fileInfo = await FileSystem.getInfoAsync(audioUri);
        if (!fileInfo.exists) {
          throw new Error('Audio file not found');
        }

        formData.append('file', {
          uri: audioUri,
          type: 'audio/m4a',
          name: 'audio.m4a',
        } as any);
      }

      formData.append('model', options?.model || 'voxtral-mini-latest');

      if (options?.language) {
        formData.append('language', options.language);
      }

      if (options?.prompt) {
        formData.append('prompt', options.prompt);
      }

      const response = await axios.post(`${this.baseURL}/audio/transcriptions`, formData, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000,
      });

      // Return only the text string, not the full object
      return response.data.text || '';
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('Invalid Mistral API key');
        }
        if (error.response?.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }
        throw new Error(error.response?.data?.error?.message || 'Transcription failed');
      }
      throw error;
    }
  }

  async transcribeStream(
    _audioStream: ReadableStream,
    _options?: {
      language?: string;
      model?: string;
    },
  ): Promise<AsyncIterableIterator<string>> {
    throw new Error('Streaming transcription not supported by Mistral STT');
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
