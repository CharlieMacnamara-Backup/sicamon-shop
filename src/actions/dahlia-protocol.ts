import { z } from 'zod';

/**
 * Sicamon Atelier Protocol
 * Isolated Schema and constants to ensure architecture safety for bespoke collection.
 */

export const ATELIER_RESERVATION_MINUTES = 5;
export const ATELIER_INTEGRATION_ID = 'sicamon-shop';
export const SUPPORTED_LOCALES = ['en'] as const;

export const CreateCheckoutSchema = z.object({
  priceId: z.string().min(1, 'Price ID is required'),
  locale: z.enum(SUPPORTED_LOCALES).catch('en' as any),
  collectorToken: z.string().uuid('Invalid collector identity'),
});

export type CreateCheckoutInput = z.infer<typeof CreateCheckoutSchema>;

/**
 * Standard Object for Releasing a Studio Soft-Lock
 */
export const ATELIER_LOCK_RELEASE = {
  lock_expires: '0',
  lock_id: '',
};

/**
 * Validates session input against Atelier protection schemas.
 */
export function validateAtelierInput(input: unknown) {
  const result = CreateCheckoutSchema.safeParse(input);
  if (!result.success) {
    const errorMsg = result.error.issues.map((e: any) => e.message).join(', ');
    throw new Error(`Atelier Security Violation: ${errorMsg}`);
  }
  return result.data;
}
