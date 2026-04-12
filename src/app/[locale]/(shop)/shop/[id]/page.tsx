import { Metadata } from 'next';
import { stripe } from '@/lib/stripe';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense, use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { RugVideoPlayer } from '../../_components/RugVideoPlayer';

// Product details page props
interface ProductPageProps {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await stripe.products.retrieve(id);
    return {
      title: `${product.name} | Sicamon Collection`,
      description: product.description || 'Exclusive artisanal rug.',
    };
  } catch {
    return { title: 'Product Not Found' };
  }
}

function ProductContent({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("Shop");

  const productPromise = (async () => {
    return await stripe.products.retrieve(id, {
      expand: ['default_price'],
    });
  })();

  const product = use(productPromise);

  try {

    if (!product.active && product.metadata.stock !== '0') {
      notFound();
    }

    const price = product.default_price as any;
    const isSoldOut = product.metadata.stock === '0' || !product.active;

    return (
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          {/* Image Section */}
          <div className="relative aspect-4/5 rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shadow-xl">
            {product.images?.[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className={`object-cover ${isSoldOut ? 'grayscale opacity-60' : ''}`}
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                <span>No Image Available</span>
              </div>
            )}
            {isSoldOut && (
              <div className="absolute top-6 sm:top-8 right-6 sm:right-8 bg-zinc-900/90 backdrop-blur text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm font-bold uppercase tracking-widest z-20">
                Sold Out
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center">
            <h1 className="text-6xl md:text-8xl font-display font-medium text-zinc-900 dark:text-white mb-8 tracking-tighter italic">
              {product.name}
            </h1>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12">
              <span className="text-5xl font-display font-medium text-zinc-900 dark:text-white tracking-tight italic">
                {price ? new Intl.NumberFormat('en-GB', { style: 'currency', currency: price.currency.toUpperCase() }).format(price.unit_amount / 100) : 'Price on Request'}
              </span>
              <span className="border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-full px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 bg-white dark:bg-zinc-900 shadow-sm">
                Studio Authenticated
              </span>
            </div>

            <div className="prose prose-zinc dark:prose-invert max-w-none mb-12">
              <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium italic">
                {product.description || 'This exclusive bespoke textile is a masterpiece of modern texture and traditional hand-tufted technique, part of the permanent Sicamon collection.'}
              </p>
              <ul className="mt-8 sm:mt-10 space-y-4 sm:space-y-6 text-zinc-500 font-medium border-l border-zinc-100 dark:border-zinc-800 pl-6 sm:pl-8">
                <li className="flex items-center gap-3 sm:gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white" />
                  Hand-tufted with sustainable, curated materials
                </li>
                <li className="flex items-center gap-3 sm:gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white" />
                  Designed for curated wall display or low-traffic floors
                </li>
              </ul>
            </div>

            {/* Studio Process Showcase */}
            <div className="mb-10 sm:mb-14">
              <Suspense fallback={
                <div className="absolute inset-0 aspect-9/16 overflow-hidden rounded-4xl bg-zinc-100 dark:bg-zinc-800 shadow-2xl ring-1 ring-zinc-200 dark:ring-zinc-700" />
              }>
                <RugVideoPlayer 
                  productId={product.id} 
                  videoUrl={product.metadata.tiktok_link || product.metadata.video_url || ''} 
                />
              </Suspense>
            </div>

            {/* Interaction */}
            {!isSoldOut && (
              <a 
                href={`/${locale}/checkout?priceId=${price.id}`}
                className="inline-block btn-premium py-6 px-16 text-center text-lg font-bold uppercase tracking-[0.2em]"
              >
                {t("details.cta")}
              </a>
            )}
          </div>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}

export default function ProductDetailsPage({ params }: ProductPageProps) {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen pt-24 sm:pt-32 pb-20 sm:pb-24">
      <Suspense fallback={
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 animate-pulse pt-24 sm:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="aspect-4/5 bg-zinc-100 dark:bg-zinc-800 rounded-2xl animate-pulse" />
            <div className="space-y-8">
              <div className="h-16 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
              <div className="h-8 w-1/4 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
              <div className="space-y-6 sm:space-y-8">
                <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
              </div>
            </div>
          </div>
        </div>
      }>
        <ProductContent params={params} />
      </Suspense>
    </div>
  );
}
