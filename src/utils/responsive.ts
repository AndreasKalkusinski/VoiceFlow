import { Dimensions, Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Device types
export const deviceTypes = {
  isSmallDevice: screenWidth < 375,
  isMediumDevice: screenWidth >= 375 && screenWidth < 414,
  isLargeDevice: screenWidth >= 414,
  isTablet: screenWidth >= 768,
};

// Screen dimensions
export const screenDimensions = {
  width: screenWidth,
  height: screenHeight,
  isShort: screenHeight < 700,
  isMedium: screenHeight >= 700 && screenHeight < 900,
  isTall: screenHeight >= 900,
};

// Responsive helper functions
export const wp = (percentage: number): number => {
  return (screenWidth * percentage) / 100;
};

export const hp = (percentage: number): number => {
  return (screenHeight * percentage) / 100;
};

// Responsive spacing
export const spacing = {
  xs: screenWidth < 375 ? 4 : 6,
  sm: screenWidth < 375 ? 8 : 12,
  md: screenWidth < 375 ? 12 : 16,
  lg: screenWidth < 375 ? 16 : 24,
  xl: screenWidth < 375 ? 20 : 32,
  xxl: screenWidth < 375 ? 24 : 48,
};

// Responsive font sizes as a function
export const fontSize = (size: number): number => {
  return (screenWidth / 375) * size;
};

// Font size presets
export const fontSizes = {
  tiny: screenWidth < 375 ? 10 : 12,
  small: screenWidth < 375 ? 12 : 14,
  medium: screenWidth < 375 ? 14 : 16,
  large: screenWidth < 375 ? 16 : 18,
  xl: screenWidth < 375 ? 18 : 20,
  xxl: screenWidth < 375 ? 20 : 24,
  xxxl: screenWidth < 375 ? 24 : 32,
};

// Scale function based on width
export const scale = (size: number): number => {
  return (screenWidth / 375) * size;
};

// Moderate scale function (combines width and height)
export const moderateScale = (size: number, factor = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

// Safe heights for different components
export const componentHeights = {
  textInput: screenHeight < 700 ? 150 : screenHeight < 900 ? 200 : 250,
  visualization: screenHeight < 700 ? 80 : screenHeight < 900 ? 100 : 120,
  buttonArea: screenHeight < 700 ? 120 : screenHeight < 900 ? 140 : 160,
  statusBar: screenHeight < 700 ? 60 : 80,
  tabBar: Platform.OS === 'android' ? 60 : 65,
  header: Platform.OS === 'android' ? (screenHeight < 700 ? 50 : 60) : screenHeight < 700 ? 44 : 56,
};

// Adaptive margins and paddings
export const adaptiveSpacing = {
  screenPadding: screenWidth < 375 ? 16 : 20,
  cardPadding: screenWidth < 375 ? 16 : 20,
  sectionSpacing: screenHeight < 700 ? 16 : 20,
  buttonSpacing: screenHeight < 700 ? 12 : 16,
};
