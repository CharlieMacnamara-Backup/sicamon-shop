'use client';

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { createCheckoutSession } from '@/actions/stripe';
import { useParams } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface RugCheckoutProps {
  priceId: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * AtelierCheckoutSurface - Isolated Stripe Instance.
 * This component ensures that the stripe and fetchClientSecret props are 
 * locked for its entire lifecycle, preventing 'Unsupported prop change' errors.
 */
function AtelierCheckoutSurface({ priceId, locale }: { priceId: string; locale: string }) {
  // 1. Stable Identity & Fetch - defined ONCE per mount of this surface
  const fetchClientSecret = React.useCallback(async () => {
    try {
      let collectorToken = localStorage.getItem('sicamon_collector_id');
      if (!collectorToken) {
        collectorToken = crypto.randomUUID();
        localStorage.setItem('sicamon_collector_id', collectorToken);
      }

      const { clientSecret } = await createCheckoutSession(priceId, locale, collectorToken);
      if (!clientSecret) throw new Error('Atelier failed to issue session secret.');
      
      return clientSecret;
    } catch (err: any) {
      throw err;
    }
  }, [priceId, locale]);

  // 2. Options are locked for the lifetime of this component
  const options = React.useMemo(() => ({ fetchClientSecret }), [fetchClientSecret]);

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}

/**
 * RugCheckout Atelier - Secure Collection Interface.
 * Native Callback Pattern for robust lifecycle management and automated disposal.
 */
export function RugCheckout({ priceId, isOpen, onClose }: RugCheckoutProps) {
  const [error] = React.useState<string | null>(null);
  const params = useParams();
  const locale = params?.locale as string || 'en';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-8 lg:p-12">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-zinc-950/70 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-zinc-100 dark:border-zinc-800">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-8 sm:px-10 sm:py-10 border-b border-zinc-50 dark:border-zinc-800/50">
          <div>
            <h2 className="text-3xl font-display italic font-medium text-zinc-900 dark:text-white tracking-tight sm:text-4xl">
              Acquire <span className="text-zinc-400">Collector Piece</span>
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-3 sm:p-4 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Checkout Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative p-8 sm:p-12 lg:p-16">
          {error && (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-white dark:bg-zinc-900 p-12 sm:p-16 lg:p-20 text-center">
              <div className="max-w-md">
                <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-10 sm:mb-12 text-3xl">
                  🥀
                </div>
                <h2 className="text-3xl font-display font-medium text-zinc-900 dark:text-white mb-6 sm:mb-8 tracking-tight italic">
                  Status Update
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 mb-12 sm:mb-16 lg:mb-20 leading-relaxed text-lg italic">
                  {error}
                </p>
                <button 
                  onClick={onClose}
                  className="btn-premium px-12 py-5 sm:px-14 sm:py-6 font-bold text-xs uppercase tracking-[0.2em]"
                >
                  Return to Archive
                </button>
              </div>
            </div>
          )}
          
          <div className={`w-full min-h-[500px] ${error ? 'opacity-0' : 'opacity-100'} px-4 py-8 sm:px-6 sm:py-10`}>
            {/* 
                Isolated Surface with unique key. 
                Forces total destruction/remount when opening or switching items. 
             */}
            <AtelierCheckoutSurface 
              key={`surface-${priceId}-${isOpen}`}
              priceId={priceId} 
              locale={locale} 
            />
          </div>
        </div>
        
        {/* Footer info */}
        <div className="px-10 py-6 sm:px-12 sm:py-8 bg-zinc-50 dark:bg-zinc-900/10 text-[9px] text-zinc-400 text-center uppercase tracking-[0.3em] font-medium border-t border-zinc-100 dark:border-zinc-800/50">
          Artist-Verified Secure Checkout • Studio Authenticated
        </div>
      </div>
    </div>
  );
}
