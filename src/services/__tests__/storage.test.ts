import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageService } from '../storage';

jest.mock('@react-native-async-storage/async-storage');

describe('StorageService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getApiKey', () => {
    it('should return stored API key', async () => {
      const mockSettings = {
        openaiApiKey: 'test-api-key-123',
        sttModel: 'whisper-1',
        ttsModel: 'tts-1',
        ttsVoice: 'alloy',
      };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockSettings));

      const result = await StorageService.getApiKey();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@voiceflow_settings');
      expect(result).toBe('test-api-key-123');
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
      const mockSettings = {
        openaiApiKey: '',
        sttModel: 'whisper-1',
        ttsModel: 'tts-1',
        ttsVoice: 'alloy',
      };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockSettings));
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

      await StorageService.setApiKey(apiKey);

      const expectedSettings = { ...mockSettings, openaiApiKey: apiKey };
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@voiceflow_settings',
        JSON.stringify(expectedSettings),
      );
    });

    it('should handle storage errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
      (AsyncStorage.setItem as jest.Mock).mockRejectedValue(new Error('Storage error'));

      await StorageService.setApiKey('test-key');

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getSelectedModel', () => {
    it('should return stored model', async () => {
      const mockSettings = {
        openaiApiKey: '',
        sttModel: 'gpt-4',
        ttsModel: 'tts-1',
        ttsVoice: 'alloy',
      };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockSettings));

      const result = await StorageService.getSelectedModel();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@voiceflow_settings');
      expect(result).toBe('gpt-4');
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
      const mockSettings = { openaiApiKey: '', sttModel: '', ttsModel: 'tts-1', ttsVoice: 'alloy' };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockSettings));
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

      await StorageService.setSelectedModel(model);

      const expectedSettings = { ...mockSettings, sttModel: model };
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@voiceflow_settings',
        JSON.stringify(expectedSettings),
      );
    });
  });

  describe('getSelectedVoice', () => {
    it('should return stored voice', async () => {
      const mockSettings = {
        openaiApiKey: '',
        sttModel: 'whisper-1',
        ttsModel: 'tts-1',
        ttsVoice: 'nova',
      };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockSettings));

      const result = await StorageService.getSelectedVoice();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@voiceflow_settings');
      expect(result).toBe('nova');
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
      const mockSettings = {
        openaiApiKey: '',
        sttModel: 'whisper-1',
        ttsModel: 'tts-1',
        ttsVoice: '',
      };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockSettings));
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

      await StorageService.setSelectedVoice(voice);

      const expectedSettings = { ...mockSettings, ttsVoice: voice };
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@voiceflow_settings',
        JSON.stringify(expectedSettings),
      );
    });
  });

  describe('getTTSModel', () => {
    it('should return stored TTS model', async () => {
      const mockSettings = {
        openaiApiKey: '',
        sttModel: 'whisper-1',
        ttsModel: 'tts-1-hd',
        ttsVoice: 'alloy',
      };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockSettings));

      const result = await StorageService.getTTSModel();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@voiceflow_settings');
      expect(result).toBe('tts-1-hd');
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
      const mockSettings = {
        openaiApiKey: '',
        sttModel: 'whisper-1',
        ttsModel: '',
        ttsVoice: 'alloy',
      };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockSettings));
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

      await StorageService.setTTSModel(model);

      const expectedSettings = { ...mockSettings, ttsModel: model };
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@voiceflow_settings',
        JSON.stringify(expectedSettings),
      );
    });
  });
});
