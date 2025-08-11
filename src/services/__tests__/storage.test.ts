import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageService } from '../storage';

jest.mock('@react-native-async-storage/async-storage');

describe('StorageService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getApiKey', () => {
    it('should return stored API key', async () => {
      const mockApiKey = 'test-api-key-123';
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(mockApiKey);

      const result = await StorageService.getApiKey();
      
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('openai_api_key');
      expect(result).toBe(mockApiKey);
    });

    it('should return null when no API key stored', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const result = await StorageService.getApiKey();
      
      expect(result).toBeNull();
    });

    it('should handle errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('Storage error'));

      const result = await StorageService.getApiKey();
      
      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('setApiKey', () => {
    it('should store API key', async () => {
      const apiKey = 'new-api-key-456';
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

      await StorageService.setApiKey(apiKey);
      
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('openai_api_key', apiKey);
    });

    it('should handle storage errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      (AsyncStorage.setItem as jest.Mock).mockRejectedValue(new Error('Storage error'));

      await StorageService.setApiKey('test-key');
      
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getSelectedModel', () => {
    it('should return stored model', async () => {
      const mockModel = 'gpt-4';
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(mockModel);

      const result = await StorageService.getSelectedModel();
      
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('selected_model');
      expect(result).toBe(mockModel);
    });

    it('should return default model when none stored', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const result = await StorageService.getSelectedModel();
      
      expect(result).toBe('whisper-1');
    });
  });

  describe('setSelectedModel', () => {
    it('should store selected model', async () => {
      const model = 'whisper-1';
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

      await StorageService.setSelectedModel(model);
      
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('selected_model', model);
    });
  });

  describe('getSelectedVoice', () => {
    it('should return stored voice', async () => {
      const mockVoice = 'nova';
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(mockVoice);

      const result = await StorageService.getSelectedVoice();
      
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('selected_voice');
      expect(result).toBe(mockVoice);
    });

    it('should return default voice when none stored', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const result = await StorageService.getSelectedVoice();
      
      expect(result).toBe('alloy');
    });
  });

  describe('setSelectedVoice', () => {
    it('should store selected voice', async () => {
      const voice = 'echo';
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

      await StorageService.setSelectedVoice(voice);
      
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('selected_voice', voice);
    });
  });

  describe('getTTSModel', () => {
    it('should return stored TTS model', async () => {
      const mockModel = 'tts-1-hd';
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(mockModel);

      const result = await StorageService.getTTSModel();
      
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('tts_model');
      expect(result).toBe(mockModel);
    });

    it('should return default TTS model when none stored', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const result = await StorageService.getTTSModel();
      
      expect(result).toBe('tts-1');
    });
  });

  describe('setTTSModel', () => {
    it('should store TTS model', async () => {
      const model = 'tts-1-hd';
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

      await StorageService.setTTSModel(model);
      
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('tts_model', model);
    });
  });
});