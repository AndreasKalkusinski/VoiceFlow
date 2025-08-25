import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { STTModel, TTSModel, TTSVoice } from './providers/types';

const MODEL_CACHE_PREFIX = 'model_cache_';
const VOICE_CACHE_PREFIX = 'voice_cache_';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export interface CachedData<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export interface ModelServiceConfig {
  providerId: string;
  apiKey: string;
  baseURL: string;
}

export class ModelService {
  private static instance: ModelService;

  public static getInstance(): ModelService {
    if (!ModelService.instance) {
      ModelService.instance = new ModelService();
    }
    return ModelService.instance;
  }

  private constructor() {}

  /**
   * Get cached data if still valid, otherwise return null
   */
  private async getCachedData<T>(key: string): Promise<T | null> {
    try {
      const cachedString = await AsyncStorage.getItem(key);
      if (!cachedString) return null;

      const cached: CachedData<T> = JSON.parse(cachedString);
      const now = Date.now();

      // Check if cache is still valid
      if (now - cached.timestamp < cached.ttl) {
        return cached.data;
      }

      // Cache expired, remove it
      await AsyncStorage.removeItem(key);
      return null;
    } catch {
      // console.error('Error reading cache:', error);
      return null;
    }
  }

  /**
   * Cache data with TTL
   */
  private async setCachedData<T>(key: string, data: T, ttl: number = CACHE_TTL): Promise<void> {
    try {
      const cachedData: CachedData<T> = {
        data,
        timestamp: Date.now(),
        ttl,
      };
      await AsyncStorage.setItem(key, JSON.stringify(cachedData));
    } catch {
      // console.error('Error writing to cache:', error);
    }
  }

  /**
   * Clear all cached models for a provider
   */
  async clearProviderCache(providerId: string): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const providerKeys = keys.filter(
        (key) =>
          key.startsWith(`${MODEL_CACHE_PREFIX}${providerId}`) ||
          key.startsWith(`${VOICE_CACHE_PREFIX}${providerId}`),
      );

      if (providerKeys.length > 0) {
        await AsyncStorage.multiRemove(providerKeys);
      }
    } catch {
      // console.error('Error clearing provider cache:', error);
    }
  }

  /**
   * Clear all cached data
   */
  async clearAllCache(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(
        (key) => key.startsWith(MODEL_CACHE_PREFIX) || key.startsWith(VOICE_CACHE_PREFIX),
      );

      if (cacheKeys.length > 0) {
        await AsyncStorage.multiRemove(cacheKeys);
      }
    } catch {
      // console.error('Error clearing all cache:', error);
    }
  }

  /**
   * Fetch OpenAI models from API
   */
  async fetchOpenAIModels(apiKey: string, forceRefresh: boolean = false): Promise<STTModel[]> {
    const cacheKey = `${MODEL_CACHE_PREFIX}openai_stt_models`;

    // Check cache first unless force refresh
    if (!forceRefresh) {
      const cached = await this.getCachedData<STTModel[]>(cacheKey);
      if (cached) return cached;
    }

    try {
      const response = await axios.get('https://api.openai.com/v1/models', {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        timeout: 10000, // 10 second timeout
      });

      // Filter for Whisper models and format them
      const whisperModels = response.data.data
        .filter((model: unknown) => model.id.startsWith('whisper'))
        .map(
          (model: unknown): STTModel => ({
            id: model.id,
            name: this.formatModelName(model.id),
            description: 'OpenAI Whisper model for speech recognition',
            languages: [
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
            ],
          }),
        );

      // Cache the results
      await this.setCachedData(cacheKey, whisperModels);
      return whisperModels;
    } catch {
      // console.error('Failed to fetch OpenAI models:', error.response?.data || error.message);
      throw new Error('Failed to fetch OpenAI models');
    }
  }

  /**
   * Fetch Google Cloud TTS voices
   */
  async fetchGoogleVoices(apiKey: string, forceRefresh: boolean = false): Promise<TTSVoice[]> {
    const cacheKey = `${VOICE_CACHE_PREFIX}google_tts_voices`;

    // Check cache first unless force refresh
    if (!forceRefresh) {
      const cached = await this.getCachedData<TTSVoice[]>(cacheKey);
      if (cached) return cached;
    }

    try {
      const response = await axios.get(
        `https://texttospeech.googleapis.com/v1/voices?key=${apiKey}`,
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000,
        },
      );

      const voices = response.data.voices
        .filter((voice: unknown) => voice.name.includes('Neural2')) // Focus on Neural2 voices
        .map(
          (voice: unknown): TTSVoice => ({
            id: voice.name,
            name: this.formatGoogleVoiceName(voice.name),
            gender: this.mapGoogleGender(voice.ssmlGender),
            language: voice.languageCodes[0],
            description: `Google Neural2 voice for ${voice.languageCodes[0]}`,
          }),
        );

      // Cache the results
      await this.setCachedData(cacheKey, voices);
      return voices;
    } catch {
      // console.error('Failed to fetch Google voices:', error.response?.data || error.message);
      throw new Error('Failed to fetch Google Cloud voices');
    }
  }

  /**
   * Fetch ElevenLabs voices
   */
  async fetchElevenLabsVoices(apiKey: string, forceRefresh: boolean = false): Promise<TTSVoice[]> {
    const cacheKey = `${VOICE_CACHE_PREFIX}elevenlabs_tts_voices`;

    // Check cache first unless force refresh
    if (!forceRefresh) {
      const cached = await this.getCachedData<TTSVoice[]>(cacheKey);
      if (cached) return cached;
    }

    try {
      const response = await axios.get('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'xi-api-key': apiKey,
        },
        timeout: 10000,
      });

      const voices = response.data.voices.map(
        (voice: unknown): TTSVoice => ({
          id: voice.voice_id,
          name: voice.name,
          gender: this.inferGenderFromName(voice.name),
          description: voice.description || `ElevenLabs voice: ${voice.name}`,
          preview: voice.preview_url,
        }),
      );

      // Cache the results
      await this.setCachedData(cacheKey, voices);
      return voices;
    } catch {
      // console.error('Failed to fetch ElevenLabs voices:', error.response?.data || error.message);
      throw new Error('Failed to fetch ElevenLabs voices');
    }
  }

  /**
   * Get supported languages for Whisper models
   */
  private getSupportedLanguages(): string[] {
    return ['en', 'de', 'es', 'fr', 'it', 'pt', 'ru', 'zh', 'ja', 'ko'];
  }

  /**
   * Get fallback models for providers when API fails
   */
  getFallbackOpenAIModels(): STTModel[] {
    return [
      {
        id: 'whisper-1',
        name: 'Whisper v1',
        description: 'Latest Whisper model with improved accuracy',
        languages: this.getSupportedLanguages(),
      },
      {
        id: 'whisper-large-v3',
        name: 'Whisper Large v3',
        description: 'Most accurate Whisper model, slower processing',
        languages: this.getSupportedLanguages(),
      },
      {
        id: 'whisper-large-v2',
        name: 'Whisper Large v2',
        description: 'Previous large model version',
        languages: this.getSupportedLanguages(),
      },
    ];
  }

  getFallbackOpenAITTSModels(): TTSModel[] {
    return [
      {
        id: 'tts-1',
        name: 'TTS Standard',
        description: 'Optimized for speed and real-time use',
      },
      {
        id: 'tts-1-hd',
        name: 'TTS HD',
        description: 'Optimized for quality',
      },
      {
        id: 'gpt-4o-mini-tts',
        name: 'GPT-4o Mini TTS',
        description: 'Advanced model with better steerability',
      },
    ];
  }

  getFallbackOpenAITTSVoices(): TTSVoice[] {
    return [
      { id: 'alloy', name: 'Alloy', gender: 'neutral', description: 'Neutral and balanced' },
      { id: 'echo', name: 'Echo', gender: 'male', description: 'Warm and conversational' },
      { id: 'fable', name: 'Fable', gender: 'neutral', description: 'Expressive and dynamic' },
      { id: 'onyx', name: 'Onyx', gender: 'male', description: 'Deep and authoritative' },
      { id: 'nova', name: 'Nova', gender: 'female', description: 'Warm and friendly' },
      { id: 'shimmer', name: 'Shimmer', gender: 'female', description: 'Soft and gentle' },
    ];
  }

  getFallbackGoogleVoices(): TTSVoice[] {
    return [
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
        id: 'de-DE-Neural2-A',
        name: 'German Female A',
        gender: 'female',
        language: 'de-DE',
        description: 'Standard German',
      },
    ];
  }

  getFallbackGoogleModels(): TTSModel[] {
    return [
      {
        id: 'neural2',
        name: 'Neural2',
        description: 'Latest neural voices with best quality',
      },
      {
        id: 'wavenet',
        name: 'WaveNet',
        description: 'High-quality voices',
      },
      {
        id: 'standard',
        name: 'Standard',
        description: 'Basic quality, lower cost',
      },
    ];
  }

  getFallbackElevenLabsVoices(): TTSVoice[] {
    return [
      {
        id: '21m00Tcm4TlvDq8ikWAM',
        name: 'Rachel',
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
        id: 'EXAVITQu4vr4xnSDxMaL',
        name: 'Bella',
        gender: 'female',
        description: 'American, young adult',
      },
    ];
  }

  getFallbackElevenLabsModels(): TTSModel[] {
    return [
      {
        id: 'eleven_multilingual_v2',
        name: 'Multilingual v2',
        description: 'Latest multilingual model',
      },
      {
        id: 'eleven_turbo_v2',
        name: 'Turbo v2',
        description: 'Fastest model with good quality',
      },
    ];
  }

  // Helper methods for formatting
  private formatModelName(modelId: string): string {
    return modelId
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  private formatGoogleVoiceName(voiceName: string): string {
    const parts = voiceName.split('-');
    const locale = `${parts[0]}-${parts[1]}`;
    const type = parts[2];
    const variant = parts[3];

    return `${locale} ${type} ${variant}`;
  }

  private mapGoogleGender(ssmlGender: string): 'male' | 'female' | 'neutral' {
    switch (ssmlGender?.toLowerCase()) {
      case 'male':
        return 'male';
      case 'female':
        return 'female';
      default:
        return 'neutral';
    }
  }

  private inferGenderFromName(name: string): 'male' | 'female' | 'neutral' {
    const maleNames = ['adam', 'antoni', 'arnold', 'charlie', 'daniel', 'ethan', 'fin', 'josh'];
    const femaleNames = ['bella', 'domi', 'freya', 'grace', 'nicole', 'rachel', 'sarah', 'shimmer'];

    const lowerName = name.toLowerCase();

    if (maleNames.some((maleName) => lowerName.includes(maleName))) {
      return 'male';
    }
    if (femaleNames.some((femaleName) => lowerName.includes(femaleName))) {
      return 'female';
    }

    return 'neutral';
  }

  /**
   * Check if cache exists for a provider
   */
  async hasCachedData(providerId: string, type: 'models' | 'voices'): Promise<boolean> {
    const prefix = type === 'models' ? MODEL_CACHE_PREFIX : VOICE_CACHE_PREFIX;
    const cacheKey = `${prefix}${providerId}_${type}`;
    const cached = await this.getCachedData(cacheKey);
    return cached !== null;
  }

  /**
   * Get cache timestamp for debugging/display
   */
  async getCacheTimestamp(providerId: string, type: 'models' | 'voices'): Promise<Date | null> {
    try {
      const prefix = type === 'models' ? MODEL_CACHE_PREFIX : VOICE_CACHE_PREFIX;
      const cacheKey = `${prefix}${providerId}_${type}`;
      const cachedString = await AsyncStorage.getItem(cacheKey);

      if (!cachedString) return null;

      const cached: CachedData<any> = JSON.parse(cachedString);
      return new Date(cached.timestamp);
    } catch {
      return null;
    }
  }
}
