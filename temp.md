Run npm run lint
npm run lint
shell: /usr/bin/bash -e {0}

> voiceflow@1.0.0 lint
> eslint . --ext .js,.jsx,.ts,.tsx

/home/runner/work/VoiceFlow/VoiceFlow/App.tsx
Warning: 74:5 warning Unexpected console statement no-console

/home/runner/work/VoiceFlow/VoiceFlow/src/components/AnimatedButton.tsx
Warning: 153:15 warning Inline style: { fontSize: "size === 'small' ? 14 : size === 'large' ? 18 : 16" } react-native/no-inline-styles

/home/runner/work/VoiceFlow/VoiceFlow/src/components/FloatingActionButton.tsx
Warning: 56:6 warning React Hook useEffect has missing dependencies: 'pulseAnim' and 'rotateAnim'. Either include them or remove the dependency array react-hooks/exhaustive-deps

/home/runner/work/VoiceFlow/VoiceFlow/src/components/LiquidTabBar.tsx
Warning: 49:34 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 57:6 warning React Hook useEffect has missing dependencies: 'scaleAnims', 'state.routes', and 'translateX'. Either include them or remove the dependency array react-hooks/exhaustive-deps
Warning: 59:31 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 127:35 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
153:23 warning Inline style: {
backgroundColor: 'isDark\n' +
" ? 'rgba(255,255,255,0.08)'\n" +
" : 'rgba(255,255,255,0.5)'"
} react-native/no-inline-styles

/home/runner/work/VoiceFlow/VoiceFlow/src/components/LogView.tsx
Warning: 27:6 warning React Hook useEffect has a missing dependency: 'fadeAnim'. Either include it or remove the dependency array react-hooks/exhaustive-deps

/home/runner/work/VoiceFlow/VoiceFlow/src/components/ModelDropdown.tsx
Warning: 122:46 warning Inline style: { fontWeight: '600' } react-native/no-inline-styles

/home/runner/work/VoiceFlow/VoiceFlow/src/components/ModernFAB.tsx
Warning: 64:6 warning React Hook useEffect has missing dependencies: 'pulseAnim' and 'scaleAnim'. Either include them or remove the dependency array react-hooks/exhaustive-deps

/home/runner/work/VoiceFlow/VoiceFlow/src/components/ModernTabBar.tsx
Warning: 43:31 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 85:34 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 93:6 warning React Hook useEffect has missing dependencies: 'animations' and 'state.routes'. Either include them or remove the dependency array react-hooks/exhaustive-deps
Warning: 104:35 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
179:21 warning Inline style: {
opacity: 'isFocused ? 1 : 0.7',
fontWeight: "isFocused ? '600' : '500'"
} react-native/no-inline-styles

/home/runner/work/VoiceFlow/VoiceFlow/src/components/ProviderCard.tsx
Warning: 79:44 warning Inline style: { backgroundColor: "hasApiKey ? '#10B981' : '#EF4444'" } react-native/no-inline-styles

/home/runner/work/VoiceFlow/VoiceFlow/src/components/ProviderSettings.tsx
Warning: 17:36 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 20:65 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 67:43 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 126:41 warning Inline style: { flex: 1 } react-native/no-inline-styles
Warning: 175:57 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/components/RecordingAnimation.tsx
Warning: 59:6 warning React Hook useEffect has missing dependencies: 'pulseAnim' and 'waveAnims'. Either include them or remove the dependency array react-hooks/exhaustive-deps

/home/runner/work/VoiceFlow/VoiceFlow/src/hooks/useThrottle.ts
Warning: 16:49 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 16:59 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/i18n/index.ts
Warning: 34:5 warning Unexpected console statement no-console

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/CleanSettingsScreen.tsx
Warning: 65:6 warning React Hook useEffect has a missing dependency: 'saveSettingsSilently'. Either include it or remove the dependency array react-hooks/exhaustive-deps

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/CleanSpeechToTextScreen.tsx
Warning: 210:23 warning Inline style: { backgroundColor: "isRecording ? '#FF4444' : colors.primary" } react-native/no-inline-styles
Warning: 225:19 warning Inline style: { backgroundColor: "isRecording ? '#FF4444' : colors.primary" } react-native/no-inline-styles

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/CleanTextToSpeechScreen.tsx
Warning: 42:6 warning React Hook useEffect has a missing dependency: 'sound'. Either include it or remove the dependency array react-hooks/exhaustive-deps

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/LazyScreens.tsx
Warning: 70:36 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/Modern2025SettingsScreen.tsx
Warning: 72:6 warning React Hook useEffect has a missing dependency: 'fadeAnim'. Either include it or remove the dependency array react-hooks/exhaustive-deps
Warning: 83:6 warning React Hook useEffect has a missing dependency: 'saveSettingsSilently'. Either include it or remove the dependency array react-hooks/exhaustive-deps

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/Modern2025SpeechToTextScreen.tsx
Warning: 55:6 warning React Hook useEffect has a missing dependency: 'animateEntry'. Either include it or remove the dependency array react-hooks/exhaustive-deps
Warning: 69:6 warning React Hook useEffect has missing dependencies: 'animatePulse' and 'pulseAnim'. Either include them or remove the dependency array react-hooks/exhaustive-deps

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/Modern2025TextToSpeechScreen.tsx
Warning: 66:6 warning React Hook useEffect has missing dependencies: 'animateEntry' and 'sound'. Either include them or remove the dependency array react-hooks/exhaustive-deps
Warning: 147:7 warning Unexpected console statement no-console
Warning: 197:21 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 216:9 error '\_stopPlayback' is assigned a value but never used @typescript-eslint/no-unused-vars
607:21 warning Inline style: {
opacity: 'isGenerating ||\n' +
' !inputText.trim() ||\n' +
' (!settings?.apiKeys?.openai && !settings?.openaiApiKey)\n' +
' ? 0.5\n' +
' : 1'
} react-native/no-inline-styles

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/ModernSettingsScreen.tsx
Error: 20:25 error 'Model' is defined but never used @typescript-eslint/no-unused-vars
Error: 25:9 error Replace `⏎··wp,⏎··hp,⏎··spacing,⏎··fontSizes,⏎··componentHeights,⏎··adaptiveSpacing,⏎` with `·wp,·hp,·spacing,·fontSizes,·componentHeights,·adaptiveSpacing·` prettier/prettier
Error: 26:3 error 'wp' is defined but never used @typescript-eslint/no-unused-vars
Warning: 80:6 warning React Hook useEffect has missing dependencies: 'animateEntry' and 'loadSettings'. Either include them or remove the dependency array react-hooks/exhaustive-deps
Warning: 92:6 warning React Hook useEffect has a missing dependency: 'saveSettingsSilently'. Either include it or remove the dependency array react-hooks/exhaustive-deps
Warning: 109:8 warning React Hook React.useCallback has a missing dependency: 'fetchAvailableModels'. Either include it or remove the dependency array react-hooks/exhaustive-deps
Error: 250:9 error '\_validateApiKey' is assigned a value but never used @typescript-eslint/no-unused-vars
Warning: 374:49 warning Inline style: { marginTop: 20 } react-native/no-inline-styles

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/ModernSpeechToTextScreen.tsx
Error: 26:9 error Replace `⏎··wp,⏎··hp,⏎··spacing,⏎··fontSizes,⏎··componentHeights,⏎··adaptiveSpacing,⏎` with `·wp,·hp,·spacing,·fontSizes,·componentHeights,·adaptiveSpacing·` prettier/prettier
Warning: 57:6 warning React Hook useEffect has a missing dependency: 'animateEntry'. Either include it or remove the dependency array react-hooks/exhaustive-deps
Warning: 72:6 warning React Hook useEffect has missing dependencies: 'animateWaves' and 'stopWaveAnimation'. Either include them or remove the dependency array react-hooks/exhaustive-deps
Warning: 125:7 warning Unexpected console statement no-console

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/ModernTextToSpeechScreen.tsx
Error: 28:9 error Replace `⏎··wp,⏎··hp,⏎··spacing,⏎··fontSizes,⏎··componentHeights,⏎··adaptiveSpacing,⏎` with `·wp,·hp,·spacing,·fontSizes,·componentHeights,·adaptiveSpacing·` prettier/prettier
Warning: 65:6 warning React Hook useEffect has missing dependencies: 'animateEntry' and 'sound'. Either include them or remove the dependency array react-hooks/exhaustive-deps
Warning: 75:6 warning React Hook useEffect has missing dependencies: 'startPulseAnimation', 'startWaveformAnimation', 'stopPulseAnimation', and 'stopWaveformAnimation'. Either include them or remove the dependency array react-hooks/exhaustive-deps
Warning: 175:7 warning Unexpected console statement no-console
Warning: 270:43 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
548:27 warning Inline style: {
backgroundColor: 'isDark\n' +
" ? 'rgba(99, 102, 241, 0.1)'\n" +
" : 'rgba(139, 92, 246, 0.1)'"
} react-native/no-inline-styles

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/SettingsScreen.tsx
Warning: 32:6 warning React Hook useEffect has a missing dependency: 'loadSettings'. Either include it or remove the dependency array react-hooks/exhaustive-deps

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/TextToSpeechScreen.tsx
Warning: 36:6 warning React Hook useEffect has a missing dependency: 'sound'. Either include it or remove the dependency array react-hooks/exhaustive-deps

/home/runner/work/VoiceFlow/VoiceFlow/src/services/openai.ts
Warning: 85:12 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/BaseProvider.ts
Warning: 11:32 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 27:32 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/elevenlabs/ElevenLabsTTSProvider.ts
Warning: 110:21 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 116:32 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/google/GoogleSTTProvider.ts
Warning: 139:25 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 144:21 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 150:32 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/google/GoogleTTSProvider.ts
Warning: 201:21 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 214:32 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/openai/OpenAISTTProvider.ts
Warning: 56:12 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 71:21 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 77:32 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/openai/OpenAITTSProvider.ts
Warning: 69:21 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/types.ts
Warning: 10:27 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 22:27 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 51:18 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 61:18 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 70:39 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/services/sentry.ts
Warning: 11:5 warning Unexpected console statement no-console
Warning: 31:28 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 55:28 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 58:5 warning Unexpected console statement no-console
Warning: 95:25 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 123:47 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 123:65 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/types/navigation.ts
Error: 16:20 error Replace `·color,·size,·focused·}:·{·color:·string;·size:·number;·focused:·boolean` with `⏎······color,⏎······size,⏎······focused,⏎····}:·{⏎······color:·string;⏎······size:·number;⏎······focused:·boolean;⏎···` prettier/prettier
Error: 32:2 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/types/settings.ts
Warning: 29:43 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/utils/accessibility.ts
Warning: 86:16 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 115:16 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/utils/errorHandler.ts
Warning: 18:13 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 28:20 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 31:74 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 54:39 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 118:43 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 142:36 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 189:49 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 201:48 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

✖ 99 problems (9 errors, 90 warnings)
5 errors and 0 warnings potentially fixable with the `--fix` option.

Error: Process completed with exit code 1.
