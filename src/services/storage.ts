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

  // Legacy methods for backward compatibility
  async getApiKey(): Promise<string | null> {
    const settings = await this.getSettings();
    return settings.openaiApiKey || null;
  },

  async setApiKey(apiKey: string): Promise<void> {
    const settings = await this.getSettings();
    settings.openaiApiKey = apiKey;
    await this.saveSettings(settings);
  },

  async getSelectedModel(): Promise<string> {
    const settings = await this.getSettings();
    return settings.sttModel || 'whisper-1';
  },

  async setSelectedModel(model: string): Promise<void> {
    const settings = await this.getSettings();
    settings.sttModel = model;
    await this.saveSettings(settings);
  },

  async getSelectedVoice(): Promise<string> {
    const settings = await this.getSettings();
    return settings.ttsVoice || 'alloy';
  },

  async setSelectedVoice(voice: string): Promise<void> {
    const settings = await this.getSettings();
    settings.ttsVoice = voice;
    await this.saveSettings(settings);
  },

  async getTTSModel(): Promise<string> {
    const settings = await this.getSettings();
    return settings.ttsModel || 'tts-1';
  },

  async setTTSModel(model: string): Promise<void> {
    const settings = await this.getSettings();
    settings.ttsModel = model;
    await this.saveSettings(settings);
  },
};