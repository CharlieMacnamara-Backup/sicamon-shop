import { z } from 'zod';

/**
 * TikTok API Protocol
 * Isolates and hardens the interaction with the TikTok Native Player V1.
 * Ensures strict type safety for the Museum Overlay assets.
 */

export const TikTokUrlSchema = z.string().url().refine((url) => {
  return url.includes('tiktok.com');
}, { message: 'Must be a valid TikTok studio link' });

/**
 * Extracts a numeric TikTok Video ID from various URL formats.
 * @param url The raw TikTok link from Stripe metadata.
 */
export function extractTikTokId(url: string | undefined): string | null {
  if (!url) return null;
  
  try {
    // Standard and mobile tiktok URL patterns
    const match = url.match(/(?:\/video\/|v\/)([0-9]+)/);
    return match ? match[1] : null;
  } catch (err) {
    console.error('⚠️ [TikTok Protocol] Failed to extract ID:', err);
    return null;
  }
}

/**
 * Synthesizes the 10x Native V1 Player endpoint.
 * @param videoId Validated TikTok Video ID.
 */
export function getNativeEmbedUrl(videoId: string): string {
  // music_info=1 and description=1 provide the boutique-grade context overlays
  return `https://www.tiktok.com/player/v1/${videoId}?music_info=1&description=1`;
}
