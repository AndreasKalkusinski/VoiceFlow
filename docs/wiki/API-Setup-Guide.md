# API Setup Guide

This guide will help you set up API providers for VoiceFlow. You'll need at least one API key to use the app's features.

## 🎯 Quick Overview

| Provider   | Speech-to-Text | Text-to-Speech     | AI Chat      | Cost         |
| ---------- | -------------- | ------------------ | ------------ | ------------ |
| OpenAI     | ✅ Whisper     | ✅ Multiple voices | ✅ GPT-4/3.5 | Pay-per-use  |
| Google     | ❌             | ✅ Natural voices  | ✅ Gemini    | Pay-per-use  |
| Anthropic  | ❌             | ❌                 | ✅ Claude    | Pay-per-use  |
| ElevenLabs | ❌             | ✅ Premium voices  | ❌           | Subscription |

## 🔐 OpenAI Setup

### Step 1: Create Account

1. Visit [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Verify your email

### Step 2: Get API Key

1. Go to [API Keys](https://platform.openai.com/api-keys)
2. Click **"Create new secret key"**
3. Name it (e.g., "VoiceFlow")
4. Copy the key immediately (you won't see it again!)

### Step 3: Add to VoiceFlow

1. Open VoiceFlow → **Settings**
2. Select **OpenAI** provider
3. Paste your API key
4. Tap **Validate**

### Step 4: Add Credits

1. Go to [Billing](https://platform.openai.com/billing)
2. Add payment method
3. Add credits ($5-10 is enough to start)

### Pricing (Approximate)

- **Whisper STT**: $0.006 per minute
- **TTS**: $0.015 per 1K characters
- **GPT-3.5**: $0.002 per 1K tokens
- **GPT-4**: $0.03 per 1K tokens

## 🌐 Google Cloud Setup

### Step 1: Create Project

1. Visit [Google Cloud Console](https://console.cloud.google.com)
2. Create new project
3. Enable billing

### Step 2: Enable APIs

1. Enable **"Generative Language API"** for Gemini
2. Enable **"Cloud Text-to-Speech API"** for TTS

### Step 3: Get API Key

1. Go to **APIs & Services** → **Credentials**
2. Click **"Create Credentials"** → **API Key**
3. Restrict key to enabled APIs
4. Copy the key

### Step 4: Add to VoiceFlow

1. Open VoiceFlow → **Settings**
2. Select **Google** provider
3. Paste your API key
4. Tap **Validate**

### Pricing

- **Gemini Pro**: Free tier available
- **Text-to-Speech**: $4 per 1M characters

## 🤖 Anthropic (Claude) Setup

### Step 1: Get Access

1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Request access (may have waitlist)
3. Verify email

### Step 2: Get API Key

1. Go to **API Keys**
2. Create new key
3. Copy immediately

### Step 3: Add to VoiceFlow

1. Open VoiceFlow → **Settings**
2. Select **Anthropic** provider
3. Paste your API key
4. Tap **Validate**

### Pricing

- **Claude 3 Opus**: $0.015 per 1K tokens (input)
- **Claude 3 Sonnet**: $0.003 per 1K tokens
- **Claude 3 Haiku**: $0.00025 per 1K tokens

## 🎙️ ElevenLabs Setup (Premium TTS)

### Step 1: Create Account

1. Visit [elevenlabs.io](https://elevenlabs.io)
2. Sign up for account
3. Choose plan (free tier available)

### Step 2: Get API Key

1. Go to **Profile** → **API Key**
2. Copy your key

### Step 3: Add to VoiceFlow

1. Open VoiceFlow → **Settings**
2. Select **ElevenLabs** provider
3. Paste your API key
4. Tap **Validate**

### Pricing

- **Free**: 10,000 characters/month
- **Starter**: $5/month for 30,000 characters
- **Pro**: Higher tiers available

## 💡 Tips for API Management

### Security

- ✅ Never share API keys in screenshots
- ✅ Regenerate keys if compromised
- ✅ Use separate keys for different apps
- ✅ Set usage limits in provider dashboards

### Cost Control

1. **Set Budgets**: Most providers allow monthly limits
2. **Monitor Usage**: Check provider dashboards regularly
3. **Use Efficient Models**:
   - GPT-3.5 for simple tasks
   - Claude Haiku for quick responses
   - Gemini for free tier

### Best Practices

- Start with one provider (OpenAI recommended)
- Add others based on specific needs
- Keep small credit balance ($10-20)
- Monitor usage weekly at first

## 🔄 Switching Providers

You can switch providers anytime:

1. **Settings** → **Providers**
2. Select different provider for each service
3. Changes apply immediately

## ⚠️ Troubleshooting

### "Invalid API Key"

- Check for spaces before/after key
- Ensure key hasn't been revoked
- Verify billing is active

### "Quota Exceeded"

- Add credits to account
- Check usage limits
- Wait for monthly reset (free tiers)

### "Network Error"

- Check internet connection
- Verify API is not down (check provider status page)
- Try different provider

## 📊 Usage Estimation

| Usage                                    | Monthly Cost (Estimate) |
| ---------------------------------------- | ----------------------- |
| Light (10 min/day STT, 100 AI queries)   | $5-10                   |
| Medium (30 min/day STT, 300 AI queries)  | $15-25                  |
| Heavy (60+ min/day STT, 500+ AI queries) | $30-50                  |

## 🆘 Provider Support

- **OpenAI**: [help.openai.com](https://help.openai.com)
- **Google Cloud**: [cloud.google.com/support](https://cloud.google.com/support)
- **Anthropic**: [support.anthropic.com](https://support.anthropic.com)
- **ElevenLabs**: [help.elevenlabs.io](https://help.elevenlabs.io)

## 🔒 Privacy Note

Remember:

- API providers process your data according to their policies
- Review each provider's privacy policy
- You're responsible for compliance with their terms
- VoiceFlow never sees or stores your API keys on our servers

---

**Next**: [Features Overview](Features-Overview) - Explore all VoiceFlow features
