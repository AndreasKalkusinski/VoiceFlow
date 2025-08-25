import axios from 'axios';
import { BaseSTTProvider } from '../BaseProvider';
import { STTOptions, STTModel } from '../types';
import { ModelService } from '../../ModelService';

export class OpenAISTTProvider extends BaseSTTProvider {
  id = 'openai-stt';
  name = 'OpenAI Whisper';
  description = 'Fast and accurate speech recognition by OpenAI';
  requiresApiKey = true;

  private _models: STTModel[] | null = null;
  private _isLoadingModels = false;
  private modelService = ModelService.getInstance();

  get models(): STTModel[] {
    return this._models || this.modelService.getFallbackOpenAIModels();
  }

  supportedLanguages = [
    'en',
    'de',
    'es',
    'fr',
    'it',
    'pt',
    'ru',
    'zh',
    'ja',
    'ko',
    'nl',
    'tr',
    'pl',
    'sv',
    'no',
    'fi',
    'da',
    'cs',
    'ar',
    'he',
  ];

  private baseURL = 'https://api.openai.com/v1';

  /**
   * Load models from OpenAI API
   */
  async loadModels(apiKey: string, forceRefresh: boolean = false): Promise<STTModel[]> {
    if (this._isLoadingModels && !forceRefresh) {
      // Return current models if already loading
      return this.models;
    }

    this._isLoadingModels = true;

    try {
      const fetchedModels = await this.modelService.fetchOpenAIModels(apiKey, forceRefresh);
      this._models = fetchedModels;
      return fetchedModels;
    } catch (error) {
      console.error('Failed to load OpenAI models, using fallback:', error);
      const fallbackModels = this.modelService.getFallbackOpenAIModels();
      if (!this._models) {
        this._models = fallbackModels;
      }
      return this._models;
    } finally {
      this._isLoadingModels = false;
    }
  }

  /**
   * Check if models are currently being loaded
   */
  get isLoadingModels(): boolean {
    return this._isLoadingModels;
  }

  /**
   * Refresh models from API
   */
  async refreshModels(apiKey: string): Promise<STTModel[]> {
    return this.loadModels(apiKey, true);
  }

  async transcribe(audioUri: string, options: STTOptions): Promise<string> {
    if (!options.apiKey) {
      throw new Error('OpenAI API key is required');
    }

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: audioUri,
        type: 'audio/m4a',
        name: 'audio.m4a',
      } as any);
      formData.append('model', options.model || 'whisper-1');

      if (options.language) {
        formData.append('language', options.language);
      }

      const response = await axios.post(`${this.baseURL}/audio/transcriptions`, formData, {
        headers: {
          Authorization: `Bearer ${options.apiKey}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.text;
    } catch (error: unknown) {
      console.error('OpenAI STT Error:', error.response?.data || error.message);
      throw new Error('Failed to transcribe audio with OpenAI');
    }
  }

  async validateConfig(config: unknown): Promise<boolean> {
    if (!config.apiKey) return false;

    try {
      const response = await axios.get(`${this.baseURL}/models`, {
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
        },
      });
      return response.status === 200;
    } catch {
      return false;
    }
  }
}
