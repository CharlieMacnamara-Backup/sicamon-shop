import { Container } from "./ui/Container";
import { useTranslations } from "next-intl";

export function ProductShowcase() {
  const t = useTranslations("Contact");

  return (
    <div id="info" className="py-16 sm:py-24 bg-white dark:bg-zinc-950 overflow-hidden">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-20 sm:mb-32">
          <h2 className="text-4xl md:text-6xl font-display font-medium text-zinc-900 dark:text-white tracking-tighter">
            {t("care.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-14 items-start px-4 sm:px-0">
          {/* Tip 1 */}
          <div className="group flex flex-col items-center text-center p-8 sm:p-12 card-soft bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:shadow-2xl transition-all duration-500 rounded-[2.5rem]">
            <div className="w-20 h-20 rounded-3xl bg-zinc-900/5 dark:bg-zinc-100/5 flex items-center justify-center text-4xl mb-10 group-hover:scale-110 transition-transform">🧹</div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">{t("care.maintenance")}</h3>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium text-sm">
              {t("care.tip1")}
            </p>
          </div>

          {/* Tip 2 */}
          <div className="group flex flex-col items-center text-center p-8 sm:p-12 card-soft bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:shadow-2xl transition-all duration-500 rounded-[2.5rem]">
            <div className="w-20 h-20 rounded-3xl bg-zinc-900/5 dark:bg-zinc-100/5 flex items-center justify-center text-4xl mb-10 group-hover:scale-110 transition-transform">🖼️</div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">{t("care.placement")}</h3>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium text-sm">
              {t("care.tip2")}
            </p>
          </div>

          {/* Tip 3 */}
          <div className="group flex flex-col items-center text-center p-8 sm:p-12 card-soft bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:shadow-2xl transition-all duration-500 rounded-[2.5rem]">
            <div className="w-20 h-20 rounded-3xl bg-zinc-900/5 dark:bg-zinc-100/5 flex items-center justify-center text-4xl mb-10 group-hover:scale-110 transition-transform">🧼</div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">{t("care.cleaning")}</h3>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium text-sm">
              {t("care.tip3")}
            </p>
          </div>
        </div>

        {/* Theme Discounts Section */}
        <div className="mt-32 max-w-5xl mx-auto glass p-8 sm:p-16 rounded-[4rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl overflow-hidden relative group">
           {/* Decorative background accent */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-900/5 dark:bg-zinc-100/5 blur-3xl rounded-full" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-zinc-900/5 dark:bg-zinc-100/5 blur-3xl rounded-full" />

           <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
             <div className="w-24 h-24 shrink-0 rounded-3xl bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center text-3xl font-black shadow-2xl transform group-hover:scale-110 transition-all shimmer-bg">
                -15%
             </div>
             <div>
               <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 font-display uppercase tracking-[0.2em] sm:text-sm">
                 {t("discounts.title")}
               </h3>
               <p className="text-lg md:text-2xl text-zinc-600 dark:text-zinc-300 leading-relaxed italic font-medium tracking-tight">
                 {t("discounts.content")}
               </p>
             </div>
           </div>
        </div>
      </Container>
    </div>
  );
}

