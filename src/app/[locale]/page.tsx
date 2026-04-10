import { Hero } from "@/components/Hero";
import { ProductShowcase } from "@/components/ProductShowcase";
import { CTASection } from "@/components/CTASection";
import { Container } from "@/components/ui/Container";
import { useTranslations } from "next-intl";
import { stripe } from '@/lib/stripe';
import { ShopDisplay } from './(shop)/_components/ShopDisplay';
import { cacheLife, cacheTag } from 'next/cache';
import { setRequestLocale } from 'next-intl/server';
import { use, Suspense } from 'react';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

/**
 * Robust Product Fetching with Next.js 16.2 Dynamic IO.
 * Utilizing the function-level 'use cache' directive.
 */
async function getProducts() {
  'use cache';
  cacheLife('seconds');
  cacheTag('products');

  try {
    const products = await stripe.products.list({
      expand: ['data.default_price'],
      active: true,
      limit: 100,
    });
    
    console.warn(`📡 [Stripe] Fetched ${products.data.length} active products for the Atelier.`);
    
    return products.data;
  } catch (error) {
    console.error('❌ [Stripe] Error fetching products from Dahlia (Dynamic IO):', error);
    return [];
  }
}

export default function Home({ params }: HomePageProps) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const products = use(getProducts());
  const t = useTranslations("Shop");

  return (
    <div className="flex flex-col gap-12 pb-16 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      <Hero />
      
      {/* Intro / Features Section - Repurposed for Pricing Info */}
      <Container id="info">
        <div className="max-w-4xl mx-auto py-12 px-6 sm:px-10 floor-shadow glass rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
                {t("pricing.title")}
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                {t("pricing.details")}
              </p>
            </div>
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-2xl bg-zinc-900/5 dark:bg-zinc-100/5 border border-zinc-100 dark:border-white/5 flex items-center justify-center text-3xl">📐</div>
              <div className="w-24 h-24 rounded-2xl bg-zinc-900/5 dark:bg-zinc-100/5 border border-zinc-100 dark:border-white/5 flex items-center justify-center text-3xl">🧶</div>
            </div>
          </div>
        </div>
      </Container>

      {/* Main Rug Gallery (The "Shop") */}
      <Container id="gallery" className="px-6 sm:px-10 lg:px-14">
        <div className="mb-14 text-center md:text-left">
          <h2 className="text-5xl font-display font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl font-medium">
            {t("description")}
          </p>
        </div>
        
        <Suspense fallback={<div className="h-96 w-full bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-[3rem]" />}>
          <ShopDisplay products={products as any} />
        </Suspense>
      </Container>

      <ProductShowcase />
      
      <CTASection />
    </div>
  );
}
