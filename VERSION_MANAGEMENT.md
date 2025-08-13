# Version Management

## Overview

VoiceFlow uses centralized version management to keep all version numbers synchronized across the project.

## Central Version File

All version information is stored in `version.json`:

```json
{
  "version": "2.1.0",
  "buildNumber": 43,
  "description": "Voice input for Magic Quill, React 19 compatibility fixes"
}
```

## Updating Version

### Automatic Update (Recommended)

1. Edit `version.json` with the new version and build number
2. Run the update script:

   ```bash
   npm run version:update
   ```

   Or to also update iOS dependencies:

   ```bash
   npm run version:bump
   ```

### Files Updated

The script automatically updates version numbers in:

- `package.json` - NPM package version
- `app.json` - Expo configuration
- `ios/VoiceFlow/Info.plist` - iOS app version
- `ios/VoiceFlow.xcodeproj/project.pbxproj` - iOS project settings
- `android/app/build.gradle` - Android app version
- `src/screens/Modern2025SettingsScreen.tsx` - Display version in app

## Version Numbering

### Semantic Versioning

We follow semantic versioning (MAJOR.MINOR.PATCH):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Build Numbers

- iOS: Uses the `buildNumber` directly
- Android: Uses the `buildNumber` as `versionCode`
- Should increment with every build submitted to stores

## Release Process

1. Update `version.json`:

   ```json
   {
     "version": "2.2.0",
     "buildNumber": 44,
     "description": "New feature description"
   }
   ```

2. Run version update:

   ```bash
   npm run version:bump
   ```

3. Commit changes:

   ```bash
   git add .
   git commit -m "Bump version to 2.2.0"
   ```

4. Tag the release:

   ```bash
   git tag v2.2.0
   git push origin v2.2.0
   ```

5. Build for production:
   ```bash
   npm run build:ios
   npm run build:android
   ```

## Troubleshooting

### iOS Build Issues

If iOS build fails after version update:

```bash
cd ios
pod install
cd ..
npx react-native clean
```

### Android Build Issues

If Android build fails:

```bash
cd android
./gradlew clean
cd ..
```

## Notes

- Always increment `buildNumber` even for small changes
- Keep `description` updated for changelog purposes
- The version script preserves formatting in all files
