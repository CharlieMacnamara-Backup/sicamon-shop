'use server';

import { z } from 'zod';
import { SUPPORTED_LOCALES } from './dahlia-protocol';

/**
 * Museum Insight Protocol
 * Tracks collector engagements with the creative process.
 */

const MuseumInsightSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  locale: z.enum(SUPPORTED_LOCALES).default('en'),
  interactionType: z.enum(['video_play', 'image_zoom', 'info_read']).default('video_play'),
  collectorToken: z.string().uuid().optional(),
});

export async function trackRugInsight(input: unknown) {
  try {
    const data = MuseumInsightSchema.parse(input);
    
    // Atelier Logging (Isolating backend logic)
    console.warn(`🎨 [Museum] Insight Captured: Product=${data.productId} Event=${data.interactionType} Locale=${data.locale}`);
    
    // [Future] This is where we would persist engagement telemetry to Stripe metadata 
    // or a secondary collector database for drop-interest heatmaps.
    
    return { success: true };
  } catch (err) {
    // Fail silently for telemetry to avoid interrupting the boutique experience
    console.error('⚠️ [Museum] Insight Logging Failed:', err);
    return { success: false };
  }
}
