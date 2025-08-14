# Troubleshooting Guide

Having issues with VoiceFlow? This guide covers common problems and their solutions.

## 🔴 Common Issues

### API Key Issues

#### "Invalid API Key"

**Symptoms**: Error when validating or using API features

**Solutions**:

1. Check for extra spaces before/after the key
2. Ensure you copied the complete key
3. Verify the key hasn't been revoked
4. Check if billing is active on your API account
5. Try regenerating a new key

#### "Quota Exceeded" or "Rate Limited"

**Symptoms**: API calls fail after working initially

**Solutions**:

1. Check your API provider's dashboard for usage
2. Add credits/payment method if needed
3. Wait for rate limit to reset (usually minutes)
4. Consider upgrading your API plan
5. Use a different API provider temporarily

### Audio/Recording Issues

#### "Microphone Permission Denied"

**Symptoms**: Can't start recording

**Solutions**:

**iOS**:

1. Settings → Privacy & Security → Microphone
2. Enable VoiceFlow
3. Restart app

**Android**:

1. Settings → Apps → VoiceFlow → Permissions
2. Enable Microphone
3. Restart app

#### "Recording Failed" or No Audio

**Symptoms**: Recording appears to work but no transcription

**Solutions**:

1. Check device volume isn't muted
2. Test microphone in another app
3. Restart the app
4. Restart your device
5. Check for iOS/Android system updates

#### Audio Too Quiet

**Symptoms**: Poor transcription quality

**Solutions**:

1. Speak closer to microphone (6-12 inches)
2. Increase speaking volume
3. Reduce background noise
4. Check microphone isn't covered
5. Clean microphone opening

### Network Issues

#### "Network Error" or "Connection Failed"

**Symptoms**: Can't connect to API providers

**Solutions**:

1. Check internet connection
2. Try switching WiFi/Mobile data
3. Check if API provider is down:
   - [OpenAI Status](https://status.openai.com)
   - [Google Cloud Status](https://status.cloud.google.com)
   - [Anthropic Status](https://status.anthropic.com)
4. Disable VPN if using one
5. Check firewall settings

#### Slow Response Times

**Symptoms**: Long wait for transcription/TTS

**Solutions**:

1. Check internet speed
2. Try a different API provider
3. Use smaller/faster models (GPT-3.5 vs GPT-4)
4. Process shorter text segments
5. Check API provider status page

### App Crashes/Freezes

#### App Crashes on Launch

**Solutions**:

1. Update to latest version
2. Clear app data/cache (Android)
3. Reinstall app
4. Check device storage space
5. Update OS to latest version

#### App Freezes During Use

**Solutions**:

1. Force close and restart app
2. Clear history if too large
3. Reduce text input size
4. Free up device memory
5. Disable battery optimization for app

### Text-to-Speech Issues

#### "TTS Failed" or No Audio Output

**Solutions**:

1. Check device isn't on silent mode
2. Check volume settings
3. Try different voice selection
4. Test with shorter text
5. Verify API key has TTS permissions

#### Robotic or Poor Quality Voice

**Solutions**:

1. Try different voice models
2. Use premium TTS provider (ElevenLabs)
3. Check text formatting (remove special characters)
4. Adjust speech speed if available
5. Update to latest app version

### UI/Display Issues

#### Text Cut Off or Not Visible

**Solutions**:

1. Check display size settings
2. Rotate device orientation
3. Adjust font size in device settings
4. Try different UI theme
5. Report specific issue with screenshot

#### Buttons Not Responding

**Solutions**:

1. Restart app
2. Check for app updates
3. Clear app cache
4. Check device touch sensitivity
5. Disable any screen overlay apps

## 🔧 Advanced Troubleshooting

### Debug Mode

Enable debug logging:

1. Settings → Advanced → Debug Mode
2. Reproduce issue
3. Share logs via Settings → Export Logs

### Reset Everything

Complete reset:

1. Settings → Advanced → Clear All Data
2. Reinstall app
3. Re-enter API keys

### Check Permissions

Verify all permissions:

- Microphone: Required
- Storage: Optional (for history)
- Network: Required

## 📱 Platform-Specific Issues

### iOS Specific

#### "App Not Available in Your Region"

- VoiceFlow should be available globally
- Check App Store country settings
- Contact support if restricted

#### TestFlight Beta Issues

- Ensure TestFlight app is installed
- Check if beta has expired
- Request new invitation if needed

### Android Specific

#### "App Not Installed" Error

- Enable "Install Unknown Apps" for APK
- Check available storage space
- Verify APK isn't corrupted
- Download fresh APK from GitHub

#### Battery Optimization Killing App

1. Settings → Battery → App Battery Management
2. Find VoiceFlow
3. Set to "Unrestricted"

## 🔍 Diagnostic Checklist

Before reporting an issue, check:

- [ ] Using latest app version
- [ ] API key is valid and has credits
- [ ] Internet connection is stable
- [ ] Device has enough storage
- [ ] Microphone permission granted
- [ ] Device OS is up to date
- [ ] Tried restarting app
- [ ] Tried different API provider

## 📊 Performance Tips

### Optimize for Speed

1. Use faster models (GPT-3.5 Turbo)
2. Keep recordings under 1 minute
3. Process text in chunks
4. Use WiFi over mobile data
5. Close other apps

### Reduce Costs

1. Use efficient models
2. Batch process when possible
3. Set up usage alerts
4. Use free tiers when available
5. Monitor dashboard regularly

## 🆘 Getting Help

### Self-Help Resources

1. Check this Troubleshooting guide
2. Search [GitHub Issues](https://github.com/AndreasKalkusinski/VoiceFlow/issues)
3. Browse [Discussions](https://github.com/AndreasKalkusinski/VoiceFlow/discussions)
4. Review [FAQ](FAQ)

### Report a Bug

When reporting, include:

1. Device model and OS version
2. App version
3. API provider being used
4. Steps to reproduce
5. Screenshot/screen recording if possible
6. Error messages exact text

### Community Support

- [GitHub Discussions](https://github.com/AndreasKalkusinski/VoiceFlow/discussions)
- [Issue Tracker](https://github.com/AndreasKalkusinski/VoiceFlow/issues)

## 🔄 Recovery Procedures

### Lost API Key

1. Can't be recovered from app (security)
2. Go to provider dashboard
3. Generate new key
4. Update in VoiceFlow

### Corrupted Settings

1. Settings → Clear All Data
2. Restart app
3. Re-enter configuration

### History Lost

- History is local only
- Cannot be recovered if deleted
- Consider periodic manual export

## ⚡ Quick Fixes

| Problem          | Quick Fix                       |
| ---------------- | ------------------------------- |
| No transcription | Check API key and credits       |
| App crash        | Update app and restart device   |
| Slow performance | Clear history, use faster model |
| Network error    | Check connection, try VPN off   |
| No audio         | Check volume and permissions    |

---

**Still need help?** [Open an issue](https://github.com/AndreasKalkusinski/VoiceFlow/issues/new/choose) with details!
