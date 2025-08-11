# Privacy Policy for VoiceFlow

_Last updated: January 2024_

## Overview

VoiceFlow is a free, open-source voice transcription and text-to-speech application. We are committed to protecting your privacy and ensuring transparency about how the app handles your data.

## Data Collection

### What We DON'T Collect

VoiceFlow does **NOT** collect, store, or transmit any personal data to our servers because:

- This is a free, open-source application
- We do not operate any backend servers
- All processing happens locally on your device or through third-party APIs you configure

### What Stays on Your Device

The following data is stored locally on your device only:

- Your API keys (encrypted in local storage)
- App preferences and settings
- Language preferences
- Theme selections
- Temporary audio files during recording/playback

### Third-Party Services

VoiceFlow uses the following third-party services that you configure:

#### OpenAI API

- **Purpose**: Speech-to-text and text-to-speech conversion
- **Data Sent**: Audio recordings and text (only when you actively use the features)
- **Privacy Policy**: [OpenAI Privacy Policy](https://openai.com/privacy/)
- **Note**: You provide your own API key; we never see or store it on our servers

#### Sentry (Optional - Only in Production Builds)

- **Purpose**: Crash reporting and error monitoring
- **Data Sent**: Crash logs, error messages, device information
- **Privacy Policy**: [Sentry Privacy Policy](https://sentry.io/privacy/)
- **Note**: Only enabled if you build with production configuration

## Permissions

The app requests the following permissions:

### Microphone Access

- **Purpose**: Recording audio for speech-to-text conversion
- **Usage**: Only when you actively press the record button
- **Storage**: Temporary files deleted after processing

### Internet Access

- **Purpose**: Communicating with OpenAI API for transcription/synthesis
- **Usage**: Only when actively using STT/TTS features

## Data Security

- API keys are stored using React Native's AsyncStorage
- No data is transmitted to any servers we control
- All API communications use HTTPS encryption
- Audio files are temporarily stored and automatically deleted

## Children's Privacy

VoiceFlow does not knowingly collect personal information from children under 13. The app is designed for general use and does not target children.

## Open Source Transparency

As an open-source project:

- Our entire codebase is publicly available on [GitHub](https://github.com/yourusername/VoiceFlow)
- You can review exactly how data is handled
- You can build and run your own version
- You can contribute to improve privacy features

## Your Rights

Since we don't collect personal data:

- There's no personal data to request, delete, or export
- You maintain full control over your API keys
- You can delete all local data by uninstalling the app
- You can modify the source code for your own use

## Changes to This Policy

We may update this privacy policy from time to time. Changes will be noted in the CHANGELOG.md file and the "Last updated" date above.

## Contact

For privacy concerns or questions about this open-source project:

- Open an issue on [GitHub](https://github.com/yourusername/VoiceFlow/issues)
- Email: privacy@voiceflow.app (replace with your email)

## Compliance

This app is designed to comply with:

- GDPR (General Data Protection Regulation)
- CCPA (California Consumer Privacy Act)
- COPPA (Children's Online Privacy Protection Act)

## Summary

**TL;DR**: VoiceFlow is a privacy-first, open-source app. We don't collect your data. Everything stays on your device except what you explicitly send to OpenAI using your own API key.
