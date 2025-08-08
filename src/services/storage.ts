import AsyncStorage from '@react-native-async-storage/async-storage';
import { Settings } from '../types';

const SETTINGS_KEY = '@voiceflow_settings';

const defaultSettings: Settings = {
  openaiApiKey: '',
  sttModel: 'whisper-1',
  ttsModel: 'tts-1',
  ttsVoice: 'alloy',
};

export const StorageService = {
  async getSettings(): Promise<Settings> {
    try {
      const jsonValue = await AsyncStorage.getItem(SETTINGS_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : defaultSettings;
    } catch (e) {
      console.error('Error loading settings:', e);
      return defaultSettings;
    }
  },

  async saveSettings(settings: Settings): Promise<void> {
    try {
      const jsonValue = JSON.stringify(settings);
      await AsyncStorage.setItem(SETTINGS_KEY, jsonValue);
    } catch (e) {
      console.error('Error saving settings:', e);
      throw e;
    }
  },

  async clearSettings(): Promise<void> {
    try {
      await AsyncStorage.removeItem(SETTINGS_KEY);
    } catch (e) {
      console.error('Error clearing settings:', e);
      throw e;
    }
  },
};