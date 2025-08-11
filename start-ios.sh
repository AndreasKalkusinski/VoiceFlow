#!/bin/bash

echo "🚀 Starting VoiceFlow iOS App..."

# Kill any existing Metro bundler
echo "📦 Stopping existing Metro bundler..."
lsof -ti:8081 | xargs kill -9 2>/dev/null || true

# Start Metro in background
echo "📦 Starting Metro bundler..."
npx expo start --clear &
METRO_PID=$!

# Wait for Metro to be ready
echo "⏳ Waiting for Metro to start..."
while ! curl -s http://localhost:8081/status > /dev/null; do
    sleep 1
done
echo "✅ Metro is running!"

# Build and install the app
echo "🔨 Building iOS app..."
npx expo run:ios --no-bundler

# Open the app with correct localhost URL
echo "📱 Opening app with correct URL..."
xcrun simctl openurl booted "de.jeantools.voiceflow://expo-development-client/?url=http://localhost:8081"

echo "✨ VoiceFlow is running! Metro PID: $METRO_PID"
echo "To stop Metro, run: kill $METRO_PID"