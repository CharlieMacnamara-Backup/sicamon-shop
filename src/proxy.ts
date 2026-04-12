import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

/**
 * Sicamon Middleware - Canonical next-intl middleware for Next.js 16
 */
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - API routes, tRPC, _next, _vercel
  // - Standard asset extensions (to prevent unnecessary middleware overhead)
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\.(?:ico|png|jpg|jpeg|svg|css|js|txt|xml|webmanifest)).*)']
};

