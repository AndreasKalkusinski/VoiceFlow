import AsyncStorage from '@react-native-async-storage/async-storage';

export interface TranscriptionHistoryItem {
  id: string;
  text: string;
  timestamp: number;
  date: string;
  audioUri?: string;
  duration?: number;
  source?: 'recording' | 'shared';
}

export interface HistorySettings {
  enabled: boolean;
  maxItems: number | 'unlimited';
}

const HISTORY_KEY = '@voiceflow_history';
const HISTORY_SETTINGS_KEY = '@voiceflow_history_settings';

class HistoryStorageService {
  private static instance: HistoryStorageService;

  private constructor() {}

  static getInstance(): HistoryStorageService {
    if (!HistoryStorageService.instance) {
      HistoryStorageService.instance = new HistoryStorageService();
    }
    return HistoryStorageService.instance;
  }

  async getSettings(): Promise<HistorySettings> {
    try {
      const settings = await AsyncStorage.getItem(HISTORY_SETTINGS_KEY);
      if (settings) {
        return JSON.parse(settings);
      }
    } catch (error) {
      console.error('Error loading history settings:', error);
    }

    // Default settings
    return {
      enabled: true,
      maxItems: 25,
    };
  }

  async saveSettings(settings: HistorySettings): Promise<void> {
    try {
      await AsyncStorage.setItem(HISTORY_SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving history settings:', error);
    }
  }

  async addItem(item: Omit<TranscriptionHistoryItem, 'id' | 'date'>): Promise<void> {
    const settings = await this.getSettings();
    if (!settings.enabled) return;

    try {
      const history = await this.getHistory();

      const newItem: TranscriptionHistoryItem = {
        ...item,
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        date: new Date(item.timestamp).toLocaleDateString(),
      };

      history.unshift(newItem);

      // Apply max items limit
      if (settings.maxItems !== 'unlimited' && history.length > settings.maxItems) {
        history.splice(settings.maxItems);
      }

      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Error adding history item:', error);
    }
  }

  async getHistory(): Promise<TranscriptionHistoryItem[]> {
    try {
      const history = await AsyncStorage.getItem(HISTORY_KEY);
      if (history) {
        return JSON.parse(history);
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
    return [];
  }

  async deleteItem(id: string): Promise<void> {
    try {
      const history = await this.getHistory();
      const filtered = history.filter((item) => item.id !== id);
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting history item:', error);
    }
  }

  async clearHistory(): Promise<void> {
    try {
      await AsyncStorage.removeItem(HISTORY_KEY);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  }

  async searchHistory(query: string): Promise<TranscriptionHistoryItem[]> {
    const history = await this.getHistory();
    const lowerQuery = query.toLowerCase();

    return history.filter((item) => item.text.toLowerCase().includes(lowerQuery));
  }
}

export const HistoryStorage = HistoryStorageService.getInstance();
