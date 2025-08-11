import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { BaseSTTProvider } from '../BaseProvider';
import { STTOptions, STTModel } from '../types';

export class OpenAISTTProvider extends BaseSTTProvider {
  id = 'openai-stt';
  name = 'OpenAI Whisper';
  description = 'Fast and accurate speech recognition by OpenAI';
  requiresApiKey = true;

  models: STTModel[] = [
    {
      id: 'whisper-1',
      name: 'Whisper v1',
      description: 'Latest Whisper model with excellent accuracy',
      languages: ['en', 'de', 'es', 'fr', 'it', 'pt', 'ru', 'zh', 'ja', 'ko'],
    },
  ];

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
    } catch (error: any) {
      console.error('OpenAI STT Error:', error.response?.data || error.message);
      throw new Error('Failed to transcribe audio with OpenAI');
    }
  }

  async validateConfig(config: any): Promise<boolean> {
    if (!config.apiKey) return false;

    try {
      const response = await axios.get(`${this.baseURL}/models`, {
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
        },
      });
      return response.status === 200;
    } catch (_error) {
      return false;
    }
  }
}
