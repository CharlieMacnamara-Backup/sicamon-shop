import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google"; // Switched to Outfit for a less generic, bespoke feel
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getCachedMessages } from "@/lib/i18n-service";
import { Suspense, use } from "react";
import Script from "next/script";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const locales = ["en"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const serif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sicamon.com"),
  title: {
    default: "Sicamon | Tufted Rugs",
    template: "%s | Sicamon"
  },
  description: "Sicamon is a boutique gallery for 1-of-1 hand-tufted rugs and bespoke textile art.",
};

function I18nProvider({ children, locale }: { children: React.ReactNode; locale: string }) {
  const messages = use(getCachedMessages(locale));
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Header />
      <div className="relative flex flex-col flex-1">
         <main className="flex-auto">{children}</main>
         <Footer />
      </div>
    </NextIntlClientProvider>
  );
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${outfit.variable} ${serif.variable} h-full antialiased scroll-smooth scroll-pt-20`}
    >
      <body className="flex min-h-screen flex-col bg-zinc-50 transition-colors duration-300 dark:bg-black">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Script 
            src="https://js.stripe.com/dahlia/stripe.js" 
            strategy="afterInteractive" 
          />
          <div className="fixed inset-0 flex justify-center sm:px-8">
            <div className="flex w-full max-w-7xl lg:px-8">
              <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
            </div>
          </div>
          
          <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950">
              <div className="w-12 h-12 border-4 border-zinc-900/10 border-t-zinc-900 dark:border-white/10 dark:border-t-white rounded-full animate-spin" />
            </div>
          }>
            <I18nProvider locale={locale}>
              {children}
            </I18nProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
