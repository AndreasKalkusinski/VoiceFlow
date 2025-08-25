import { NativeModules, Alert } from 'react-native';

const { AppGroupModule } = NativeModules;

export async function testAppGroupFunctionality() {
  console.log('[TestAppGroup] Starting comprehensive App Group test...');

  try {
    // Test 1: Module availability
    console.log('[TestAppGroup] Test 1: Checking module availability...');
    if (!AppGroupModule) {
      throw new Error('AppGroupModule is not available');
    }
    console.log('[TestAppGroup] ✓ Module is available');

    // Test 2: Test method
    console.log('[TestAppGroup] Test 2: Calling test method...');
    const testResult = await AppGroupModule.test();
    console.log('[TestAppGroup] ✓ Test result:', testResult);

    // Test 3: Check for shared audio
    console.log('[TestAppGroup] Test 3: Checking for shared audio...');
    const sharedAudio = await AppGroupModule.getSharedAudioPath();
    console.log('[TestAppGroup] Shared audio result:', sharedAudio);

    if (sharedAudio) {
      console.log('[TestAppGroup] ✓ Found shared audio:', sharedAudio);
      Alert.alert(
        'Shared Audio Found',
        `Path: ${sharedAudio.path}\nTimestamp: ${new Date(sharedAudio.timestamp * 1000).toLocaleString()}`,
        [{ text: 'OK' }],
      );
    } else {
      console.log('[TestAppGroup] ℹ️ No shared audio found');
    }

    // Test 4: Check for shared text
    console.log('[TestAppGroup] Test 4: Checking for shared text...');
    const sharedText = await AppGroupModule.getSharedText();
    console.log('[TestAppGroup] Shared text result:', sharedText);

    if (sharedText) {
      console.log('[TestAppGroup] ✓ Found shared text:', sharedText);
      Alert.alert(
        'Shared Text Found',
        `Text: ${sharedText.text}\nTimestamp: ${new Date(sharedText.timestamp * 1000).toLocaleString()}`,
        [{ text: 'OK' }],
      );
    } else {
      console.log('[TestAppGroup] ℹ️ No shared text found');
    }

    // Summary
    const summary = {
      moduleAvailable: true,
      testPassed: !!testResult,
      sharedAudioFound: !!sharedAudio,
      sharedTextFound: !!sharedText,
    };

    console.log('[TestAppGroup] Test Summary:', summary);

    Alert.alert(
      'App Group Test Complete',
      `Module: ${summary.moduleAvailable ? '✓' : '✗'}\n` +
        `Test Method: ${summary.testPassed ? '✓' : '✗'}\n` +
        `Shared Audio: ${summary.sharedAudioFound ? '✓' : '✗'}\n` +
        `Shared Text: ${summary.sharedTextFound ? '✓' : '✗'}`,
      [{ text: 'OK' }],
    );

    return summary;
  } catch (error) {
    console.error('[TestAppGroup] Error during test:', error);
    Alert.alert('App Group Test Failed', `Error: ${error.message}`, [{ text: 'OK' }]);
    throw error;
  }
}

// Export a function to run the test on app startup
export function runAppGroupTestOnStartup() {
  // Run test after a short delay to ensure app is fully loaded
  setTimeout(() => {
    console.log('[TestAppGroup] Running startup test...');
    testAppGroupFunctionality().catch((error) => {
      console.error('[TestAppGroup] Startup test failed:', error);
    });
  }, 2000);
}
