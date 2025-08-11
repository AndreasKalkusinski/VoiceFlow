/**
 * Accessibility utilities and constants for better app accessibility
 */

import { Platform } from 'react-native';

/**
 * Common accessibility labels and hints
 */
export const a11y = {
  // Navigation
  navigation: {
    back: 'Go back',
    menu: 'Open menu',
    settings: 'Open settings',
    close: 'Close',
    cancel: 'Cancel',
    done: 'Done',
    save: 'Save',
  },

  // Actions
  actions: {
    record: 'Start recording',
    stopRecord: 'Stop recording',
    play: 'Play audio',
    pause: 'Pause audio',
    stop: 'Stop audio',
    copy: 'Copy to clipboard',
    paste: 'Paste from clipboard',
    share: 'Share',
    delete: 'Delete',
    refresh: 'Refresh',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
  },

  // States
  states: {
    loading: 'Loading',
    processing: 'Processing',
    recording: 'Recording in progress',
    playing: 'Playing audio',
    paused: 'Paused',
    stopped: 'Stopped',
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Information',
  },

  // Form elements
  form: {
    required: 'Required field',
    optional: 'Optional field',
    invalid: 'Invalid input',
    valid: 'Valid input',
    textInput: 'Text input field',
    dropdown: 'Dropdown menu',
    checkbox: 'Checkbox',
    radioButton: 'Radio button',
    switch: 'Toggle switch',
    slider: 'Slider',
  },

  // Content types
  content: {
    image: 'Image',
    video: 'Video',
    audio: 'Audio',
    document: 'Document',
    link: 'Link',
    button: 'Button',
    text: 'Text',
    heading: 'Heading',
    list: 'List',
    listItem: 'List item',
  },
};

/**
 * Helper function to create accessibility props
 */
export const createA11yProps = (label: string, hint?: string, role?: string, state?: object) => {
  const props: any = {
    accessible: true,
    accessibilityLabel: label,
  };

  if (hint) {
    props.accessibilityHint = hint;
  }

  if (role) {
    props.accessibilityRole = role;
  }

  if (state) {
    props.accessibilityState = state;
  }

  // Platform-specific adjustments
  if (Platform.OS === 'ios') {
    props.accessibilityTraits = role ? [role] : [];
  }

  return props;
};

/**
 * Helper to create button accessibility props
 */
export const buttonA11y = (label: string, hint?: string, disabled = false, loading = false) => {
  const state: any = { disabled };
  if (loading) {
    state.busy = true;
  }

  return createA11yProps(
    loading ? `${label}, ${a11y.states.loading}` : label,
    hint,
    'button',
    state,
  );
};

/**
 * Helper to create text input accessibility props
 */
export const inputA11y = (label: string, value: string, required = false, error?: string) => {
  let fullLabel = label;
  if (required) {
    fullLabel += `, ${a11y.form.required}`;
  }
  if (error) {
    fullLabel += `, ${error}`;
  }

  return createA11yProps(fullLabel, undefined, 'text', {
    invalid: !!error,
  });
};

/**
 * Helper to create image accessibility props
 */
export const imageA11y = (description: string, decorative = false) => {
  if (decorative) {
    return {
      accessible: false,
      accessibilityElementsHidden: true,
      importantForAccessibility: 'no',
    };
  }

  return createA11yProps(description, undefined, 'image');
};

/**
 * Helper to create loading state accessibility props
 */
export const loadingA11y = (message = a11y.states.loading) => {
  return createA11yProps(message, undefined, undefined, { busy: true });
};

/**
 * Helper for screen reader announcements
 */
export const announce = (message: string, important = false) => {
  if (Platform.OS === 'ios') {
    // iOS specific announcement
    const announcement = {
      announcement: message,
      ...(important && { announcementPriority: 'assertive' }),
    };
    return announcement;
  } else {
    // Android specific announcement
    const announcement = {
      liveRegion: important ? 'assertive' : 'polite',
      accessibilityLiveRegion: important ? 'assertive' : 'polite',
    };
    return announcement;
  }
};

/**
 * Helper to create switch/toggle accessibility props
 */
export const switchA11y = (label: string, checked: boolean) => {
  return createA11yProps(
    label,
    `${checked ? 'Enabled' : 'Disabled'}. Double tap to toggle.`,
    'switch',
    { checked },
  );
};

/**
 * Helper for creating tab accessibility props
 */
export const tabA11y = (label: string, selected: boolean, index: number, total: number) => {
  return createA11yProps(
    `${label}, tab ${index + 1} of ${total}`,
    selected ? 'Currently selected' : 'Double tap to select',
    'tab',
    { selected },
  );
};

/**
 * Helper for modal accessibility
 */
export const modalA11y = (title: string, visible: boolean) => {
  return {
    accessibilityViewIsModal: visible,
    accessibilityLabel: title,
    accessible: true,
  };
};

/**
 * Helper for list items
 */
export const listItemA11y = (label: string, position: number, total: number, selected = false) => {
  return createA11yProps(
    `${label}, ${position} of ${total}`,
    selected ? 'Selected' : 'Double tap to select',
    'button',
    { selected },
  );
};
