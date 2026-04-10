"use client";

import { useTranslations } from 'next-intl';

export default function Loading() {
  const t = useTranslations('Common');

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent shadow-sm" />
        <p className="text-sm font-medium text-zinc-500 animate-pulse">{t('loadingDocument')}</p>
      </div>
    </div>
  );
}
