import { useState, useEffect, useCallback } from 'react';
import { STTModel, TTSModel, TTSVoice } from '../services/providers/types';
import { OpenAISTTProvider } from '../services/providers/openai/OpenAISTTProvider';
import { OpenAITTSProvider } from '../services/providers/openai/OpenAITTSProvider';
import { GoogleTTSProvider } from '../services/providers/google/GoogleTTSProvider';
import { ElevenLabsTTSProvider } from '../services/providers/elevenlabs/ElevenLabsTTSProvider';

export interface UseModelLoaderResult {
  models: (STTModel | TTSModel)[];
  voices: TTSVoice[];
  loading: boolean;
  error: string | null;
  refreshModels: () => Promise<void>;
  lastRefresh: Date | null;
}

export interface UseModelLoaderParams {
  providerId: string;
  apiKey: string;
  autoLoad?: boolean;
}

export function useModelLoader({
  providerId,
  apiKey,
  autoLoad = true,
}: UseModelLoaderParams): UseModelLoaderResult {
  const [models, setModels] = useState<(STTModel | TTSModel)[]>([]);
  const [voices, setVoices] = useState<TTSVoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  // Get the appropriate provider instance
  const getProvider = useCallback(() => {
    switch (providerId) {
      case 'openai-stt':
        return new OpenAISTTProvider();
      case 'openai-tts':
        return new OpenAITTSProvider();
      case 'google-tts':
        return new GoogleTTSProvider();
      case 'elevenlabs-tts':
        return new ElevenLabsTTSProvider();
      default:
        return null;
    }
  }, [providerId]);

  const loadModels = useCallback(
    async (forceRefresh: boolean = false) => {
      if (!apiKey || !providerId) {
        setError('API key and provider ID are required');
        return;
      }

      const provider = getProvider();
      if (!provider) {
        setError(`Unsupported provider: ${providerId}`);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        if (providerId === 'openai-stt') {
          const sttProvider = provider as OpenAISTTProvider;
          const loadedModels = await sttProvider.loadModels(apiKey, forceRefresh);
          setModels(loadedModels);
          setVoices([]);
        } else if (providerId === 'openai-tts') {
          const ttsProvider = provider as OpenAITTSProvider;
          const { models: loadedModels, voices: loadedVoices } =
            await ttsProvider.loadModelsAndVoices(apiKey, forceRefresh);
          setModels(loadedModels);
          setVoices(loadedVoices);
        } else if (providerId === 'google-tts') {
          const ttsProvider = provider as GoogleTTSProvider;
          const { models: loadedModels, voices: loadedVoices } =
            await ttsProvider.loadModelsAndVoices(apiKey, forceRefresh);
          setModels(loadedModels);
          setVoices(loadedVoices);
        } else if (providerId === 'elevenlabs-tts') {
          const ttsProvider = provider as ElevenLabsTTSProvider;
          const { models: loadedModels, voices: loadedVoices } =
            await ttsProvider.loadModelsAndVoices(apiKey, forceRefresh);
          setModels(loadedModels);
          setVoices(loadedVoices);
        }

        setLastRefresh(new Date());
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load models';
        setError(errorMessage);
        console.error('Failed to load models:', err);

        // Set fallback models/voices in case of error
        if (providerId === 'openai-stt') {
          setModels((provider as OpenAISTTProvider).models);
          setVoices([]);
        } else {
          const ttsProvider = provider as
            | OpenAITTSProvider
            | GoogleTTSProvider
            | ElevenLabsTTSProvider;
          setModels(ttsProvider.models);
          setVoices(ttsProvider.voices);
        }
      } finally {
        setLoading(false);
      }
    },
    [apiKey, providerId, getProvider],
  );

  const refreshModels = useCallback(() => {
    return loadModels(true);
  }, [loadModels]);

  // Auto-load models on mount or when dependencies change
  useEffect(() => {
    if (autoLoad && apiKey && providerId) {
      loadModels(false);
    }
  }, [autoLoad, apiKey, providerId, loadModels]);

  // Initialize with fallback models immediately
  useEffect(() => {
    const provider = getProvider();
    if (provider && models.length === 0) {
      if (providerId === 'openai-stt') {
        setModels((provider as OpenAISTTProvider).models);
        setVoices([]);
      } else {
        const ttsProvider = provider as
          | OpenAITTSProvider
          | GoogleTTSProvider
          | ElevenLabsTTSProvider;
        setModels(ttsProvider.models);
        setVoices(ttsProvider.voices);
      }
    }
  }, [providerId, getProvider, models.length]);

  return {
    models,
    voices,
    loading,
    error,
    refreshModels,
    lastRefresh,
  };
}
