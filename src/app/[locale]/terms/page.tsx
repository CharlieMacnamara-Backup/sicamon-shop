import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { useTranslations } from "next-intl";

export default function TermsPage() {
  const t = useTranslations("Terms");

  return (
    <div className="relative isolate min-h-full">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[50%] top-0 h-[800px] w-[800px] -translate-x-[50%] rounded-full bg-zinc-500/5 blur-3xl opacity-50" />
      </div>

      <Container className="pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div className="max-w-3xl">
          <Link 
            href="/" 
            className="group mb-12 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            {t("back")}
          </Link>

          <header className="mb-16">
            <h1 className="text-4xl font-bold font-display tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl lg:text-6xl mb-6">
              {t("title")}
            </h1>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl">
              {t("subtitle")}
            </p>
            <div className="mt-8 flex items-center gap-2 text-sm text-zinc-400 dark:text-zinc-500 bg-white/50 dark:bg-zinc-900/50 w-fit px-4 py-2 rounded-full border border-zinc-100 dark:border-zinc-800 backdrop-blur-sm">
               <span>{t("revised")}</span>
            </div>
          </header>

          <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-zinc-900 dark:prose-h2:text-white prose-h2:mt-12 prose-h2:mb-6 prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-400">
            <h2>{t("sections.acceptance.title")}</h2>
            <p>
              {t("sections.acceptance.content")}
            </p>
            
            <h2>{t("sections.service.title")}</h2>
            <p>
              {t("sections.service.content")}
            </p>

            <h2>{t("sections.responsibilities.title")}</h2>
            <p>
              {t("sections.responsibilities.content")}
            </p>

            <h2>{t("sections.intellectual.title")}</h2>
            <p>
              {t("sections.intellectual.content")}
            </p>

            <h2>{t("sections.liability.title")}</h2>
            <p>
              {t("sections.liability.content")}
            </p>

            <h2>{t("sections.law.title")}</h2>
            <p>
              {t("sections.law.content")}
            </p>

            <h2>{t("sections.contact.title")}</h2>
            <p>
              {t("sections.contact.content")}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
