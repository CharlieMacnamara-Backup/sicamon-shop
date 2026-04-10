import { Container } from "@/components/ui/Container";
import { useTranslations } from "next-intl";
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default function ContactPage({ params }: ContactPageProps) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations("Contact");

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen pt-32 pb-16 transition-colors duration-500 font-sans">
      <Container px-scale="large">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-14">
          {/* Header */}
          <div className="mb-16 sm:mb-24 lg:mb-32">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-zinc-900 dark:text-white mb-10 sm:mb-12 tracking-tighter italic">
              {t("title")}
            </h1>
            <div className="glass p-8 sm:p-12 lg:p-16 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl relative overflow-hidden group transition-all duration-700 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
               <div className="absolute top-0 right-0 w-48 h-48 bg-zinc-900/5 dark:bg-white/5 blur-3xl rounded-full" />
               
               <p className="text-xl md:text-2xl lg:text-3xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-serif italic mb-12">
                 {t("intro")}
               </p>
               
               <div className="flex flex-col sm:flex-row gap-6">
                 <a 
                   href="mailto:amonsic@hotmail.com" 
                   className="btn-premium px-12 py-5 text-sm"
                 >
                   {t("sendEmail")}
                 </a>
                 <Link href="/" className="btn-secondary px-12 py-5 text-sm">
                   Return to Gallery
                 </Link>
               </div>
            </div>
          </div>

          {/* Studio Context Image - Flexible Framing for Portrait/Landscape Art */}
          <div className="mb-16 sm:mb-24 relative group">
            <div className="absolute -inset-6 bg-zinc-900/5 dark:bg-white/5 blur-3xl rounded-[5rem] -z-10 group-hover:bg-zinc-900/10 dark:group-hover:bg-white/10 transition-all duration-1000" />
            <div className="relative h-[500px] sm:h-[700px] overflow-hidden rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl bg-zinc-50 dark:bg-zinc-900/50">
              <Image 
                src="/assets/images/home-setup.jpg" 
                alt="Sicamon Studio"
                fill
                className="object-contain p-4 sm:p-8"
                priority
              />
              {/* Museum Label - Dynamic Position */}
              <div className="absolute top-4 right-4 sm:top-8 sm:right-8 glass px-4 py-2 sm:px-6 sm:py-3 rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-900 dark:text-white border border-white/20 dark:border-white/5 shadow-xl backdrop-blur-md z-10">
                The Studio
              </div>
            </div>
            {/* Localized Studio Description */}
            <div className="mt-10 max-w-2xl mx-auto text-center">
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 italic font-serif leading-relaxed tracking-tight">
                {t("studioLabel")}
              </p>
            </div>
          </div>

          {/* Detailed Info Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14">
            {/* Discounts Block */}
            <div className="flex flex-col h-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[3rem] p-8 sm:p-12 lg:p-14 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900/5 dark:bg-zinc-100/5 flex items-center justify-center text-3xl mb-10">🏷️</div>
              <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 tracking-tight italic">
                {t("discounts.title")}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-10 flex-1 font-medium italic">
                {t("discounts.subtitle")}
              </p>
              <div className="p-8 bg-zinc-50 dark:bg-zinc-950/50 rounded-3xl italic text-zinc-900 dark:text-zinc-100 font-bold border border-zinc-100 dark:border-zinc-800 text-sm leading-relaxed">
                {t("discounts.content")}
              </div>
            </div>

            {/* Care Guide Block */}
            <div className="flex flex-col h-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[3rem] p-8 sm:p-12 lg:p-14 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900/5 dark:bg-zinc-100/5 flex items-center justify-center text-3xl mb-10">✨</div>
              <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 tracking-tight italic">
                {t("care.title")}
              </h2>
              <ul className="space-y-8 flex-1">
                {[t("care.tip1"), t("care.tip2"), t("care.tip3")].map((tip, i) => (
                  <li key={i} className="flex gap-6">
                    <span className="flex-none w-7 h-7 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center text-[10px] font-black shadow-lg">
                      {i + 1}
                    </span>
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed italic">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Bottom attribution */}
          <div className="mt-20 sm:mt-32 text-center pb-8">
            <p className="text-zinc-500 dark:text-zinc-500 font-display text-xs uppercase tracking-[0.3em] font-bold">
              {t("footer")}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
