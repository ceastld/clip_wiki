/**
 * Global proxy configuration for API requests
 */

// CORS proxy URL for bypassing cross-origin restrictions
export const PROXY_URL = 'https://api.codetabs.com/v1/proxy/?quest=';

// Alternative proxy URLs (for fallback if needed)
export const ALTERNATIVE_PROXY_URLS = [
  'https://api.cors.lol/?url=',
  'https://api.allorigins.win/raw?url=',
  'https://cors-anywhere.herokuapp.com/',
];

// Proxy configuration object
export const PROXY_CONFIG = {
  primary: PROXY_URL,
  alternatives: ALTERNATIVE_PROXY_URLS,
  timeout: 10000, // 10 seconds
  retryCount: 2,
} as const;
