// Screen-specific color themes for modern gradient transitions

export const screenThemes = {
  'Speech to Text': {
    light: {
      primary: '#6366F1', // Indigo-Purple
      secondary: '#8B5CF6', // Purple
      gradient: ['#EEF2FF', '#E0E7FF', '#C7D2FE'], // Light indigo gradient
      tabGradient: ['#6366F1', '#8B5CF6'],
      accent: '#4F46E5',
    },
    dark: {
      primary: '#818CF8', // Lighter indigo for dark mode
      secondary: '#A78BFA', // Lighter purple
      gradient: ['#1E1B4B', '#312E81', '#3730A3'], // Dark indigo gradient
      tabGradient: ['#818CF8', '#A78BFA'],
      accent: '#6366F1',
    },
  },
  'Text to Speech': {
    light: {
      primary: '#FB923C', // Orange
      secondary: '#FCD34D', // Yellow-orange
      gradient: ['#FEF3C7', '#FED7AA', '#FDBA74'], // Warm gradient
      tabGradient: ['#FB923C', '#F59E0B'],
      accent: '#EA580C',
    },
    dark: {
      primary: '#FB923C', // Orange stays vibrant
      secondary: '#FCD34D',
      gradient: ['#451A03', '#78350F', '#92400E'], // Dark warm gradient
      tabGradient: ['#FB923C', '#F59E0B'],
      accent: '#DC2626',
    },
  },
  'Settings': {
    light: {
      primary: '#10B981', // Emerald green
      secondary: '#34D399',
      gradient: ['#D1FAE5', '#A7F3D0', '#6EE7B7'], // Green gradient
      tabGradient: ['#10B981', '#059669'],
      accent: '#047857',
    },
    dark: {
      primary: '#34D399', // Lighter green for dark mode
      secondary: '#6EE7B7',
      gradient: ['#064E3B', '#047857', '#059669'], // Dark green gradient
      tabGradient: ['#34D399', '#10B981'],
      accent: '#10B981',
    },
  },
};

export const getScreenTheme = (screenName: string, isDark: boolean) => {
  const theme = screenThemes[screenName as keyof typeof screenThemes];
  return theme ? (isDark ? theme.dark : theme.light) : null;
};