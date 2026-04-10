# Sicamon Marketing Site

Premium marketing website for the Sicamon Shop. Built with Next.js 16 LTS, Tailwind CSS 4, and next-themes.

## Development

```bash
npm run dev     # Start development server
npm run verify  # Run pre-commit audits (Lint, Type, UI Adaptability)
npm run build   # Production build
```

## Robust Verification
The project includes a `scripts/verify.mjs` script (automated via Husky) that ensures:
- **LTS Compliance**: Verified usage of `proxy.ts` and `loading.tsx`.
- **UI Adaptability**: Checks for fixed pixel offsets and responsive image scaling.
- **Resource Hygiene**: Validates `useEffect` cleanups in client components.

## Deploy
Optimized for Vercel and Cloudflare Pages.