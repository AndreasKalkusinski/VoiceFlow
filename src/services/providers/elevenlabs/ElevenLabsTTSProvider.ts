import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import { BaseTTSProvider } from '../BaseProvider';
import { TTSOptions, TTSModel, TTSVoice } from '../types';
import { ModelService } from '../../ModelService';

export class ElevenLabsTTSProvider extends BaseTTSProvider {
  id = 'elevenlabs-tts';
  name = 'ElevenLabs';
  description = 'Ultra-realistic AI voices';
  requiresApiKey = true;

  private _models: TTSModel[] | null = null;
  private _voices: TTSVoice[] | null = null;
  private _isLoadingModels = false;
  private _isLoadingVoices = false;
  private modelService = ModelService.getInstance();

  get models(): TTSModel[] {
    return this._models || this.modelService.getFallbackElevenLabsModels();
  }

  get voices(): TTSVoice[] {
    return this._voices || this.modelService.getFallbackElevenLabsVoices();
  }

  private baseURL = 'https://api.elevenlabs.io/v1';

  /**
   * Load models and voices from ElevenLabs API
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
      // Load models (static for ElevenLabs)
      const models = this.modelService.getFallbackElevenLabsModels();

      // Load voices from API
      const voices = await this.modelService.fetchElevenLabsVoices(apiKey, forceRefresh);

      this._models = models;
      this._voices = voices;

      return { models, voices };
    } catch (error) {
      console.error('Failed to load ElevenLabs models/voices, using fallback:', error);
      const fallbackModels = this.modelService.getFallbackElevenLabsModels();
      const fallbackVoices = this.modelService.getFallbackElevenLabsVoices();

      if (!this._models) this._models = fallbackModels;
      if (!this._voices) this._voices = fallbackVoices;

      return { models: this._models, voices: this._voices };
    } finally {
      this._isLoadingModels = false;
      this._isLoadingVoices = false;
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
      throw new Error('ElevenLabs API key is required');
    }

    try {
      const voiceId = options.voice || '21m00Tcm4TlvDq8ikWAM'; // Default to Rachel

      const response = await axios.post(
        `${this.baseURL}/text-to-speech/${voiceId}`,
        {
          text: text,
          model_id: options.model || 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.0,
            use_speaker_boost: true,
          },
        },
        {
          headers: {
            'xi-api-key': options.apiKey,
            'Content-Type': 'application/json',
            Accept: 'audio/mpeg',
          },
          responseType: 'arraybuffer',
        },
      );

      const base64Audio = Buffer.from(response.data).toString('base64');
      const audioUri = FileSystem.documentDirectory + `elevenlabs_${Date.now()}.mp3`;

      await FileSystem.writeAsStringAsync(audioUri, base64Audio, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return audioUri;
    } catch (error: any) {
      console.error('ElevenLabs TTS Error:', error.response?.data || error.message);
      throw new Error('Failed to synthesize speech with ElevenLabs');
    }
  }

  async validateConfig(config: any): Promise<boolean> {
    if (!config.apiKey) return false;

    try {
      const response = await axios.get(`${this.baseURL}/voices`, {
        headers: {
          'xi-api-key': config.apiKey,
        },
      });
      return response.status === 200;
    } catch {
      return false;
    }
  }
}
