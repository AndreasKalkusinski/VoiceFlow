// Modern Design System - 2025 Standards

export const designTokens = {
  // Modern Color Palette with adaptive tints
  colors: {
    light: {
      // Primary brand colors
      primary: '#5E5CE6', // Modern purple
      primaryLight: '#7C7CFF',
      primaryDark: '#4A48C4',
      
      // Accent colors
      accent: '#FF6B6B',
      accentGradient: ['#FF6B6B', '#FF8E53'] as [string, string],
      
      // Semantic colors
      success: '#4ECDC4',
      warning: '#FFD93D',
      error: '#FF6B6B',
      info: '#5E5CE6',
      
      // Base colors
      background: '#FAFBFF',
      surface: '#FFFFFF',
      surfaceElevated: '#FFFFFF',
      
      // Text colors
      text: '#1A1C1E',
      textSecondary: '#5F6368',
      textMuted: '#9AA0A6',
      textOnPrimary: '#FFFFFF',
      
      // Borders and dividers
      border: 'rgba(0, 0, 0, 0.06)',
      divider: 'rgba(0, 0, 0, 0.04)',
      
      // Overlays
      overlay: 'rgba(0, 0, 0, 0.5)',
      scrim: 'rgba(0, 0, 0, 0.32)',
    },
    dark: {
      primary: '#7C7CFF',
      primaryLight: '#9999FF',
      primaryDark: '#5E5CE6',
      
      accent: '#FF8E53',
      accentGradient: ['#FF8E53', '#FF6B6B'] as [string, string],
      
      success: '#52D9D0',
      warning: '#FFE066',
      error: '#FF8080',
      info: '#7C7CFF',
      
      background: '#0A0B0D',
      surface: '#1C1C1F',
      surfaceElevated: '#2A2A2F',
      
      text: '#F7F8F9',
      textSecondary: '#B4B8C0',
      textMuted: '#6C7078',
      textOnPrimary: '#0A0B0D',
      
      border: 'rgba(255, 255, 255, 0.08)',
      divider: 'rgba(255, 255, 255, 0.06)',
      
      overlay: 'rgba(0, 0, 0, 0.7)',
      scrim: 'rgba(0, 0, 0, 0.6)',
    },
  },
  
  // Modern Typography Scale
  typography: {
    // Display
    displayLarge: {
      fontSize: 57,
      lineHeight: 64,
      fontWeight: '400' as const,
      letterSpacing: -0.5,
    },
    displayMedium: {
      fontSize: 45,
      lineHeight: 52,
      fontWeight: '400' as const,
      letterSpacing: -0.5,
    },
    displaySmall: {
      fontSize: 36,
      lineHeight: 44,
      fontWeight: '400' as const,
      letterSpacing: 0,
    },
    
    // Headline
    headlineLarge: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: '600' as const,
      letterSpacing: 0,
    },
    headlineMedium: {
      fontSize: 28,
      lineHeight: 36,
      fontWeight: '600' as const,
      letterSpacing: 0,
    },
    headlineSmall: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: '600' as const,
      letterSpacing: 0,
    },
    
    // Title
    titleLarge: {
      fontSize: 22,
      lineHeight: 28,
      fontWeight: '500' as const,
      letterSpacing: 0,
    },
    titleMedium: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '600' as const,
      letterSpacing: 0.15,
    },
    titleSmall: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '600' as const,
      letterSpacing: 0.1,
    },
    
    // Body
    bodyLarge: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400' as const,
      letterSpacing: 0.15,
    },
    bodyMedium: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400' as const,
      letterSpacing: 0.25,
    },
    bodySmall: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '400' as const,
      letterSpacing: 0.4,
    },
    
    // Label
    labelLarge: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '500' as const,
      letterSpacing: 0.1,
    },
    labelMedium: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '500' as const,
      letterSpacing: 0.5,
    },
    labelSmall: {
      fontSize: 11,
      lineHeight: 16,
      fontWeight: '500' as const,
      letterSpacing: 0.5,
    },
  },
  
  // Modern Spacing System (8pt grid)
  spacing: {
    none: 0,
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  
  // Border Radius
  radius: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    full: 9999,
  },
  
  // Elevation (Material Design 3 inspired)
  elevation: {
    none: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
      elevation: 12,
    },
  },
  
  // Animation Timing
  animation: {
    instant: 0,
    fast: 150,
    normal: 300,
    slow: 500,
    verySlow: 1000,
    
    // Easing curves
    easing: {
      standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
      decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
      sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
    },
  },
  
  // Z-index layers
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    modal: 1200,
    popover: 1300,
    tooltip: 1400,
    toast: 1500,
  },
};