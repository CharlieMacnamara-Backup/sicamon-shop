import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

/**
 * Sicamon Middleware - Canonical next-intl middleware for Next.js 16
 */
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - API routes, tRPC, _next, _vercel
  // - Files containing a dot (e.g., favicon.ico, images)
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
};
