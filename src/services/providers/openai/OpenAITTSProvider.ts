import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import { BaseTTSProvider } from '../BaseProvider';
import { TTSOptions, TTSModel, TTSVoice } from '../types';
import { ModelService } from '../../ModelService';

export class OpenAITTSProvider extends BaseTTSProvider {
  id = 'openai-tts';
  name = 'OpenAI TTS';
  description = 'Natural-sounding voices by OpenAI';
  requiresApiKey = true;

  private _models: TTSModel[] | null = null;
  private _voices: TTSVoice[] | null = null;
  private _isLoadingModels = false;
  private _isLoadingVoices = false;
  private modelService = ModelService.getInstance();

  get models(): TTSModel[] {
    return this._models || this.modelService.getFallbackOpenAITTSModels();
  }

  get voices(): TTSVoice[] {
    return this._voices || this.modelService.getFallbackOpenAITTSVoices();
  }

  private baseURL = 'https://api.openai.com/v1';

  /**
   * Load models and voices dynamically from OpenAI API
   */
  async loadModelsAndVoices(
    apiKey: string,
    forceRefresh: boolean = false,
  ): Promise<{ models: TTSModel[]; voices: TTSVoice[] }> {
    if ((this._isLoadingModels || this._isLoadingVoices) && !forceRefresh) {
      return { models: this.models, voices: this.voices };
    }

    this._isLoadingModels = true;
    this._isLoadingVoices = true;

    try {
      // Try to fetch TTS models from the API
      const response = await axios.get(`${this.baseURL}/models`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        timeout: 10000,
      });

      // Filter for TTS models
      const ttsModels = response.data.data
        .filter(
          (model: unknown) =>
            model.id.includes('tts') ||
            model.id === 'gpt-4o-mini-tts' ||
            model.id === 'tts-1' ||
            model.id === 'tts-1-hd',
        )
        .map((model: unknown) => ({
          id: model.id,
          name: this.formatModelName(model.id),
          description: this.getModelDescription(model.id),
        }));

      // Use API models if found, otherwise use fallback
      this._models =
        ttsModels.length > 0 ? ttsModels : this.modelService.getFallbackOpenAITTSModels();

      // Voices are still static for OpenAI TTS
      this._voices = this.modelService.getFallbackOpenAITTSVoices();

      return {
        models: this._models || this.modelService.getFallbackOpenAITTSModels(),
        voices: this._voices || this.modelService.getFallbackOpenAITTSVoices(),
      };
    } catch (error) {
      console.error('Failed to load OpenAI TTS models/voices, using fallback:', error);
      const fallbackModels = this.modelService.getFallbackOpenAITTSModels();
      const fallbackVoices = this.modelService.getFallbackOpenAITTSVoices();

      if (!this._models) this._models = fallbackModels;
      if (!this._voices) this._voices = fallbackVoices;

      return { models: this._models || fallbackModels, voices: this._voices || fallbackVoices };
    } finally {
      this._isLoadingModels = false;
      this._isLoadingVoices = false;
    }
  }

  private formatModelName(modelId: string): string {
    switch (modelId) {
      case 'tts-1':
        return 'TTS Standard';
      case 'tts-1-hd':
        return 'TTS HD';
      case 'gpt-4o-mini-tts':
        return 'GPT-4o Mini TTS';
      default:
        return modelId.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    }
  }

  private getModelDescription(modelId: string): string {
    switch (modelId) {
      case 'tts-1':
        return 'Optimized for speed and real-time use';
      case 'tts-1-hd':
        return 'Optimized for quality';
      case 'gpt-4o-mini-tts':
        return 'Advanced model with better steerability';
      default:
        return 'Text-to-speech model';
    }
  }

  /**
   * Check if models/voices are currently being loaded
   */
  get isLoadingModels(): boolean {
    return this._isLoadingModels;
  }

  get isLoadingVoices(): boolean {
    return this._isLoadingVoices;
  }

  /**
   * Refresh models and voices
   */
  async refreshModelsAndVoices(
    apiKey: string,
  ): Promise<{ models: TTSModel[]; voices: TTSVoice[] }> {
    return this.loadModelsAndVoices(apiKey, true);
  }

  async synthesize(text: string, options: TTSOptions): Promise<string> {
    if (!options.apiKey) {
      throw new Error('OpenAI API key is required');
    }

    try {
      const response = await axios.post(
        `${this.baseURL}/audio/speech`,
        {
          model: options.model || 'tts-1',
          input: text,
          voice: options.voice || 'alloy',
          response_format: 'mp3',
          speed: options.speed || 1.0,
        },
        {
          headers: {
            Authorization: `Bearer ${options.apiKey}`,
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer',
        },
      );

      const base64Audio = Buffer.from(response.data).toString('base64');
      const audioUri = FileSystem.documentDirectory + `speech_${Date.now()}.mp3`;

      await FileSystem.writeAsStringAsync(audioUri, base64Audio, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return audioUri;
    } catch (error: unknown) {
      console.error('OpenAI TTS Error:', error.response?.data || error.message);
      throw new Error('Failed to synthesize speech with OpenAI');
    }
  }
}
