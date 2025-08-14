# Contributing to VoiceFlow

Thank you for your interest in contributing to VoiceFlow! We love contributions from the community.

## 🎯 Our Philosophy

VoiceFlow is committed to:

- **Privacy First**: No tracking, no servers, no data collection
- **User Control**: Users own their data and API keys
- **Simplicity**: Clean, intuitive interface
- **Open Source**: Transparent and auditable

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/VoiceFlow.git
   cd VoiceFlow
   ```
3. Install dependencies:
   ```bash
   npm install
   cd ios && pod install && cd ..  # For iOS
   ```
4. Create a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```

## 💻 Development Setup

### Prerequisites

- Node.js 18+
- React Native development environment
- Xcode (for iOS)
- Android Studio (for Android)

### Running the app

```bash
# Start Metro
npm start

# iOS
npm run ios

# Android
npm run android
```

### Testing

```bash
npm test
npm run typecheck
npm run lint
```

## 📝 Pull Request Process

1. **Before submitting:**
   - Run all tests: `npm test`
   - Check types: `npm run typecheck`
   - Lint code: `npm run lint`
   - Test on both iOS and Android if possible

2. **PR Guidelines:**
   - Clear description of changes
   - Reference any related issues
   - Include screenshots for UI changes
   - Update documentation if needed

3. **Code Review:**
   - All PRs require at least one review
   - Address feedback constructively
   - Keep discussions focused and respectful

## 🎨 Code Style

- TypeScript for type safety
- Functional components with hooks
- Clear, descriptive variable names
- Comments for complex logic
- No console.logs in production code

## 🔒 Privacy Guidelines

**Never add code that:**

- Sends data to external servers (except user's configured APIs)
- Tracks user behavior
- Stores data outside the device
- Requires user registration
- Collects analytics

## 🐛 Reporting Issues

Use our [issue templates](https://github.com/AndreasKalkusinski/VoiceFlow/issues/new/choose):

- Bug Report: For bugs and errors
- Feature Request: For new features
- Use Discussions for questions

## 💡 Feature Requests

We welcome feature ideas that:

- Work entirely offline
- Enhance privacy
- Improve user experience
- Don't require backend servers

## 🌍 Translations

Help us translate VoiceFlow:

1. Copy `src/i18n/translations/en.ts`
2. Translate to your language
3. Submit a PR with the new file

## 📚 Documentation

- Update README for significant changes
- Add wiki pages for new features
- Include JSDoc comments for utilities
- Document API integrations

## 🤝 Community

- Be respectful and inclusive
- Help others in Discussions
- Share your use cases
- Report security issues privately

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors are recognized in:

- GitHub contributors page
- Release notes
- Special thanks in README

## ❓ Questions?

- Check the [Wiki](https://github.com/AndreasKalkusinski/VoiceFlow/wiki)
- Ask in [Discussions](https://github.com/AndreasKalkusinski/VoiceFlow/discussions)
- Open an issue for bugs

Thank you for making VoiceFlow better! 🎉
