import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { Suspense, use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

interface ReturnPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string }>;
}

async function getSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error) {
    console.error('Error retrieving session:', error);
    return null;
  }
}

function ReturnContent({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const t = useTranslations("Return");
  const { locale } = use(params);
  const { session_id } = use(searchParams);
  
  setRequestLocale(locale);

  if (!session_id) {
    redirect('/');
  }

  const session = use(getSession(session_id));

  if (!session) {
    return (
      <div className="container mx-auto px-6 sm:px-12 pt-24 sm:pt-32 pb-20 sm:pb-24 text-center">
        <h1 className="text-4xl font-display font-bold mb-4 sm:mb-6 tracking-tighter italic">{t("errorTitle")}</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6 sm:mb-8 font-medium italic">{t("errorSubtitle")}</p>
        <Link href="/" className="btn-premium px-12 py-5 uppercase tracking-widest text-xs">{t("backBtn")}</Link>
      </div>
    );
  }

  if (session.status === 'open') {
    return (
      <div className="container mx-auto px-6 sm:px-12 pt-24 sm:pt-32 pb-20 sm:pb-24 text-center">
        <h1 className="text-4xl font-display font-bold mb-4 sm:mb-6 tracking-tighter italic">{t("pendingTitle")}</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6 sm:mb-8 font-medium italic">{t("pendingSubtitle")}</p>
        <Link href="/" className="btn-premium px-12 py-5 uppercase tracking-widest text-xs">{t("backBtn")}</Link>
      </div>
    );
  }

  if (session.status === 'complete') {
    return (
      <div className="container mx-auto px-6 sm:px-12 pt-24 sm:pt-32 pb-20 sm:pb-24 text-center">
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="w-20 h-20 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black rounded-full flex items-center justify-center shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 sm:mb-6 text-zinc-900 dark:text-white tracking-tighter italic">
          {t("successTitle")}
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed italic font-medium">
          {t("successSubtitle")} <span className="font-semibold text-zinc-900 dark:text-zinc-200">{session.customer_details?.email}</span>. 
          {t("successTip")}
        </p>
        
        <div className="glass p-8 sm:p-12 rounded-[3rem] max-w-lg mx-auto mb-10 sm:mb-12 text-left border border-zinc-100 dark:border-zinc-800 shadow-xl overflow-hidden shimmer-bg">
          <h3 className="font-bold mb-4 sm:mb-6 uppercase tracking-[0.2em] text-[10px] sm:text-xs text-zinc-400">{t("summaryTitle")}</h3>
          <div className="flex justify-between mb-2 sm:mb-4">
            <span className="text-zinc-500 font-medium">{t("orderId")}</span>
            <span className="font-mono text-[9px] text-zinc-900 dark:text-zinc-100 uppercase">{session.id.slice(0, 18)}...</span>
          </div>
          <div className="flex justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4 sm:pt-6 mt-2 sm:mt-4">
            <span className="font-bold text-zinc-900 dark:text-white tracking-tight">{t("totalPaid")}</span>
            <span className="font-black text-xl text-zinc-900 dark:text-white tracking-tighter">
              {new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: session.currency?.toUpperCase() || 'GBP',
              }).format((session.amount_total || 0) / 100)}
            </span>
          </div>
        </div>

        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t("backBtn")}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 sm:px-12 pt-24 sm:pt-32 pb-20 sm:pb-24 text-center">
      <h1 className="text-4xl font-display font-bold mb-4 sm:mb-6 text-zinc-900 dark:text-white tracking-tighter italic">{t("status")}</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6 sm:mb-8 font-medium">Status: {session.status}</p>
      <Link href="/" className="btn-premium px-12 py-5 uppercase tracking-widest text-xs">{t("backBtn")}</Link>
    </div>
  );
}

export default function ReturnPage({ params, searchParams }: ReturnPageProps) {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 pt-48 pb-20 text-center animate-pulse">
        <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-800 rounded-full mx-auto mb-8" />
        <div className="h-10 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded-lg mx-auto mb-4" />
        <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded mx-auto" />
      </div>
    }>
      <ReturnContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}
