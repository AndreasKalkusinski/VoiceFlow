# Security Policy

## 🔒 VoiceFlow Security Model

VoiceFlow is designed with security and privacy at its core:

### Architecture

- **No Backend**: No servers to hack
- **Local Storage**: All data stays on device
- **Direct API Calls**: No middleman servers
- **Open Source**: Fully auditable code

### Data Protection

- API keys stored in device keychain (iOS) / encrypted storage (Android)
- Audio files deleted immediately after processing
- No telemetry or analytics
- No user tracking

## 🚨 Reporting Security Vulnerabilities

If you discover a security vulnerability, please:

1. **DO NOT** open a public issue
2. Use GitHub's [Security Advisory](https://github.com/AndreasKalkusinski/VoiceFlow/security/advisories/new)
3. Or create a private security report

### What to include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## ✅ Security Best Practices

### For Users:

- **Never share API keys** in screenshots or recordings
- **Use strong device passcodes** (API keys are protected by device security)
- **Keep the app updated** for security patches
- **Review API provider security** (OpenAI, Google, Anthropic policies)

### For Contributors:

- **Never log API keys** or sensitive data
- **Use HTTPS only** for API calls
- **Sanitize user inputs** before API calls
- **Keep dependencies updated**
- **No hardcoded secrets**

## 🛡️ Security Features

### Current:

- ✅ Encrypted API key storage
- ✅ HTTPS for all API calls
- ✅ No persistent audio storage
- ✅ No user tracking
- ✅ Minimal permissions

### Planned:

- [ ] Biometric authentication option
- [ ] API key rotation reminders
- [ ] Security audit logging (local only)

## 📋 Security Checklist for PRs

Before merging code:

- [ ] No API keys in code
- [ ] No console.logs of sensitive data
- [ ] HTTPS for all external calls
- [ ] Input validation added
- [ ] No new permissions required

## 🔍 Third-Party Security

VoiceFlow uses:

- **React Native**: [Security Guide](https://reactnative.dev/docs/security)
- **Expo**: [Security Documentation](https://docs.expo.dev/guides/security/)
- **AsyncStorage**: Device-encrypted storage

API Providers:

- **OpenAI**: [Security Portal](https://openai.com/security)
- **Google Cloud**: [Security](https://cloud.google.com/security)
- **Anthropic**: [Security](https://www.anthropic.com/security)

## 📅 Security Updates

- Security patches: Released ASAP
- Regular updates: Monthly
- Dependency updates: Weekly automated checks

## 🤝 Responsible Disclosure

We follow responsible disclosure:

1. Reporter submits vulnerability privately
2. We acknowledge within 48 hours
3. We work on a fix
4. We release the fix
5. We publicly disclose after users have updated

---

_Last updated: January 2025_
