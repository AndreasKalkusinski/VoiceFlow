import '@testing-library/jest-native/extend-expect';

// Mock expo modules
jest.mock('expo-av', () => ({
  Audio: {
    Recording: jest.fn(),
    setAudioModeAsync: jest.fn(),
  },
  Sound: {
    createAsync: jest.fn(),
  },
}));

jest.mock('expo-clipboard', () => ({
  setStringAsync: jest.fn(),
  getStringAsync: jest.fn(),
}));

jest.mock('expo-file-system', () => ({
  documentDirectory: 'mock-directory/',
  readAsStringAsync: jest.fn(),
  writeAsStringAsync: jest.fn(),
  deleteAsync: jest.fn(),
}));

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Silence warnings
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};