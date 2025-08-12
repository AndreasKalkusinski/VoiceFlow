import axios from 'axios';
import * as FileSystem from 'expo-file-system';
// Buffer import removed - not used
import { BaseTTSProvider } from '../BaseProvider';
import { TTSOptions, TTSModel, TTSVoice } from '../types';
import { ModelService } from '../../ModelService';

export class GoogleTTSProvider extends BaseTTSProvider {
  id = 'google-tts';
  name = 'Google Cloud TTS';
  description = 'Natural voices powered by Google';
  requiresApiKey = true;

  private _models: TTSModel[] | null = null;
  private _voices: TTSVoice[] | null = null;
  private _isLoadingModels = false;
  private _isLoadingVoices = false;
  private modelService = ModelService.getInstance();

  get models(): TTSModel[] {
    return this._models || this.modelService.getFallbackGoogleModels();
  }

  get voices(): TTSVoice[] {
    return this._voices || this.modelService.getFallbackGoogleVoices();
  }

  private fallbackVoices: TTSVoice[] = [
    // English voices
    {
      id: 'en-US-Neural2-A',
      name: 'US Female A',
      gender: 'female',
      language: 'en-US',
      description: 'American accent',
    },
    {
      id: 'en-US-Neural2-C',
      name: 'US Male C',
      gender: 'male',
      language: 'en-US',
      description: 'American accent',
    },
    {
      id: 'en-US-Neural2-D',
      name: 'US Male D',
      gender: 'male',
      language: 'en-US',
      description: 'American accent',
    },
    {
      id: 'en-US-Neural2-E',
      name: 'US Female E',
      gender: 'female',
      language: 'en-US',
      description: 'American accent',
    },
    {
      id: 'en-US-Neural2-F',
      name: 'US Female F',
      gender: 'female',
      language: 'en-US',
      description: 'American accent',
    },
    {
      id: 'en-GB-Neural2-A',
      name: 'UK Female A',
      gender: 'female',
      language: 'en-GB',
      description: 'British accent',
    },
    {
      id: 'en-GB-Neural2-B',
      name: 'UK Male B',
      gender: 'male',
      language: 'en-GB',
      description: 'British accent',
    },

    // German voices
    {
      id: 'de-DE-Neural2-A',
      name: 'German Female A',
      gender: 'female',
      language: 'de-DE',
      description: 'Standard German',
    },
    {
      id: 'de-DE-Neural2-B',
      name: 'German Male B',
      gender: 'male',
      language: 'de-DE',
      description: 'Standard German',
    },
    {
      id: 'de-DE-Neural2-C',
      name: 'German Female C',
      gender: 'female',
      language: 'de-DE',
      description: 'Standard German',
    },
    {
      id: 'de-DE-Neural2-D',
      name: 'German Male D',
      gender: 'male',
      language: 'de-DE',
      description: 'Standard German',
    },

    // Spanish voices
    {
      id: 'es-ES-Neural2-A',
      name: 'Spanish Female A',
      gender: 'female',
      language: 'es-ES',
      description: 'Spain Spanish',
    },
    {
      id: 'es-ES-Neural2-B',
      name: 'Spanish Male B',
      gender: 'male',
      language: 'es-ES',
      description: 'Spain Spanish',
    },
    {
      id: 'es-US-Neural2-A',
      name: 'US Spanish Female',
      gender: 'female',
      language: 'es-US',
      description: 'US Spanish',
    },
    {
      id: 'es-US-Neural2-B',
      name: 'US Spanish Male',
      gender: 'male',
      language: 'es-US',
      description: 'US Spanish',
    },
  ];

  private baseURL = 'https://texttospeech.googleapis.com/v1';

  /**
   * Load models and voices from Google Cloud API
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
      // Load models (static for Google)
      const models = this.modelService.getFallbackGoogleModels();

      // Load voices from API
      const voices = await this.modelService.fetchGoogleVoices(apiKey, forceRefresh);

      this._models = models;
      this._voices = voices;

      return { models, voices };
    } catch (error) {
      console.error('Failed to load Google models/voices, using fallback:', error);
      const fallbackModels = this.modelService.getFallbackGoogleModels();
      const fallbackVoices = this.modelService.getFallbackGoogleVoices();

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
      throw new Error('Google Cloud API key is required');
    }

    try {
      const voiceId = options.voice || 'en-US-Neural2-A';
      const voiceType = options.model || 'neural2';

      // Extract language code from voice ID
      const languageCode = voiceId.split('-').slice(0, 2).join('-');

      // Determine voice name based on model type
      let voiceName = voiceId;
      if (!voiceId.includes(voiceType.toUpperCase())) {
        // Adjust voice name to match model type
        voiceName = voiceId.replace(
          /Neural2|Wavenet|Standard/i,
          voiceType.charAt(0).toUpperCase() + voiceType.slice(1),
        );
      }

      const response = await axios.post(
        `${this.baseURL}/text:synthesize?key=${options.apiKey}`,
        {
          input: {
            text: text,
          },
          voice: {
            languageCode: languageCode,
            name: voiceName,
            ssmlGender: this.getGenderFromVoiceId(voiceId),
          },
          audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: options.speed || 1.0,
            pitch: options.pitch || 0.0,
            volumeGainDb: 0.0,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const audioContent = response.data.audioContent;
      const audioUri = FileSystem.documentDirectory + `google_tts_${Date.now()}.mp3`;

      await FileSystem.writeAsStringAsync(audioUri, audioContent, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return audioUri;
    } catch (error: any) {
      console.error('Google TTS Error:', error.response?.data || error.message);
      throw new Error('Failed to synthesize speech with Google Cloud TTS');
    }
  }

  private getGenderFromVoiceId(voiceId: string): string {
    const voice = this.voices.find((v) => v.id === voiceId);
    if (voice?.gender === 'male') return 'MALE';
    if (voice?.gender === 'female') return 'FEMALE';
    return 'NEUTRAL';
  }

  async validateConfig(config: any): Promise<boolean> {
    if (!config.apiKey) return false;

    try {
      // Try to list voices as a validation check
      const response = await axios.get(`${this.baseURL}/voices?key=${config.apiKey}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.status === 200;
    } catch {
      return false;
    }
  }
}
