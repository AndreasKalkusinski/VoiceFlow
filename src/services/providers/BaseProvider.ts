import { STTProvider, TTSProvider, STTOptions, TTSOptions } from './types';

export abstract class BaseSTTProvider implements STTProvider {
  abstract id: string;
  abstract name: string;
  abstract description: string;
  abstract requiresApiKey: boolean;

  abstract transcribe(audioUri: string, options: STTOptions): Promise<string>;

  async validateConfig(config: any): Promise<boolean> {
    if (this.requiresApiKey && !config.apiKey) {
      return false;
    }
    return true;
  }
}

export abstract class BaseTTSProvider implements TTSProvider {
  abstract id: string;
  abstract name: string;
  abstract description: string;
  abstract requiresApiKey: boolean;

  abstract synthesize(text: string, options: TTSOptions): Promise<string>;

  async validateConfig(config: any): Promise<boolean> {
    if (this.requiresApiKey && !config.apiKey) {
      return false;
    }
    return true;
  }
}
