import { Dimensions, Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Responsive width and height functions
export const vw = (percentage: number) => (screenWidth * percentage) / 100;
export const vh = (percentage: number) => (screenHeight * percentage) / 100;

// Safe area considerations
const isIphoneX = Platform.OS === 'ios' && (screenHeight >= 812 || screenWidth >= 812);
const statusBarHeight = Platform.OS === 'ios' ? (isIphoneX ? 44 : 20) : 0;
const bottomSafeArea = isIphoneX ? 34 : 0;

// Content height (excluding safe areas)
export const contentHeight = screenHeight - statusBarHeight - bottomSafeArea;
export const contentVH = (percentage: number) => (contentHeight * percentage) / 100;

// Responsive dimensions for common use cases
export const responsiveDimensions = {
  screen: {
    width: screenWidth,
    height: screenHeight,
  },

  // Cards and containers
  card: {
    minHeight: contentVH(25), // 25% of content height
    maxHeight: contentVH(50), // 50% of content height
    padding: vw(5), // 5% of screen width
  },

  // Text input areas
  textInput: {
    minHeight: contentVH(20), // 20% of content height
    maxHeight: contentVH(40), // 40% of content height
  },

  // Buttons
  button: {
    height: contentVH(7), // 7% of content height
    minWidth: vw(30), // 30% of screen width
  },

  // FAB
  fab: {
    size: vw(15), // 15% of screen width
    bottom: contentVH(5), // 5% from bottom
  },

  // Padding and margins
  padding: {
    screen: vw(4), // 4% of screen width
    card: vw(5), // 5% of screen width
    small: vw(2), // 2% of screen width
    medium: vw(4), // 4% of screen width
    large: vw(6), // 6% of screen width
  },

  // Font sizes (responsive to screen width)
  fontSize: {
    tiny: vw(3),
    small: vw(3.5),
    medium: vw(4),
    large: vw(5),
    xlarge: vw(6),
    xxlarge: vw(8),
    title: vw(10),
  },

  // Status bar and tab bar
  statusBar: statusBarHeight,
  tabBar: contentVH(8), // 8% of content height
  bottomSafeArea,
};
