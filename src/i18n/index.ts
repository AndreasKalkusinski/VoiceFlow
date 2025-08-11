import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import de from './translations/de';
import en from './translations/en';
import es from './translations/es';

const LANGUAGE_KEY = '@voiceflow_language';

const resources = {
  de: { translation: de },
  en: { translation: en },
  es: { translation: es },
};

export const availableLanguages = [
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

const getDeviceLanguage = () => {
  try {
    const locale = Localization.getLocales()[0]?.languageTag || 'en';
    const languageCode = locale.split('-')[0];

    // Check if we support this language
    if (resources[languageCode as keyof typeof resources]) {
      return languageCode;
    }
  } catch (error) {
    console.log('Could not detect device language, defaulting to English');
  }

  // Default to English
  return 'en';
};

// Initialize i18n synchronously first
i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language initially
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

// Then load saved language asynchronously
const initI18n = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    const language = savedLanguage || getDeviceLanguage();

    if (language !== i18n.language) {
      await i18n.changeLanguage(language);
    }
  } catch (error) {
    console.error('Failed to load language preference:', error);
  }
};

export const changeLanguage = async (languageCode: string) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, languageCode);
    if (i18n.isInitialized) {
      await i18n.changeLanguage(languageCode);
    }
  } catch (error) {
    console.error('Failed to change language:', error);
    throw error;
  }
};

// Initialize saved language
initI18n();

export default i18n;
