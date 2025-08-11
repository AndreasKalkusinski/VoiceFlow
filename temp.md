Run npm run lint

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
Error:   41:14  error    'error' is defined but never used                                                                                @typescript-eslint/no-unused-vars
Error:   80:14  error    'error' is defined but never used                                                                                @typescript-eslint/no-unused-vars
Error:   98:14  error    'error' is defined but never used                                                                                @typescript-eslint/no-unused-vars

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/SpeechToTextScreen.tsx
Error:    94:14  error  'error' is defined but never used  @typescript-eslint/no-unused-vars
Error:   127:14  error  'error' is defined but never used  @typescript-eslint/no-unused-vars

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/TextToSpeechScreen.tsx
Warning:    36:6   warning  React Hook useEffect has a missing dependency: 'sound'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
Error:    68:14  error    'error' is defined but never used                                                                         @typescript-eslint/no-unused-vars
Error:   112:14  error    'error' is defined but never used                                                                         @typescript-eslint/no-unused-vars
Error:   149:14  error    'error' is defined but never used                                                                         @typescript-eslint/no-unused-vars
Error:   163:16  error    'error' is defined but never used                                                                         @typescript-eslint/no-unused-vars

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

✖ 172 problems (76 errors, 96 warnings)
  2 errors and 0 warnings potentially fixable with the `--fix` option.

Error: Process completed with exit code 1.