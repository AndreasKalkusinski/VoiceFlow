module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-native', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    'prettier',
  ],
  env: {
    'react-native/react-native': true,
    node: true,
    jest: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // TypeScript
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-non-null-assertion': 'warn',

    // React
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',

    // React Native
    'react-native/no-inline-styles': 'warn',
    'react-native/no-raw-text': 'off',
    'react-native/no-color-literals': 'off',
    'react-native/sort-styles': 'off',

    // General
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prettier/prettier': 'error',
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '.expo/',
    'web-build/',
    '*.config.js',
    'babel.config.js',
    'jest-setup.js',
  ],
};
