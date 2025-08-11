Run npm run lint

> voiceflow@1.0.0 lint
> eslint . --ext .js,.jsx,.ts,.tsx

/home/runner/work/VoiceFlow/VoiceFlow/App.tsx
Warning: 74:5 warning Unexpected console statement no-console

/home/runner/work/VoiceFlow/VoiceFlow/jest-setup.js
Error: 36:20 error A `require()` style import is forbidden @typescript-eslint/no-require-imports
Error: 43:20 error A `require()` style import is forbidden @typescript-eslint/no-require-imports
Error: 50:9 error 'React' is assigned a value but never used @typescript-eslint/no-unused-vars
Error: 50:17 error A `require()` style import is forbidden @typescript-eslint/no-require-imports
Error: 59:9 error 'React' is assigned a value but never used @typescript-eslint/no-unused-vars
Error: 59:17 error A `require()` style import is forbidden @typescript-eslint/no-require-imports
Error: 60:20 error A `require()` style import is forbidden @typescript-eslint/no-require-imports
Error: 72:20 error A `require()` style import is forbidden @typescript-eslint/no-require-imports
Error: 79:3 error A `require()` style import is forbidden @typescript-eslint/no-require-imports
Error: 84:22 error A `require()` style import is forbidden @typescript-eslint/no-require-imports

/home/runner/work/VoiceFlow/VoiceFlow/src/components/AnimatedButton.tsx
Warning: 153:15 warning Inline style: { fontSize: "size === 'small' ? 14 : size === 'large' ? 18 : 16" } react-native/no-inline-styles

/home/runner/work/VoiceFlow/VoiceFlow/src/components/ErrorBoundary.tsx
Error: 76:19 error `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;` react/no-unescaped-entities

/home/runner/work/VoiceFlow/VoiceFlow/src/components/FloatingActionButton.tsx
Error: 21:19 error 'theme' is assigned a value but never used @typescript-eslint/no-unused-vars
Warning: 56:6 warning React Hook useEffect has missing dependencies: 'pulseAnim' and 'rotateAnim'. Either include them or remove the dependency array react-hooks/exhaustive-deps

/home/runner/work/VoiceFlow/VoiceFlow/src/components/LiquidTabBar.tsx
Error: 7:8 error 'Svg' is defined but never used @typescript-eslint/no-unused-vars
Error: 7:15 error 'Path' is defined but never used @typescript-eslint/no-unused-vars
Warning: 16:10 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 17:16 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 18:15 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 54:34 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 62:6 warning React Hook useEffect has missing dependencies: 'scaleAnims', 'state.routes', and 'translateX'. Either include them or remove the dependency array react-hooks/exhaustive-deps
Warning: 64:31 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 132:35 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
158:23 warning Inline style: {
backgroundColor: 'isDark\n' +
" ? 'rgba(255,255,255,0.08)'\n" +
" : 'rgba(255,255,255,0.5)'"
} react-native/no-inline-styles

Error: 137:29 error Replace `·openaiApiKey:·'',·sttModel:·'whisper-1',·ttsModel:·'tts-1-hd',·ttsVoice:·'alloy'` with `⏎········openaiApiKey:·'',⏎········sttModel:·'whisper-1',⏎········ttsModel:·'tts-1-hd',⏎········ttsVoice:·'alloy',⏎·····` prettier/prettier
Error: 158:29 error Replace `·openaiApiKey:·'',·sttModel:·'whisper-1',·ttsModel:·'',·ttsVoice:·'alloy'` with `⏎········openaiApiKey:·'',⏎········sttModel:·'whisper-1',⏎········ttsModel:·'',⏎········ttsVoice:·'alloy',⏎·····` prettier/prettier
Error: 165:57 error Replace `'@voiceflow_settings',·JSON.stringify(expectedSettings)` with `⏎········'@voiceflow_settings',⏎········JSON.stringify(expectedSettings),⏎······` prettier/prettier
Error: 168:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/services/openai.ts
Error: 76:13 error 'audioBase64' is assigned a value but never used @typescript-eslint/no-unused-vars
Warning: 85:12 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/BaseProvider.ts
Warning: 11:32 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 27:32 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/elevenlabs/ElevenLabsTTSProvider.ts
Warning: 110:21 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 116:32 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 126:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/google/GoogleSTTProvider.ts
Warning: 139:25 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 144:21 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 150:32 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/google/GoogleTTSProvider.ts
Error: 3:10 error 'Buffer' is defined but never used @typescript-eslint/no-unused-vars
Warning: 201:21 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 214:32 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 225:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/openai/OpenAISTTProvider.ts
Error: 2:13 error 'FileSystem' is defined but never used @typescript-eslint/no-unused-vars
Warning: 57:12 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 72:21 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 78:32 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 88:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars

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
Error: 110:27 error 'name' is defined but never used. Allowed unused args must match /^_/u @typescript-eslint/no-unused-vars
Error: 110:41 error 'op' is defined but never used. Allowed unused args must match /^_/u @typescript-eslint/no-unused-vars
Warning: 123:47 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 123:65 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

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

✖ 210 problems (114 errors, 96 warnings)
15 errors and 0 warnings potentially fixable with the `--fix` option.

Error: Process completed with exit code 1.
