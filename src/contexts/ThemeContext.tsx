import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../styles/theme';

export type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  isDark: boolean;
  colors: typeof theme.colors.light;
  effects: typeof theme.effects.neumorphism.light;
  theme: typeof theme;
  themeMode: ThemeMode;
  setTheme: (mode: ThemeMode) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('auto');
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    loadThemePreference();
  }, []);

  useEffect(() => {
    if (themeMode === 'auto') {
      setIsDark(systemColorScheme === 'dark');
    } else {
      setIsDark(themeMode === 'dark');
    }
  }, [themeMode, systemColorScheme]);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('@voiceflow_theme');
      if (savedTheme) {
        setThemeMode(savedTheme as ThemeMode);
      }
    } catch (error) {
      console.error('Failed to load theme preference:', error);
    }
  };

  const setTheme = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem('@voiceflow_theme', mode);
      setThemeMode(mode);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const colors = isDark ? theme.colors.dark : theme.colors.light;
  const effects = isDark ? theme.effects.neumorphism.dark : theme.effects.neumorphism.light;

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        colors,
        effects,
        theme,
        themeMode,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};