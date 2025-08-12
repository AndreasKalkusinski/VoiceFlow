# Dynamic Model Loading System

This system provides dynamic loading of available models from provider APIs (OpenAI, Google Cloud, ElevenLabs) with local caching and graceful fallbacks.

## Overview

The dynamic model loading system consists of:

1. **ModelService** - Core service for fetching and caching models
2. **Enhanced Providers** - Updated provider classes with dynamic loading capabilities
3. **useModelLoader Hook** - React hook for managing model loading state
4. **UI Components** - Enhanced dropdowns with loading states and refresh functionality

## Key Features

- ✅ Fetch models from provider APIs dynamically
- ✅ Local caching with 24-hour TTL
- ✅ Graceful fallback to hardcoded defaults
- ✅ Manual refresh capability
- ✅ Loading states and error handling
- ✅ Offline support with cached data

## Core Components

### ModelService

The central service that handles all model fetching and caching:

```typescript
const modelService = ModelService.getInstance();

// Fetch OpenAI models
const models = await modelService.fetchOpenAIModels(apiKey);

// Fetch Google voices
const voices = await modelService.fetchGoogleVoices(apiKey);

// Fetch ElevenLabs voices
const voices = await modelService.fetchElevenLabsVoices(apiKey);

// Cache management
await modelService.clearAllCache();
await modelService.clearProviderCache('openai-tts');
```

### Enhanced Providers

All providers now support dynamic model loading:

```typescript
// OpenAI STT Provider
const sttProvider = new OpenAISTTProvider();
await sttProvider.loadModels(apiKey);
const isLoading = sttProvider.isLoadingModels;

// OpenAI TTS Provider
const ttsProvider = new OpenAITTSProvider();
const { models, voices } = await ttsProvider.loadModelsAndVoices(apiKey);

// Google TTS Provider
const googleProvider = new GoogleTTSProvider();
await googleProvider.loadModelsAndVoices(apiKey, (forceRefresh = true));

// ElevenLabs TTS Provider
const elevenProvider = new ElevenLabsTTSProvider();
await elevenProvider.refreshModelsAndVoices(apiKey);
```

### useModelLoader Hook

React hook for managing model loading state:

```typescript
const {
  models, // Available models
  voices, // Available voices (TTS only)
  loading, // Is currently loading
  error, // Error message if any
  refreshModels, // Function to refresh models
  lastRefresh, // Timestamp of last refresh
} = useModelLoader({
  providerId: 'openai-tts',
  apiKey: apiKey,
  autoLoad: true, // Load on mount
});
```

### UI Components

#### DynamicModelConfig

Complete model/voice configuration component:

```tsx
<DynamicModelConfig
  providerId="openai-tts"
  apiKey={apiKey}
  selectedModel={selectedModel}
  selectedVoice={selectedVoice}
  onModelChange={setSelectedModel}
  onVoiceChange={setSelectedVoice}
/>
```

#### Enhanced ModelDropdown

Updated dropdown with refresh functionality:

```tsx
<ModelDropdown
  label="Model"
  value={selectedModel}
  options={modelOptions}
  onValueChange={setSelectedModel}
  loading={loading}
  refreshing={refreshing}
  onRefresh={handleRefresh}
  lastRefresh={lastRefresh}
  error={error}
/>
```

## API Integration

### OpenAI Integration

- **Models**: Fetched from `/v1/models` endpoint
- **Filtering**: Only Whisper models for STT
- **TTS Models**: Static list (tts-1, tts-1-hd)
- **Voices**: Static list (alloy, echo, fable, onyx, nova, shimmer)

### Google Cloud Integration

- **Models**: Static list (neural2, wavenet, standard)
- **Voices**: Fetched from `/v1/voices` endpoint
- **Filtering**: Focuses on Neural2 voices for best quality

### ElevenLabs Integration

- **Models**: Static list (eleven_multilingual_v2, eleven_turbo_v2, etc.)
- **Voices**: Fetched from `/v1/voices` endpoint
- **Features**: Includes voice previews and descriptions

## Caching Strategy

### Cache Keys

- Models: `model_cache_{providerId}_models`
- Voices: `voice_cache_{providerId}_voices`

### TTL (Time To Live)

- Default: 24 hours
- Configurable per fetch operation
- Automatic cleanup of expired cache

### Cache Storage

- Uses AsyncStorage for persistence
- JSON serialized data with timestamps
- Graceful handling of storage errors

## Error Handling

### Network Errors

- Timeout after 10 seconds
- Fallback to cached data if available
- Ultimate fallback to hardcoded defaults

### API Errors

- Invalid API keys
- Rate limiting
- Service unavailable
- Parsing errors

### Graceful Degradation

1. Try API fetch
2. Fall back to cached data
3. Fall back to hardcoded defaults
4. Show appropriate user messaging

## Usage Examples

### Basic Integration

Replace existing hardcoded model dropdowns:

```tsx
// Before
<ModelDropdown
  options={[
    { id: 'tts-1', name: 'TTS Standard' },
    { id: 'tts-1-hd', name: 'TTS HD' }
  ]}
/>

// After
<DynamicModelConfig
  providerId="openai-tts"
  apiKey={apiKey}
  selectedModel={selectedModel}
  onModelChange={setSelectedModel}
/>
```

### Advanced Usage

Custom implementation with hooks:

```tsx
function CustomTTSConfig() {
  const { models, voices, loading, error, refreshModels, lastRefresh } = useModelLoader({
    providerId: 'elevenlabs-tts',
    apiKey: apiKey,
  });

  return (
    <View>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      <ModelPicker models={models} onRefresh={refreshModels} lastUpdate={lastRefresh} />
    </View>
  );
}
```

### Cache Management

```tsx
const modelService = ModelService.getInstance();

// Clear all cached data
await modelService.clearAllCache();

// Clear specific provider
await modelService.clearProviderCache('openai-tts');

// Check cache status
const hasCache = await modelService.hasCachedData('openai-tts', 'models');
const timestamp = await modelService.getCacheTimestamp('openai-tts', 'models');
```

## Performance Considerations

### Lazy Loading

- Models loaded only when needed
- Background refresh doesn't block UI
- Cached data served immediately

### Memory Management

- Singleton ModelService instance
- Automatic cleanup of expired cache
- Minimal memory footprint

### Network Optimization

- 10-second timeout prevents hanging
- Concurrent request prevention
- Efficient JSON parsing

## Testing

### Mock Data

All providers include fallback data for testing:

```typescript
// Get fallback models without API calls
const fallbackModels = modelService.getFallbackOpenAIModels();
const fallbackVoices = modelService.getFallbackElevenLabsVoices();
```

### Error Simulation

Test error handling by:

- Using invalid API keys
- Disconnecting network
- Clearing AsyncStorage

## Migration Guide

### Step 1: Update Provider Usage

Replace direct provider model access:

```typescript
// Before
const models = provider.models;

// After
await provider.loadModels(apiKey);
const models = provider.models;
```

### Step 2: Update UI Components

Replace static dropdowns with dynamic ones:

```tsx
// Before
<ModelDropdown options={staticModels} />

// After
<DynamicModelConfig
  providerId="openai-tts"
  apiKey={apiKey}
  // ... other props
/>
```

### Step 3: Handle Loading States

Add loading and error states to your UI:

```tsx
const { loading, error } = useModelLoader({...});

return (
  <View>
    {loading && <ActivityIndicator />}
    {error && <ErrorMessage />}
    <ModelConfig />
  </View>
);
```

## Troubleshooting

### Common Issues

1. **Models not loading**: Check API key validity
2. **Cache not clearing**: Verify AsyncStorage permissions
3. **Slow performance**: Check network connection
4. **Fallback models**: API might be down or rate-limited

### Debug Mode

Enable console logging for debugging:

```typescript
// Check cache status
console.log('Cache timestamp:', await modelService.getCacheTimestamp('openai', 'models'));

// Monitor loading states
console.log('Loading models:', provider.isLoadingModels);
```

### Reset Everything

To completely reset the system:

```typescript
// Clear all caches
await ModelService.getInstance().clearAllCache();

// Restart app or remount components
```

## Future Enhancements

- **Background refresh**: Automatic cache updates
- **Offline detection**: Better offline experience
- **Usage analytics**: Track popular models
- **Custom endpoints**: Support for custom API URLs
- **Batch operations**: Bulk model loading
- **Version management**: Handle API version changes
