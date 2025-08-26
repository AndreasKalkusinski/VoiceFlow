#!/bin/bash

echo "======================================="
echo "Share Extension Debug & Test Script"
echo "======================================="
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Step 1: Checking App Group Configuration${NC}"
echo "---------------------------------------"

# Check if App Groups are configured
APP_GROUP="group.de.jeantools.voiceflow"
echo "Expected App Group: $APP_GROUP"

# Check main app entitlements
MAIN_APP_ENTITLEMENTS="/Users/andreaskalkusinski/repo/VoiceFlow/ios/SpeakFlowAI/SpeakFlowAI.entitlements"
if [ -f "$MAIN_APP_ENTITLEMENTS" ]; then
    echo -e "${GREEN}✓ Main app entitlements file exists${NC}"
    if grep -q "$APP_GROUP" "$MAIN_APP_ENTITLEMENTS"; then
        echo -e "${GREEN}✓ App Group configured in main app${NC}"
    else
        echo -e "${RED}✗ App Group NOT configured in main app${NC}"
    fi
else
    echo -e "${RED}✗ Main app entitlements file missing${NC}"
fi

# Check Share Extension entitlements
SHARE_EXT_ENTITLEMENTS="/Users/andreaskalkusinski/repo/VoiceFlow/ios/ShareExtension/ShareExtension.entitlements"
if [ -f "$SHARE_EXT_ENTITLEMENTS" ]; then
    echo -e "${GREEN}✓ Share Extension entitlements file exists${NC}"
    if grep -q "$APP_GROUP" "$SHARE_EXT_ENTITLEMENTS"; then
        echo -e "${GREEN}✓ App Group configured in Share Extension${NC}"
    else
        echo -e "${RED}✗ App Group NOT configured in Share Extension${NC}"
    fi
else
    echo -e "${RED}✗ Share Extension entitlements file missing${NC}"
fi

echo ""
echo -e "${YELLOW}Step 2: Testing App Group Access${NC}"
echo "---------------------------------------"

# Try to create a test file in the App Group container
TEST_FILE="$HOME/Library/Group Containers/$APP_GROUP/test_$(date +%s).txt"
TEST_DIR="$HOME/Library/Group Containers/$APP_GROUP"

if [ -d "$TEST_DIR" ]; then
    echo -e "${GREEN}✓ App Group container exists${NC}"
    echo "Container path: $TEST_DIR"
    
    # Try to write a test file
    echo "Test from script at $(date)" > "$TEST_FILE" 2>/dev/null
    if [ -f "$TEST_FILE" ]; then
        echo -e "${GREEN}✓ Can write to App Group container${NC}"
        rm "$TEST_FILE"
    else
        echo -e "${RED}✗ Cannot write to App Group container${NC}"
    fi
    
    # List existing files
    echo ""
    echo "Existing files in App Group container:"
    ls -la "$TEST_DIR" 2>/dev/null | head -10
else
    echo -e "${RED}✗ App Group container does not exist${NC}"
    echo "Expected at: $TEST_DIR"
fi

echo ""
echo -e "${YELLOW}Step 3: Checking Share Extension Files${NC}"
echo "---------------------------------------"

# Check if ShareViewController exists
SHARE_VC="/Users/andreaskalkusinski/repo/VoiceFlow/ios/ShareExtension/ShareViewController.swift"
if [ -f "$SHARE_VC" ]; then
    echo -e "${GREEN}✓ ShareViewController.swift exists${NC}"
    
    # Check for key methods
    if grep -q "didSelectPost" "$SHARE_VC"; then
        echo -e "${GREEN}✓ didSelectPost method found${NC}"
    else
        echo -e "${RED}✗ didSelectPost method missing${NC}"
    fi
    
    if grep -q "saveSharedContent" "$SHARE_VC"; then
        echo -e "${GREEN}✓ saveSharedContent method found${NC}"
    else
        echo -e "${RED}✗ saveSharedContent method missing${NC}"
    fi
else
    echo -e "${RED}✗ ShareViewController.swift missing${NC}"
fi

echo ""
echo -e "${YELLOW}Step 4: Live Console Monitoring${NC}"
echo "---------------------------------------"
echo "Starting console monitoring for Share Extension..."
echo "Filter: ShareExtension, AppGroup, SpeakFlow"
echo ""
echo -e "${YELLOW}Instructions:${NC}"
echo "1. Open WhatsApp or Telegram"
echo "2. Select a voice message"
echo "3. Tap Share"
echo "4. Select 'SpeakFlow AI'"
echo "5. Tap 'Posten'"
echo "6. Watch the logs below"
echo ""
echo "Press Ctrl+C to stop monitoring"
echo "---------------------------------------"

# Start console log streaming
log stream --predicate '(subsystem CONTAINS "de.jeantools.voiceflow") OR (process CONTAINS "ShareExtension") OR (eventMessage CONTAINS "ShareExtension") OR (eventMessage CONTAINS "AppGroup") OR (eventMessage CONTAINS "SpeakFlow")' --style compact