'use client';
import { Link } from "@/i18n/routing";
import { Container } from "./ui/Container";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="flex-none bg-zinc-50 dark:bg-black">
      <div className="border-t border-zinc-100 pb-10 sm:pb-20 pt-10 sm:pt-20 dark:border-zinc-800/50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="md:col-span-5 lg:col-span-4">
              <Link href="/" className="flex items-center gap-3 group mb-6">
                <div className="relative h-14 w-14 sm:h-20 sm:w-20 flex items-center justify-center overflow-hidden transition-all duration-300">
                  <Image 
                    src="/assets/images/logo.png" 
                    alt={t("logoAlt")} 
                    fill
                    sizes="(max-width: 768px) 56px, 80px"
                    className="object-contain dark:invert dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                  />
                </div>
              </Link>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed font-medium italic">
                {t("description")}
              </p>
            </div>

            {/* Links Column */}
            <div className="md:col-span-3 lg:col-span-4">
               <h4 className="font-display font-medium italic text-zinc-900 dark:text-white mb-6 uppercase tracking-[0.2em] text-[10px] sm:text-xs">{t("columns.nav")}</h4>
               <ul className="space-y-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                 <li><Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">{t("links.shop")}</Link></li>
                 <li><Link href="/contact" className="hover:text-zinc-900 dark:hover:text-white transition-colors">{t("links.contact")}</Link></li>
               </ul>
            </div>

            {/* Legal Column */}
             <div className="md:col-span-4 lg:col-span-4 text-left">
               <h4 className="font-display font-bold text-zinc-900 dark:text-white mb-6 uppercase tracking-[0.2em] text-[10px] sm:text-xs">{t("columns.legal")}</h4>
               <ul className="space-y-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                 <li><Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-white transition-colors">{t("links.privacy")}</Link></li>
                 <li><Link href="/terms" className="hover:text-zinc-900 dark:hover:text-white transition-colors">{t("links.terms")}</Link></li>
                  <li><a href="mailto:amonsic@hotmail.com" className="hover:text-zinc-900 dark:hover:text-white transition-colors font-mono text-xs">amonsic@hotmail.com</a></li>
               </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex flex-col md:flex-row items-center gap-6">
               {process.env.NODE_ENV === 'development' && (
                 <button 
                  onClick={() => {
                    localStorage.removeItem('sicamon_collector_id');
                    window.location.reload();
                  }}
                  className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors border-b border-zinc-500/20 pb-0.5"
                 >
                   Reset Identity (Dev)
                 </button>
               )}
               <p className="text-sm text-zinc-400 dark:text-zinc-500 font-medium tracking-tight">
                 {t("copyright")}
               </p>
             </div>
            <div className="flex gap-6">
              <a 
                href="https://www.tiktok.com/@sicamon" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2.187a.396.396 0 0 0-.4-.399h-3.305a.397.397 0 0 0-.399.4v13.062a2.867 2.867 0 1 1-2.867-2.867.396.396 0 0 0 .4-.399V8.68a.396.396 0 0 0-.4-.399 7.253 7.253 0 1 0 7.252 7.252V7.124a8.082 8.082 0 0 0 3.86 1.053v-2.02a.4.4 0 0 0-.4-.4l-1.071-.02a.396.396 0 0 0-.4-.399z"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/sicamons/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
