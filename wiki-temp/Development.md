# Development Guide

Want to contribute to VoiceFlow or build from source? This guide will help you get started.

## 🛠️ Prerequisites

### System Requirements

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Git**: Latest version
- **OS**: macOS, Linux, or Windows 10+

### Platform-Specific

#### iOS Development

- **macOS**: Required (Mojave 10.14+)
- **Xcode**: 14.0 or higher
- **CocoaPods**: 1.11+
- **iOS Simulator** or physical device

#### Android Development

- **Android Studio**: Latest stable
- **JDK**: 11 or higher
- **Android SDK**: API 21+
- **Emulator** or physical device

## 🚀 Quick Start

### 1. Fork & Clone

```bash
# Fork on GitHub first, then:
git clone https://github.com/YOUR_USERNAME/VoiceFlow.git
cd VoiceFlow
```

### 2. Install Dependencies

```bash
# Install npm packages
npm install

# iOS only: Install pods
cd ios && pod install && cd ..
```

### 3. Set Up Development Environment

```bash
# Copy environment template
cp .env.example .env.development

# Edit with your test API keys (optional)
nano .env.development
```

### 4. Run Development Build

#### iOS

```bash
# Start Metro
npm start

# In another terminal:
npm run ios

# Or specific simulator:
npm run ios -- --simulator="iPhone 15"
```

#### Android

```bash
# Start Metro
npm start

# In another terminal:
npm run android

# Or specific device:
npm run android -- --deviceId="emulator-5554"
```

## 📁 Project Structure

```
VoiceFlow/
├── src/
│   ├── components/      # Reusable UI components
│   ├── screens/         # Screen components
│   ├── services/        # API and storage services
│   │   ├── providers/   # API provider implementations
│   │   └── storage.ts   # Local storage service
│   ├── hooks/          # Custom React hooks
│   ├── contexts/       # React contexts
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript definitions
│   ├── i18n/           # Translations
│   └── styles/         # Global styles
├── ios/                # iOS native code
├── android/            # Android native code
├── docs/              # Documentation
├── __tests__/         # Test files
└── package.json       # Dependencies
```

## 🔧 Development Workflow

### Branch Strategy

```
main (stable)
  ├── develop (integration)
  ├── feature/your-feature
  ├── fix/bug-description
  └── docs/documentation-update
```

### Making Changes

1. **Create Feature Branch**

```bash
git checkout -b feature/amazing-feature
```

2. **Make Your Changes**

- Follow existing code style
- Add TypeScript types
- Update tests if needed

3. **Test Your Changes**

```bash
# Run tests
npm test

# Type checking
npm run typecheck

# Linting
npm run lint

# All checks
npm run check-all
```

4. **Commit with Conventional Commits**

```bash
git add .
git commit -m "feat: add amazing feature"

# Types: feat, fix, docs, style, refactor, test, chore
```

5. **Push and Create PR**

```bash
git push origin feature/amazing-feature
# Create PR on GitHub
```

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

### E2E Tests (Coming Soon)

```bash
# iOS
npm run e2e:ios

# Android
npm run e2e:android
```

### Manual Testing Checklist

- [ ] Test on iOS simulator
- [ ] Test on Android emulator
- [ ] Test with different API providers
- [ ] Test offline behavior
- [ ] Test error scenarios
- [ ] Test different languages
- [ ] Test UI themes

## 🎨 Code Style

### TypeScript

```typescript
// Use interfaces for object types
interface UserSettings {
  apiKey: string;
  theme: 'light' | 'dark';
}

// Use const for functions
const processAudio = async (uri: string): Promise<string> => {
  // Implementation
};

// Always handle errors
try {
  await apiCall();
} catch (error) {
  console.error('API call failed:', error);
  // Handle gracefully
}
```

### React Components

```tsx
// Functional components only
const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  // Hooks at the top
  const [state, setState] = useState<string>('');
  const { colors } = useTheme();

  // Handlers
  const handlePress = useCallback(() => {
    // Logic
  }, [dependency]);

  // Render
  return <View style={styles.container}>{/* Content */}</View>;
};

// Styles at the bottom
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

## 🔌 Adding New Features

### Adding a New API Provider

1. **Create Provider Class**

```typescript
// src/services/providers/YourProvider.ts
export class YourProvider implements APIProvider {
  async initialize(config: Config): Promise<void> {
    // Setup
  }

  async transcribe(audio: Buffer): Promise<string> {
    // Implementation
  }
}
```

2. **Register Provider**

```typescript
// src/services/providers/ProviderRegistry.ts
import { YourProvider } from './YourProvider';

registry.register('your-provider', new YourProvider());
```

3. **Add UI Configuration**

- Update Settings screen
- Add to provider selection
- Add configuration fields

### Adding a New Language

1. **Create Translation File**

```typescript
// src/i18n/translations/fr.ts
export default {
  common: {
    cancel: 'Annuler',
    // ...
  },
  // ...
};
```

2. **Register Language**

```typescript
// src/i18n/index.ts
import fr from './translations/fr';

const resources = {
  // ...
  fr: { translation: fr },
};
```

## 🐛 Debugging

### React Native Debugger

```bash
# Install globally
npm install -g react-native-debugger

# Run debugger
open "rndebugger://set-debugger-loc?host=localhost&port=8081"
```

### Console Logs

```typescript
// Development only
if (__DEV__) {
  console.log('Debug info:', data);
}
```

### Network Debugging

```typescript
// Enable network inspection
global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
```

## 📦 Building for Production

### iOS Release

```bash
# Clean build
cd ios && xcodebuild clean && cd ..

# Build release
npm run ios:release
```

### Android Release

```bash
# Clean build
cd android && ./gradlew clean && cd ..

# Build APK
npm run android:release

# Output: android/app/build/outputs/apk/release/
```

## 🔐 Security Guidelines

### Never Commit

- API keys
- Signing certificates
- Personal information
- .env files

### Always Do

- Validate inputs
- Sanitize outputs
- Use HTTPS only
- Handle errors gracefully

## 📚 Resources

### Documentation

- [React Native](https://reactnative.dev/docs/getting-started)
- [Expo Modules](https://docs.expo.dev/modules/)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Tools

- [Flipper](https://fbflipper.com/) - Debugging
- [Reactotron](https://github.com/infinitered/reactotron) - Inspection
- [Postman](https://www.postman.com/) - API testing

## 🤝 Getting Help

### For Development Issues

1. Check existing [Issues](https://github.com/AndreasKalkusinski/VoiceFlow/issues)
2. Search [Discussions](https://github.com/AndreasKalkusinski/VoiceFlow/discussions)
3. Ask in Discussions with `dev` tag

### Before Submitting PR

- [ ] Tests pass
- [ ] TypeScript checks pass
- [ ] Linting passes
- [ ] Works on iOS
- [ ] Works on Android
- [ ] No console.logs
- [ ] Documentation updated

---

**Happy coding!** 🚀 We're excited to see your contributions!
