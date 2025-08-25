# SpeakFlow AI 🎤🔊

![CI/CD](https://github.com/AndreasKalkusinski/VoiceFlow/actions/workflows/ci.yml/badge.svg)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React Native](https://img.shields.io/badge/React%20Native-0.79-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-53-000.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Build Status](https://img.shields.io/github/actions/workflow/status/AndreasKalkusinski/VoiceFlow/ci.yml)](https://github.com/AndreasKalkusinski/VoiceFlow/actions)

A modern, open-source React Native app for Speech-to-Text and Text-to-Speech using OpenAI's Whisper and TTS APIs.

🌍 **[English](#english)** | 🇩🇪 **[Deutsch](#deutsch)**

## 🌟 Why SpeakFlow AI?

- 🆓 **100% Free & Open Source** - No hidden costs, no subscriptions
- 🔒 **Privacy First** - Your data stays on your device
- 🎨 **Beautiful UI** - Three modern themes with dark mode support
- 🌍 **Multi-language** - Supports English, German, Spanish
- ⚡ **Fast & Reliable** - Built with performance in mind
- 🧩 **Extensible** - Easy to add new providers and features

---

## English

### Features

### 🎤 Speech-to-Text

- Sprachaufnahme mit visueller Animation
- Transkription über OpenAI Whisper
- Text bearbeiten und ergänzen
- Text in Zwischenablage kopieren

### 🔊 Text-to-Speech

- Text eingeben oder aus Zwischenablage einfügen
- Sprachausgabe mit verschiedenen Stimmen
- Wiedergabe-Kontrollen (Play/Pause/Stop)

### ⚙️ Settings

- OpenAI API Key Konfiguration
- API Key Validierung
- Modell-Auswahl für STT und TTS
- Stimmenauswahl für TTS

## Installation

1. **Abhängigkeiten installieren:**

```bash
npm install
```

2. **App starten:**

```bash
npx expo start
```

3. **App auf Gerät/Simulator ausführen:**

- iOS: Drücke `i` im Terminal
- Android: Drücke `a` im Terminal
- Expo Go App: Scanne den QR-Code

## Konfiguration

1. Öffne die App und gehe zu **Settings**
2. Gib deinen OpenAI API Key ein
3. Klicke auf **Validate API Key** um zu prüfen ob er funktioniert
4. Speichere die Einstellungen

## OpenAI API Key

Du benötigst einen OpenAI API Key. Diesen erhältst du unter:
https://platform.openai.com/api-keys

## Verwendete Technologien

- React Native mit Expo
- TypeScript
- OpenAI Whisper API (Speech-to-Text)
- OpenAI TTS API (Text-to-Speech)
- AsyncStorage für lokale Datenspeicherung
- React Navigation für die Navigation

## Hinweise

- Die App benötigt Mikrofonberechtigungen für Speech-to-Text
- Eine aktive Internetverbindung ist für die API-Aufrufe erforderlich
- Der API Key wird lokal auf dem Gerät gespeichert

## 🤝 Contributing

We love contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Start for Contributors

```bash
# Fork and clone the repo
git clone https://github.com/yourusername/VoiceFlow.git

# Install dependencies
npm install

# Start development
npm start
```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Privacy & Security

- [Privacy Policy](PRIVACY.md)
- [Terms of Service](TERMS.md)
- [Security Policy](SECURITY.md)

## 📊 Project Status

- ✅ Core features complete
- ✅ Production ready
- ✅ Fully tested
- 🚧 Continuous improvements

## 🙏 Acknowledgments

- OpenAI for the amazing Whisper and TTS APIs
- The React Native and Expo communities
- All our contributors

---

## Deutsch

### Entwicklung

Die App ist modular aufgebaut:

- `/src/screens/` - Die drei Hauptbildschirme
- `/src/components/` - Wiederverwendbare Komponenten
- `/src/services/` - API und Storage Services
- `/src/types/` - TypeScript Type Definitionen

## ⭐ Support the Project

If you like VoiceFlow, please:

- ⭐ Star this repository
- 🐛 Report bugs
- 💡 Suggest new features
- 🤝 Contribute code
- 📣 Share with others

## 📬 Contact

- **Issues**: [GitHub Issues](https://github.com/yourusername/VoiceFlow/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/VoiceFlow/discussions)
- **Email**: support@voiceflow.app

---

Made with ❤️ by the VoiceFlow community
