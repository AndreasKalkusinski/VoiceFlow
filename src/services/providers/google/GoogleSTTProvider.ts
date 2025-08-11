import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { BaseSTTProvider } from '../BaseProvider';
import { STTOptions, STTModel } from '../types';

export class GoogleSTTProvider extends BaseSTTProvider {
  id = 'google-stt';
  name = 'Google Cloud Speech';
  description = 'Powerful speech recognition by Google';
  requiresApiKey = true;

  models: STTModel[] = [
    {
      id: 'latest_long',
      name: 'Latest Long',
      description: 'Best for long audio content',
      languages: ['en-US', 'de-DE', 'es-ES', 'fr-FR', 'it-IT', 'pt-BR', 'ru-RU', 'ja-JP', 'ko-KR', 'zh-CN'],
    },
    {
      id: 'latest_short',
      name: 'Latest Short',
      description: 'Optimized for short audio clips',
      languages: ['en-US', 'de-DE', 'es-ES', 'fr-FR', 'it-IT', 'pt-BR', 'ru-RU', 'ja-JP', 'ko-KR', 'zh-CN'],
    },
    {
      id: 'command_and_search',
      name: 'Command and Search',
      description: 'Best for short queries or commands',
      languages: ['en-US', 'de-DE', 'es-ES', 'fr-FR', 'it-IT', 'pt-BR', 'ru-RU', 'ja-JP', 'ko-KR', 'zh-CN'],
    },
  ];

  supportedLanguages = [
    'en-US', 'en-GB', 'en-AU', 'en-IN',
    'de-DE', 'de-AT', 'de-CH',
    'es-ES', 'es-MX', 'es-AR',
    'fr-FR', 'fr-CA',
    'it-IT', 'pt-BR', 'pt-PT',
    'ru-RU', 'ja-JP', 'ko-KR',
    'zh-CN', 'zh-TW', 'zh-HK',
    'nl-NL', 'pl-PL', 'tr-TR',
    'sv-SE', 'no-NO', 'da-DK',
    'fi-FI', 'cs-CZ', 'ar-SA',
    'he-IL', 'hi-IN', 'th-TH',
  ];

  private baseURL = 'https://speech.googleapis.com/v1';

  async transcribe(audioUri: string, options: STTOptions): Promise<string> {
    if (!options.apiKey) {
      throw new Error('Google Cloud API key is required');
    }

    try {
      // Read audio file as base64
      const audioBase64 = await FileSystem.readAsStringAsync(audioUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const response = await axios.post(
        `${this.baseURL}/speech:recognize?key=${options.apiKey}`,
        {
          config: {
            encoding: 'WEBM_OPUS',
            sampleRateHertz: 48000,
            languageCode: options.language || 'en-US',
            model: options.model || 'latest_long',
            enableAutomaticPunctuation: true,
            enableWordTimeOffsets: false,
          },
          audio: {
            content: audioBase64,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.results && response.data.results.length > 0) {
        return response.data.results
          .map((result: any) => result.alternatives[0].transcript)
          .join(' ');
      }

      return '';
    } catch (error: any) {
      console.error('Google STT Error:', error.response?.data || error.message);
      throw new Error('Failed to transcribe audio with Google Cloud Speech');
    }
  }

  async validateConfig(config: any): Promise<boolean> {
    if (!config.apiKey) return false;
    
    // Google doesn't have a simple validation endpoint
    // We could try a minimal transcribe request
    return true;
  }
}