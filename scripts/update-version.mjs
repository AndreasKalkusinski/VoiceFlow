#!/usr/bin/env node

/**
 * Centralized version management script
 * Updates version in all necessary files from version.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read version config
const versionPath = path.join(__dirname, '..', 'version.json');
const versionConfig = JSON.parse(fs.readFileSync(versionPath, 'utf8'));

const { version, buildNumber } = versionConfig;

console.log(`📦 Updating to version ${version} (build ${buildNumber})`);

// Update package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
packageJson.version = version;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
console.log('✅ Updated package.json');

// Update app.json
const appJsonPath = path.join(__dirname, '..', 'app.json');
const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
appJson.expo.version = version;
appJson.expo.ios.buildNumber = buildNumber.toString();
appJson.expo.android.versionCode = buildNumber;
fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + '\n');
console.log('✅ Updated app.json');

// Update iOS Info.plist
const infoPlistPath = path.join(__dirname, '..', 'ios', 'VoiceFlow', 'Info.plist');
let infoPlist = fs.readFileSync(infoPlistPath, 'utf8');

// Update CFBundleShortVersionString
infoPlist = infoPlist.replace(
  /<key>CFBundleShortVersionString<\/key>\s*<string>[^<]*<\/string>/,
  `<key>CFBundleShortVersionString</key>\n\t<string>${version}</string>`
);

// Update CFBundleVersion
infoPlist = infoPlist.replace(
  /<key>CFBundleVersion<\/key>\s*<string>[^<]*<\/string>/,
  `<key>CFBundleVersion</key>\n\t<string>${buildNumber}</string>`
);

fs.writeFileSync(infoPlistPath, infoPlist);
console.log('✅ Updated iOS Info.plist');

// Update iOS project.pbxproj
const pbxprojPath = path.join(__dirname, '..', 'ios', 'VoiceFlow.xcodeproj', 'project.pbxproj');
let pbxproj = fs.readFileSync(pbxprojPath, 'utf8');

// Update CURRENT_PROJECT_VERSION
pbxproj = pbxproj.replace(
  /CURRENT_PROJECT_VERSION = \d+;/g,
  `CURRENT_PROJECT_VERSION = ${buildNumber};`
);

// Update MARKETING_VERSION
pbxproj = pbxproj.replace(
  /MARKETING_VERSION = [^;]+;/g,
  `MARKETING_VERSION = ${version};`
);

fs.writeFileSync(pbxprojPath, pbxproj);
console.log('✅ Updated iOS project.pbxproj');

// Update Android build.gradle
const buildGradlePath = path.join(__dirname, '..', 'android', 'app', 'build.gradle');
let buildGradle = fs.readFileSync(buildGradlePath, 'utf8');

// Update versionCode
buildGradle = buildGradle.replace(
  /versionCode\s+\d+/,
  `versionCode ${buildNumber}`
);

// Update versionName
buildGradle = buildGradle.replace(
  /versionName\s+"[^"]+"/,
  `versionName "${version}"`
);

fs.writeFileSync(buildGradlePath, buildGradle);
console.log('✅ Updated Android build.gradle');

// Update Settings screen constant
const settingsScreenPath = path.join(__dirname, '..', 'src', 'screens', 'Modern2025SettingsScreen.tsx');
let settingsScreen = fs.readFileSync(settingsScreenPath, 'utf8');

// Update APP_VERSION constant
settingsScreen = settingsScreen.replace(
  /const APP_VERSION = '[^']+';/,
  `const APP_VERSION = '${version}';`
);

// Update BUILD_NUMBER constant
settingsScreen = settingsScreen.replace(
  /const BUILD_NUMBER = '[^']+';/,
  `const BUILD_NUMBER = '${buildNumber}';`
);

fs.writeFileSync(settingsScreenPath, settingsScreen);
console.log('✅ Updated Settings screen constants');

console.log(`\n🎉 Successfully updated all files to version ${version} (build ${buildNumber})`);
console.log('\n📝 Next steps:');
console.log('1. Run "cd ios && pod install" if iOS dependencies changed');
console.log('2. Commit the changes');
console.log('3. Tag the release: git tag v' + version);