import {  } from 'next-intl/server';

/**
 * Cached I18n Message Service
 * Decoupled from headers() to ensure Next.js 16.2 'use cache' stability.
 * @param locale The locale to fetch messages for
 */
export async function getCachedMessages(locale: string) {
  'use cache';
  return (await import(`../../messages/${locale}.json`)).default;
}
