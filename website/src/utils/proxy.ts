import { PROXY_URL, PROXY_CONFIG } from '../config/proxy';

/**
 * Generic proxy request function
 * @param url - The target URL to fetch through proxy
 * @param options - Fetch options
 * @returns Promise with the response data
 */
export async function fetchViaProxy<T = any>(
  url: string, 
  options: RequestInit = {}
): Promise<T | undefined> {
  try {
    const response = await fetch(PROXY_URL + url, {
      ...options,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      console.warn('[Proxy] Request failed:', response.status, response.statusText);
      return undefined;
    }
    
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('[Proxy] Request error:', error);
    return undefined;
  }
}

/**
 * Fetch Quicker action info via proxy
 * @param actionId - The Quicker action ID
 * @param signal - AbortSignal for request cancellation
 * @returns Promise with action info
 */
export async function fetchQuickerActionInfo(
  actionId: string, 
  signal?: AbortSignal
): Promise<any | undefined> {
  const apiUrl = `https://getquicker.net/open/api/actions/getactioninfo?id=${encodeURIComponent(actionId)}`;
  return fetchViaProxy(apiUrl, { signal });
}
