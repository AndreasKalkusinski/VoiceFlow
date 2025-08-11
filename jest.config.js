module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-community|expo-.*|@expo|react-native-.*|@shopify/react-native-skia|lottie-react-native)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  testMatch: [
    '**/__tests__/**/*.{ts,tsx,js,jsx}',
    '**/*.{spec,test}.{ts,tsx,js,jsx}',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/types/**',
    '!src/**/*.test.{ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};