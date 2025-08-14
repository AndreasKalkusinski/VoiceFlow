# Contributing to VoiceFlow

Thank you for your interest in contributing to VoiceFlow! We welcome contributions from the community.

## How to Contribute

### 🐛 Report Bugs

- Use the [Issues](https://github.com/AndreasKalkusinski/VoiceFlow/issues) page
- Check if the issue already exists
- Provide clear reproduction steps
- Include device info and screenshots if relevant

### 💡 Suggest Features

- Open a [Discussion](https://github.com/AndreasKalkusinski/VoiceFlow/discussions)
- Describe the feature and its benefits
- Explain your use case

### 📝 Improve Documentation

- Fix typos or clarify instructions
- Add examples
- Translate documentation

### 🔧 Submit Code

1. **Fork the Repository**

   ```bash
   git clone https://github.com/YourUsername/VoiceFlow.git
   cd VoiceFlow
   ```

2. **Create a Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation

4. **Test Your Changes**

   ```bash
   npm install
   npm run typecheck
   npm run lint
   npm test
   ```

5. **Commit Your Changes**

   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

6. **Push to Your Fork**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
# Clone the repo
git clone https://github.com/AndreasKalkusinski/VoiceFlow.git
cd VoiceFlow

# Install dependencies
npm install

# Start development
npx expo start
```

### Project Structure

```
VoiceFlow/
├── src/
│   ├── components/    # Reusable components
│   ├── screens/       # Screen components
│   ├── services/      # API and service integrations
│   ├── utils/         # Utility functions
│   ├── hooks/         # Custom React hooks
│   ├── contexts/      # React contexts
│   └── i18n/         # Translations
├── assets/           # Images and static files
└── docs/            # Documentation
```

## Code Style

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` types

### React Native

- Use functional components with hooks
- Follow React Native best practices
- Optimize for performance

### Formatting

- Use Prettier for code formatting
- Follow ESLint rules
- Run `npm run lint` before committing

## Commit Messages

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build process or auxiliary tool changes

Examples:

```
feat: add voice activity detection
fix: resolve crash on iOS 17
docs: update API configuration guide
```

## Pull Request Guidelines

### Before Submitting

- [ ] Code compiles without errors
- [ ] All tests pass
- [ ] Linting passes
- [ ] Documentation is updated
- [ ] Commit messages follow conventions

### PR Description

Include:

- What changes were made
- Why they were necessary
- How to test the changes
- Screenshots for UI changes

## Testing

### Running Tests

```bash
npm test
```

### Writing Tests

- Add tests for new features
- Update tests for modified code
- Ensure good test coverage

## Translations

Help translate VoiceFlow:

1. Find language files in `src/i18n/translations/`
2. Add or update translations
3. Test in the app by changing language

## Community

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Provide constructive feedback
- Focus on what is best for the community

### Getting Help

- Check the [Wiki](https://github.com/AndreasKalkusinski/VoiceFlow/wiki)
- Search existing issues
- Ask in [Discussions](https://github.com/AndreasKalkusinski/VoiceFlow/discussions)

## Recognition

Contributors will be:

- Listed in the Contributors section
- Mentioned in release notes
- Part of the VoiceFlow community

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make VoiceFlow better! 🎉
