import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import { BaseTTSProvider } from '../BaseProvider';
import { TTSOptions, TTSModel, TTSVoice } from '../types';

export class OpenAITTSProvider extends BaseTTSProvider {
  id = 'openai-tts';
  name = 'OpenAI TTS';
  description = 'Natural-sounding voices by OpenAI';
  requiresApiKey = true;

  models: TTSModel[] = [
    {
      id: 'tts-1',
      name: 'TTS Standard',
      description: 'Optimized for speed',
    },
    {
      id: 'tts-1-hd',
      name: 'TTS HD',
      description: 'Optimized for quality',
    },
  ];

  voices: TTSVoice[] = [
    { id: 'alloy', name: 'Alloy', gender: 'neutral', description: 'Neutral and balanced' },
    { id: 'echo', name: 'Echo', gender: 'male', description: 'Warm and conversational' },
    { id: 'fable', name: 'Fable', gender: 'neutral', description: 'Expressive and dynamic' },
    { id: 'onyx', name: 'Onyx', gender: 'male', description: 'Deep and authoritative' },
    { id: 'nova', name: 'Nova', gender: 'female', description: 'Warm and friendly' },
    { id: 'shimmer', name: 'Shimmer', gender: 'female', description: 'Soft and gentle' },
  ];

  private baseURL = 'https://api.openai.com/v1';

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
            'Authorization': `Bearer ${options.apiKey}`,
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer',
        }
      );

      const base64Audio = Buffer.from(response.data).toString('base64');
      const audioUri = FileSystem.documentDirectory + `speech_${Date.now()}.mp3`;
      
      await FileSystem.writeAsStringAsync(
        audioUri,
        base64Audio,
        {
          encoding: FileSystem.EncodingType.Base64,
        }
      );

      return audioUri;
    } catch (error: any) {
      console.error('OpenAI TTS Error:', error.response?.data || error.message);
      throw new Error('Failed to synthesize speech with OpenAI');
    }
  }
}