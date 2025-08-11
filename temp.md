Run npm run lint
  npm run lint
  shell: /usr/bin/bash -e {0}

> voiceflow@1.0.0 lint
> eslint . --ext .js,.jsx,.ts,.tsx


/home/runner/work/VoiceFlow/VoiceFlow/App.tsx
Warning:   74:5  warning  Unexpected console statement  no-console

/home/runner/work/VoiceFlow/VoiceFlow/src/components/AnimatedButton.tsx
Warning:   153:15  warning  Inline style: { fontSize: "size === 'small' ? 14 : size === 'large' ? 18 : 16" }  react-native/no-inline-styles

/home/runner/work/VoiceFlow/VoiceFlow/src/components/FloatingActionButton.tsx
Warning:   56:6  warning  React Hook useEffect has missing dependencies: 'pulseAnim' and 'rotateAnim'. Either include them or remove the dependency array  react-hooks/exhaustive-deps

/home/runner/work/VoiceFlow/VoiceFlow/src/components/LiquidTabBar.tsx
Warning:    16:10  warning  Unexpected any. Specify a different type                                                                                                                                    @typescript-eslint/no-explicit-any
Warning:    17:16  warning  Unexpected any. Specify a different type                                                                                                                                    @typescript-eslint/no-explicit-any
Warning:    18:15  warning  Unexpected any. Specify a different type                                                                                                                                    @typescript-eslint/no-explicit-any
Warning:    54:34  warning  Unexpected any. Specify a different type                                                                                                                                    @typescript-eslint/no-explicit-any
Warning:    62:6   warning  React Hook useEffect has missing dependencies: 'scaleAnims', 'state.routes', and 'translateX'. Either include them or remove the dependency array                           react-hooks/exhaustive-deps
Warning:    64:31  warning  Unexpected any. Specify a different type                                                                                                                                    @typescript-eslint/no-explicit-any
Warning:   132:35  warning  Unexpected any. Specify a different type                                                                                                                                    @typescript-eslint/no-explicit-any
  158:23  warning  Inline style: {
  backgroundColor: 'isDark\n' +
    "                          ? 'rgba(255,255,255,0.08)'\n" +
    "                          : 'rgba(255,255,255,0.5)'"
}  react-native/no-inline-styles

/home/runner/work/VoiceFlow/VoiceFlow/src/components/LogView.tsx
Warning:   27:6  warning  React Hook useEffect has a missing dependency: 'fadeAnim'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

/home/runner/work/VoiceFlow/VoiceFlow/src/components/ModelDropdown.tsx
Warning:   122:46  warning  Inline style: { fontWeight: '600' }  react-native/no-inline-styles

/home/runner/work/VoiceFlow/VoiceFlow/src/components/ModernFAB.tsx
Warning:   64:6  warning  React Hook useEffect has missing dependencies: 'pulseAnim' and 'scaleAnim'. Either include them or remove the dependency array  react-hooks/exhaustive-deps

/home/runner/work/VoiceFlow/VoiceFlow/src/components/ModernTabBar.tsx
Warning:    11:10  warning  Unexpected any. Specify a different type                                                                                            @typescript-eslint/no-explicit-any
Warning:    12:16  warning  Unexpected any. Specify a different type                                                                                            @typescript-eslint/no-explicit-any
Warning:    13:15  warning  Unexpected any. Specify a different type                                                                                            @typescript-eslint/no-explicit-any
Warning:    47:31  warning  Unexpected any. Specify a different type                                                                                            @typescript-eslint/no-explicit-any
Warning:    89:34  warning  Unexpected any. Specify a different type                                                                                            @typescript-eslint/no-explicit-any
Warning:    97:6   warning  React Hook useEffect has missing dependencies: 'animations' and 'state.routes'. Either include them or remove the dependency array  react-hooks/exhaustive-deps
Warning:   108:35  warning  Unexpected any. Specify a different type                                                                                            @typescript-eslint/no-explicit-any
  183:21  warning  Inline style: {
  opacity: 'isFocused ? 1 : 0.7',
  fontWeight: "isFocused ? '600' : '500'"
}                                       react-native/no-inline-styles

/home/runner/work/VoiceFlow/VoiceFlow/src/components/ProviderCard.tsx
Warning:   79:44  warning  Inline style: { backgroundColor: "hasApiKey ? '#10B981' : '#EF4444'" }  react-native/no-inline-styles

/home/runner/work/VoiceFlow/VoiceFlow/src/components/ProviderSettings.tsx
Warning:    17:36  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:    20:65  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:    67:43  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   126:41  warning  Inline style: { flex: 1 }                 react-native/no-inline-styles
Warning:   175:57  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/components/RecordingAnimation.tsx
Warning:   59:6  warning  React Hook useEffect has missing dependencies: 'pulseAnim' and 'waveAnims'. Either include them or remove the dependency array  react-hooks/exhaustive-deps

/home/runner/work/VoiceFlow/VoiceFlow/src/hooks/useThrottle.ts
Warning:   16:49  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   16:59  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/i18n/index.ts
Warning:   34:5  warning  Unexpected console statement  no-console

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/CleanSettingsScreen.tsx
Error:    5:3   error    'TextInput' is defined but never used                                                                                    @typescript-eslint/no-unused-vars
Error:   23:10  error    'useFocusEffect' is defined but never used                                                                               @typescript-eslint/no-unused-vars
Error:   44:19  error    'isDark' is assigned a value but never used                                                                              @typescript-eslint/no-unused-vars
Warning:   67:6   warning  React Hook useEffect has a missing dependency: 'saveSettingsSilently'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/CleanSpeechToTextScreen.tsx
Warning:   210:23  warning  Inline style: { backgroundColor: "isRecording ? '#FF4444' : colors.primary" }  react-native/no-inline-styles
Warning:   225:19  warning  Inline style: { backgroundColor: "isRecording ? '#FF4444' : colors.primary" }  react-native/no-inline-styles

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/CleanTextToSpeechScreen.tsx
Warning:   42:6  warning  React Hook useEffect has a missing dependency: 'sound'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/LazyScreens.tsx
Warning:   70:36  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/Modern2025SettingsScreen.tsx
Error:     5:3   error    'TextInput' is defined but never used                                                                                    @typescript-eslint/no-unused-vars
Error:    16:10  error    'BlurView' is defined but never used                                                                                     @typescript-eslint/no-unused-vars
Warning:    74:6   warning  React Hook useEffect has a missing dependency: 'fadeAnim'. Either include it or remove the dependency array              react-hooks/exhaustive-deps
Warning:    85:6   warning  React Hook useEffect has a missing dependency: 'saveSettingsSilently'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
Error:   526:3   error    Unused style detected: styles.segmentIcon                                                                                react-native/no-unused-styles

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/Modern2025SpeechToTextScreen.tsx
Error:   23:10  error    'ModernButton' is defined but never used                                                                                           @typescript-eslint/no-unused-vars
Warning:   56:6   warning  React Hook useEffect has a missing dependency: 'animateEntry'. Either include it or remove the dependency array                    react-hooks/exhaustive-deps
Warning:   70:6   warning  React Hook useEffect has missing dependencies: 'animatePulse' and 'pulseAnim'. Either include them or remove the dependency array  react-hooks/exhaustive-deps

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/Modern2025TextToSpeechScreen.tsx
Error:    25:10  error    'ModernButton' is defined but never used                                                                                                                                                                                                                                           @typescript-eslint/no-unused-vars
Error:    32:18  error    'contentVH' is defined but never used                                                                                                                                                                                                                                              @typescript-eslint/no-unused-vars
Error:    43:10  error    'playbackProgress' is assigned a value but never used                                                                                                                                                                                                                              @typescript-eslint/no-unused-vars
Warning:    67:6   warning  React Hook useEffect has missing dependencies: 'animateEntry' and 'sound'. Either include them or remove the dependency array                                                                                                                                                      react-hooks/exhaustive-deps
Warning:   148:7   warning  Unexpected console statement                                                                                                                                                                                                                                                       no-console
Warning:   198:21  warning  Unexpected any. Specify a different type                                                                                                                                                                                                                                           @typescript-eslint/no-explicit-any
Error:   217:9   error    'stopPlayback' is assigned a value but never used                                                                                                                                                                                                                                  @typescript-eslint/no-unused-vars
Error:   524:27  error    'containerWidth' is assigned a value but never used                                                                                                                                                                                                                                @typescript-eslint/no-unused-vars
  608:21  warning  Inline style: {
  opacity: 'isGenerating ||\n' +
    '                        !inputText.trim() ||\n' +
    '                        (!settings?.apiKeys?.openai && !settings?.openaiApiKey)\n' +
    '                          ? 0.5\n' +
    '                          : 1'
}  react-native/no-inline-styles
Error:   701:3   error    Unused style detected: styles.subtitle                                                                                                                                                                                                                                             react-native/no-unused-styles

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/ModernSettingsScreen.tsx
Error:     5:3   error    'TextInput' is defined but never used                                                                                                 @typescript-eslint/no-unused-vars
Error:    11:3   error    'Dimensions' is defined but never used                                                                                                @typescript-eslint/no-unused-vars
Error:    20:10  error    'ModelDropdown' is defined but never used                                                                                             @typescript-eslint/no-unused-vars
Error:    32:3   error    'fontSize' is defined but never used                                                                                                  @typescript-eslint/no-unused-vars
Error:    54:10  error    'isLoading' is assigned a value but never used                                                                                        @typescript-eslint/no-unused-vars
Error:    56:10  error    'isValidating' is assigned a value but never used                                                                                     @typescript-eslint/no-unused-vars
Error:    58:10  error    'apiKeyVisible' is assigned a value but never used                                                                                    @typescript-eslint/no-unused-vars
Error:    58:25  error    'setApiKeyVisible' is assigned a value but never used                                                                                 @typescript-eslint/no-unused-vars
Error:    59:10  error    'whisperModels' is assigned a value but never used                                                                                    @typescript-eslint/no-unused-vars
Error:    60:10  error    'ttsModels' is assigned a value but never used                                                                                        @typescript-eslint/no-unused-vars
Error:    61:10  error    'modelsLoading' is assigned a value but never used                                                                                    @typescript-eslint/no-unused-vars
Error:    66:19  error    'theme' is assigned a value but never used                                                                                            @typescript-eslint/no-unused-vars
Warning:    84:6   warning  React Hook useEffect has missing dependencies: 'animateEntry' and 'loadSettings'. Either include them or remove the dependency array  react-hooks/exhaustive-deps
Warning:    96:6   warning  React Hook useEffect has a missing dependency: 'saveSettingsSilently'. Either include it or remove the dependency array               react-hooks/exhaustive-deps
Warning:   113:8   warning  React Hook React.useCallback has a missing dependency: 'fetchAvailableModels'. Either include it or remove the dependency array       react-hooks/exhaustive-deps
Error:   254:9   error    'validateApiKey' is assigned a value but never used                                                                                   @typescript-eslint/no-unused-vars
Warning:   378:49  warning  Inline style: { marginTop: 20 }                                                                                                       react-native/no-inline-styles
Error:   566:3   error    Unused style detected: styles.inputGroup                                                                                              react-native/no-unused-styles
Error:   569:3   error    Unused style detected: styles.label                                                                                                   react-native/no-unused-styles
Error:   574:3   error    Unused style detected: styles.input                                                                                                   react-native/no-unused-styles
Error:   582:3   error    Unused style detected: styles.apiKeyContainer                                                                                         react-native/no-unused-styles
Error:   586:3   error    Unused style detected: styles.eyeButton                                                                                               react-native/no-unused-styles
Error:   590:3   error    Unused style detected: styles.validateButton                                                                                          react-native/no-unused-styles

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/ModernSpeechToTextScreen.tsx
Error:    12:3   error    'Dimensions' is defined but never used                                                                                                     @typescript-eslint/no-unused-vars
Error:    19:10  error    'BlurView' is defined but never used                                                                                                       @typescript-eslint/no-unused-vars
Error:    32:3   error    'fontSize' is defined but never used                                                                                                       @typescript-eslint/no-unused-vars
Error:    47:19  error    'theme' is assigned a value but never used                                                                                                 @typescript-eslint/no-unused-vars
Warning:    60:6   warning  React Hook useEffect has a missing dependency: 'animateEntry'. Either include it or remove the dependency array                            react-hooks/exhaustive-deps
Warning:    75:6   warning  React Hook useEffect has missing dependencies: 'animateWaves' and 'stopWaveAnimation'. Either include them or remove the dependency array  react-hooks/exhaustive-deps
Warning:   128:7   warning  Unexpected console statement                                                                                                               no-console

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/ModernTextToSpeechScreen.tsx
Error:    12:3   error    'Dimensions' is defined but never used                                                                                                                                                                 @typescript-eslint/no-unused-vars
Error:    33:3   error    'fontSize' is defined but never used                                                                                                                                                                   @typescript-eslint/no-unused-vars
Error:    51:19  error    'theme' is assigned a value but never used                                                                                                                                                             @typescript-eslint/no-unused-vars
Error:    55:9   error    'progressAnim' is assigned a value but never used                                                                                                                                                      @typescript-eslint/no-unused-vars
Warning:    67:6   warning  React Hook useEffect has missing dependencies: 'animateEntry' and 'sound'. Either include them or remove the dependency array                                                                          react-hooks/exhaustive-deps
Warning:    77:6   warning  React Hook useEffect has missing dependencies: 'startPulseAnimation', 'startWaveformAnimation', 'stopPulseAnimation', and 'stopWaveformAnimation'. Either include them or remove the dependency array  react-hooks/exhaustive-deps
Warning:   177:7   warning  Unexpected console statement                                                                                                                                                                           no-console
Warning:   272:43  warning  Unexpected any. Specify a different type                                                                                                                                                               @typescript-eslint/no-explicit-any
  550:27  warning  Inline style: {
  backgroundColor: 'isDark\n' +
    "                              ? 'rgba(99, 102, 241, 0.1)'\n" +
    "                              : 'rgba(139, 92, 246, 0.1)'"
}                  react-native/no-inline-styles

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/SettingsScreen.tsx
Warning:   32:6  warning  React Hook useEffect has a missing dependency: 'loadSettings'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/TextToSpeechScreen.tsx
Warning:   36:6  warning  React Hook useEffect has a missing dependency: 'sound'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

/home/runner/work/VoiceFlow/VoiceFlow/src/services/openai.ts
Warning:   85:12  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/BaseProvider.ts
Warning:   11:32  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   27:32  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/elevenlabs/ElevenLabsTTSProvider.ts
Warning:   110:21  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   116:32  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/google/GoogleSTTProvider.ts
Warning:   139:25  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   144:21  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   150:32  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/google/GoogleTTSProvider.ts
Warning:   201:21  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   214:32  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/openai/OpenAISTTProvider.ts
Warning:   56:12  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   71:21  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   77:32  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/openai/OpenAITTSProvider.ts
Warning:   69:21  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/types.ts
Warning:   10:27  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   22:27  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   51:18  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   61:18  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   70:39  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/services/sentry.ts
Warning:    11:5   warning  Unexpected console statement              no-console
Warning:    31:28  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:    55:28  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:    58:5   warning  Unexpected console statement              no-console
Warning:    95:25  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   123:47  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   123:65  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/types/settings.ts
Warning:   29:43  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/utils/accessibility.ts
Warning:    86:16  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   115:16  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/utils/errorHandler.ts
Warning:    18:13  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:    28:20  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:    31:74  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:    54:39  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   118:43  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   142:36  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   189:49  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   201:48  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

✖ 136 problems (40 errors, 96 warnings)

Error: Process completed with exit code 1.