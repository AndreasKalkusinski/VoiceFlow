Run npm run lint
npm run lint
shell: /usr/bin/bash -e {0}

> voiceflow@1.0.0 lint
> eslint . --ext .js,.jsx,.ts,.tsx

(node:2154) ESLintIgnoreWarning: The ".eslintignore" file is no longer supported. Switch to using the "ignores" property in "eslint.config.js": https://eslint.org/docs/latest/use/configure/migration-guide#ignoring-files
(Use `node --trace-warnings ...` to show where the warning was created)
(node:2154) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///home/runner/work/VoiceFlow/VoiceFlow/eslint.config.js?mtime=1754912939017 is not specified and it doesn't parse as CommonJS.
Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
To eliminate this warning, add "type": "module" to /home/runner/work/VoiceFlow/VoiceFlow/package.json.

/home/runner/work/VoiceFlow/VoiceFlow/.eslintrc.js
0:0 error Parsing error: "parserOptions.project" has been provided for @typescript-eslint/parser.
The file was not found in any of the provided project(s): .eslintrc.js

/home/runner/work/VoiceFlow/VoiceFlow/App.tsx
Error: 20:11 error 'colors' is assigned a value but never used @typescript-eslint/no-unused-vars
Error: 22:1 error Delete `··` prettier/prettier
Error: 28:1 error Delete `····` prettier/prettier
Error: 30:1 error Delete `····` prettier/prettier
Error: 35:1 error Delete `··` prettier/prettier
Warning: 74:5 warning Unexpected console statement. Only these console methods are allowed: warn, error no-console
Error: 86:2 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/babel.config.js
Error: 1:1 error 'module' is not defined no-undef

/home/runner/work/VoiceFlow/VoiceFlow/jest-setup.js
Error: 4:1 error 'jest' is not defined no-undef
Error: 6:16 error 'jest' is not defined no-undef
Error: 7:24 error 'jest' is not defined no-undef
Error: 10:18 error 'jest' is not defined no-undef
Error: 14:1 error 'jest' is not defined no-undef
Error: 15:19 error 'jest' is not defined no-undef
Error: 16:19 error 'jest' is not defined no-undef
Error: 19:1 error 'jest' is not defined no-undef
Error: 21:22 error 'jest' is not defined no-undef
Error: 22:23 error 'jest' is not defined no-undef
Error: 23:16 error 'jest' is not defined no-undef
Error: 26:1 error 'jest' is not defined no-undef
Error: 27:16 error 'jest' is not defined no-undef
Error: 35:1 error 'jest' is not defined no-undef
Error: 36:3 error 'require' is not defined no-undef
Error: 40:1 error 'jest' is not defined no-undef
Error: 41:22 error 'require' is not defined no-undef
Error: 47:1 error 'global' is not defined no-undef
Error: 48:6 error 'console' is not defined no-undef
Error: 49:9 error 'jest' is not defined no-undef
Error: 50:10 error 'jest' is not defined no-undef

/home/runner/work/VoiceFlow/VoiceFlow/jest.config.js
Error: 1:1 error 'module' is not defined no-undef

/home/runner/work/VoiceFlow/VoiceFlow/metro.config.js
Error: 1:30 error 'require' is not defined no-undef
Error: 3:33 error '\_\_dirname' is not defined no-undef
Error: 5:1 error 'module' is not defined no-undef

/home/runner/work/VoiceFlow/VoiceFlow/src/components/AnimatedButton.tsx
Error: 60:24 error 'e' is defined but never used. Allowed unused args must match /^\_/u @typescript-eslint/no-unused-vars
Error: 78:22 error Delete `·` prettier/prettier
Warning: 153:15 warning Inline style: { fontSize: "size === 'small' ? 14 : size === 'large' ? 18 : 16" } react-native/no-inline-styles
Error: 194:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/components/ErrorBoundary.tsx
Error: 2:9 error Replace `⏎··View,⏎··Text,⏎··StyleSheet,⏎··TouchableOpacity,⏎··ScrollView,⏎` with `·View,·Text,·StyleSheet,·TouchableOpacity,·ScrollView·` prettier/prettier
Error: 48:1 error Delete `····` prettier/prettier
Error: 94:1 error Delete `················` prettier/prettier
Error: 212:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/components/FloatingActionButton.tsx
Error: 2:9 error Replace `⏎··TouchableOpacity,⏎··StyleSheet,⏎··Animated,⏎··View,⏎` with `·TouchableOpacity,·StyleSheet,·Animated,·View·` prettier/prettier
Error: 26:19 error 'theme' is assigned a value but never used @typescript-eslint/no-unused-vars
Error: 42:11 error Insert `,` prettier/prettier
Error: 50:11 error Insert `,` prettier/prettier
Error: 92:23 error Replace `⏎············{·scale:·Animated.multiply(scaleAnim,·pulseAnim)·},⏎············{·rotate:·spin·},⏎··········` with `{·scale:·Animated.multiply(scaleAnim,·pulseAnim)·},·{·rotate:·spin·}` prettier/prettier
Error: 121:19 error Replace `isActive·?·(colors.secondaryGradient·as·[string,·string])·:·(colors.primaryGradient·as·[string,·string])` with `⏎············isActive⏎··············?·(colors.secondaryGradient·as·[string,·string])⏎··············:·(colors.primaryGradient·as·[string,·string])⏎··········` prettier/prettier
Error: 126:46 error Replace `⏎············{icon}⏎··········` with `{icon}` prettier/prettier
Error: 167:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/components/GlassCard.tsx
Error: 14:54 error Delete `·` prettier/prettier
Error: 15:12 error Delete `·` prettier/prettier
Error: 16:9 error Delete `·` prettier/prettier
Error: 18:19 error Replace `·` with `,` prettier/prettier
Error: 25:17 error Replace `isDark·⏎` with `⏎··········isDark⏎··` prettier/prettier
Error: 27:1 error Insert `··` prettier/prettier
Error: 40:18 error Delete `·` prettier/prettier
Error: 41:32 error Delete `·` prettier/prettier
Error: 45:38 error Replace `⏎··········{children}⏎········` with `{children}` prettier/prettier
Error: 64:16 error Delete `·` prettier/prettier
Error: 65:30 error Delete `·` prettier/prettier
Error: 69:36 error Replace `⏎········{children}⏎······` with `{children}` prettier/prettier
Error: 85:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/components/LiquidTabBar.tsx
Error: 2:9 error Replace `⏎··View,⏎··Text,⏎··TouchableOpacity,⏎··StyleSheet,⏎··Animated,⏎··Dimensions,⏎` with `·View,·Text,·TouchableOpacity,·StyleSheet,·Animated,·Dimensions·` prettier/prettier
Error: 4:3 error 'Text' is defined but never used @typescript-eslint/no-unused-vars
Error: 14:8 error 'Svg' is defined but never used @typescript-eslint/no-unused-vars
Error: 14:21 error 'Circle' is defined but never used @typescript-eslint/no-unused-vars
Error: 14:29 error 'Line' is defined but never used @typescript-eslint/no-unused-vars
Error: 14:35 error 'G' is defined but never used @typescript-eslint/no-unused-vars
Error: 21:7 error 'AnimatedPath' is assigned a value but never used @typescript-eslint/no-unused-vars
Warning: 24:10 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 25:16 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 26:15 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 29:62 error 'descriptors' is defined but never used. Allowed unused args must match /^\_/u @typescript-eslint/no-unused-vars
Error: 34:1 error Delete `··` prettier/prettier
Error: 35:17 error Replace `·[key:·string]:·{·outline:·keyof·typeof·Ionicons.glyphMap;·filled:·keyof·typeof·Ionicons.glyphMap·}` with `⏎····[key:·string]:·{⏎······outline:·keyof·typeof·Ionicons.glyphMap;⏎······filled:·keyof·typeof·Ionicons.glyphMap;⏎····};⏎·` prettier/prettier
Error: 38:5 error Replace `'Settings'` with `Settings` prettier/prettier
Error: 42:29 error Replace `⏎····state.routes.map(()·=>·new·Animated.Value(1))⏎··` with `state.routes.map(()·=>·new·Animated.Value(1))` prettier/prettier
Error: 50:1 error Delete `····` prettier/prettier
Warning: 59:34 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 69:31 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 87:16 error Delete `·` prettier/prettier
Error: 88:37 error Delete `·` prettier/prettier
Error: 89:41 error Delete `·` prettier/prettier
Error: 90:46 error Delete `·` prettier/prettier
Error: 92:1 error Delete `······` prettier/prettier
Error: 96:17 error Delete `·` prettier/prettier
Error: 102:1 error Delete `······` prettier/prettier
Error: 105:14 error Replace `⏎··········style={[⏎············styles.colorAccent,⏎············{·backgroundColor:·currentTheme.primary·+·'08'·}⏎··········]}⏎·······` with `·style={[styles.colorAccent,·{·backgroundColor:·currentTheme.primary·+·'08'·}]}` prettier/prettier
Error: 124:14 error Delete `·` prettier/prettier
Error: 127:14 error Delete `·` prettier/prettier
Error: 130:14 error Insert `,` prettier/prettier
Error: 131:13 error Delete `·` prettier/prettier
Error: 133:1 error Delete `········` prettier/prettier
Error: 135:14 error Delete `·` prettier/prettier
Error: 136:19 error Replace `⏎············styles.lineIndicator,⏎············{·backgroundColor:·currentTheme?.primary·||·'#6366F1'·}⏎··········]}·` with `styles.lineIndicator,·{·backgroundColor:·currentTheme?.primary·||·'#6366F1'·}]}` prettier/prettier
Warning: 145:35 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
171:23 warning Inline style: {
backgroundColor: 'isDark \n' +
" ? 'rgba(255,255,255,0.08)'\n" +
" : 'rgba(255,255,255,0.5)'"
} react-native/no-inline-styles
Error: 172:48 error Delete `·` prettier/prettier
Error: 180:1 error Delete `················` prettier/prettier
Error: 185:38 error Replace `(routeTheme?.primary·||·colors.primary)` with `routeTheme?.primary·||·colors.primary` prettier/prettier
Error: 276:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/components/LogView.tsx
Error: 2:9 error Replace `⏎··View,⏎··Text,⏎··StyleSheet,⏎··ScrollView,⏎··Animated,⏎` with `·View,·Text,·StyleSheet,·ScrollView,·Animated·` prettier/prettier
Error: 66:21 error Replace `⏎··············styles.messageContainer,⏎··············{·borderLeftColor:·getMessageColor(message.type)·},⏎············` with `styles.messageContainer,·{·borderLeftColor:·getMessageColor(message.type)·}` prettier/prettier
Error: 108:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/components/MinimalCard.tsx
Error: 45:10 error Replace `⏎······style={[⏎········styles.card,⏎········getCardStyle(),⏎········!noPadding·&&·styles.padding,⏎········style,⏎······]}⏎····` with `·style={[styles.card,·getCardStyle(),·!noPadding·&&·styles.padding,·style]}` prettier/prettier
Error: 66:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/components/ModelDropdown.tsx
Error: 15:10 error 'wp' is defined but never used @typescript-eslint/no-unused-vars
Error: 15:27 error 'fontSize' is defined but never used @typescript-eslint/no-unused-vars
Error: 43:39 error Replace `opt` with `(opt)` prettier/prettier
Error: 59:1 error Delete `······` prettier/prettier
Error: 83:26 error Delete `·` prettier/prettier
Error: 89:22 error Delete `·` prettier/prettier
Error: 90:29 error Delete `·` prettier/prettier
Error: 94:1 error Delete `············` prettier/prettier
Error: 96:73 error Replace `⏎················{label}⏎··············` with `{label}` prettier/prettier
Error: 113:43 error Replace `styles.selectedOption,·{·backgroundColor:·colors.primary·+·'20'·}]` with `⏎······················styles.selectedOption,⏎······················{·backgroundColor:·colors.primary·+·'20'·},⏎····················],` prettier/prettier
Error: 117:26 error Insert `⏎·····················` prettier/prettier
Error: 118:1 error Insert `··` prettier/prettier
Error: 119:1 error Insert `··` prettier/prettier
Error: 120:23 error Replace `item.id·===·value·&&·{·color:·colors.primary,·fontWeight:·'600'·}` with `··item.id·===·value·&&·{·color:·colors.primary,·fontWeight:·'600'·},` prettier/prettier
Warning: 120:44 warning Inline style: { fontWeight: '600' } react-native/no-inline-styles
Error: 121:1 error Replace `····················]}` with `······················]}⏎····················` prettier/prettier
Error: 223:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/components/ModernButton.tsx
Error: 122:1 error Delete `····` prettier/prettier
Error: 198:23 error Delete `·` prettier/prettier
Error: 209:29 error Delete `·` prettier/prettier
Error: 210:20 error Replace `variant·===·'primary'·||·variant·===·'gradient'·?·colors.textOnPrimary·:·colors.text}·` with `⏎··············variant·===·'primary'·||·variant·===·'gradient'·?·colors.textOnPrimary·:·colors.text⏎············}` prettier/prettier
Error: 215:68 error Replace `⏎··············{title}⏎············` with `{title}` prettier/prettier
Error: 225:19 error Replace `⏎······style={[⏎········{·transform:·[{·scale:·scaleAnim·}]·},⏎········fullWidth·&&·styles.fullWidth,⏎······]}⏎····` with `·style={[{·transform:·[{·scale:·scaleAnim·}]·},·fullWidth·&&·styles.fullWidth]}` prettier/prettier
Error: 286:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/components/ModernCard.tsx
Error: 29:1 error Delete `··` prettier/prettier
Error: 98:21 error Delete `·` prettier/prettier
Error: 108:19 error Replace `isDark·⏎` with `⏎············isDark⏎··` prettier/prettier
Error: 110:1 error Insert `··` prettier/prettier
Error: 117:36 error Replace `⏎········{children}⏎······` with `{children}` prettier/prettier
Error: 127:12 error Delete `·` prettier/prettier
Error: 136:19 error Replace `⏎············styles.card,⏎············getCardStyle(),⏎············style,⏎··········` with `styles.card,·getCardStyle(),·style` prettier/prettier
Error: 148:10 error Replace `(⏎····<View⏎······style={[⏎········styles.card,⏎········getCardStyle(),⏎········style,⏎······]}⏎····>⏎······{content}⏎····</View>⏎··)` with `<View·style={[styles.card,·getCardStyle(),·style]}>{content}</View>` prettier/prettier
Error: 170:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/components/ModernFAB.tsx
Error: 2:9 error Replace `⏎··TouchableOpacity,⏎··StyleSheet,⏎··Animated,⏎··View,⏎··Text,⏎` with `·TouchableOpacity,·StyleSheet,·Animated,·View,·Text·` prettier/prettier
Error: 14:10 error 'vw' is defined but never used @typescript-eslint/no-unused-vars
Error: 14:18 error 'contentVH' is defined but never used @typescript-eslint/no-unused-vars
Error: 37:1 error Delete `··` prettier/prettier
Error: 65:11 error Insert `,` prettier/prettier
Error: 125:23 error Replace `⏎····{·scale:·scaleAnim·},⏎····{·rotate:·rotation·},⏎··` with `{·scale:·scaleAnim·},·{·rotate:·rotation·}` prettier/prettier
Error: 129:1 error Delete `··` prettier/prettier
Error: 150:17 error Replace `⏎··········styles.fab,⏎··········variant·===·'extended'·&&·styles.extended,⏎··········disabled·&&·styles.disabled,⏎········` with `styles.fab,·variant·===·'extended'·&&·styles.extended,·disabled·&&·styles.disabled` prettier/prettier
Error: 166:25 error Delete `·` prettier/prettier
Error: 176:21 error Replace `isActive·?·(colors.accentGradient·as·[string,·string])·:·[colors.primary,·colors.primaryDark]·as·[string,·string]` with `⏎··············isActive⏎················?·(colors.accentGradient·as·[string,·string])⏎················:·([colors.primary,·colors.primaryDark]·as·[string,·string])⏎············` prettier/prettier
Error: 182:1 error Delete `········` prettier/prettier
Error: 184:46 error Replace `⏎············{icon}⏎··········` with `{icon}` prettier/prettier
Error: 188:75 error Replace `⏎··············{label}⏎············` with `{label}` prettier/prettier
Error: 195:22 error Replace `(⏎··········<View·style={[styles.ripple,·{·borderColor:·colors.primary·}]}·/>⏎········)` with `<View·style={[styles.ripple,·{·borderColor:·colors.primary·}]}·/>` prettier/prettier
Error: 220:17 error Replace `{·translateX:·-(responsiveDimensions.fab.size·/·2)·},·{·translateY:·-(responsiveDimensions.fab.size·/·2)·}` with `⏎······{·translateX:·-(responsiveDimensions.fab.size·/·2)·},⏎······{·translateY:·-(responsiveDimensions.fab.size·/·2)·},⏎····` prettier/prettier
Error: 264:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/components/ModernTabBar.tsx
Error: 2:9 error Replace `⏎··View,⏎··Text,⏎··TouchableOpacity,⏎··StyleSheet,⏎··Animated,⏎··Platform,⏎` with `·View,·Text,·TouchableOpacity,·StyleSheet,·Animated,·Platform·` prettier/prettier
Error: 8:3 error 'Platform' is defined but never used @typescript-eslint/no-unused-vars
Error: 15:18 error 'responsiveDimensions' is defined but never used @typescript-eslint/no-unused-vars
Warning: 18:10 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 19:16 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 20:15 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 26:24 error Delete `·` prettier/prettier
Error: 27:8 error Replace `·bg:·'rgba(28,·28,·31,·0.98)',·active:·'#7C7CFF',·inactive:·'#8E8E93',·glow:·'rgba(124,·124,·255,·0.3)'` with `⏎········bg:·'rgba(28,·28,·31,·0.98)',⏎········active:·'#7C7CFF',⏎········inactive:·'#8E8E93',⏎········glow:·'rgba(124,·124,·255,·0.3)',⏎·····` prettier/prettier
Error: 28:8 error Replace `·bg:·'rgba(255,·255,·255,·0.98)',·active:·'#5E5CE6',·inactive:·'#8E8E93',·glow:·'rgba(94,·92,·230,·0.2)'` with `⏎········bg:·'rgba(255,·255,·255,·0.98)',⏎········active:·'#5E5CE6',⏎········inactive:·'#8E8E93',⏎········glow:·'rgba(94,·92,·230,·0.2)',⏎·····` prettier/prettier
Error: 35:8 error Insert `,` prettier/prettier
Error: 41:5 error Replace `'Settings'` with `Settings` prettier/prettier
Warning: 44:31 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 54:1 error Delete `······` prettier/prettier
Warning: 86:34 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 98:16 error Replace `·intensity={90}·tint={isDark·?·'dark'·:·'light'}·style={StyleSheet.absoluteFillObject}·/>` with `⏎········intensity={90}⏎········tint={isDark·?·'dark'·:·'light'}⏎········style={StyleSheet.absoluteFillObject}` prettier/prettier
Error: 99:7 error Insert `/>⏎` prettier/prettier
Warning: 101:35 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 103:24 error Insert `⏎···········` prettier/prettier
Error: 104:1 error Insert `··` prettier/prettier
Error: 105:13 error Insert `··` prettier/prettier
Error: 106:13 error Insert `····` prettier/prettier
Error: 107:1 error Insert `····` prettier/prettier
Error: 138:24 error Delete `·` prettier/prettier
Error: 145:1 error Delete `················` prettier/prettier
Error: 150:31 error Replace `isDark·⏎` with `⏎························isDark⏎··` prettier/prettier
Error: 152:1 error Insert `··` prettier/prettier
Error: 157:24 error Insert `⏎···················` prettier/prettier
Error: 158:1 error Insert `··` prettier/prettier
Error: 159:21 error Replace `{·` with `··{` prettier/prettier
Error: 160:23 error Insert `··` prettier/prettier
Error: 161:1 error Insert `··` prettier/prettier
Error: 162:21 error Replace `}` with `··},` prettier/prettier
Error: 163:1 error Replace `··················]}` with `····················]}⏎··················` prettier/prettier
Error: 167:1 error Delete `················` prettier/prettier
Error: 169:31 error Delete `·` prettier/prettier
172:21 warning Inline style: {
opacity: 'isFocused ? 1 : 0.7',
fontWeight: "isFocused ? '600' : '500'"
} react-native/no-inline-styles
Error: 172:22 error Delete `·` prettier/prettier
Error: 182:1 error Delete `················` prettier/prettier
Error: 188:24 error Delete `·` prettier/prettier
Error: 270:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/components/OptimizedComponents.tsx
Error: 1:8 error 'React' is defined but never used @typescript-eslint/no-unused-vars
Error: 62:49 error Replace `⏎··RecordingAnimation,⏎·` with `RecordingAnimation,` prettier/prettier
Error: 65:3 error Delete `··` prettier/prettier
Error: 66:1 error Replace `··}⏎` with `}` prettier/prettier
Error: 74:73 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/components/ProviderCard.tsx
Error: 2:9 error Replace `⏎··View,⏎··Text,⏎··TouchableOpacity,⏎··StyleSheet,⏎··ViewStyle,⏎` with `·View,·Text,·TouchableOpacity,·StyleSheet,·ViewStyle·` prettier/prettier
Error: 7:3 error 'ViewStyle' is defined but never used @typescript-eslint/no-unused-vars
Error: 13:10 error 'wp' is defined but never used @typescript-eslint/no-unused-vars
Error: 13:14 error 'hp' is defined but never used @typescript-eslint/no-unused-vars
Error: 13:27 error 'fontSize' is defined but never used @typescript-eslint/no-unused-vars
Error: 34:19 error 'isDark' is assigned a value but never used @typescript-eslint/no-unused-vars
Error: 58:45 error Replace `⏎········styles.card,⏎········isSelected·&&·styles.selectedCard,⏎······` with `styles.card,·isSelected·&&·styles.selectedCard` prettier/prettier
Error: 70:1 error Delete `········` prettier/prettier
Error: 74:65 error Replace `⏎··············{name}⏎············` with `{name}` prettier/prettier
Error: 85:77 error Replace `⏎··········{description}⏎········` with `{description}` prettier/prettier
Error: 91:18 error Delete `·style={[` prettier/prettier
Error: 92:20 error Replace `s.apiKeyStatus,⏎··············{·backgroundColor:·hasApiKey·?·'#10B981'·:·'#EF4444'·}` with `={[styles.apiKeyStatus,·{·backgroundColor:·hasApiKey·?·'#10B981'·:·'#EF4444'·}]}` prettier/prettier
Warning: 93:15 warning Inline style: { backgroundColor: "hasApiKey ? '#10B981' : '#EF4444'" } react-native/no-inline-styles
Error: 94:13 error Delete `]}` prettier/prettier
Error: 95:47 error Replace `⏎················{hasApiKey·?·'✓·API·Key'·:·'✗·No·Key'}⏎··············` with `{hasApiKey·?·'✓·API·Key'·:·'✗·No·Key'}` prettier/prettier
Error: 175:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/components/ProviderSettings.tsx
Error: 1:27 error 'useEffect' is defined but never used @typescript-eslint/no-unused-vars
Error: 2:9 error Replace `⏎··View,⏎··Text,⏎··TextInput,⏎··StyleSheet,⏎··ScrollView,⏎··Alert,⏎` with `·View,·Text,·TextInput,·StyleSheet,·ScrollView,·Alert·` prettier/prettier
Error: 17:14 error 'hp' is defined but never used @typescript-eslint/no-unused-vars
Error: 17:27 error 'fontSize' is defined but never used @typescript-eslint/no-unused-vars
Warning: 24:36 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 27:65 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 42:1 error Delete `··` prettier/prettier
Error: 43:20 error Replace `·type·===·'stt'·⏎····?·ProviderRegistry.getAllSTTProviders()⏎···` with `⏎····type·===·'stt'·?·ProviderRegistry.getAllSTTProviders()` prettier/prettier
Error: 47:42 error Replace `p` with `(p)` prettier/prettier
Error: 48:1 error Delete `··` prettier/prettier
Error: 62:1 error Delete `····` prettier/prettier
Error: 69:22 error Replace `prev` with `(prev)` prettier/prettier
Warning: 75:43 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 91:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 104:24 error Replace `provider` with `(provider)` prettier/prettier
Warning: 134:41 warning Inline style: { flex: 1 } react-native/no-inline-styles
Error: 166:51 error Replace `m` with `(m)` prettier/prettier
Error: 176:29 error Replace `·'voices'·in·currentProvider·&&·currentProvider.voices·&&` with `⏎············'voices'·in·currentProvider·&&⏎············currentProvider.voices·&&⏎···········` prettier/prettier
Error: 177:13 error Insert `··` prettier/prettier
Error: 178:1 error Insert `··` prettier/prettier
Error: 179:15 error Insert `··` prettier/prettier
Error: 180:15 error Insert `··` prettier/prettier
Warning: 180:55 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 181:1 error Insert `··` prettier/prettier
Error: 182:17 error Insert `··` prettier/prettier
Error: 183:1 error Insert `··` prettier/prettier
Error: 184:1 error Insert `··` prettier/prettier
Error: 185:15 error Insert `··` prettier/prettier
Error: 186:13 error Insert `··` prettier/prettier
Error: 187:1 error Insert `··` prettier/prettier
Error: 245:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/components/RecordingAnimation.tsx
Error: 32:11 error Insert `,` prettier/prettier
Error: 49:13 error Insert `,` prettier/prettier
Error: 54:25 error Replace `anim` with `(anim)` prettier/prettier
Error: 124:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/components/SimpleButton.tsx
Error: 121:81 error Replace `⏎··········{title}⏎········` with `{title}` prettier/prettier
Error: 165:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/components/**tests**/ModernButton.test.tsx
Error: 12:43 error Replace `⏎······<ModernButton·title="Test·Button"·onPress={()·=>·{}}·/>⏎····` with `<ModernButton·title="Test·Button"·onPress={()·=>·{}}·/>` prettier/prettier
Error: 20:43 error Replace `⏎······<ModernButton·title="Press·Me"·onPress={onPressMock}·/>⏎····` with `<ModernButton·title="Press·Me"·onPress={onPressMock}·/>` prettier/prettier
Error: 23:1 error Delete `····` prettier/prettier
Error: 31:78 error Insert `,` prettier/prettier
Error: 33:1 error Delete `····` prettier/prettier
Error: 41:20 error Delete `·` prettier/prettier
Error: 42:30 error Delete `·` prettier/prettier
Error: 43:27 error Delete `·` prettier/prettier
Error: 46:9 error Insert `,` prettier/prettier
Error: 48:1 error Delete `····` prettier/prettier
Error: 50:40 error Replace `expect.arrayContaining([⏎······expect.objectContaining(customStyle)` with `⏎······expect.arrayContaining([expect.objectContaining(customStyle)]),` prettier/prettier
Error: 52:5 error Delete `])` prettier/prettier
Error: 57:21 error Replace `⏎········title="Loading·Button"·⏎········onPress={()·=>·{}}·⏎········loading⏎········testID="loading-button"⏎······/>` with `title="Loading·Button"·onPress={()·=>·{}}·loading·testID="loading-button"·/>,` prettier/prettier
Error: 64:1 error Delete `····` prettier/prettier
Error: 74:1 error Delete `····` prettier/prettier
Error: 75:22 error Replace `variant` with `(variant)` prettier/prettier
Error: 77:22 error Delete `·` prettier/prettier
Error: 82:11 error Insert `,` prettier/prettier
Error: 84:1 error Delete `······` prettier/prettier
Error: 88:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/config/env.d.ts
Error: 13:2 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/config/features.ts
81:24 error Parsing error: '>' expected

/home/runner/work/VoiceFlow/VoiceFlow/src/config/index.ts
Error: 55:2 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/contexts/ThemeContext.tsx
Error: 81:3 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/hooks/useDebounce.ts
Error: 6:3 error Delete `·` prettier/prettier
Error: 10:3 error Delete `·` prettier/prettier
Error: 14:3 error Delete `·` prettier/prettier
Error: 33:2 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/hooks/useTheme.ts
Error: 2:64 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/hooks/useThrottle.ts
Error: 6:3 error Delete `·` prettier/prettier
Error: 10:3 error Delete `·` prettier/prettier
Warning: 16:49 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 16:59 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 16:64 error Replace `⏎··callback:·T,⏎··delay:·number⏎` with `callback:·T,·delay:·number` prettier/prettier
Error: 44:22 error Insert `,` prettier/prettier
Error: 46:1 error Delete `··` prettier/prettier
Error: 48:2 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/i18n/index.ts
Error: 28:1 error Delete `····` prettier/prettier
Error: 33:12 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Warning: 34:5 warning Unexpected console statement. Only these console methods are allowed: warn, error no-console
Error: 36:1 error Delete `··` prettier/prettier
Error: 42:5 error Replace `⏎··.use(initReactI18next)⏎··` with `.use(initReactI18next)` prettier/prettier
Error: 45:3 error Delete `··` prettier/prettier
Error: 46:1 error Delete `··` prettier/prettier
Error: 47:3 error Delete `··` prettier/prettier
Error: 48:1 error Replace `····` with `··` prettier/prettier
Error: 49:1 error Delete `··` prettier/prettier
Error: 50:1 error Replace `····` with `··` prettier/prettier
Error: 51:1 error Delete `··` prettier/prettier
Error: 52:5 error Delete `··` prettier/prettier
Error: 53:3 error Delete `··` prettier/prettier
Error: 54:1 error Delete `··` prettier/prettier
Error: 61:1 error Delete `····` prettier/prettier
Error: 85:21 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/i18n/translations/de.ts
Error: 18:1 error Delete `··` prettier/prettier
Error: 21:28 error Delete `·` prettier/prettier
Error: 24:1 error Delete `··` prettier/prettier
Error: 45:1 error Delete `····` prettier/prettier
Error: 57:1 error Delete `··` prettier/prettier
Error: 61:17 error Insert `⏎·····` prettier/prettier
Error: 81:1 error Delete `····` prettier/prettier
Error: 101:1 error Delete `··` prettier/prettier
Error: 110:1 error Delete `····` prettier/prettier
Error: 116:1 error Delete `····` prettier/prettier
Error: 126:1 error Delete `····` prettier/prettier
Error: 131:1 error Delete `····` prettier/prettier
Error: 139:1 error Delete `······` prettier/prettier
Error: 149:1 error Delete `····` prettier/prettier
Error: 151:1 error Delete `····` prettier/prettier
Error: 168:1 error Delete `··` prettier/prettier
Error: 176:1 error Delete `··` prettier/prettier
Error: 189:3 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/i18n/translations/en.ts
Error: 18:1 error Delete `··` prettier/prettier
Error: 24:1 error Delete `··` prettier/prettier
Error: 45:1 error Delete `····` prettier/prettier
Error: 57:1 error Delete `··` prettier/prettier
Error: 61:18 error Replace `'Type·or·paste·your·text·here·and·we\'ll·bring·it·to·life·with·speech...'` with `"Type·or·paste·your·text·here·and·we'll·bring·it·to·life·with·speech..."` prettier/prettier
Error: 80:1 error Delete `····` prettier/prettier
Error: 90:15 error Replace `'Hmm,·something·didn\'t·work'` with `"Hmm,·something·didn't·work"` prettier/prettier
Error: 101:1 error Delete `··` prettier/prettier
Error: 110:1 error Delete `····` prettier/prettier
Error: 116:1 error Delete `····` prettier/prettier
Error: 126:1 error Delete `····` prettier/prettier
Error: 131:1 error Delete `····` prettier/prettier
Error: 139:1 error Delete `······` prettier/prettier
Error: 149:1 error Delete `····` prettier/prettier
Error: 151:1 error Delete `····` prettier/prettier
Error: 168:1 error Delete `··` prettier/prettier
Error: 176:1 error Delete `··` prettier/prettier
Error: 189:3 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/i18n/translations/es.ts
Error: 18:1 error Delete `··` prettier/prettier
Error: 24:1 error Delete `··` prettier/prettier
Error: 37:1 error Delete `····` prettier/prettier
Error: 49:1 error Delete `··` prettier/prettier
Error: 65:1 error Delete `····` prettier/prettier
Error: 85:1 error Delete `··` prettier/prettier
Error: 92:1 error Delete `····` prettier/prettier
Error: 98:1 error Delete `····` prettier/prettier
Error: 108:1 error Delete `····` prettier/prettier
Error: 113:1 error Delete `····` prettier/prettier
Error: 121:1 error Delete `······` prettier/prettier
Error: 131:1 error Delete `····` prettier/prettier
Error: 133:1 error Delete `····` prettier/prettier
Error: 150:1 error Delete `··` prettier/prettier
Error: 156:24 error Insert `⏎·····` prettier/prettier
Error: 158:1 error Delete `··` prettier/prettier
Error: 171:3 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/AccessibleModern2025SpeechToTextScreen.tsx
Error: 3:3 error 'View' is defined but never used @typescript-eslint/no-unused-vars
Error: 4:3 error 'Text' is defined but never used @typescript-eslint/no-unused-vars
Error: 5:3 error 'TextInput' is defined but never used @typescript-eslint/no-unused-vars
Error: 6:3 error 'StyleSheet' is defined but never used @typescript-eslint/no-unused-vars
Error: 7:3 error 'ScrollView' is defined but never used @typescript-eslint/no-unused-vars
Error: 8:3 error 'Alert' is defined but never used @typescript-eslint/no-unused-vars
Error: 12:9 error Delete `·` prettier/prettier
Error: 13:14 error Delete `·` prettier/prettier
Error: 14:13 error Delete `·` prettier/prettier
Error: 15:3 error 'loadingA11y' is defined but never used @typescript-eslint/no-unused-vars
Error: 16:3 error 'announce' is defined but never used @typescript-eslint/no-unused-vars
Error: 17:3 error 'createA11yProps' is defined but never used @typescript-eslint/no-unused-vars
Error: 17:18 error Replace `·` with `,` prettier/prettier
Error: 41:14 error Insert `,` prettier/prettier
Error: 48:19 error Insert `,` prettier/prettier
Error: 53:22 error Replace `⏎······'Transcribed·text',⏎······'',⏎······false,⏎······undefined⏎····` with `'Transcribed·text',·'',·false,·undefined` prettier/prettier
Error: 66:12 error Insert `,` prettier/prettier
Error: 71:23 error Replace `⏎······'Clear·Text',⏎······'Double·tap·to·clear·all·transcribed·text',⏎······false,⏎······false⏎····` with `'Clear·Text',·'Double·tap·to·clear·all·transcribed·text',·false,·false` prettier/prettier
Error: 80:23 error Replace `⏎······'Share·Text',⏎······'Double·tap·to·share·transcribed·text',⏎······false,⏎······false⏎····` with `'Share·Text',·'Double·tap·to·share·transcribed·text',·false,·false` prettier/prettier
Error: 95:3 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/CleanSettingsScreen.tsx
Error: 5:3 error 'TextInput' is defined but never used @typescript-eslint/no-unused-vars
Error: 23:10 error 'useFocusEffect' is defined but never used @typescript-eslint/no-unused-vars
Error: 43:1 error Delete `··` prettier/prettier
Error: 44:19 error 'isDark' is assigned a value but never used @typescript-eslint/no-unused-vars
Error: 122:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 150:19 error Replace `⏎········contentContainerStyle={styles.scrollContent}⏎········showsVerticalScrollIndicator={false}⏎······` with `contentContainerStyle={styles.scrollContent}·showsVerticalScrollIndicator={false}` prettier/prettier
Error: 155:70 error Replace `⏎············{t('settings.title')}⏎··········` with `{t('settings.title')}` prettier/prettier
Error: 164:1 error Delete `············` prettier/prettier
Error: 184:26 error Insert `⏎·····················` prettier/prettier
Error: 185:1 error Insert `··` prettier/prettier
Error: 186:1 error Replace `······················{·color:·themeMode·===·option.id·?·colors.primary·:·colors.text·}` with `························{·color:·themeMode·===·option.id·?·colors.primary·:·colors.text·},` prettier/prettier
Error: 187:1 error Replace `····················]}` with `······················]}⏎····················` prettier/prettier
Error: 206:24 error Replace `·borderColor:·selectedLanguage·===·lang.code·?·colors.primary·:·colors.border` with `⏎························borderColor:⏎··························selectedLanguage·===·lang.code·?·colors.primary·:·colors.border,⏎·····················` prettier/prettier
Error: 210:26 error Insert `⏎·····················` prettier/prettier
Error: 211:1 error Insert `··` prettier/prettier
Error: 212:1 error Replace `······················{·color:·selectedLanguage·===·lang.code·?·colors.primary·:·colors.text·}` with `························{·color:·selectedLanguage·===·lang.code·?·colors.primary·:·colors.text·},` prettier/prettier
Error: 213:1 error Replace `····················]}` with `······················]}⏎····················` prettier/prettier
Error: 227:1 error Delete `············` prettier/prettier
Error: 233:48 error Replace `·setSettings({·...settings,·sttProvider:·providerId·})` with `⏎················setSettings({·...settings,·sttProvider:·providerId·})⏎··············` prettier/prettier
Error: 234:49 error Insert `⏎···············` prettier/prettier
Error: 235:17 error Insert `··` prettier/prettier
Error: 236:1 error Replace `················` with `··················` prettier/prettier
Error: 237:1 error Insert `··` prettier/prettier
Error: 238:1 error Replace `··············})` with `················})⏎··············` prettier/prettier
Error: 239:63 error Insert `⏎···············` prettier/prettier
Error: 240:17 error Insert `··` prettier/prettier
Error: 241:1 error Replace `················` with `··················` prettier/prettier
Error: 242:1 error Insert `··` prettier/prettier
Error: 243:1 error Insert `··` prettier/prettier
Error: 244:21 error Insert `··` prettier/prettier
Error: 245:21 error Insert `··` prettier/prettier
Error: 246:1 error Replace `··················` with `····················` prettier/prettier
Error: 247:1 error Insert `··` prettier/prettier
Error: 248:1 error Replace `··············})` with `················})⏎··············` prettier/prettier
Error: 258:48 error Replace `·setSettings({·...settings,·ttsProvider:·providerId·})` with `⏎················setSettings({·...settings,·ttsProvider:·providerId·})⏎··············` prettier/prettier
Error: 259:49 error Insert `⏎···············` prettier/prettier
Error: 260:17 error Insert `··` prettier/prettier
Error: 261:1 error Insert `··` prettier/prettier
Error: 262:1 error Insert `··` prettier/prettier
Error: 263:15 error Replace `})` with `··})⏎··············` prettier/prettier
Error: 264:63 error Insert `⏎···············` prettier/prettier
Error: 265:1 error Insert `··` prettier/prettier
Error: 266:17 error Insert `··` prettier/prettier
Error: 267:1 error Replace `··················` with `····················` prettier/prettier
Error: 268:19 error Insert `··` prettier/prettier
Error: 269:1 error Insert `··` prettier/prettier
Error: 270:21 error Insert `··` prettier/prettier
Error: 271:1 error Insert `··` prettier/prettier
Error: 272:17 error Insert `··` prettier/prettier
Error: 273:15 error Replace `})` with `··})⏎··············` prettier/prettier
Error: 282:1 error Delete `············` prettier/prettier
Error: 291:24 error Replace `·borderColor:·settings.ttsVoice·===·voice.id·?·colors.primary·:·colors.border` with `⏎························borderColor:⏎··························settings.ttsVoice·===·voice.id·?·colors.primary·:·colors.border,⏎·····················` prettier/prettier
Error: 295:26 error Insert `⏎·····················` prettier/prettier
Error: 296:1 error Insert `··` prettier/prettier
Error: 297:1 error Replace `······················{·color:·settings.ttsVoice·===·voice.id·?·colors.primary·:·colors.text·}` with `························{·color:·settings.ttsVoice·===·voice.id·?·colors.primary·:·colors.text·},` prettier/prettier
Error: 298:1 error Replace `····················]}` with `······················]}⏎····················` prettier/prettier
Error: 443:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/CleanSpeechToTextScreen.tsx
Error: 32:1 error Delete `··` prettier/prettier
Error: 43:11 error Insert `,` prettier/prettier
Error: 75:1 error Delete `····` prettier/prettier
Error: 83:1 error Delete `······` prettier/prettier
Error: 96:51 error Insert `,` prettier/prettier
Error: 98:1 error Delete `······` prettier/prettier
Error: 102:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 114:1 error Delete `······` prettier/prettier
Error: 117:1 error Delete `······` prettier/prettier
Error: 122:1 error Delete `········` prettier/prettier
Error: 128:1 error Delete `········` prettier/prettier
Error: 131:1 error Delete `······` prettier/prettier
Error: 133:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 145:1 error Delete `····` prettier/prettier
Error: 155:55 error Replace `w` with `(w)` prettier/prettier
Error: 163:20 error Delete `·` prettier/prettier
Error: 175:75 error Replace `⏎··················{statusMessage}⏎················` with `{statusMessage}` prettier/prettier
Error: 193:1 error Delete `··············` prettier/prettier
Error: 209:24 error Replace `·style={[styles.recordingDot,·{·backgroundColor:·isRecording·?·'#FF4444'·:·colors.primary·}]}` with `⏎····················style={[⏎······················styles.recordingDot,⏎······················{·backgroundColor:·isRecording·?·'#FF4444'·:·colors.primary·},⏎····················]}⏎·················` prettier/prettier
Warning: 209:54 warning Inline style: { backgroundColor: "isRecording ? '#FF4444' : colors.primary" } react-native/no-inline-styles
Warning: 222:19 warning Inline style: { backgroundColor: "isRecording ? '#FF4444' : colors.primary" } react-native/no-inline-styles
Error: 247:1 error Delete `··············` prettier/prettier
Error: 382:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/CleanTextToSpeechScreen.tsx
Error: 31:1 error Delete `··` prettier/prettier
Error: 47:11 error Insert `,` prettier/prettier
Error: 79:1 error Delete `····` prettier/prettier
Error: 98:33 error Insert `,` prettier/prettier
Error: 107:29 error Insert `,` prettier/prettier
Error: 120:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 159:20 error Delete `·` prettier/prettier
Error: 171:75 error Replace `⏎··················{statusMessage}⏎················` with `{statusMessage}` prettier/prettier
Error: 189:1 error Delete `··············` prettier/prettier
Error: 210:1 error Delete `··············` prettier/prettier
Error: 369:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/LazyScreens.tsx
Error: 20:50 error Replace `⏎··()·=>·import('./ModernSpeechToTextScreen').then(m·=>·({·default:��m.ModernSpeechToTextScreen·}))` with `()·=>⏎··import('./ModernSpeechToTextScreen').then((m)·=>·({·default:·m.ModernSpeechToTextScreen·})),` prettier/prettier
Error: 24:50 error Replace `⏎··()·=>·import('./ModernTextToSpeechScreen').then(m·=>·({·default:·m.ModernTextToSpeechScreen·}))` with `()·=>⏎··import('./ModernTextToSpeechScreen').then((m)·=>·({·default:·m.ModernTextToSpeechScreen·})),` prettier/prettier
Error: 28:46 error Replace `⏎··()·=>·import('./ModernSettingsScreen').then(m·=>·({·default:·m.ModernSettingsScreen·}))` with `()·=>⏎··import('./ModernSettingsScreen').then((m)·=>·({·default:·m.ModernSettingsScreen·})),` prettier/prettier
Error: 33:49 error Replace `⏎··()·=>·import('./CleanSpeechToTextScreen').then(m·=>·({·default:·m.CleanSpeechToTextScreen·}))` with `()·=>⏎··import('./CleanSpeechToTextScreen').then((m)·=>·({·default:·m.CleanSpeechToTextScreen·})),` prettier/prettier
Error: 37:49 error Replace `⏎··()·=>·import('./CleanTextToSpeechScreen').then(m·=>·({·default:·m.CleanTextToSpeechScreen·}))` with `()·=>⏎··import('./CleanTextToSpeechScreen').then((m)·=>·({·default:·m.CleanTextToSpeechScreen·})),` prettier/prettier
Error: 41:45 error Replace `⏎··()·=>·import('./CleanSettingsScreen').then(m·=>·({·default:·m.CleanSettingsScreen·}))` with `()·=>⏎··import('./CleanSettingsScreen').then((m)·=>·({·default:·m.CleanSettingsScreen·})),` prettier/prettier
Error: 46:54 error Replace `⏎··()·=>·import('./Modern2025SpeechToTextScreen').then(m·=>·({·default:·m.Modern2025SpeechToTextScreen·}))` with `()·=>⏎··import('./Modern2025SpeechToTextScreen').then((m)·=>·({⏎····default:·m.Modern2025SpeechToTextScreen,⏎··})),` prettier/prettier
Error: 50:54 error Replace `⏎··()·=>·import('./Modern2025TextToSpeechScreen').then(m·=>·({·default:·m.Modern2025TextToSpeechScreen·}))` with `()·=>⏎··import('./Modern2025TextToSpeechScreen').then((m)·=>·({⏎····default:·m.Modern2025TextToSpeechScreen,⏎··})),` prettier/prettier
Error: 54:50 error Replace `⏎··()·=>·import('./Modern2025SettingsScreen').then(m·=>·({·default:·m.Modern2025SettingsScreen·}))` with `()·=>⏎··import('./Modern2025SettingsScreen').then((m)·=>·({·default:·m.Modern2025SettingsScreen·})),` prettier/prettier
Error: 62:67 error Insert `,` prettier/prettier
Warning: 66:36 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 91:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/Modern2025SettingsScreen.tsx
Error: 5:3 error 'TextInput' is defined but never used @typescript-eslint/no-unused-vars
Error: 16:10 error 'BlurView' is defined but never used @typescript-eslint/no-unused-vars
Error: 51:1 error Delete `··` prettier/prettier
Error: 61:1 error Delete `····` prettier/prettier
Error: 68:1 error Delete `····` prettier/prettier
Error: 142:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 174:17 error Replace `screenTheme·?·screenTheme.gradient·as·[string,·string]·:·[colors.background,·colors.background]` with `⏎··········screenTheme⏎············?·(screenTheme.gradient·as·[string,·string])⏎············:·[colors.background,·colors.background]⏎········` prettier/prettier
Error: 177:1 error Delete `······` prettier/prettier
Error: 178:19 error Replace `⏎········contentContainerStyle={styles.scrollContent}⏎········showsVerticalScrollIndicator={false}⏎······` with `contentContainerStyle={styles.scrollContent}·showsVerticalScrollIndicator={false}` prettier/prettier
Error: 185:72 error Replace `⏎··············{t('settings.title')}⏎············` with `{t('settings.title')}` prettier/prettier
Error: 198:1 error Delete `············` prettier/prettier
Error: 223:30 error Delete `·` prettier/prettier
Error: 224:79 error Delete `·` prettier/prettier
Error: 225:32 error Delete `·` prettier/prettier
Error: 226:85 error Delete `·` prettier/prettier
Error: 228:26 error Insert `⏎·····················` prettier/prettier
Error: 229:1 error Insert `··` prettier/prettier
Error: 230:1 error Replace `······················{·color:·themeMode·===·option.id·?·colors.primary·:·colors.text·}` with `························{·color:·themeMode·===·option.id·?·colors.primary·:·colors.text·},` prettier/prettier
Error: 231:1 error Replace `····················]}` with `······················]}⏎····················` prettier/prettier
Error: 257:28 error Insert `⏎·······················` prettier/prettier
Error: 258:1 error Insert `··` prettier/prettier
Error: 259:25 error Replace `{·color:·selectedLanguage·===·lang.code·?·colors.textOnPrimary·:·colors.text·}` with `··{⏎····························color:⏎······························selectedLanguage·===·lang.code·?·colors.textOnPrimary·:·colors.text,⏎··························},` prettier/prettier
Error: 260:1 error Replace `······················]}` with `························]}⏎······················` prettier/prettier
Error: 277:77 error Replace `⏎··················2·Active⏎················` with `2·Active` prettier/prettier
Error: 282:1 error Delete `············` prettier/prettier
Error: 289:50 error Replace `·setSettings({·...settings,·sttProvider:·providerId·})` with `⏎··················setSettings({·...settings,·sttProvider:·providerId·})⏎················` prettier/prettier
Error: 290:51 error Insert `⏎·················` prettier/prettier
Error: 291:19 error Insert `··` prettier/prettier
Error: 292:1 error Insert `··` prettier/prettier
Error: 293:1 error Replace `··················` with `····················` prettier/prettier
Error: 294:17 error Replace `})` with `··})⏎················` prettier/prettier
Error: 295:65 error Insert `⏎·················` prettier/prettier
Error: 296:1 error Insert `··` prettier/prettier
Error: 297:19 error Insert `··` prettier/prettier
Error: 298:1 error Insert `··` prettier/prettier
Error: 299:1 error Replace `····················` with `······················` prettier/prettier
Error: 300:1 error Insert `··` prettier/prettier
Error: 301:1 error Replace `······················[setting]:·value` with `························[setting]:·value,⏎······················}` prettier/prettier
Error: 303:20 error Replace `,⏎················})` with `)⏎················` prettier/prettier
Error: 314:50 error Replace `·setSettings({·...settings,·ttsProvider:·providerId·})` with `⏎··················setSettings({·...settings,·ttsProvider:·providerId·})⏎················` prettier/prettier
Error: 315:51 error Insert `⏎·················` prettier/prettier
Error: 316:1 error Insert `··` prettier/prettier
Error: 317:19 error Insert `··` prettier/prettier
Error: 318:1 error Insert `··` prettier/prettier
Error: 319:1 error Replace `················})` with `··················})⏎················` prettier/prettier
Error: 320:65 error Insert `⏎·················` prettier/prettier
Error: 321:1 error Insert `··` prettier/prettier
Error: 322:19 error Insert `··` prettier/prettier
Error: 323:1 error Replace `····················` with `······················` prettier/prettier
Error: 324:21 error Insert `··` prettier/prettier
Error: 325:1 error Insert `··` prettier/prettier
Error: 326:23 error Insert `··` prettier/prettier
Error: 327:21 error Insert `··` prettier/prettier
Error: 328:1 error Insert `··` prettier/prettier
Error: 329:17 error Replace `})` with `··})⏎················` prettier/prettier
Error: 339:1 error Delete `············` prettier/prettier
Error: 349:26 error Delete `·` prettier/prettier
Error: 360:26 error Insert `⏎·····················` prettier/prettier
Error: 361:1 error Insert `··` prettier/prettier
Error: 362:1 error Insert `··` prettier/prettier
Error: 363:21 error Replace `]}` with `··]}⏎···················` prettier/prettier
Error: 364:26 error Insert `⏎·····················` prettier/prettier
Error: 365:1 error Insert `··` prettier/prettier
Error: 366:1 error Replace `······················{·color:·settings.ttsVoice·===·voice.id·?·colors.primary·:·colors.text·}` with `························{·color:·settings.ttsVoice·===·voice.id·?·colors.primary·:·colors.text·},` prettier/prettier
Error: 367:1 error Replace `····················]}` with `······················]}⏎····················` prettier/prettier
Error: 393:36 error Delete `·` prettier/prettier
Error: 394:46 error Delete `·` prettier/prettier
Error: 580:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/Modern2025SpeechToTextScreen.tsx
Error: 23:10 error 'ModernButton' is defined but never used @typescript-eslint/no-unused-vars
Error: 42:1 error Delete `··` prettier/prettier
Error: 47:1 error Delete `··` prettier/prettier
Error: 61:11 error Insert `,` prettier/prettier
Error: 101:9 error Insert `,` prettier/prettier
Error: 134:1 error Delete `····` prettier/prettier
Error: 143:1 error Delete `······` prettier/prettier
Error: 156:51 error Insert `,` prettier/prettier
Error: 158:1 error Delete `······` prettier/prettier
Error: 162:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 175:1 error Delete `······` prettier/prettier
Error: 178:1 error Delete `······` prettier/prettier
Error: 183:1 error Delete `········` prettier/prettier
Error: 189:1 error Delete `········` prettier/prettier
Error: 193:1 error Delete `······` prettier/prettier
Error: 195:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 208:1 error Delete `····` prettier/prettier
Error: 222:1 error Delete `····` prettier/prettier
Error: 227:1 error Delete `······` prettier/prettier
Error: 240:55 error Replace `w` with `(w)` prettier/prettier
Error: 247:17 error Replace `screenTheme·?·screenTheme.gradient·as·[string,·string]·:·[colors.background,·colors.background]` with `⏎··········screenTheme⏎············?·(screenTheme.gradient·as·[string,·string])⏎············:·[colors.background,·colors.background]⏎········` prettier/prettier
Error: 250:1 error Delete `······` prettier/prettier
Error: 255:20 error Delete `·` prettier/prettier
Error: 290:27 error Replace `⏎················variant={isRecording·?·'gradient'·:·'glass'}·⏎················style={styles.textCard}⏎··············` with `variant={isRecording·?·'gradient'·:·'glass'}·style={styles.textCard}` prettier/prettier
Error: 311:1 error Delete `················` prettier/prettier
Error: 331:1 error Delete `················` prettier/prettier
Error: 338:30 error Replace `·style={[styles.statusIndicator,·{·backgroundColor:·colors.primary·}]}` with `⏎··························style={[styles.statusIndicator,·{·backgroundColor:·colors.primary·}]}⏎·······················` prettier/prettier
Error: 347:1 error Delete `··················` prettier/prettier
Error: 357:1 error Delete `····················` prettier/prettier
Error: 359:1 error Delete `····················` prettier/prettier
Error: 380:31 error Insert `⏎·················` prettier/prettier
Error: 381:1 error Insert `··` prettier/prettier
Error: 382:19 error Insert `··` prettier/prettier
Error: 383:1 error Insert `··` prettier/prettier
Error: 384:21 error Insert `··` prettier/prettier
Error: 385:19 error Replace `}` with `··},` prettier/prettier
Error: 386:1 error Replace `················]}` with `··················]}⏎················` prettier/prettier
Error: 394:34 error Delete `·` prettier/prettier
Error: 402:28 error Delete `·` prettier/prettier
Error: 403:93 error Delete `·` prettier/prettier
Error: 404:33 error Delete `·` prettier/prettier
Error: 405:72 error Delete `·` prettier/prettier
Error: 409:1 error Delete `··············` prettier/prettier
Error: 419:1 error Delete `··············` prettier/prettier
Error: 612:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/Modern2025TextToSpeechScreen.tsx
Error: 25:10 error 'ModernButton' is defined but never used @typescript-eslint/no-unused-vars
Error: 32:18 error 'contentVH' is defined but never used @typescript-eslint/no-unused-vars
Error: 43:10 error 'playbackProgress' is assigned a value but never used @typescript-eslint/no-unused-vars
Error: 48:1 error Delete `··` prettier/prettier
Error: 53:1 error Delete `··` prettier/prettier
Error: 72:11 error Insert `,` prettier/prettier
Error: 120:1 error Delete `····` prettier/prettier
Error: 137:1 error Delete `······` prettier/prettier
Error: 139:23 error Replace `·currentSettings.providerSettings?.['openai-tts']?.model·||·currentSettings.ttsModel·||` with `⏎········currentSettings.providerSettings?.['openai-tts']?.model·||⏎········currentSettings.ttsModel·||⏎·······` prettier/prettier
Error: 140:23 error Replace `·currentSettings.providerSettings?.['openai-tts']?.voice·||·currentSettings.ttsVoice·||` with `⏎········currentSettings.providerSettings?.['openai-tts']?.voice·||⏎········currentSettings.ttsVoice·||⏎·······` prettier/prettier
Error: 141:1 error Delete `······` prettier/prettier
Warning: 142:7 warning Unexpected console statement. Only these console methods are allowed: warn, error no-console
Error: 147:75 error Insert `,` prettier/prettier
Error: 149:1 error Delete `······` prettier/prettier
Error: 153:1 error Delete `······` prettier/prettier
Error: 155:60 error Replace `⏎········inputText,⏎········ttsModel,⏎········ttsVoice⏎······` with `inputText,·ttsModel,·ttsVoice` prettier/prettier
Error: 167:29 error Insert `,` prettier/prettier
Warning: 196:21 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 201:27 error Insert `,` prettier/prettier
Error: 205:1 error Delete `······` prettier/prettier
Error: 207:27 error Replace `·error.response?.data?.error?.message·||·⏎··························error.message·||·⏎·························` with `⏎········error.response?.data?.error?.message·||·error.message·||` prettier/prettier
Error: 216:9 error 'stopPlayback' is assigned a value but never used @typescript-eslint/no-unused-vars
Error: 252:33 error Insert `,` prettier/prettier
Error: 254:1 error Delete `··········` prettier/prettier
Error: 257:1 error Delete `··········` prettier/prettier
Error: 283:1 error Delete `····` prettier/prettier
Error: 296:1 error Delete `····` prettier/prettier
Error: 307:1 error Delete `····` prettier/prettier
Error: 316:21 error Insert `,` prettier/prettier
Error: 318:1 error Delete `········` prettier/prettier
Error: 336:1 error Delete `····` prettier/prettier
Error: 341:1 error Delete `······` prettier/prettier
Error: 361:17 error Replace `screenTheme·?·screenTheme.gradient·as·[string,·string]·:·[colors.background,·colors.background]` with `⏎··········screenTheme⏎············?·(screenTheme.gradient·as·[string,·string])⏎············:·[colors.background,·colors.background]⏎········` prettier/prettier
Error: 364:1 error Delete `······` prettier/prettier
Error: 369:20 error Delete `·` prettier/prettier
Error: 400:25 error Replace `⏎··············variant={isPlaying·?·'gradient'·:·'glass'}·⏎··············style={styles.textCard}⏎············` with `variant={isPlaying·?·'gradient'·:·'glass'}·style={styles.textCard}` prettier/prettier
Error: 423:1 error Delete `··············` prettier/prettier
Error: 433:1 error Delete `⏎··············` prettier/prettier
Error: 450:1 error Delete `················` prettier/prettier
Error: 460:1 error Delete `··················` prettier/prettier
Error: 462:1 error Delete `··················` prettier/prettier
Error: 475:24 error Replace `·variant="glass"·style={StyleSheet.flatten([styles.audioPlayerCard,·audioUri·?·{}·:·{·opacity:·0.5·}])}` with `⏎··············variant="glass"⏎··············style={StyleSheet.flatten([styles.audioPlayerCard,·audioUri·?·{}·:·{·opacity:·0.5·}])}⏎············` prettier/prettier
Error: 477:26 error Delete `·` prettier/prettier
Error: 478:47 error Delete `·` prettier/prettier
Error: 479:28 error Delete `·` prettier/prettier
Error: 480:71 error Delete `·` prettier/prettier
Error: 482:22 error Replace `·style={[styles.audioPlayerTitle,·{·color:·audioUri·?·colors.text·:·colors.textMuted·}]}` with `⏎··················style={[⏎····················styles.audioPlayerTitle,⏎····················{·color:·audioUri·?·colors.text·:·colors.textMuted·},⏎··················]}⏎················` prettier/prettier
Error: 486:1 error Delete `··············` prettier/prettier
Error: 492:47 error Delete `·` prettier/prettier
Error: 493:22 error Delete `·` prettier/prettier
Error: 495:22 error Insert `,` prettier/prettier
Error: 500:28 error Delete `·` prettier/prettier
Error: 501:56 error Delete `·` prettier/prettier
Error: 502:30 error Delete `·` prettier/prettier
Error: 503:73 error Delete `·` prettier/prettier
Error: 506:1 error Delete `················` prettier/prettier
Error: 508:34 error Delete `·` prettier/prettier
Error: 515:27 error 'containerWidth' is assigned a value but never used @typescript-eslint/no-unused-vars
Error: 527:30 error Delete `·` prettier/prettier
Error: 552:24 error Replace `·style={[styles.durationText,·{·color:·audioUri·?·colors.textSecondary·:·colors.textMuted·}]}` with `⏎····················style={[⏎······················styles.durationText,⏎······················{·color:·audioUri·?·colors.textSecondary·:·colors.textMuted·},⏎····················]}⏎··················` prettier/prettier
Error: 553:46 error Delete `·` prettier/prettier
Error: 555:34 error Delete `⏎····················` prettier/prettier
Error: 559:1 error Delete `················` prettier/prettier
Error: 563:47 error Delete `·` prettier/prettier
Error: 564:22 error Delete `·` prettier/prettier
Error: 566:22 error Insert `,` prettier/prettier
Error: 571:28 error Delete `·` prettier/prettier
Error: 572:44 error Delete `·` prettier/prettier
Error: 573:30 error Delete `·` prettier/prettier
Error: 574:73 error Delete `·` prettier/prettier
Error: 584:27 error Replace `isGenerating·||·!inputText.trim()·||·(!settings?.apiKeys?.openai·&&·!settings?.openaiApiKey)` with `⏎··················isGenerating·||⏎··················!inputText.trim()·||⏎··················(!settings?.apiKeys?.openai·&&·!settings?.openaiApiKey)⏎················` prettier/prettier
Error: 588:31 error Insert `⏎·················` prettier/prettier
Error: 589:1 error Insert `··` prettier/prettier
Error: 590:19 error Insert `··` prettier/prettier
590:19 warning Inline style: {
opacity: 'isGenerating || !inputText.trim() || (!settings?.apiKeys?.openai && !settings?.openaiApiKey) ? 0.5 : 1'
} react-native/no-inline-styles
Error: 591:1 error Replace `····················opacity:·isGenerating·||·!inputText.trim()·||·(!settings?.apiKeys?.openai·&&·!settings?.openaiApiKey)·?·0.5` with `······················opacity:⏎························isGenerating·||⏎························!inputText.trim()·||⏎························(!settings?.apiKeys?.openai·&&·!settings?.openaiApiKey)⏎··························?·0.5⏎·························` prettier/prettier
Error: 592:1 error Insert `··` prettier/prettier
Error: 593:19 error Replace `}` with `··},` prettier/prettier
Error: 594:1 error Replace `················]}` with `··················]}⏎················` prettier/prettier
Error: 608:28 error Delete `·` prettier/prettier
Error: 609:86 error Delete `·` prettier/prettier
Error: 610:35 error Delete `·` prettier/prettier
Error: 611:43 error Delete `·` prettier/prettier
Error: 615:1 error Delete `··············` prettier/prettier
Error: 625:1 error Delete `············` prettier/prettier
Error: 629:26 error Delete `·` prettier/prettier
Error: 630:42 error Delete `·` prettier/prettier
Error: 631:28 error Delete `·` prettier/prettier
Error: 632:43 error Delete `·` prettier/prettier
Error: 636:101 error Replace `·•` with `{'·'}⏎··················•{'·'}⏎·················` prettier/prettier
Error: 853:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/ModernSettingsScreen.tsx
Error: 5:3 error 'TextInput' is defined but never used @typescript-eslint/no-unused-vars
Error: 11:3 error 'Dimensions' is defined but never used @typescript-eslint/no-unused-vars
Error: 20:10 error 'ModelDropdown' is defined but never used @typescript-eslint/no-unused-vars
Error: 28:9 error Replace `·wp,·hp,·spacing,·fontSize,·fontSizes,·componentHeights,·adaptiveSpacing·` with `⏎··wp,⏎··hp,⏎··spacing,⏎··fontSize,⏎··fontSizes,⏎··componentHeights,⏎··adaptiveSpacing,⏎` prettier/prettier
Error: 28:27 error 'fontSize' is defined but never used @typescript-eslint/no-unused-vars
Error: 46:10 error 'isLoading' is assigned a value but never used @typescript-eslint/no-unused-vars
Error: 48:10 error 'isValidating' is assigned a value but never used @typescript-eslint/no-unused-vars
Error: 50:10 error 'apiKeyVisible' is assigned a value but never used @typescript-eslint/no-unused-vars
Error: 50:25 error 'setApiKeyVisible' is assigned a value but never used @typescript-eslint/no-unused-vars
Error: 51:10 error 'whisperModels' is assigned a value but never used @typescript-eslint/no-unused-vars
Error: 52:10 error 'ttsModels' is assigned a value but never used @typescript-eslint/no-unused-vars
Error: 53:10 error 'modelsLoading' is assigned a value but never used @typescript-eslint/no-unused-vars
Error: 57:1 error Delete `··` prettier/prettier
Error: 58:19 error 'theme' is assigned a value but never used @typescript-eslint/no-unused-vars
Error: 105:33 error Insert `,` prettier/prettier
Error: 143:1 error Delete `······` prettier/prettier
Error: 148:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 192:1 error Delete `····` prettier/prettier
Error: 196:1 error Delete `····` prettier/prettier
Error: 199:1 error Delete `······` prettier/prettier
Error: 205:1 error Delete `······` prettier/prettier
Error: 210:1 error Delete `······` prettier/prettier
Error: 211:25 error Replace `m` with `(m)` prettier/prettier
Error: 214:1 error Delete `······` prettier/prettier
Error: 215:21 error Replace `m` with `(m)` prettier/prettier
Error: 218:21 error Replace `m` with `(m)` prettier/prettier
Error: 221:1 error Delete `······` prettier/prettier
Error: 224:1 error Delete `······` prettier/prettier
Error: 246:9 error 'validateApiKey' is assigned a value but never used @typescript-eslint/no-unused-vars
Error: 255:1 error Delete `····` prettier/prettier
Error: 259:1 error Delete `······` prettier/prettier
Error: 269:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 281:1 error Delete `····` prettier/prettier
Error: 287:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 301:45 error Replace `l` with `(l)` prettier/prettier
Error: 317:24 error Replace `⏎··········?·['#0F0F23',·'#1A1A3E',·'#0F0F23']⏎··········:·['#F0F4FF',·'#FFFFFF',·'#F0F4FF']⏎········` with `?·['#0F0F23',·'#1A1A3E',·'#0F0F23']·:·['#F0F4FF',·'#FFFFFF',·'#F0F4FF']` prettier/prettier
Error: 323:20 error Delete `·` prettier/prettier
Error: 327:1 error Insert `··` prettier/prettier
Error: 328:11 error Insert `··` prettier/prettier
Error: 329:1 error Insert `··` prettier/prettier
Error: 330:1 error Insert `··` prettier/prettier
Error: 331:15 error Insert `··` prettier/prettier
Error: 332:1 error Insert `··` prettier/prettier
Error: 333:13 error Insert `··` prettier/prettier
Error: 334:1 error Insert `··` prettier/prettier
Error: 335:9 error Insert `··` prettier/prettier
Error: 336:1 error Replace `··········` with `············` prettier/prettier
Error: 337:1 error Insert `··` prettier/prettier
Error: 338:13 error Insert `··` prettier/prettier
Error: 339:1 error Replace `··············` with `················` prettier/prettier
Error: 340:1 error Replace `················<Text·style={[styles.statusText,·{·color:·colors.text·}]}>⏎··················{statusMessage}⏎················` with `··················<Text·style={[styles.statusText,·{·color:·colors.text·}]}>{statusMessage}` prettier/prettier
Error: 343:1 error Insert `··` prettier/prettier
Error: 344:13 error Insert `··` prettier/prettier
Error: 345:11 error Insert `··` prettier/prettier
Error: 347:1 error Insert `··` prettier/prettier
Error: 348:11 error Insert `··` prettier/prettier
Error: 349:1 error Insert `··` prettier/prettier
Error: 350:1 error Insert `··` prettier/prettier
Error: 351:13 error Insert `··` prettier/prettier
Error: 352:1 error Replace `············⏎············` with `⏎··············` prettier/prettier
Error: 354:1 error Insert `··` prettier/prettier
Error: 355:1 error Insert `··` prettier/prettier
Error: 356:13 error Insert `··` prettier/prettier
Error: 357:1 error Insert `··` prettier/prettier
Error: 358:1 error Insert `··` prettier/prettier
Error: 359:17 error Insert `··` prettier/prettier
Error: 360:1 error Insert `··` prettier/prettier
Error: 361:1 error Insert `··` prettier/prettier
Error: 362:19 error Insert `··` prettier/prettier
Error: 363:1 error Insert `··` prettier/prettier
Error: 364:1 error Replace `····················` with `······················` prettier/prettier
Error: 365:1 error Insert `··` prettier/prettier
Error: 366:19 error Insert `··` prettier/prettier
Error: 367:1 error Replace `··················` with `····················` prettier/prettier
Error: 368:1 error Insert `··` prettier/prettier
Error: 369:17 error Insert `··` prettier/prettier
Error: 370:1 error Replace `··············` with `················` prettier/prettier
Error: 371:1 error Insert `··` prettier/prettier
Error: 373:1 error Insert `··` prettier/prettier
Error: 374:13 error Replace `<Text·style={[styles.subsectionTitle,·{·color:·colors.textSecondary,·marginTop:·20·}]}` with `··<Text⏎················style={[styles.subsectionTitle,·{·color:·colors.textSecondary,·marginTop:·20·}]}⏎··············` prettier/prettier
Warning: 374:51 warning Inline style: { marginTop: 20 } react-native/no-inline-styles
Error: 375:1 error Insert `··` prettier/prettier
Error: 376:1 error Replace `············` with `··············` prettier/prettier
Error: 377:1 error Insert `··` prettier/prettier
Error: 378:15 error Insert `··` prettier/prettier
Error: 379:1 error Replace `················` with `··················` prettier/prettier
Error: 380:1 error Insert `··` prettier/prettier
Error: 381:19 error Insert `··` prettier/prettier
Error: 382:1 error Replace `··················` with `····················` prettier/prettier
Error: 383:1 error Insert `··` prettier/prettier
Error: 384:19 error Insert `··` prettier/prettier
Error: 385:1 error Replace `··················` with `····················` prettier/prettier
Error: 386:17 error Insert `··` prettier/prettier
Error: 387:1 error Insert `··` prettier/prettier
Error: 388:1 error Replace `············` with `··············` prettier/prettier
Error: 389:1 error Insert `··` prettier/prettier
Error: 391:11 error Insert `··` prettier/prettier
Error: 392:1 error Replace `··········` with `············` prettier/prettier
Error: 393:13 error Insert `··` prettier/prettier
Error: 394:1 error Insert `··` prettier/prettier
Error: 395:1 error Replace `············` with `··············` prettier/prettier
Error: 396:1 error Insert `··` prettier/prettier
Error: 397:1 error Replace `············onProviderChange={(providerId)·=>·setSettings({·...settings,·sttProvider:·providerId·})` with `··············onProviderChange={(providerId)·=>⏎················setSettings({·...settings,·sttProvider:·providerId·})⏎··············` prettier/prettier
Error: 398:1 error Replace `············onApiKeyChange={(provider,·key)·=>` with `··············onApiKeyChange={(provider,·key)·=>⏎···············` prettier/prettier
Error: 399:15 error Insert `····` prettier/prettier
Error: 400:1 error Insert `····` prettier/prettier
Error: 401:1 error Replace `··············` with `··················` prettier/prettier
Error: 402:13 error Replace `})` with `····})⏎··············` prettier/prettier
Error: 403:1 error Replace `············onSettingChange={(providerId,·setting,·value)·=>` with `··············onSettingChange={(providerId,·setting,·value)·=>⏎···············` prettier/prettier
Error: 404:15 error Insert `····` prettier/prettier
Error: 405:1 error Insert `····` prettier/prettier
Error: 406:17 error Insert `····` prettier/prettier
Error: 407:17 error Insert `····` prettier/prettier
Error: 408:1 error Insert `····` prettier/prettier
Error: 409:19 error Insert `····` prettier/prettier
Error: 410:17 error Insert `····` prettier/prettier
Error: 411:1 error Insert `····` prettier/prettier
Error: 412:13 error Replace `})` with `····})⏎··············` prettier/prettier
Error: 413:1 error Insert `··` prettier/prettier
Error: 415:1 error Insert `··` prettier/prettier
Error: 416:13 error Insert `··` prettier/prettier
Error: 417:1 error Insert `··` prettier/prettier
Error: 418:1 error Insert `··` prettier/prettier
Error: 419:13 error Insert `··` prettier/prettier
Error: 420:13 error Replace `onProviderChange={(providerId)·=>·setSettings({·...settings,·ttsProvider:·providerId·})` with `··onProviderChange={(providerId)·=>⏎················setSettings({·...settings,·ttsProvider:·providerId·})⏎··············` prettier/prettier
Error: 421:1 error Replace `············onApiKeyChange={(provider,·key)·=>` with `··············onApiKeyChange={(provider,·key)·=>⏎···············` prettier/prettier
Error: 422:15 error Insert `····` prettier/prettier
Error: 423:1 error Insert `····` prettier/prettier
Error: 424:1 error Insert `····` prettier/prettier
Error: 425:13 error Replace `})` with `····})⏎··············` prettier/prettier
Error: 426:1 error Replace `············onSettingChange={(providerId,·setting,·value)·=>` with `··············onSettingChange={(providerId,·setting,·value)·=>⏎···············` prettier/prettier
Error: 427:1 error Insert `····` prettier/prettier
Error: 428:15 error Insert `····` prettier/prettier
Error: 429:1 error Replace `················` with `····················` prettier/prettier
Error: 430:1 error Insert `····` prettier/prettier
Error: 431:19 error Insert `····` prettier/prettier
Error: 432:1 error Replace `··················` with `······················` prettier/prettier
Error: 433:17 error Insert `····` prettier/prettier
Error: 434:1 error Insert `····` prettier/prettier
Error: 435:1 error Replace `············})` with `················})⏎··············` prettier/prettier
Error: 436:1 error Insert `··` prettier/prettier
Error: 438:1 error Replace `⏎` with `··` prettier/prettier
Error: 440:1 error Replace `··········` with `············` prettier/prettier
Error: 441:1 error Insert `··` prettier/prettier
Error: 442:15 error Insert `··` prettier/prettier
Error: 443:1 error Replace `················<Text·style={[styles.sectionTitle,·{·color:·colors.text,·marginBottom:·spacing.xs·}]}` with `··················<Text⏎····················style={[styles.sectionTitle,·{·color:·colors.text,·marginBottom:·spacing.xs·}]}⏎··················` prettier/prettier
Error: 444:1 error Replace `··················` with `····················` prettier/prettier
Error: 445:17 error Insert `··` prettier/prettier
Error: 446:1 error Insert `··` prettier/prettier
Error: 447:1 error Replace `··················` with `····················` prettier/prettier
Error: 448:17 error Insert `··` prettier/prettier
Error: 449:1 error Insert `··` prettier/prettier
Error: 450:15 error Insert `··` prettier/prettier
Error: 451:1 error Insert `··` prettier/prettier
Error: 452:1 error Insert `··` prettier/prettier
Error: 453:17 error Insert `··` prettier/prettier
Error: 454:17 error Insert `··` prettier/prettier
Error: 455:1 error Insert `··` prettier/prettier
Error: 456:15 error Insert `··` prettier/prettier
Error: 457:1 error Insert `··` prettier/prettier
Error: 458:1 error Insert `··` prettier/prettier
Error: 460:11 error Insert `··` prettier/prettier
Error: 461:11 error Insert `··` prettier/prettier
Error: 462:1 error Replace `············` with `··············` prettier/prettier
Error: 463:1 error Insert `··` prettier/prettier
Error: 464:17 error Insert `··` prettier/prettier
Error: 465:1 error Replace `················` with `··················` prettier/prettier
Error: 466:1 error Insert `··` prettier/prettier
Error: 467:17 error Insert `··` prettier/prettier
Error: 468:1 error Replace `················` with `··················` prettier/prettier
Error: 469:1 error Insert `··` prettier/prettier
Error: 470:15 error Insert `··` prettier/prettier
Error: 471:1 error Replace `············` with `··············` prettier/prettier
Error: 472:11 error Insert `··` prettier/prettier
Error: 473:1 error Insert `··` prettier/prettier
Error: 591:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/ModernSpeechToTextScreen.tsx
Error: 12:3 error 'Dimensions' is defined but never used @typescript-eslint/no-unused-vars
Error: 19:10 error 'BlurView' is defined but never used @typescript-eslint/no-unused-vars
Error: 28:9 error Replace `·wp,·hp,·spacing,·fontSize,·fontSizes,·componentHeights,·adaptiveSpacing·` with `⏎··wp,⏎··hp,⏎··spacing,⏎··fontSize,⏎··fontSizes,⏎··componentHeights,⏎··adaptiveSpacing,⏎` prettier/prettier
Error: 28:27 error 'fontSize' is defined but never used @typescript-eslint/no-unused-vars
Error: 38:1 error Delete `··` prettier/prettier
Error: 39:19 error 'theme' is assigned a value but never used @typescript-eslint/no-unused-vars
Error: 44:13 error Replace `.fill(0).map(()·=>·new·Animated.Value(0))` with `⏎······.fill(0)⏎······.map(()·=>·new·Animated.Value(0)),` prettier/prettier
Error: 56:11 error Insert `,` prettier/prettier
Error: 98:11 error Insert `,` prettier/prettier
Error: 104:23 error Replace `anim` with `(anim)` prettier/prettier
Warning: 118:7 warning Unexpected console statement. Only these console methods are allowed: warn, error no-console
Error: 118:19 error Replace `'Loaded·settings:',·loadedSettings?.openaiApiKey·?·'API·key·present'·:·'No·API·key'` with `⏎········'Loaded·settings:',⏎········loadedSettings?.openaiApiKey·?·'API·key·present'·:·'No·API·key',⏎······` prettier/prettier
Error: 145:1 error Delete `····` prettier/prettier
Error: 154:1 error Delete `······` prettier/prettier
Error: 167:51 error Insert `,` prettier/prettier
Error: 169:1 error Delete `······` prettier/prettier
Error: 173:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 186:1 error Delete `······` prettier/prettier
Error: 189:1 error Delete `······` prettier/prettier
Error: 194:1 error Delete `········` prettier/prettier
Error: 200:1 error Delete `········` prettier/prettier
Error: 204:1 error Delete `······` prettier/prettier
Error: 206:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 219:1 error Delete `····` prettier/prettier
Error: 231:55 error Replace `w` with `(w)` prettier/prettier
Error: 236:24 error Replace `⏎··········?·['#0F0F23',·'#1A1A3E',·'#0F0F23']⏎··········:·['#F0F4FF',·'#FFFFFF',·'#F0F4FF']⏎········` with `?·['#0F0F23',·'#1A1A3E',·'#0F0F23']·:·['#F0F4FF',·'#FFFFFF',·'#F0F4FF']` prettier/prettier
Error: 246:9 error Replace `<ScrollView·⏎` with `··<ScrollView⏎··` prettier/prettier
Error: 248:1 error Insert `··` prettier/prettier
Error: 249:9 error Insert `··` prettier/prettier
Error: 250:1 error Insert `··` prettier/prettier
Error: 251:13 error Insert `··` prettier/prettier
Error: 252:1 error Insert `··` prettier/prettier
Error: 253:15 error Insert `··` prettier/prettier
Error: 254:1 error Insert `··` prettier/prettier
Error: 255:1 error Insert `··` prettier/prettier
Error: 256:1 error Insert `··` prettier/prettier
Error: 257:13 error Insert `··` prettier/prettier
Error: 258:11 error Insert `··` prettier/prettier
Error: 259:1 error Insert `··` prettier/prettier
Error: 260:1 error Insert `··` prettier/prettier
Error: 261:15 error Insert `··` prettier/prettier
Error: 262:1 error Insert `··` prettier/prettier
Error: 263:19 error Replace `<Text·style={[styles.statusText,·{·color:·colors.text·}]}>⏎····················{statusMessage}⏎··················` with `··<Text·style={[styles.statusText,·{·color:·colors.text·}]}>{statusMessage}` prettier/prettier
Error: 266:17 error Insert `··` prettier/prettier
Error: 267:1 error Insert `··` prettier/prettier
Error: 268:13 error Insert `··` prettier/prettier
Error: 270:1 error Insert `··` prettier/prettier
Error: 271:13 error Insert `··` prettier/prettier
Error: 272:1 error Insert `··` prettier/prettier
Error: 273:17 error Insert `··` prettier/prettier
Error: 274:1 error Insert `··` prettier/prettier
Error: 275:17 error Insert `··` prettier/prettier
Error: 276:1 error Insert `··` prettier/prettier
Error: 277:1 error Insert `··` prettier/prettier
Error: 278:1 error Replace `····················` with `······················` prettier/prettier
Error: 279:19 error Insert `··` prettier/prettier
Error: 280:1 error Replace `················` with `··················` prettier/prettier
Error: 281:1 error Insert `··` prettier/prettier
Error: 282:1 error Replace `··············⏎` with `⏎··` prettier/prettier
Error: 284:1 error Insert `··` prettier/prettier
Error: 285:1 error Replace `················` with `··················` prettier/prettier
Error: 286:1 error Insert `··` prettier/prettier
Error: 287:1 error Replace `················` with `··················` prettier/prettier
Error: 288:1 error Insert `··` prettier/prettier
Error: 289:1 error Replace `················` with `··················` prettier/prettier
Error: 290:15 error Insert `··` prettier/prettier
Error: 291:1 error Replace `············` with `··············` prettier/prettier
Error: 293:1 error Insert `··` prettier/prettier
Error: 294:1 error Replace `············` with `··············` prettier/prettier
Error: 295:1 error Insert `··` prettier/prettier
Error: 296:1 error Replace `················` with `··················` prettier/prettier
Error: 297:19 error Insert `··` prettier/prettier
Error: 298:1 error Replace `····················` with `······················` prettier/prettier
Error: 299:23 error Insert `··` prettier/prettier
Error: 300:1 error Replace `······················` with `························` prettier/prettier
Error: 301:1 error Insert `··` prettier/prettier
Error: 302:1 error Replace `························` with `··························` prettier/prettier
Error: 303:1 error Replace `··························backgroundColor:·isRecording·⏎····························?·colors.primary·⏎····························` with `····························backgroundColor:·isRecording·?·colors.primary·` prettier/prettier
Error: 306:1 error Replace `··························` with `····························` prettier/prettier
Error: 307:1 error Insert `··` prettier/prettier
Error: 308:31 error Insert `··` prettier/prettier
Error: 309:1 error Insert `··` prettier/prettier
Error: 310:33 error Insert `··` prettier/prettier
Error: 311:1 error Insert `··` prettier/prettier
Error: 312:29 error Insert `··` prettier/prettier
Error: 313:1 error Insert `··` prettier/prettier
Error: 314:31 error Insert `··` prettier/prettier
Error: 315:1 error Insert `··` prettier/prettier
Error: 316:33 error Insert `··` prettier/prettier
Error: 317:1 error Insert `··` prettier/prettier
Error: 318:29 error Insert `··` prettier/prettier
Error: 319:1 error Insert `··` prettier/prettier
Error: 320:27 error Insert `··` prettier/prettier
Error: 321:1 error Insert `··` prettier/prettier
Error: 322:29 error Insert `··` prettier/prettier
Error: 323:1 error Insert `··` prettier/prettier
Error: 324:25 error Insert `··` prettier/prettier
Error: 325:1 error Replace `······················` with `························` prettier/prettier
Error: 326:1 error Insert `··` prettier/prettier
Error: 327:19 error Insert `··` prettier/prettier
Error: 328:1 error Insert `··` prettier/prettier
Error: 329:1 error Replace `··············` with `················` prettier/prettier
Error: 330:13 error Insert `··` prettier/prettier
Error: 332:1 error Replace `············` with `··············` prettier/prettier
Error: 333:1 error Insert `··` prettier/prettier
Error: 334:1 error Replace `··············` with `················` prettier/prettier
Error: 335:17 error Insert `··` prettier/prettier
Error: 336:1 error Replace `··················` with `····················` prettier/prettier
Error: 337:19 error Insert `··` prettier/prettier
Error: 338:1 error Replace `··················` with `····················` prettier/prettier
Error: 339:1 error Insert `··` prettier/prettier
Error: 340:23 error Insert `··` prettier/prettier
Error: 341:1 error Insert `··` prettier/prettier
Error: 342:19 error Insert `··` prettier/prettier
Error: 343:1 error Insert `··` prettier/prettier
Error: 344:15 error Insert `··` prettier/prettier
Error: 346:1 error Insert `··` prettier/prettier
Error: 347:17 error Insert `··` prettier/prettier
Error: 348:1 error Insert `··` prettier/prettier
Error: 349:19 error Insert `··` prettier/prettier
Error: 350:1 error Insert `··` prettier/prettier
Error: 351:19 error Insert `··` prettier/prettier
Error: 352:1 error Insert `··` prettier/prettier
Error: 353:19 error Insert `··` prettier/prettier
Error: 354:17 error Insert `··` prettier/prettier
Error: 355:1 error Replace `················⏎················` with `⏎··················` prettier/prettier
Error: 357:1 error Insert `··` prettier/prettier
Error: 358:1 error Replace `··················` with `····················` prettier/prettier
Error: 359:19 error Insert `··` prettier/prettier
Error: 360:1 error Replace `··················` with `····················` prettier/prettier
Error: 361:1 error Insert `··` prettier/prettier
Error: 362:19 error Insert `··` prettier/prettier
Error: 363:17 error Insert `··` prettier/prettier
Error: 364:1 error Replace `··············` with `················` prettier/prettier
Error: 365:1 error Insert `··` prettier/prettier
Error: 366:1 error Replace `··········` with `············` prettier/prettier
Error: 367:1 error Insert `··` prettier/prettier
Error: 484:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/ModernTextToSpeechScreen.tsx
Error: 12:3 error 'Dimensions' is defined but never used @typescript-eslint/no-unused-vars
Error: 29:9 error Replace `·wp,·hp,·spacing,·fontSize,·fontSizes,·componentHeights,·adaptiveSpacing·` with `⏎··wp,⏎··hp,⏎··spacing,⏎··fontSize,⏎··fontSizes,⏎··componentHeights,⏎··adaptiveSpacing,⏎` prettier/prettier
Error: 29:27 error 'fontSize' is defined but never used @typescript-eslint/no-unused-vars
Error: 42:1 error Delete `··` prettier/prettier
Error: 43:19 error 'theme' is assigned a value but never used @typescript-eslint/no-unused-vars
Error: 47:9 error 'progressAnim' is assigned a value but never used @typescript-eslint/no-unused-vars
Error: 48:32 error Replace `⏎····[...Array(15)].map(()·=>·new·Animated.Value(0.3))⏎··` with `[...Array(15)].map(()·=>·new·Animated.Value(0.3))` prettier/prettier
Error: 91:11 error Insert `,` prettier/prettier
Error: 125:11 error Insert `,` prettier/prettier
Error: 131:27 error Replace `anim` with `(anim)` prettier/prettier
Error: 154:9 error Insert `,` prettier/prettier
Warning: 171:7 warning Unexpected console statement. Only these console methods are allowed: warn, error no-console
Error: 171:19 error Replace `'TTS·Settings·loaded:',·loadedSettings?.openaiApiKey·?·'API·key·present'·:·'No·API·key'` with `⏎········'TTS·Settings·loaded:',⏎········loadedSettings?.openaiApiKey·?·'API·key·present'·:·'No·API·key',⏎······` prettier/prettier
Error: 192:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 201:1 error Delete `····` prettier/prettier
Error: 221:33 error Insert `,` prettier/prettier
Error: 241:10 error Delete `·` prettier/prettier
Error: 247:31 error Insert `,` prettier/prettier
Error: 254:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Warning: 263:43 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 267:1 error Delete `······` prettier/prettier
Error: 273:1 error Delete `······` prettier/prettier
Error: 290:1 error Delete `······` prettier/prettier
Error: 305:1 error Delete `··········` prettier/prettier
Error: 312:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 324:16 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 352:1 error Delete `······` prettier/prettier
Error: 355:1 error Delete `······` prettier/prettier
Error: 365:1 error Delete `······` prettier/prettier
Error: 371:1 error Delete `······` prettier/prettier
Error: 378:1 error Delete `······` prettier/prettier
Error: 398:24 error Replace `⏎··········?·['#0F0F23',·'#1A1A3E',·'#0F0F23']⏎··········:·['#F0F4FF',·'#FFFFFF',·'#F0F4FF']⏎········` with `?·['#0F0F23',·'#1A1A3E',·'#0F0F23']·:·['#F0F4FF',·'#FFFFFF',·'#F0F4FF']` prettier/prettier
Error: 408:9 error Replace `<ScrollView·⏎` with `··<ScrollView⏎··` prettier/prettier
Error: 410:1 error Replace `··········` with `············` prettier/prettier
Error: 411:9 error Insert `··` prettier/prettier
Error: 412:1 error Insert `··` prettier/prettier
Error: 413:13 error Insert `··` prettier/prettier
Error: 414:1 error Insert `··` prettier/prettier
Error: 415:1 error Insert `··` prettier/prettier
Error: 416:17 error Insert `··` prettier/prettier
Error: 417:1 error Insert `··` prettier/prettier
Error: 418:1 error Replace `··············` with `················` prettier/prettier
Error: 419:1 error Insert `··` prettier/prettier
Error: 420:1 error Insert `··` prettier/prettier
Error: 421:13 error Insert `··` prettier/prettier
Error: 422:1 error Insert `··` prettier/prettier
Error: 423:1 error Replace `··············` with `················` prettier/prettier
Error: 424:17 error Insert `··` prettier/prettier
Error: 425:1 error Replace `··················<Text·style={[styles.statusText,·{·color:·colors.text·}]}>⏎····················{statusMessage}⏎··················` with `····················<Text·style={[styles.statusText,·{·color:·colors.text·}]}>{statusMessage}` prettier/prettier
Error: 428:1 error Insert `··` prettier/prettier
Error: 429:15 error Insert `··` prettier/prettier
Error: 430:1 error Replace `············` with `··············` prettier/prettier
Error: 432:1 error Insert `··` prettier/prettier
Error: 433:1 error Insert `··` prettier/prettier
Error: 434:15 error Insert `··` prettier/prettier
Error: 435:1 error Insert `··` prettier/prettier
Error: 436:1 error Replace `··················` with `····················` prettier/prettier
Error: 437:1 error Insert `··` prettier/prettier
Error: 438:17 error Insert `··` prettier/prettier
Error: 439:1 error Replace `··················` with `····················` prettier/prettier
Error: 440:19 error Insert `··` prettier/prettier
Error: 441:1 error Insert `··` prettier/prettier
Error: 442:19 error Insert `··` prettier/prettier
Error: 443:1 error Insert `··` prettier/prettier
Error: 444:1 error Replace `················` with `··················` prettier/prettier
Error: 445:1 error Insert `··` prettier/prettier
Error: 446:1 error Replace `··············⏎············` with `⏎··············` prettier/prettier
Error: 448:1 error Insert `··` prettier/prettier
Error: 449:17 error Insert `··` prettier/prettier
Error: 450:1 error Insert `··` prettier/prettier
Error: 451:1 error Insert `··` prettier/prettier
Error: 452:17 error Insert `··` prettier/prettier
Error: 453:1 error Insert `··` prettier/prettier
Error: 454:15 error Insert `··` prettier/prettier
Error: 455:1 error Replace `··············⏎` with `⏎··` prettier/prettier
Error: 457:17 error Insert `··` prettier/prettier
Error: 458:19 error Insert `··` prettier/prettier
Error: 459:1 error Replace `················` with `··················` prettier/prettier
Error: 460:1 error Insert `··` prettier/prettier
Error: 461:1 error Insert `··` prettier/prettier
Error: 463:13 error Insert `··` prettier/prettier
Error: 464:13 error Insert `··` prettier/prettier
Error: 465:1 error Replace `··············<Animated.View⏎················style={[⏎··················{·transform:·[{·scale:·pulseAnim·}]·},⏎················]}` with `················<Animated.View·style={[{·transform:·[{·scale:·pulseAnim·}]·}]}>` prettier/prettier
Error: 469:1 error Replace `··············>⏎················` with `··················` prettier/prettier
Error: 471:1 error Insert `··` prettier/prettier
Error: 472:19 error Insert `··` prettier/prettier
Error: 473:21 error Insert `··` prettier/prettier
Error: 474:1 error Replace `······················` with `························` prettier/prettier
Error: 475:23 error Insert `··` prettier/prettier
Error: 476:1 error Insert `··` prettier/prettier
Error: 477:23 error Insert `··` prettier/prettier
Error: 478:21 error Insert `··` prettier/prettier
Error: 479:1 error Replace `······················<Text·style={styles.playerTitle}>⏎························{t('textToSpeech.audioPlayer')}⏎······················` with `························<Text·style={styles.playerTitle}>{t('textToSpeech.audioPlayer')}` prettier/prettier
Error: 482:1 error Insert `··` prettier/prettier
Error: 483:19 error Insert `··` prettier/prettier
Error: 485:1 error Insert `··` prettier/prettier
Error: 486:1 error Replace `··················` with `····················` prettier/prettier
Error: 487:21 error Insert `··` prettier/prettier
Error: 488:1 error Insert `··` prettier/prettier
Error: 489:25 error Insert `··` prettier/prettier
Error: 490:1 error Insert `··` prettier/prettier
Error: 491:1 error Insert `··` prettier/prettier
Error: 492:27 error Insert `··` prettier/prettier
Error: 493:1 error Insert `··` prettier/prettier
Error: 494:31 error Insert `··` prettier/prettier
Error: 495:1 error Insert `··` prettier/prettier
Error: 496:31 error Insert `··` prettier/prettier
Error: 497:1 error Insert `··` prettier/prettier
Error: 498:1 error Insert `··` prettier/prettier
Error: 499:25 error Insert `··` prettier/prettier
Error: 500:23 error Insert `··` prettier/prettier
Error: 501:1 error Insert `··` prettier/prettier
Error: 502:27 error Insert `··` prettier/prettier
Error: 503:1 error Insert `··` prettier/prettier
Error: 504:1 error Replace `······························` with `································` prettier/prettier
Error: 505:1 error Insert `··` prettier/prettier
Error: 506:31 error Insert `····` prettier/prettier
Error: 507:1 error Replace `······························` with `··································` prettier/prettier
Error: 508:27 error Insert `··` prettier/prettier
Error: 509:1 error Insert `··` prettier/prettier
Error: 510:27 error Insert `··` prettier/prettier
Error: 511:1 error Insert `··` prettier/prettier
Error: 512:1 error Replace `························` with `··························` prettier/prettier
Error: 513:1 error Insert `··` prettier/prettier
Error: 514:1 error Insert `··` prettier/prettier
Error: 515:19 error Insert `··` prettier/prettier
Error: 517:1 error Insert `··` prettier/prettier
Error: 518:1 error Replace `··················` with `····················` prettier/prettier
Error: 519:21 error Insert `··` prettier/prettier
Error: 520:1 error Insert `··` prettier/prettier
Error: 521:25 error Insert `··` prettier/prettier
Error: 522:25 error Insert `··` prettier/prettier
Error: 523:1 error Replace `························` with `··························` prettier/prettier
Error: 524:1 error Insert `··` prettier/prettier
Error: 525:1 error Insert `··` prettier/prettier
Error: 526:25 error Insert `··` prettier/prettier
Error: 527:23 error Insert `··` prettier/prettier
Error: 528:1 error Replace `······················` with `························` prettier/prettier
Error: 529:1 error Insert `··` prettier/prettier
Error: 530:1 error Insert `··` prettier/prettier
Error: 531:25 error Insert `··` prettier/prettier
Error: 532:1 error Insert `··` prettier/prettier
Error: 533:1 error Replace `··························{settings?.ttsVoice·?·settings.ttsVoice.charAt(0).toUpperCase()·+·settings.ttsVoice.slice(1)` with `····························{settings?.ttsVoice⏎······························?·settings.ttsVoice.charAt(0).toUpperCase()·+⏎································settings.ttsVoice.slice(1)⏎·····························` prettier/prettier
Error: 534:25 error Insert `··` prettier/prettier
Error: 535:1 error Insert `··` prettier/prettier
Error: 536:21 error Insert `··` prettier/prettier
Error: 537:1 error Insert `··` prettier/prettier
Error: 538:1 error Replace `······················` with `························` prettier/prettier
Error: 539:25 error Insert `··` prettier/prettier
Error: 540:1 error Insert `··` prettier/prettier
Error: 541:21 error Insert `··` prettier/prettier
Error: 542:1 error Insert `··` prettier/prettier
Error: 544:1 error Replace `··················` with `····················` prettier/prettier
Error: 545:1 error Insert `··` prettier/prettier
Error: 546:21 error Replace `<View·style={[styles.progressBar,·{·backgroundColor:·isDark·?·'rgba(99,·102,·241,·0.1)'·:·'rgba(139,·92,·246,·0.1)'·}]}` with `··<View⏎························style={[⏎··························styles.progressBar,⏎··························{⏎····························backgroundColor:·isDark⏎······························?·'rgba(99,·102,·241,·0.1)'⏎······························:·'rgba(139,·92,·246,·0.1)',⏎··························},⏎························]}⏎······················` prettier/prettier
546:55 warning Inline style: {
backgroundColor: "isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(139, 92, 246, 0.1)'"
} react-native/no-inline-styles
Error: 547:1 error Insert `··` prettier/prettier
Error: 548:25 error Insert `··` prettier/prettier
Error: 549:1 error Insert `··` prettier/prettier
Error: 550:1 error Replace `··························` with `····························` prettier/prettier
Error: 551:1 error Insert `··` prettier/prettier
Error: 552:27 error Insert `··` prettier/prettier
Error: 553:1 error Insert `··` prettier/prettier
Error: 554:23 error Insert `··` prettier/prettier
Error: 555:1 error Replace `························` with `··························` prettier/prettier
Error: 556:1 error Insert `··` prettier/prettier
Error: 557:1 error Insert `··` prettier/prettier
Error: 558:27 error Insert `··` prettier/prettier
Error: 559:1 error Insert `··` prettier/prettier
Error: 560:1 error Replace `························` with `··························` prettier/prettier
Error: 561:1 error Insert `··` prettier/prettier
Error: 562:1 error Insert `··` prettier/prettier
Error: 563:25 error Insert `··` prettier/prettier
Error: 564:1 error Insert `··` prettier/prettier
Error: 565:1 error Replace `··························` with `····························` prettier/prettier
Error: 566:1 error Insert `··` prettier/prettier
Error: 567:1 error Insert `··` prettier/prettier
Error: 568:27 error Insert `··` prettier/prettier
Error: 569:1 error Insert `··` prettier/prettier
Error: 570:1 error Replace `······················` with `························` prettier/prettier
Error: 571:1 error Insert `··` prettier/prettier
Error: 572:1 error Insert `··` prettier/prettier
Error: 573:23 error Insert `··` prettier/prettier
Error: 574:1 error Insert `··` prettier/prettier
Error: 575:1 error Replace `··························` with `····························` prettier/prettier
Error: 576:25 error Insert `··` prettier/prettier
Error: 577:1 error Insert `··` prettier/prettier
Error: 578:1 error Replace `··························` with `····························` prettier/prettier
Error: 579:25 error Insert `··` prettier/prettier
Error: 580:1 error Insert `··` prettier/prettier
Error: 581:23 error Insert `··` prettier/prettier
Error: 582:23 error Insert `··` prettier/prettier
Error: 583:1 error Replace `························` with `··························` prettier/prettier
Error: 584:27 error Insert `··` prettier/prettier
Error: 585:1 error Insert `··` prettier/prettier
Error: 586:25 error Insert `··` prettier/prettier
Error: 587:27 error Insert `··` prettier/prettier
Error: 588:1 error Replace `························` with `··························` prettier/prettier
Error: 589:1 error Insert `··` prettier/prettier
Error: 590:1 error Insert `··` prettier/prettier
Error: 591:19 error Insert `··` prettier/prettier
Error: 593:1 error Insert `··` prettier/prettier
Error: 594:1 error Replace `··················` with `····················` prettier/prettier
Error: 595:21 error Insert `··` prettier/prettier
Error: 596:1 error Insert `··` prettier/prettier
Error: 597:23 error Insert `··` prettier/prettier
Error: 598:1 error Insert `··` prettier/prettier
Error: 599:1 error Replace `························` with `··························` prettier/prettier
Error: 600:25 error Insert `··` prettier/prettier
Error: 601:1 error Insert `··` prettier/prettier
Error: 602:25 error Insert `··` prettier/prettier
Error: 603:1 error Insert `··` prettier/prettier
Error: 604:27 error Insert `··` prettier/prettier
Error: 605:27 error Insert `··` prettier/prettier
Error: 606:1 error Insert `··` prettier/prettier
Error: 607:25 error Insert `··` prettier/prettier
Error: 608:1 error Insert `··` prettier/prettier
Error: 609:25 error Insert `··` prettier/prettier
Error: 610:1 error Insert `··` prettier/prettier
Error: 612:1 error Insert `··` prettier/prettier
Error: 613:23 error Insert `··` prettier/prettier
Error: 614:1 error Insert `··` prettier/prettier
Error: 615:1 error Replace `························` with `··························` prettier/prettier
Error: 616:25 error Insert `··` prettier/prettier
Error: 617:1 error Insert `··` prettier/prettier
Error: 618:25 error Insert `··` prettier/prettier
Error: 619:27 error Insert `··` prettier/prettier
Error: 620:1 error Insert `··` prettier/prettier
Error: 621:29 error Insert `··` prettier/prettier
Error: 622:1 error Insert `··` prettier/prettier
Error: 623:1 error Replace `····························` with `······························` prettier/prettier
Error: 624:1 error Insert `··` prettier/prettier
Error: 625:1 error Insert `··` prettier/prettier
Error: 626:27 error Insert `··` prettier/prettier
Error: 627:1 error Insert `··` prettier/prettier
Error: 628:1 error Replace `····························` with `······························` prettier/prettier
Error: 629:29 error Insert `··` prettier/prettier
Error: 630:1 error Insert `··` prettier/prettier
Error: 631:27 error Insert `··` prettier/prettier
Error: 632:1 error Insert `··` prettier/prettier
Error: 633:1 error Replace `····························` with `······························` prettier/prettier
Error: 634:29 error Insert `··` prettier/prettier
Error: 635:1 error Insert `··` prettier/prettier
Error: 636:29 error Insert `··` prettier/prettier
Error: 637:27 error Insert `··` prettier/prettier
Error: 638:1 error Replace `····························<Text·style={styles.mainControlIcon}>⏎······························{isPlaying·?·'⏸'·:·'▶️'}⏎····························` with `······························<Text·style={styles.mainControlIcon}>{isPlaying·?·'⏸'·:·'▶️'}` prettier/prettier
Error: 641:27 error Insert `··` prettier/prettier
Error: 642:25 error Insert `··` prettier/prettier
Error: 643:1 error Replace `······················` with `························` prettier/prettier
Error: 645:1 error Insert `··` prettier/prettier
Error: 646:1 error Insert `··` prettier/prettier
Error: 647:25 error Insert `··` prettier/prettier
Error: 648:1 error Insert `··` prettier/prettier
Error: 649:1 error Replace `························` with `··························` prettier/prettier
Error: 650:23 error Insert `··` prettier/prettier
Error: 651:1 error Insert `··` prettier/prettier
Error: 652:27 error Insert `··` prettier/prettier
Error: 653:27 error Insert `··` prettier/prettier
Error: 654:1 error Replace `··························` with `····························` prettier/prettier
Error: 655:1 error Insert `··` prettier/prettier
Error: 656:1 error Insert `··` prettier/prettier
Error: 657:27 error Insert `··` prettier/prettier
Error: 658:25 error Insert `··` prettier/prettier
Error: 659:1 error Replace `······················` with `························` prettier/prettier
Error: 660:21 error Insert `··` prettier/prettier
Error: 661:1 error Insert `··` prettier/prettier
Error: 662:17 error Insert `··` prettier/prettier
Error: 663:1 error Insert `··` prettier/prettier
Error: 664:1 error Replace `············` with `··············` prettier/prettier
Error: 666:1 error Insert `··` prettier/prettier
Error: 667:1 error Insert `··` prettier/prettier
Error: 668:15 error Insert `··` prettier/prettier
Error: 669:17 error Replace `title={isGenerating·?·t('textToSpeech.generating')·:·t('textToSpeech.generateSpeech')` with `··title={⏎····················isGenerating·?·t('textToSpeech.generating')·:·t('textToSpeech.generateSpeech')⏎··················` prettier/prettier
Error: 670:1 error Insert `··` prettier/prettier
Error: 671:17 error Insert `··` prettier/prettier
Error: 672:1 error Insert `··` prettier/prettier
Error: 673:17 error Insert `··` prettier/prettier
Error: 674:1 error Insert `··` prettier/prettier
Error: 675:15 error Insert `··` prettier/prettier
Error: 676:1 error Replace `··············⏎` with `⏎··` prettier/prettier
Error: 678:17 error Insert `··` prettier/prettier
Error: 679:17 error Insert `··` prettier/prettier
Error: 680:1 error Replace `················` with `··················` prettier/prettier
Error: 681:17 error Insert `··` prettier/prettier
Error: 682:1 error Insert `··` prettier/prettier
Error: 683:17 error Insert `··` prettier/prettier
Error: 684:15 error Insert `··` prettier/prettier
Error: 685:1 error Replace `············` with `··············` prettier/prettier
Error: 686:1 error Insert `··` prettier/prettier
Error: 687:1 error Insert `··` prettier/prettier
Error: 975:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/SettingsScreen.tsx
Error: 41:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 56:13 error Replace `prev` with `(prev)` prettier/prettier
Error: 68:1 error Delete `····` prettier/prettier
Error: 72:1 error Delete `······` prettier/prettier
Error: 80:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 93:1 error Delete `····` prettier/prettier
Error: 98:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 120:1 error Delete `······` prettier/prettier
Error: 123:1 error Delete `········` prettier/prettier
Error: 169:22 error Replace `·horizontal·showsHorizontalScrollIndicator={false}·style={styles.voiceSelector}` with `⏎············horizontal⏎············showsHorizontalScrollIndicator={false}⏎············style={styles.voiceSelector}⏎··········` prettier/prettier
Error: 297:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/SpeechToTextScreen.tsx
Error: 58:13 error Replace `prev` with `(prev)` prettier/prettier
Error: 74:1 error Delete `······` prettier/prettier
Error: 88:51 error Insert `,` prettier/prettier
Error: 90:1 error Delete `······` prettier/prettier
Error: 94:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 107:1 error Delete `······` prettier/prettier
Error: 110:1 error Delete `······` prettier/prettier
Error: 115:1 error Delete `········` prettier/prettier
Error: 121:1 error Delete `········` prettier/prettier
Error: 125:1 error Delete `······` prettier/prettier
Error: 127:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 140:1 error Delete `····` prettier/prettier
Error: 161:1 error Delete `········` prettier/prettier
Error: 195:1 error Delete `············` prettier/prettier
Error: 279:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/screens/TextToSpeechScreen.tsx
Error: 50:13 error Replace `prev` with `(prev)` prettier/prettier
Error: 68:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 94:26 error Insert `,` prettier/prettier
Error: 106:30 error Insert `,` prettier/prettier
Error: 112:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 129:1 error Delete `······` prettier/prettier
Error: 139:1 error Delete `··········` prettier/prettier
Error: 149:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 163:16 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 189:1 error Delete `········` prettier/prettier
Error: 197:1 error Delete `··········` prettier/prettier
Error: 227:53 error Replace `⏎··················{isPlaying·?·'Pause'·:·'Play'}⏎················` with `{isPlaying·?·'Pause'·:·'Play'}` prettier/prettier
Error: 231:1 error Delete `··············` prettier/prettier
Error: 356:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/services/**tests**/storage.test.ts
Error: 17:1 error Delete `······` prettier/prettier
Error: 26:1 error Delete `······` prettier/prettier
Error: 35:1 error Delete `······` prettier/prettier
Error: 48:1 error Delete `······` prettier/prettier
Error: 57:1 error Delete `······` prettier/prettier
Error: 69:1 error Delete `······` prettier/prettier
Error: 78:1 error Delete `······` prettier/prettier
Error: 89:1 error Delete `······` prettier/prettier
Error: 100:1 error Delete `······` prettier/prettier
Error: 109:1 error Delete `······` prettier/prettier
Error: 120:1 error Delete `······` prettier/prettier
Error: 131:1 error Delete `······` prettier/prettier
Error: 140:1 error Delete `······` prettier/prettier
Error: 151:1 error Delete `······` prettier/prettier
Error: 155:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/services/openai.ts
Error: 25:11 error Replace `'Authorization'` with `Authorization` prettier/prettier
Error: 40:11 error Replace `'Authorization'` with `Authorization` prettier/prettier
Error: 53:26 error Replace `model·=>·⏎······model.id.includes('whisper')·||·⏎······model.id·===·'whisper-1'⏎····` with `(model)·=>·model.id.includes('whisper')·||·model.id·===·'whisper-1'` prettier/prettier
Error: 61:26 error Replace `model·=>·⏎······model.id.includes('tts')·||·⏎······model.id·===·'tts-1'·||·⏎······model.id·===·'tts-1-hd'` with `⏎······(model)·=>·model.id.includes('tts')·||·model.id·===·'tts-1'·||·model.id·===·'tts-1-hd',` prettier/prettier
Error: 77:23 error Insert `,` prettier/prettier
Error: 81:13 error 'audioBase64' is assigned a value but never used @typescript-eslint/no-unused-vars
Warning: 90:12 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 93:41 error Replace `⏎········`${this.baseURL}/audio/transcriptions`,⏎········formData,⏎·······` with ``${this.baseURL}/audio/transcriptions`,·formData,` prettier/prettier
Error: 97:9 error Delete `··` prettier/prettier
Error: 98:11 error Replace `··'Authorization'` with `Authorization` prettier/prettier
Error: 99:1 error Delete `··` prettier/prettier
Error: 100:1 error Delete `··` prettier/prettier
Error: 101:7 error Replace `··}⏎······` with `}` prettier/prettier
Error: 115:22 error Replace `text:·string,·model:·string·=·'tts-1',·voice:·string·=·'alloy'` with `⏎····text:·string,⏎····model:·string·=·'tts-1',⏎····voice:·string·=·'alloy',⏎··` prettier/prettier
Error: 119:36 error Replace `⏎··········ErrorType.VALIDATION,⏎··········'Text·cannot·be·empty',⏎··········'EMPTY_TEXT'⏎········` with `ErrorType.VALIDATION,·'Text·cannot·be·empty',·'EMPTY_TEXT'` prettier/prettier
Error: 131:34 error Insert `,` prettier/prettier
Error: 134:1 error Delete `······` prettier/prettier
Error: 145:13 error Replace `'Authorization'` with `Authorization` prettier/prettier
Error: 149:10 error Insert `,` prettier/prettier
Error: 154:1 error Delete `······` prettier/prettier
Error: 157:1 error Delete `······` prettier/prettier
Error: 158:43 error Replace `⏎········audioUri,⏎········base64Audio,⏎·······` with `audioUri,·base64Audio,` prettier/prettier
Error: 162:9 error Delete `··` prettier/prettier
Error: 163:7 error Replace `··}⏎······` with `}` prettier/prettier
Error: 172:28 error Insert `,` prettier/prettier
Error: 186:2 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/BaseProvider.ts
Error: 8:1 error Delete `··` prettier/prettier
Error: 10:1 error Delete `··` prettier/prettier
Warning: 11:32 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 24:1 error Delete `··` prettier/prettier
Error: 26:1 error Delete `··` prettier/prettier
Warning: 27:32 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 33:2 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/ProviderRegistry.ts
Error: 12:1 error Delete `··` prettier/prettier
Error: 16:1 error Delete `····` prettier/prettier
Error: 55:42 error Replace `p` with `(p)` prettier/prettier
Error: 66:42 error Replace `p` with `(p)` prettier/prettier
Error: 75:2 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/elevenlabs/ElevenLabsTTSProvider.ts
Error: 32:6 error Replace `·id:·'21m00Tcm4TlvDq8ikWAM',·name:·'Rachel',·gender:·'female',·description:·'American,·young·adult'` with `⏎······id:·'21m00Tcm4TlvDq8ikWAM',⏎······name:·'Rachel',⏎······gender:·'female',⏎······description:·'American,·young·adult',⏎···` prettier/prettier
Error: 33:6 error Replace `·id:·'AZnzlk1XvdvUeBnXmlld',·name:·'Domi',·gender:·'female',·description:·'American,·young·adult'` with `⏎······id:·'AZnzlk1XvdvUeBnXmlld',⏎······name:·'Domi',⏎······gender:·'female',⏎······description:·'American,·young·adult',⏎···` prettier/prettier
Error: 34:6 error Replace `·id:·'EXAVITQu4vr4xnSDxMaL',·name:·'Bella',·gender:·'female',·description:·'American,·young·adult'` with `⏎······id:·'EXAVITQu4vr4xnSDxMaL',⏎······name:·'Bella',⏎······gender:·'female',⏎······description:·'American,·young·adult',⏎···` prettier/prettier
Error: 35:6 error Replace `·id:·'ErXwobaYiN019PkySvjV',·name:·'Antoni',·gender:·'male',·description:·'American,·young·adult'` with `⏎······id:·'ErXwobaYiN019PkySvjV',⏎······name:·'Antoni',⏎······gender:·'male',⏎······description:·'American,·young·adult',⏎···` prettier/prettier
Error: 36:6 error Replace `·id:·'VR6AewLTigWG4xSOukaG',·name:·'Arnold',·gender:·'male',·description:·'American,·middle-aged'` with `⏎······id:·'VR6AewLTigWG4xSOukaG',⏎······name:·'Arnold',⏎······gender:·'male',⏎······description:·'American,·middle-aged',⏎···` prettier/prettier
Error: 37:6 error Replace `·id:·'pNInz6obpgDQGcFmaJgB',·name:·'Adam',·gender:·'male',·description:·'American,·middle-aged'` with `⏎······id:·'pNInz6obpgDQGcFmaJgB',⏎······name:·'Adam',⏎······gender:·'male',⏎······description:·'American,·middle-aged',⏎···` prettier/prettier
Error: 49:1 error Delete `······` prettier/prettier
Error: 66:13 error Replace `'Accept'` with `Accept` prettier/prettier
Error: 69:10 error Insert `,` prettier/prettier
Error: 74:1 error Delete `······` prettier/prettier
Error: 75:43 error Replace `⏎········audioUri,⏎········base64Audio,⏎·······` with `audioUri,·base64Audio,` prettier/prettier
Error: 79:1 error Delete `··` prettier/prettier
Error: 80:7 error Replace `··}⏎······` with `}` prettier/prettier
Warning: 84:21 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 90:32 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 92:1 error Delete `····` prettier/prettier
Error: 100:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 104:2 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/google/GoogleSTTProvider.ts
Error: 17:19 error Replace `'en-US',·'de-DE',·'es-ES',·'fr-FR',·'it-IT',·'pt-BR',·'ru-RU',·'ja-JP',·'ko-KR',·'zh-CN'` with `⏎········'en-US',⏎········'de-DE',⏎········'es-ES',⏎········'fr-FR',⏎········'it-IT',⏎········'pt-BR',⏎········'ru-RU',⏎········'ja-JP',⏎········'ko-KR',⏎········'zh-CN',⏎······` prettier/prettier
Error: 23:19 error Replace `'en-US',·'de-DE',·'es-ES',·'fr-FR',·'it-IT',·'pt-BR',·'ru-RU',·'ja-JP',·'ko-KR',·'zh-CN'` with `⏎········'en-US',⏎········'de-DE',⏎········'es-ES',⏎········'fr-FR',⏎········'it-IT',⏎········'pt-BR',⏎········'ru-RU',⏎········'ja-JP',⏎········'ko-KR',⏎········'zh-CN',⏎······` prettier/prettier
Error: 29:19 error Replace `'en-US',·'de-DE',·'es-ES',·'fr-FR',·'it-IT',·'pt-BR',·'ru-RU',·'ja-JP',·'ko-KR',·'zh-CN'` with `⏎········'en-US',⏎········'de-DE',⏎········'es-ES',⏎········'fr-FR',⏎········'it-IT',⏎········'pt-BR',⏎········'ru-RU',⏎········'ja-JP',⏎········'ko-KR',⏎········'zh-CN',⏎······` prettier/prettier
Error: 34:13 error Replace `·'en-GB',·'en-AU',` with `⏎····'en-GB',⏎····'en-AU',⏎···` prettier/prettier
Error: 35:13 error Replace `·'de-AT',` with `⏎····'de-AT',⏎···` prettier/prettier
Error: 36:13 error Replace `·'es-MX',` with `⏎····'es-MX',⏎···` prettier/prettier
Error: 37:13 error Insert `⏎···` prettier/prettier
Error: 38:13 error Replace `·'pt-BR',` with `⏎····'pt-BR',⏎···` prettier/prettier
Error: 39:13 error Replace `·'ja-JP',` with `⏎····'ja-JP',⏎···` prettier/prettier
Error: 40:13 error Replace `·'zh-TW',` with `⏎····'zh-TW',⏎···` prettier/prettier
Error: 41:13 error Replace `·'pl-PL',` with `⏎····'pl-PL',⏎···` prettier/prettier
Error: 42:13 error Replace `·'no-NO',` with `⏎····'no-NO',⏎···` prettier/prettier
Error: 43:13 error Replace `·'cs-CZ',` with `⏎····'cs-CZ',⏎···` prettier/prettier
Error: 44:13 error Replace `·'hi-IN',` with `⏎····'hi-IN',⏎···` prettier/prettier
Error: 79:10 error Insert `,` prettier/prettier
Warning: 84:25 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 89:21 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 95:32 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 97:1 error Delete `····` prettier/prettier
Error: 102:2 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/google/GoogleTTSProvider.ts
Error: 3:10 error 'Buffer' is defined but never used @typescript-eslint/no-unused-vars
Error: 33:6 error Replace `·id:·'en-US-Neural2-A',·name:·'US·Female·A',·gender:·'female',·language:·'en-US',·description:·'American·accent'` with `⏎······id:·'en-US-Neural2-A',⏎······name:·'US·Female·A',⏎······gender:·'female',⏎······language:·'en-US',⏎······description:·'American·accent',⏎···` prettier/prettier
Error: 34:6 error Replace `·id:·'en-US-Neural2-C',·name:·'US·Male·C',·gender:·'male',·language:·'en-US',·description:·'American·accent'` with `⏎······id:·'en-US-Neural2-C',⏎······name:·'US·Male·C',⏎······gender:·'male',⏎······language:·'en-US',⏎······description:·'American·accent',⏎···` prettier/prettier
Error: 35:6 error Replace `·id:·'en-US-Neural2-D',·name:·'US·Male·D',·gender:·'male',·language:·'en-US',·description:·'American·accent'` with `⏎······id:·'en-US-Neural2-D',⏎······name:·'US·Male·D',⏎······gender:·'male',⏎······language:·'en-US',⏎······description:·'American·accent',⏎···` prettier/prettier
Error: 36:6 error Replace `·id:·'en-US-Neural2-E',·name:·'US·Female·E',·gender:·'female',·language:·'en-US',·description:·'American·accent'` with `⏎······id:·'en-US-Neural2-E',⏎······name:·'US·Female·E',⏎······gender:·'female',⏎······language:·'en-US',⏎······description:·'American·accent',⏎···` prettier/prettier
Error: 37:6 error Replace `·id:·'en-US-Neural2-F',·name:·'US·Female·F',·gender:·'female',·language:·'en-US',·description:·'American·accent'` with `⏎······id:·'en-US-Neural2-F',⏎······name:·'US·Female·F',⏎······gender:·'female',⏎······language:·'en-US',⏎······description:·'American·accent',⏎···` prettier/prettier
Error: 38:6 error Replace `·id:·'en-GB-Neural2-A',·name:·'UK·Female·A',·gender:·'female',·language:·'en-GB',·description:·'British·accent'` with `⏎······id:·'en-GB-Neural2-A',⏎······name:·'UK·Female·A',⏎······gender:·'female',⏎······language:·'en-GB',⏎······description:·'British·accent',⏎···` prettier/prettier
Error: 39:6 error Replace `·id:·'en-GB-Neural2-B',·name:·'UK·Male·B',·gender:·'male',·language:·'en-GB',·description:·'British·accent'·}` with `⏎······id:·'en-GB-Neural2-B',⏎······name:·'UK·Male·B',⏎······gender:·'male',⏎······language:·'en-GB',⏎······description:·'British·accent'` prettier/prettier
Error: 40:5 error Insert `},⏎` prettier/prettier
Error: 42:6 error Replace `·id:·'de-DE-Neural2-A',·name:·'German·Female·A',·gender:·'female',·language:·'de-DE',·description:·'Standard·German'` with `⏎······id:·'de-DE-Neural2-A',⏎······name:·'German·Female·A',⏎······gender:·'female',⏎······language:·'de-DE',⏎······description:·'Standard·German',⏎···` prettier/prettier
Error: 43:6 error Replace `·id:·'de-DE-Neural2-B',·name:·'German·Male·B',·gender:·'male',·language:·'de-DE',·description:·'Standard·German'` with `⏎······id:·'de-DE-Neural2-B',⏎······name:·'German·Male·B',⏎······gender:·'male',⏎······language:·'de-DE',⏎······description:·'Standard·German',⏎···` prettier/prettier
Error: 44:6 error Replace `·id:·'de-DE-Neural2-C',·name:·'German·Female·C',·gender:·'female',·language:·'de-DE',·description:·'Standard·German'` with `⏎······id:·'de-DE-Neural2-C',⏎······name:·'German·Female·C',⏎······gender:·'female',⏎······language:·'de-DE',⏎······description:·'Standard·German',⏎···` prettier/prettier
Error: 45:6 error Replace `·id:·'de-DE-Neural2-D',·name:·'German·Male·D',·gender:·'male',·language:·'de-DE',·description:·'Standard·German'·}` with `⏎······id:·'de-DE-Neural2-D',⏎······name:·'German·Male·D',⏎······gender:·'male',⏎······language:·'de-DE',⏎······description:·'Standard·German'` prettier/prettier
Error: 46:5 error Insert `},⏎` prettier/prettier
Error: 48:6 error Replace `·id:·'es-ES-Neural2-A',·name:·'Spanish·Female·A',·gender:·'female',·language:·'es-ES',·description:·'Spain·Spanish'` with `⏎······id:·'es-ES-Neural2-A',⏎······name:·'Spanish·Female·A',⏎······gender:·'female',⏎······language:·'es-ES',⏎······description:·'Spain·Spanish',⏎···` prettier/prettier
Error: 49:6 error Replace `·id:·'es-ES-Neural2-B',·name:·'Spanish·Male·B',·gender:·'male',·language:·'es-ES',·description:·'Spain·Spanish'` with `⏎······id:·'es-ES-Neural2-B',⏎······name:·'Spanish·Male·B',⏎······gender:·'male',⏎······language:·'es-ES',⏎······description:·'Spain·Spanish',⏎···` prettier/prettier
Error: 50:6 error Replace `·id:·'es-US-Neural2-A',·name:·'US·Spanish·Female',·gender:·'female',·language:·'es-US',·description:·'US·Spanish'` with `⏎······id:·'es-US-Neural2-A',⏎······name:·'US·Spanish·Female',⏎······gender:·'female',⏎······language:·'es-US',⏎······description:·'US·Spanish',⏎···` prettier/prettier
Error: 51:6 error Replace `·id:·'es-US-Neural2-B',·name:·'US·Spanish·Male',·gender:·'male',·language:·'es-US',·description:·'US·Spanish'` with `⏎······id:·'es-US-Neural2-B',⏎······name:·'US·Spanish·Male',⏎······gender:·'male',⏎······language:·'es-US',⏎······description:·'US·Spanish',⏎···` prettier/prettier
Error: 64:1 error Delete `······` prettier/prettier
Error: 67:1 error Delete `······` prettier/prettier
Error: 72:37 error Replace `/Neural2|Wavenet|Standard/i,·` with `⏎··········/Neural2|Wavenet|Standard/i,` prettier/prettier
Error: 73:65 error Insert `,⏎········` prettier/prettier
Error: 98:10 error Insert `,` prettier/prettier
Error: 103:1 error Delete `······` prettier/prettier
Error: 104:43 error Replace `⏎········audioUri,⏎········audioContent,⏎·······` with `audioUri,·audioContent,` prettier/prettier
Error: 108:1 error Delete `··` prettier/prettier
Error: 109:7 error Replace `··}⏎······` with `}` prettier/prettier
Warning: 113:21 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 120:36 error Replace `v` with `(v)` prettier/prettier
Warning: 126:32 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 128:1 error Delete `····` prettier/prettier
Error: 131:40 error Replace `⏎········`${this.baseURL}/voices?key=${config.apiKey}`,⏎·······` with ``${this.baseURL}/voices?key=${config.apiKey}`,`                                                                                                                                                               prettier/prettier
Error:   134:1   error    Delete`··`                                                                                                                                                                                                                                                                                   prettier/prettier
Error:   135:1   error    Delete`··`                                                                                                                                                                                                                                                                                   prettier/prettier
Error:   136:1   error    Delete`··`                                                                                                                                                                                                                                                                                   prettier/prettier
Error:   137:7   error    Replace`··}⏎······`with`}`                                                                                                                                                                                                                                                                 prettier/prettier
Error:   140:14  error    'error' is defined but never used                                                                                                                                                                                                                                                              @typescript-eslint/no-unused-vars
Error:   144:2   error    Insert`⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/openai/OpenAISTTProvider.ts
Error: 2:13 error 'FileSystem' is defined but never used @typescript-eslint/no-unused-vars
Error: 11:1 error Delete `··` prettier/prettier
Error: 22:10 error Replace `·'de',·'es',·'fr',·'it',·'pt',·'ru',·'zh',·'ja',` with `⏎····'de',⏎····'es',⏎····'fr',⏎····'it',⏎····'pt',⏎····'ru',⏎····'zh',⏎····'ja',⏎···` prettier/prettier
Error: 23:10 error Replace `·'tr',·'pl',·'sv',·'no',·'fi',·'da',·'cs',·'ar',` with `⏎····'tr',⏎····'pl',⏎····'sv',⏎····'no',⏎····'fi',⏎····'da',⏎····'cs',⏎····'ar',⏎···` prettier/prettier
Warning: 39:12 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 41:1 error Delete `······` prettier/prettier
Error: 46:41 error Replace `⏎········`${this.baseURL}/audio/transcriptions`,⏎········formData,⏎·······` with ``${this.baseURL}/audio/transcriptions`,·formData,` prettier/prettier
Error: 50:1 error Delete `··` prettier/prettier
Error: 51:11 error Replace `··'Authorization'` with `Authorization` prettier/prettier
Error: 52:11 error Delete `··` prettier/prettier
Error: 53:1 error Delete `··` prettier/prettier
Error: 54:7 error Replace `··}⏎······` with `}` prettier/prettier
Warning: 58:21 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 64:32 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 66:1 error Delete `····` prettier/prettier
Error: 70:11 error Replace `'Authorization'` with `Authorization` prettier/prettier
Error: 74:14 error 'error' is defined but never used @typescript-eslint/no-unused-vars
Error: 78:2 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/openai/OpenAITTSProvider.ts
Error: 54:13 error Replace `'Authorization'` with `Authorization` prettier/prettier
Error: 58:10 error Insert `,` prettier/prettier
Error: 63:1 error Delete `······` prettier/prettier
Error: 64:43 error Replace `⏎········audioUri,⏎········base64Audio,⏎·······` with `audioUri,·base64Audio,` prettier/prettier
Error: 68:1 error Delete `··` prettier/prettier
Error: 69:7 error Replace `··}⏎······` with `}` prettier/prettier
Warning: 73:21 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 78:2 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/services/providers/types.ts
Warning: 10:27 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 22:27 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 51:18 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 61:18 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 70:39 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 71:2 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/services/sentry.ts
Warning: 11:5 warning Unexpected console statement. Only these console methods are allowed: warn, error no-console
Warning: 31:28 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 32:58 error Insert `,` prettier/prettier
Warning: 55:28 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 55:32 error Insert `,` prettier/prettier
Warning: 58:5 warning Unexpected console statement. Only these console methods are allowed: warn, error no-console
Error: 74:32 error Insert `⏎··` prettier/prettier
Error: 75:1 error Insert `··` prettier/prettier
Error: 76:1 error Replace `··` with `····` prettier/prettier
Error: 77:1 error Insert `··` prettier/prettier
Error: 78:1 error Replace `}·|·null` with `··}·|·null,⏎` prettier/prettier
Warning: 93:25 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 108:27 error 'name' is defined but never used. Allowed unused args must match /^_/u @typescript-eslint/no-unused-vars
Error: 108:41 error 'op' is defined but never used. Allowed unused args must match /^_/u @typescript-eslint/no-unused-vars
Warning: 121:47 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 121:65 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 123:19 error Insert `,` prettier/prettier
Error: 129:24 error Replace `⏎········error·as·Error,⏎········{·function:·fn.name,·context,·args·},⏎········'error'⏎······` with `error·as·Error,·{·function:·fn.name,·context,·args·},·'error'` prettier/prettier
Error: 137:3 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/services/storage.ts
Error: 87:3 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/styles/theme.ts
Error: 12:1 error Delete `······` prettier/prettier
Error: 16:1 error Delete `······` prettier/prettier
Error: 20:1 error Delete `······` prettier/prettier
Error: 33:1 error Delete `······` prettier/prettier
Error: 37:1 error Delete `······` prettier/prettier
Error: 41:1 error Delete `······` prettier/prettier
Error: 44:6 error Insert `,` prettier/prettier
Error: 46:1 error Delete `··` prettier/prettier
Error: 55:1 error Delete `··` prettier/prettier
Error: 63:1 error Delete `··` prettier/prettier
Error: 91:1 error Delete `··` prettier/prettier
Error: 97:1 error Delete `··` prettier/prettier
Error: 118:8 error Insert `,` prettier/prettier
Error: 119:6 error Insert `,` prettier/prettier
Error: 120:4 error Insert `,` prettier/prettier
Error: 121:3 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/types/index.ts
Error: 19:3 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/types/settings.ts
Error: 7:1 error Delete `··` prettier/prettier
Error: 11:1 error Delete `··` prettier/prettier
Error: 22:1 error Delete `··` prettier/prettier
Warning: 29:43 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 32:2 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/utils/**tests**/responsive.test.ts
Error: 70:4 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/utils/accessibility.ts
Error: 85:33 error Replace `⏎··label:·string,⏎··hint?:·string,⏎··role?:·string,⏎··state?:·object⏎` with `label:·string,·hint?:·string,·role?:·string,·state?:·object` prettier/prettier
Warning: 91:16 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 119:28 error Replace `⏎··label:·string,⏎··hint?:·string,⏎··disabled·=·false,⏎··loading·=·false⏎` with `label:·string,·hint?:·string,·disabled·=·false,·loading·=·false` prettier/prettier
Warning: 125:16 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 134:10 error Insert `,` prettier/prettier
Error: 141:27 error Replace `⏎··label:·string,⏎··value:·string,⏎··required·=·false,⏎··error?:·string⏎` with `label:·string,·value:·string,·required·=·false,·error?:·string` prettier/prettier
Error: 155:26 error Replace `⏎····fullLabel,⏎····undefined,⏎····'text',⏎···` with `fullLabel,·undefined,·'text',` prettier/prettier
Error: 160:1 error Delete `··` prettier/prettier
Error: 161:3 error Replace `··}⏎··` with `}` prettier/prettier
Error: 216:16 error Insert `,` prettier/prettier
Error: 228:17 error Insert `,` prettier/prettier
Error: 246:30 error Replace `⏎··label:·string,⏎··position:·number,⏎··total:·number,⏎··selected·=·false⏎` with `label:·string,·position:·number,·total:·number,·selected·=·false` prettier/prettier
Error: 256:17 error Insert `,` prettier/prettier
Error: 258:3 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/utils/design-system.ts
Error: 11:1 error Delete `······` prettier/prettier
Error: 15:1 error Delete `······` prettier/prettier
Error: 21:1 error Delete `······` prettier/prettier
Error: 26:1 error Delete `······` prettier/prettier
Error: 32:1 error Delete `······` prettier/prettier
Error: 36:1 error Delete `······` prettier/prettier
Error: 45:1 error Delete `······` prettier/prettier
Error: 48:1 error Delete `······` prettier/prettier
Error: 53:1 error Delete `······` prettier/prettier
Error: 57:1 error Delete `······` prettier/prettier
Error: 62:1 error Delete `······` prettier/prettier
Error: 65:1 error Delete `······` prettier/prettier
Error: 70:1 error Delete `··` prettier/prettier
Error: 92:1 error Delete `····` prettier/prettier
Error: 112:1 error Delete `····` prettier/prettier
Error: 132:1 error Delete `····` prettier/prettier
Error: 152:1 error Delete `····` prettier/prettier
Error: 173:1 error Delete `··` prettier/prettier
Error: 186:1 error Delete `··` prettier/prettier
Error: 198:1 error Delete `··` prettier/prettier
Error: 237:1 error Delete `··` prettier/prettier
Error: 245:1 error Delete `····` prettier/prettier
Error: 254:1 error Delete `··` prettier/prettier
Error: 265:3 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/utils/errorHandler.ts
Warning: 18:13 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 28:20 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 31:74 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 54:39 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 65:13 error Insert `,` prettier/prettier
Error: 72:13 error Insert `,` prettier/prettier
Error: 79:13 error Insert `,` prettier/prettier
Error: 86:13 error Insert `,` prettier/prettier
Error: 94:11 error Insert `,` prettier/prettier
Error: 102:20 error Insert `,` prettier/prettier
Error: 110:12 error Insert `,` prettier/prettier
Warning: 118:43 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 123:10 error Insert `,` prettier/prettier
Error: 135:19 error Insert `,` prettier/prettier
Warning: 142:36 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 155:10 error Insert `,` prettier/prettier
Warning: 189:49 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Warning: 201:48 warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
Error: 206:2 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/utils/responsive-dimensions.ts
Error: 24:1 error Delete `··` prettier/prettier
Error: 31:1 error Delete `··` prettier/prettier
Error: 37:1 error Delete `··` prettier/prettier
Error: 43:1 error Delete `··` prettier/prettier
Error: 49:1 error Delete `··` prettier/prettier
Error: 58:1 error Delete `··` prettier/prettier
Error: 69:1 error Delete `··` prettier/prettier
Error: 74:3 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/utils/responsive.ts
Error: 74:72 error Replace `(screenHeight·<·700·?·44·:·56)` with `screenHeight·<·700·?·44·:·56` prettier/prettier
Error: 83:3 error Insert `⏎` prettier/prettier

/home/runner/work/VoiceFlow/VoiceFlow/src/utils/screen-themes.ts
Error: 36:3 error Replace `'Settings'` with `Settings` prettier/prettier
Error: 57:3 error Insert `⏎` prettier/prettier

✖ 1606 problems (1532 errors, 74 warnings)
1403 errors and 0 warnings potentially fixable with the `--fix` option.

Error: Process completed with exit code 1.
