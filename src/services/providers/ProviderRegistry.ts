import { STTProvider, TTSProvider } from './types';
import { OpenAISTTProvider } from './openai/OpenAISTTProvider';
import { OpenAITTSProvider } from './openai/OpenAITTSProvider';
import { ElevenLabsTTSProvider } from './elevenlabs/ElevenLabsTTSProvider';
import { GoogleSTTProvider } from './google/GoogleSTTProvider';
import { GoogleTTSProvider } from './google/GoogleTTSProvider';

export class ProviderRegistry {
  private static sttProviders = new Map<string, STTProvider>();
  private static ttsProviders = new Map<string, TTSProvider>();
  private static initialized = false;
  
  private static initialize() {
    if (this.initialized) return;
    this.initialized = true; // Set flag BEFORE registering to prevent recursion
    
    // Register default providers
    this.sttProviders.set('openai-stt', new OpenAISTTProvider());
    this.sttProviders.set('google-stt', new GoogleSTTProvider());
    this.ttsProviders.set('openai-tts', new OpenAITTSProvider());
    this.ttsProviders.set('elevenlabs-tts', new ElevenLabsTTSProvider());
    this.ttsProviders.set('google-tts', new GoogleTTSProvider());
  }

  static registerSTTProvider(provider: STTProvider): void {
    this.sttProviders.set(provider.id, provider);
  }

  static registerTTSProvider(provider: TTSProvider): void {
    this.ttsProviders.set(provider.id, provider);
  }

  static getSTTProvider(id: string): STTProvider | undefined {
    this.initialize();
    return this.sttProviders.get(id);
  }

  static getTTSProvider(id: string): TTSProvider | undefined {
    this.initialize();
    return this.ttsProviders.get(id);
  }

  static getAllSTTProviders(): STTProvider[] {
    this.initialize();
    return Array.from(this.sttProviders.values());
  }

  static getAllTTSProviders(): TTSProvider[] {
    this.initialize();
    return Array.from(this.ttsProviders.values());
  }

  static getSTTProviderInfo() {
    this.initialize();
    return this.getAllSTTProviders().map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      requiresApiKey: p.requiresApiKey,
      models: p.models,
    }));
  }

  static getTTSProviderInfo() {
    this.initialize();
    return this.getAllTTSProviders().map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      requiresApiKey: p.requiresApiKey,
      models: p.models,
      voices: p.voices,
    }));
  }
}