# Contributing to VoiceFlow

Thank you for your interest in contributing to VoiceFlow! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive criticism
- Accept feedback gracefully
- Put the project's best interests first

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/VoiceFlow.git`
3. Add the upstream remote: `git remote add upstream https://github.com/original-owner/VoiceFlow.git`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac only) or Android Emulator

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### Environment Variables

1. Copy `.env.example` to `.env`
2. Add your OpenAI API key and other configuration values
3. Never commit `.env` file (it's already in `.gitignore`)

## How to Contribute

### Types of Contributions

- **Bug Fixes**: Fix issues reported in GitHub Issues
- **Features**: Implement new features or enhance existing ones
- **Documentation**: Improve README, add code comments, or write guides
- **Tests**: Add unit tests, integration tests, or e2e tests
- **Performance**: Optimize code for better performance
- **Refactoring**: Improve code structure and maintainability

### Contribution Workflow

1. Check existing issues or create a new one to discuss your idea
2. Fork and clone the repository
3. Create a feature branch from `main`
4. Make your changes following our coding standards
5. Write/update tests for your changes
6. Ensure all tests pass
7. Commit your changes with meaningful commit messages
8. Push to your fork and create a Pull Request

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Add JSDoc comments for public APIs and complex functions
- Prefer functional components with hooks for React

### File Structure

```
src/
├── components/     # Reusable UI components
├── screens/        # Screen components
├── services/       # API and external services
├── utils/          # Utility functions
├── hooks/          # Custom React hooks
├── contexts/       # React Context providers
├── types/          # TypeScript type definitions
└── config/         # Configuration files
```

### Code Style

```typescript
// Good
export const calculateTotal = (items: Item[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// Bad
export const calc = (i) => {
  let t = 0;
  for(let x of i) t += x.p;
  return t;
};
```

### Component Guidelines

- One component per file
- Use PascalCase for component names
- Use camelCase for props and variables
- Destructure props in function parameters
- Use React.memo for expensive components

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- MyComponent.test.tsx
```

### Writing Tests

- Write tests for all new features and bug fixes
- Aim for at least 80% code coverage
- Use descriptive test names
- Test both success and error cases
- Mock external dependencies

Example test:

```typescript
describe('StorageService', () => {
  it('should store and retrieve API key', async () => {
    const apiKey = 'test-key-123';
    await StorageService.setApiKey(apiKey);
    const retrieved = await StorageService.getApiKey();
    expect(retrieved).toBe(apiKey);
  });
});
```

## Pull Request Process

### Before Submitting

1. **Test your changes**: Run `npm test` to ensure all tests pass
2. **Lint your code**: Run `npm run lint` to check for style issues
3. **Format your code**: Run `npm run format` to apply consistent formatting
4. **Update documentation**: Update README.md if needed
5. **Write meaningful commits**: Use conventional commit format

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(audio): add support for multiple audio formats
fix(api): handle rate limiting errors gracefully
docs: update installation instructions
```

### PR Template

When creating a PR, please include:

- **Description**: What does this PR do?
- **Related Issue**: Link to the issue (if applicable)
- **Type of Change**: Bug fix, feature, etc.
- **Testing**: How has this been tested?
- **Screenshots**: For UI changes (if applicable)
- **Checklist**:
  - [ ] Code follows project style guidelines
  - [ ] Self-review completed
  - [ ] Comments added for complex code
  - [ ] Documentation updated
  - [ ] Tests added/updated
  - [ ] All tests passing

### Review Process

1. At least one maintainer review required
2. All CI checks must pass
3. No merge conflicts
4. PR branch must be up to date with main

## Reporting Issues

### Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the bug
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**:
  - Device/OS version
  - App version
  - React Native version
- **Screenshots/Logs**: If applicable

### Feature Requests

For feature requests, please include:

- **Problem Statement**: What problem does this solve?
- **Proposed Solution**: How would you implement it?
- **Alternatives**: Other solutions you've considered
- **Additional Context**: Any other relevant information

## Scripts

```bash
# Development
npm start              # Start Expo development server
npm run ios           # Run on iOS simulator
npm run android       # Run on Android emulator
npm run web           # Run in web browser

# Testing
npm test              # Run tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Code Quality
npm run lint          # Run ESLint
npm run lint:fix      # Fix ESLint issues
npm run format        # Format code with Prettier
npm run typecheck     # Run TypeScript compiler

# Build
npm run build:ios     # Build for iOS
npm run build:android # Build for Android
```

## Getting Help

- Check the [README](README.md) for basic setup and usage
- Search [existing issues](https://github.com/owner/VoiceFlow/issues)
- Join our [Discord community](https://discord.gg/voiceflow) (if applicable)
- Contact maintainers: [maintainers@voiceflow.app]

## Recognition

Contributors will be recognized in:
- The project's README
- Release notes
- Our contributors page

Thank you for contributing to VoiceFlow! 🎉