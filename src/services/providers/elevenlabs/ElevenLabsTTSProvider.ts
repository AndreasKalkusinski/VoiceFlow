import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import { BaseTTSProvider } from '../BaseProvider';
import { TTSOptions, TTSModel, TTSVoice } from '../types';

export class ElevenLabsTTSProvider extends BaseTTSProvider {
  id = 'elevenlabs-tts';
  name = 'ElevenLabs';
  description = 'Ultra-realistic AI voices';
  requiresApiKey = true;

  models: TTSModel[] = [
    {
      id: 'eleven_multilingual_v2',
      name: 'Multilingual v2',
      description: 'Latest multilingual model',
    },
    {
      id: 'eleven_monolingual_v1',
      name: 'English v1',
      description: 'Optimized for English',
    },
    {
      id: 'eleven_turbo_v2',
      name: 'Turbo v2',
      description: 'Fastest model with good quality',
    },
  ];

  voices: TTSVoice[] = [
    {
      id: '21m00Tcm4TlvDq8ikWAM',
      name: 'Rachel',
      gender: 'female',
      description: 'American, young adult',
    },
    {
      id: 'AZnzlk1XvdvUeBnXmlld',
      name: 'Domi',
      gender: 'female',
      description: 'American, young adult',
    },
    {
      id: 'EXAVITQu4vr4xnSDxMaL',
      name: 'Bella',
      gender: 'female',
      description: 'American, young adult',
    },
    {
      id: 'ErXwobaYiN019PkySvjV',
      name: 'Antoni',
      gender: 'male',
      description: 'American, young adult',
    },
    {
      id: 'VR6AewLTigWG4xSOukaG',
      name: 'Arnold',
      gender: 'male',
      description: 'American, middle-aged',
    },
    {
      id: 'pNInz6obpgDQGcFmaJgB',
      name: 'Adam',
      gender: 'male',
      description: 'American, middle-aged',
    },
  ];

  private baseURL = 'https://api.elevenlabs.io/v1';

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
