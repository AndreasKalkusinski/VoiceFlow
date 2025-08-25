#!/bin/bash

echo "Share Extension Test Script"
echo "=========================="
echo ""
echo "1. Starte Console Log Monitoring..."
echo ""

# Get device UDID
DEVICE_ID=$(xcrun simctl list devices booted | grep -E "iPhone|iPad" | head -1 | sed -n 's/.*(\([^)]*\)).*/\1/p')

if [ -z "$DEVICE_ID" ]; then
    echo "Kein Simulator läuft. Starte iPhone 15 Pro..."
    DEVICE_ID=$(xcrun simctl list devices | grep "iPhone 15 Pro" | head -1 | sed -n 's/.*(\([^)]*\)).*/\1/p')
    xcrun simctl boot "$DEVICE_ID" 2>/dev/null || true
fi

echo "Device ID: $DEVICE_ID"
echo ""

# Start streaming logs
echo "Starte Log-Stream für ShareExtension..."
echo "Filtere nach: ShareExtension, AppGroupModule, SpeakFlow"
echo ""
echo "Logs werden in share_extension_logs.txt gespeichert..."
echo ""

# Create log file with timestamp
LOG_FILE="share_extension_logs_$(date +%Y%m%d_%H%M%S).txt"

# Start log streaming in background
xcrun simctl spawn "$DEVICE_ID" log stream --predicate 'subsystem CONTAINS "de.jeantools.voiceflow" OR process CONTAINS "ShareExtension" OR eventMessage CONTAINS "ShareExtension" OR eventMessage CONTAINS "AppGroupModule" OR eventMessage CONTAINS "SpeakFlow"' --style compact > "$LOG_FILE" 2>&1 &
LOG_PID=$!

echo "Log-Stream läuft mit PID: $LOG_PID"
echo ""
echo "Instruktionen zum Testen:"
echo "1. Öffne WhatsApp oder Telegram im Simulator"
echo "2. Wähle eine Sprachnachricht aus"
echo "3. Teile sie über das Share Sheet"
echo "4. Wähle 'SpeakFlow AI'"
echo "5. Tippe auf 'Posten'"
echo ""
echo "Drücke Enter um die Logs zu stoppen und anzuzeigen..."
read

# Stop log streaming
kill $LOG_PID 2>/dev/null

echo ""
echo "Logs wurden gespeichert in: $LOG_FILE"
echo ""
echo "Letzte 100 Zeilen der Logs:"
echo "============================"
tail -100 "$LOG_FILE"

echo ""
echo "Suche nach wichtigen Einträgen..."
echo ""
echo "ShareExtension Einträge:"
grep -i "ShareExtension" "$LOG_FILE" | tail -20

echo ""
echo "App Group Fehler:"
grep -i "app.group\|entitlement" "$LOG_FILE" | tail -20

echo ""
echo "Audio/File Einträge:"
grep -i "audio\|voice\|m4a\|file" "$LOG_FILE" | tail -20