import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
  './src/i18n.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
      },
      {
        protocol: 'https',
        hostname: 'sicamon.com',
      },
      {
        protocol: 'https',
        hostname: 'www.sicamon.com',
      }
    ],
    qualities: [75, 100]
  },
  cacheComponents: true
};

export default withNextIntl(nextConfig);

// Boutique Refresh Trigger: 2026-04-10T21:36:00Z
