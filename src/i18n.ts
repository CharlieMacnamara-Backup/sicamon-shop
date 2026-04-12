import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from './i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  // Validate that the incoming locale parameter is valid
  // If not in the supported list, trigger a 404
  if (!locale || !routing.locales.includes(locale as any)) {
    return notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});

