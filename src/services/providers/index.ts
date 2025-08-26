// STT Providers
export { OpenAISTTProvider } from './openai/OpenAISTTProvider';
export { GoogleSTTProvider } from './google/GoogleSTTProvider';
export { MistralSTTProvider } from './mistral/MistralSTTProvider';

// TTS Providers
export { OpenAITTSProvider } from './openai/OpenAITTSProvider';
export { GoogleTTSProvider } from './google/GoogleTTSProvider';
export { ElevenLabsTTSProvider } from './elevenlabs/ElevenLabsTTSProvider';
export { MistralTTSProvider } from './mistral/MistralTTSProvider';

// LLM Providers
export { OpenAILLMProvider } from './llm/OpenAILLMProvider';
export { GoogleGeminiProvider as GoogleLLMProvider } from './llm/GoogleGeminiProvider';
export { AnthropicLLMProvider } from './llm/AnthropicLLMProvider';
export { MistralProvider as MistralLLMProvider } from './llm/MistralProvider';

// Provider registry
import { STTProvider, TTSProvider, LLMProvider } from './types';
import { OpenAISTTProvider } from './openai/OpenAISTTProvider';
import { GoogleSTTProvider } from './google/GoogleSTTProvider';
import { MistralSTTProvider } from './mistral/MistralSTTProvider';
import { OpenAITTSProvider } from './openai/OpenAITTSProvider';
import { GoogleTTSProvider } from './google/GoogleTTSProvider';
import { ElevenLabsTTSProvider } from './elevenlabs/ElevenLabsTTSProvider';
import { MistralTTSProvider } from './mistral/MistralTTSProvider';
import { OpenAILLMProvider } from './llm/OpenAILLMProvider';
import { GoogleGeminiProvider as GoogleLLMProvider } from './llm/GoogleGeminiProvider';
import { AnthropicLLMProvider } from './llm/AnthropicLLMProvider';
import { MistralProvider as MistralLLMProvider } from './llm/MistralProvider';

export const STT_PROVIDERS: STTProvider[] = [
  new OpenAISTTProvider(),
  new GoogleSTTProvider(),
  new MistralSTTProvider(),
];

export const TTS_PROVIDERS: TTSProvider[] = [
  new OpenAITTSProvider(),
  new GoogleTTSProvider(),
  new ElevenLabsTTSProvider(),
  new MistralTTSProvider(),
];

export const LLM_PROVIDERS: LLMProvider[] = [
  new OpenAILLMProvider(),
  new GoogleLLMProvider(),
  new AnthropicLLMProvider(),
  new MistralLLMProvider(),
];

export function getSTTProvider(id: string): STTProvider | undefined {
  return STT_PROVIDERS.find((provider) => provider.id === id);
}

export function getTTSProvider(id: string): TTSProvider | undefined {
  return TTS_PROVIDERS.find((provider) => provider.id === id);
}

export function getLLMProvider(id: string): LLMProvider | undefined {
  return LLM_PROVIDERS.find((provider) => provider.id === id);
}
