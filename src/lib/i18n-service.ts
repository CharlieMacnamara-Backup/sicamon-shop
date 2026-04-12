import { routing } from '../i18n/routing';
import { notFound } from 'next/navigation';

/**
 * Cached I18n Message Service
 * Decoupled from headers() to ensure Next.js 16.2 'use cache' stability.
 * @param locale The locale to fetch messages for
 */
export async function getCachedMessages(locale: string) {
  'use cache';
  
  // Validate that the incoming locale parameter is valid
  if (!locale || !routing.locales.includes(locale as any)) {
    return notFound();
  }

  return (await import(`../../messages/${locale}.json`)).default;
}

