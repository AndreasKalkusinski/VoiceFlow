import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import { handleApiError, ApplicationError, ErrorType, ErrorLogger } from '../utils/errorHandler';

export interface Model {
  id: string;
  object: string;
  created: number;
  owned_by: string;
}

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
          Authorization: `Bearer ${this.apiKey}`,
        },
      });
      return response.status === 200;
    } catch (error) {
      const appError = handleApiError(error);
      ErrorLogger.log(appError, { method: 'validateApiKey' });
      return false;
    }
  }

  async getAvailableModels(): Promise<Model[]> {
    try {
      const response = await axios.get(`${this.baseURL}/models`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });
      return response.data.data || [];
    } catch (error) {
      const appError = handleApiError(error);
      ErrorLogger.log(appError, { method: 'getAvailableModels' });
      throw appError;
    }
  }

  async getWhisperModels(): Promise<Model[]> {
    const models = await this.getAvailableModels();
    return models.filter((model) => model.id.includes('whisper') || model.id === 'whisper-1');
  }

  async getTTSModels(): Promise<Model[]> {
    const models = await this.getAvailableModels();
    return models.filter(
      (model) => model.id.includes('tts') || model.id === 'tts-1' || model.id === 'tts-1-hd',
    );
  }

  async transcribeAudio(audioUri: string, model: string = 'whisper-1'): Promise<string> {
    try {
      // Validate file exists
      const fileInfo = await FileSystem.getInfoAsync(audioUri);
      if (!fileInfo.exists) {
        throw new ApplicationError(
          ErrorType.VALIDATION,
          'Audio file does not exist',
          'FILE_NOT_FOUND',
          { audioUri },
        );
      }

      await FileSystem.readAsStringAsync(audioUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const formData = new FormData();
      formData.append('file', {
        uri: audioUri,
        type: 'audio/m4a',
        name: 'audio.m4a',
      } as any);
      formData.append('model', model);

      const response = await axios.post(`${this.baseURL}/audio/transcriptions`, formData, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.text;
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw error;
      }
      const appError = handleApiError(error);
      ErrorLogger.log(appError, { method: 'transcribeAudio', model });
      throw appError;
    }
  }

  static async transcribe(audioUri: string, apiKey: string, model: string = 'whisper-1'): Promise<string> {
    const service = new OpenAIService(apiKey);
    return service.transcribeAudio(audioUri, model);
  }

  async textToSpeech(
    text: string,
    model: string = 'tts-1',
    voice: string = 'alloy',
  ): Promise<string> {
    try {
      // Validate input
      if (!text || text.trim().length === 0) {
        throw new ApplicationError(ErrorType.VALIDATION, 'Text cannot be empty', 'EMPTY_TEXT');
      }

      if (text.length > 4096) {
        throw new ApplicationError(
          ErrorType.VALIDATION,
          'Text is too long (max 4096 characters)',
          'TEXT_TOO_LONG',
          { length: text.length },
        );
      }

      const response = await axios.post(
        `${this.baseURL}/audio/speech`,
        {
          model,
          input: text,
          voice,
          response_format: 'mp3',
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer',
        },
      );

      // Convert arraybuffer to base64 using Buffer polyfill
      const base64Audio = Buffer.from(response.data).toString('base64');

      // Use timestamp to avoid caching issues
      const audioUri = FileSystem.documentDirectory + `speech_${Date.now()}.mp3`;

      await FileSystem.writeAsStringAsync(audioUri, base64Audio, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Verify file was written
      const fileInfo = await FileSystem.getInfoAsync(audioUri);
      if (!fileInfo.exists) {
        throw new ApplicationError(
          ErrorType.STORAGE,
          'Failed to save audio file',
          'FILE_SAVE_ERROR',
        );
      }

      return audioUri;
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw error;
      }
      const appError = handleApiError(error);
      ErrorLogger.log(appError, { method: 'textToSpeech', model, voice });
      throw appError;
    }
  }
}
