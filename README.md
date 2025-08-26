# SpeakFlow AI 🎤🔊

![CI/CD](https://github.com/AndreasKalkusinski/VoiceFlow/actions/workflows/ci.yml/badge.svg)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React Native](https://img.shields.io/badge/React%20Native-0.76-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-53-000.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Build Status](https://img.shields.io/github/actions/workflow/status/AndreasKalkusinski/VoiceFlow/ci.yml)](https://github.com/AndreasKalkusinski/VoiceFlow/actions)

A modern, open-source React Native app for Speech-to-Text and Text-to-Speech with support for multiple AI providers.

🌍 **[English](#english)** | 🇩🇪 **[Deutsch](#deutsch)**

## 🌟 Why SpeakFlow AI?

- 🆓 **100% Free & Open Source** - No hidden costs, no subscriptions
- 🔒 **Privacy First** - Your data stays on your device
- 🎨 **Beautiful UI** - Three modern themes with dark mode support
- 🌍 **Multi-language** - Supports English, German, Spanish, and auto-detection
- ⚡ **Fast & Reliable** - Built with performance in mind
- 🧩 **Multiple Providers** - OpenAI, Google, ElevenLabs, Mistral AI
- 📱 **Share Extension** - Share audio files directly from other apps (iOS)
- 🎯 **Smart Features** - Language auto-detection, provider recommendations

---

## English

### ✨ Features

#### 🎤 Speech-to-Text

- Voice recording with visual animations
- Multiple STT providers:
  - **OpenAI Whisper** - High accuracy, 25+ languages
  - **Google Cloud STT** - Real-time transcription
  - **Mistral AI** - Privacy-focused European provider
- Automatic language detection
- Edit and enhance transcribed text
- Copy text to clipboard
- Transcription history

#### 🔊 Text-to-Speech

- Natural-sounding voices from multiple providers:
  - **OpenAI TTS** - Neural voices with emotions
  - **Google Cloud TTS** - 400+ voices in 50+ languages
  - **ElevenLabs** - Ultra-realistic AI voices
  - **Mistral AI** - Privacy-focused TTS
- Playback controls (Play/Pause/Stop)
- Voice selection and speed adjustment
- Save audio files

#### 🤖 AI Text Processing

- Integrated LLM providers for text enhancement:
  - **OpenAI GPT** - GPT-4 and GPT-3.5
  - **Google Gemini** - Advanced reasoning
  - **Mistral AI** - Open-weight models
- Text correction and formatting
- Translation between languages
- Summarization and expansion

#### 📱 iOS Share Extension

- Share audio files from any app
- Automatic transcription of shared audio
- Works with Voice Memos, WhatsApp, and more
- Seamless integration with the main app

#### ⚙️ Settings & Configuration

- Easy provider management
- API key validation
- Model selection for each service
- Voice and language preferences
- Three beautiful themes:
  - **Classic** - Original design
  - **Modern** - Contemporary look
  - **2025** - Cutting-edge UI

### 🚀 Installation

#### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- iOS: Xcode 15+ (for native builds)
- Android: Android Studio (for native builds)

#### Quick Start

1. **Clone the repository:**

```bash
git clone https://github.com/AndreasKalkusinski/VoiceFlow.git
cd VoiceFlow
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npx expo start
```

4. **Run on device/simulator:**

- iOS Simulator: Press `i`
- Android Emulator: Press `a`
- Physical device: Scan QR code with Expo Go app

#### Building for Production

**iOS:**

```bash
npx expo run:ios --configuration Release
```

**Android:**

```bash
npx expo run:android --variant release
```

### 🔧 Configuration

1. Open the app and navigate to **Settings**
2. Select your preferred providers
3. Enter API keys for each service
4. Validate keys with the built-in validator
5. Choose models and voices
6. Save your configuration

### 🔑 API Keys

Get your API keys from:

- **OpenAI**: https://platform.openai.com/api-keys
- **Google Cloud**: https://console.cloud.google.com/apis/credentials
- **ElevenLabs**: https://elevenlabs.io/api
- **Mistral AI**: https://console.mistral.ai/api-keys

### 📚 Technology Stack

- **Framework**: React Native with Expo SDK 53
- **Language**: TypeScript 5.8
- **Navigation**: React Navigation 7
- **State Management**: React Hooks & Context
- **Storage**: AsyncStorage & SecureStore
- **Audio**: expo-av
- **Animations**: React Native Reanimated 3
- **Testing**: Jest & React Native Testing Library
- **CI/CD**: GitHub Actions

### 🏗️ Project Structure

```
VoiceFlow/
├── src/
│   ├── screens/          # Main app screens
│   ├── components/       # Reusable UI components
│   ├── services/         # API and business logic
│   │   └── providers/    # AI provider implementations
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Helper functions
│   ├── types/           # TypeScript definitions
│   └── i18n/           # Translations
├── ios/
│   └── ShareExtension/  # iOS Share Extension
└── assets/             # Images, fonts, etc.
```

### 🤝 Contributing

We love contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

```bash
# Fork and clone the repo
git clone https://github.com/yourusername/VoiceFlow.git

# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes and commit
git commit -m 'Add amazing feature'

# Push and create a PR
git push origin feature/amazing-feature
```

### 📊 Project Status

- ✅ Core features complete
- ✅ Multiple provider support
- ✅ iOS Share Extension
- ✅ Production ready
- 🚧 Android Share Extension (coming soon)
- 🚧 Offline mode (planned)

---

## Deutsch

### ✨ Funktionen

#### 🎤 Sprache-zu-Text

- Sprachaufnahme mit visuellen Animationen
- Mehrere STT-Anbieter:
  - **OpenAI Whisper** - Hohe Genauigkeit, 25+ Sprachen
  - **Google Cloud STT** - Echtzeit-Transkription
  - **Mistral AI** - Datenschutz-fokussierter europäischer Anbieter
- Automatische Spracherkennung
- Transkribierter Text bearbeiten und verbessern
- Text in Zwischenablage kopieren
- Transkriptionsverlauf

#### 🔊 Text-zu-Sprache

- Natürlich klingende Stimmen von mehreren Anbietern:
  - **OpenAI TTS** - Neuronale Stimmen mit Emotionen
  - **Google Cloud TTS** - 400+ Stimmen in 50+ Sprachen
  - **ElevenLabs** - Ultrarealistische KI-Stimmen
  - **Mistral AI** - Datenschutz-fokussierte TTS
- Wiedergabe-Steuerung (Play/Pause/Stop)
- Stimmauswahl und Geschwindigkeitsanpassung
- Audiodateien speichern

#### 🤖 KI-Textverarbeitung

- Integrierte LLM-Anbieter zur Textverbesserung:
  - **OpenAI GPT** - GPT-4 und GPT-3.5
  - **Google Gemini** - Fortgeschrittenes Reasoning
  - **Mistral AI** - Open-Weight-Modelle
- Textkorrektur und Formatierung
- Übersetzung zwischen Sprachen
- Zusammenfassung und Erweiterung

#### 📱 iOS Share Extension

- Audiodateien aus jeder App teilen
- Automatische Transkription geteilter Audios
- Funktioniert mit Sprachmemos, WhatsApp und mehr
- Nahtlose Integration mit der Haupt-App

### 🚀 Installation

Siehe englische Anleitung oben.

### 🔑 API-Schlüssel

API-Schlüssel erhalten Sie bei:

- **OpenAI**: https://platform.openai.com/api-keys
- **Google Cloud**: https://console.cloud.google.com/apis/credentials
- **ElevenLabs**: https://elevenlabs.io/api
- **Mistral AI**: https://console.mistral.ai/api-keys

### ⚠️ Wichtige Hinweise

- Die App benötigt Mikrofonberechtigungen für Sprache-zu-Text
- Eine aktive Internetverbindung ist für API-Aufrufe erforderlich
- API-Schlüssel werden sicher lokal auf dem Gerät gespeichert
- Die Share Extension ist derzeit nur für iOS verfügbar

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Privacy & Security

- [Privacy Policy](PRIVACY.md)
- [Terms of Service](TERMS.md)
- [Security Policy](SECURITY.md)

## 🙏 Acknowledgments

- OpenAI, Google, ElevenLabs, and Mistral AI for their APIs
- The React Native and Expo communities
- All our amazing contributors

## ⭐ Support the Project

If you like SpeakFlow AI, please:

- ⭐ Star this repository
- 🐛 Report bugs
- 💡 Suggest new features
- 🤝 Contribute code
- 📣 Share with others

## 📬 Contact

- **Issues**: [GitHub Issues](https://github.com/AndreasKalkusinski/VoiceFlow/issues)
- **Discussions**: [GitHub Discussions](https://github.com/AndreasKalkusinski/VoiceFlow/discussions)

---

Made with ❤️ by the SpeakFlow AI community
