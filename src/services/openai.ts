import axios from 'axios';
import * as FileSystem from 'expo-file-system';

export class OpenAIService {
  private apiKey: string;
  private baseURL = 'https://api.openai.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async validateApiKey(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseURL}/models`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });
      return response.status === 200;
    } catch (error) {
      console.error('API Key validation failed:', error);
      return false;
    }
  }

  async transcribeAudio(audioUri: string, model: string = 'whisper-1'): Promise<string> {
    try {
      const audioBase64 = await FileSystem.readAsStringAsync(audioUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const formData = new FormData();
      formData.append('file', {
        uri: audioUri,
        type: 'audio/m4a',
        name: 'audio.m4a',
      } as any);
      formData.append('model', model);

      const response = await axios.post(
        `${this.baseURL}/audio/transcriptions`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data.text;
    } catch (error) {
      console.error('Transcription failed:', error);
      throw new Error('Failed to transcribe audio');
    }
  }

  async textToSpeech(text: string, model: string = 'tts-1', voice: string = 'alloy'): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseURL}/audio/speech`,
        {
          model,
          input: text,
          voice,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer',
        }
      );

      const audioUri = FileSystem.documentDirectory + 'speech.mp3';
      await FileSystem.writeAsStringAsync(
        audioUri,
        Buffer.from(response.data).toString('base64'),
        {
          encoding: FileSystem.EncodingType.Base64,
        }
      );

      return audioUri;
    } catch (error) {
      console.error('Text to speech failed:', error);
      throw new Error('Failed to generate speech');
    }
  }
}