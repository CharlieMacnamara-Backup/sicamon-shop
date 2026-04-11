/**
 * Protocol Resilience Utility
 * Surgically upgrades insecure legacy URLs to HTTPS to satisfy production Handshake requirements.
 */
export function normalizeImageUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  
  // Handshake Correction: Automatically upgrade insecure http to https
  if (url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }
  
  return url;
}
