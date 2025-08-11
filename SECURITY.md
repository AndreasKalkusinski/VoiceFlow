# Security Policy

## Supported Versions

We provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of VoiceFlow seriously. If you discover a security vulnerability, please follow these steps:

### 1. Do NOT Create a Public Issue

Security vulnerabilities should NOT be reported through public GitHub issues.

### 2. Report Privately

Please report vulnerabilities via one of these methods:

- **Email**: security@voiceflow.app
- **GitHub Security Advisory**: [Create a security advisory](https://github.com/yourusername/VoiceFlow/security/advisories/new)

### 3. What to Include

Please include the following information:

- Type of vulnerability
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the vulnerability

### 4. Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 5 business days
- **Resolution Target**: Within 30 days for critical issues

## Security Best Practices for Users

### API Key Security

- **Never commit API keys** to version control
- Use environment variables for sensitive data
- Rotate API keys regularly
- Use separate API keys for development and production

### App Security

- Keep the app updated to the latest version
- Only download the app from official sources
- Review app permissions before granting them
- Be cautious when processing sensitive audio content

### Building from Source

If you're building from source:

1. Verify the source code integrity
2. Use official dependencies only
3. Keep dependencies updated
4. Review third-party code changes
5. Use security scanning tools

## Known Security Considerations

### Third-Party Dependencies

- The app relies on OpenAI's API - ensure you trust OpenAI with your data
- Audio processing happens through external APIs
- Dependencies are regularly updated for security patches

### Data Storage

- API keys are stored in AsyncStorage (not encrypted by default)
- Consider additional encryption for sensitive deployments
- Audio files are temporarily stored and should be automatically cleaned

### Network Security

- All API calls use HTTPS
- No certificate pinning is implemented by default
- Consider implementing certificate pinning for production deployments

## Security Features

### Implemented

- ✅ HTTPS for all API communications
- ✅ No data collection or telemetry (except optional Sentry)
- ✅ Local storage only (no backend servers)
- ✅ Input validation for API calls
- ✅ Error boundaries for crash handling
- ✅ Secure headers in API requests

### Planned Improvements

- 🚧 Certificate pinning
- 🚧 API key encryption
- 🚧 Biometric authentication option
- 🚧 Automatic audio file cleanup
- 🚧 Rate limiting implementation

## Vulnerability Disclosure Policy

### For Security Researchers

We appreciate the security research community's efforts in helping keep VoiceFlow safe. If you report a vulnerability:

- We will acknowledge your contribution (unless you prefer to remain anonymous)
- We will keep you updated on the fix progress
- We will credit you in the release notes (with your permission)

### Scope

The following are in scope for security reports:

- The VoiceFlow mobile application
- Security issues in dependencies
- API key exposure risks
- Data leakage vulnerabilities
- Authentication/authorization issues

The following are OUT of scope:

- Third-party API vulnerabilities (report to the respective service)
- Social engineering attacks
- Physical attacks
- Denial of Service attacks

## Security Updates

Security updates will be released as:

- **Critical**: Immediate patch release
- **High**: Within 7 days
- **Medium**: Within 30 days
- **Low**: Next regular release

## Contact

For security concerns: security@voiceflow.app

For general issues: [GitHub Issues](https://github.com/yourusername/VoiceFlow/issues)

## Acknowledgments

We thank the following researchers for responsibly disclosing security issues:

- (Your name could be here!)

---

**Remember**: Security is everyone's responsibility. If you see something, say something!
