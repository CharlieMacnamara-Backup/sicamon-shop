import { RugCheckout } from '../_components/RugCheckout';
import { notFound } from 'next/navigation';
import { Suspense, use } from 'react';
import { setRequestLocale } from 'next-intl/server';

interface CheckoutPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ priceId?: string }>;
}

function CheckoutContent({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ priceId?: string }>;
}) {
  const { locale } = use(params);
  const { priceId } = use(searchParams);
  
  setRequestLocale(locale);

  if (!priceId) {
    notFound();
  }

  return (
    <div className="relative">
      <RugCheckout priceId={priceId} isOpen={true} onClose={() => {}} />
    </div>
  );
}

export default function CheckoutPage({ params, searchParams }: CheckoutPageProps) {
  return (
    <div className="container mx-auto px-6 sm:px-10 pt-24 sm:pt-32 pb-20 sm:pb-24">
      <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 lg:mb-24">
        <div className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-zinc-900/5 dark:bg-zinc-100/5 border border-zinc-100 dark:border-white/5 rounded-full text-[10px] uppercase font-black tracking-[0.3em] text-zinc-500 mb-4 sm:mb-6">
          Dahlia Checkout
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-zinc-900 dark:text-white mb-4 sm:mb-6 tracking-tight">
          Complete Your Selection
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 font-medium tracking-tight">
          Secure, boutique checkout via Stripe.
        </p>
      </div>

      <Suspense fallback={
        <div className="flex flex-col items-center justify-center p-8 sm:p-12 lg:p-20">
          <div className="w-10 h-10 border-4 border-zinc-900/10 border-t-zinc-900 dark:border-white/10 dark:border-t-white rounded-full animate-spin mb-4 sm:mb-6" />
          <p className="text-[10px] font-black text-zinc-900 dark:text-white animate-pulse uppercase tracking-[0.3em]">Validating Session</p>
        </div>
      }>
        <CheckoutContent params={params} searchParams={searchParams} />
      </Suspense>

      <div className="mt-8 sm:mt-12 text-center text-zinc-500 text-sm">
        <p>Protected by industry-standard encryption.</p>
      </div>
    </div>
  );
}
