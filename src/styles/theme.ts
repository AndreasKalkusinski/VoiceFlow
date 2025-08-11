export const theme = {
  colors: {
    light: {
      primary: '#6366F1',
      primaryGradient: ['#818CF8', '#6366F1', '#4F46E5'],
      secondary: '#EC4899',
      secondaryGradient: ['#F472B6', '#EC4899', '#DB2777'],
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',

      background: '#FAFAFA',
      surface: 'rgba(255, 255, 255, 0.95)',
      glassSurface: 'rgba(255, 255, 255, 0.7)',

      text: '#1F2937',
      textSecondary: '#6B7280',
      textMuted: '#9CA3AF',

      border: 'rgba(209, 213, 219, 0.3)',
      shadow: 'rgba(0, 0, 0, 0.1)',
    },
    dark: {
      primary: '#818CF8',
      primaryGradient: ['#A5B4FC', '#818CF8', '#6366F1'],
      secondary: '#F472B6',
      secondaryGradient: ['#F9A8D4', '#F472B6', '#EC4899'],
      success: '#34D399',
      warning: '#FBBF24',
      error: '#F87171',
      info: '#60A5FA',

      background: '#0F0F23',
      surface: 'rgba(30, 30, 46, 0.95)',
      glassSurface: 'rgba(30, 30, 46, 0.7)',

      text: '#F9FAFB',
      textSecondary: '#D1D5DB',
      textMuted: '#9CA3AF',

      border: 'rgba(75, 85, 99, 0.3)',
      shadow: 'rgba(0, 0, 0, 0.3)',
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  borderRadius: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    full: 9999,
  },

  typography: {
    heading1: {
      fontSize: 36,
      fontWeight: '800' as const,
      letterSpacing: -1.5,
    },
    heading2: {
      fontSize: 28,
      fontWeight: '700' as const,
      letterSpacing: -0.5,
    },
    heading3: {
      fontSize: 22,
      fontWeight: '600' as const,
      letterSpacing: 0,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      letterSpacing: 0,
    },
    caption: {
      fontSize: 14,
      fontWeight: '400' as const,
      letterSpacing: 0.2,
    },
  },

  animation: {
    fast: 200,
    normal: 300,
    slow: 500,
  },

  effects: {
    glassmorphism: {
      borderWidth: 1,
      shadowRadius: 20,
      shadowOpacity: 0.1,
    },
    neumorphism: {
      light: {
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      },
      dark: {
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
      },
    },
  },
};
