/**
 * Network Security Configuration
 * Ensures no unauthorized external resources are loaded
 */

// Allowed domains for API calls
const ALLOWED_API_DOMAINS = [
  // AI Service APIs
  'api.openai.com',
  'api.anthropic.com',
  'api.elevenlabs.io',
  'api.mistral.ai',
  'speech.googleapis.com',
  'texttospeech.googleapis.com',
  'generativelanguage.googleapis.com',

  // Documentation and Support (only for explicit user actions)
  'github.com',

  // Local development
  'localhost',
  '127.0.0.1',
  '192.168.',
  '10.',
];

// Blocked tracking domains (extra safety)
const BLOCKED_DOMAINS = [
  // Analytics
  'google-analytics.com',
  'googletagmanager.com',
  'segment.io',
  'mixpanel.com',
  'amplitude.com',
  'heap.io',

  // Social Media
  'facebook.com',
  'facebook.net',
  'twitter.com',
  'x.com',
  'linkedin.com',

  // Advertising
  'doubleclick.net',
  'adsystem.com',
  'googlesyndication.com',

  // Fonts and CDNs (we use local only)
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'cdnjs.cloudflare.com',
  'unpkg.com',
  'jsdelivr.net',
];

/**
 * Check if a URL is allowed
 */
export function isUrlAllowed(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // Check if explicitly blocked
    if (BLOCKED_DOMAINS.some((blocked) => hostname.includes(blocked))) {
      console.warn(`Blocked request to tracking/external domain: ${hostname}`);
      return false;
    }

    // Check if in allowed list
    const isAllowed = ALLOWED_API_DOMAINS.some((allowed) => {
      if (allowed.endsWith('.')) {
        // IP range check (e.g., '192.168.')
        return hostname.startsWith(allowed);
      }
      return hostname === allowed || hostname.endsWith(`.${allowed}`);
    });

    if (!isAllowed) {
      console.warn(`Blocked request to unauthorized domain: ${hostname}`);
    }

    return isAllowed;
  } catch {
    console.error('Invalid URL:', url);
    return false;
  }
}

/**
 * Intercept and filter fetch requests
 */
export function setupNetworkInterceptor() {
  const originalFetch = global.fetch;

  global.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input.toString();

    // Skip local file:// URLs and blob: URLs
    if (url.startsWith('file://') || url.startsWith('blob:')) {
      return originalFetch(input, init);
    }

    // Check if URL is allowed
    if (!isUrlAllowed(url)) {
      throw new Error(`Network request blocked for privacy: ${url}`);
    }

    return originalFetch(input, init);
  };
}

/**
 * Get network security status
 */
export function getNetworkSecurityStatus() {
  return {
    strictMode: true,
    allowedDomains: ALLOWED_API_DOMAINS,
    blockedDomains: BLOCKED_DOMAINS,
    message: 'All external requests are filtered for privacy protection',
  };
}
