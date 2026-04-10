"use client";

import { Link } from "@/i18n/routing";
import * as React from "react";
import { Container } from "./ui/Container";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function CTASection() {
  const t = useTranslations("CTASection");

  return (
    <section id="get-started" className="relative py-16 sm:py-24 overflow-hidden bg-zinc-100 dark:bg-zinc-950 transition-colors duration-500">
       {/* Background gradient - Studio Shimmer */}
      <div className="absolute inset-0 bg-linear-to-b from-zinc-50/50 via-zinc-100 to-zinc-200/50 dark:from-zinc-900 dark:via-zinc-950 dark:to-black opacity-50 dark:opacity-100" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--color-zinc-500)_0%,transparent_70%)] opacity-5 blur-3xl" />
      
      <Container className="relative">
        <div className="max-w-4xl mx-auto text-center px-6">
          {/* Atelier Logo - Adaptive Visibility Fix */}
          <div className="flex justify-center mb-12 sm:mb-16">
            <div className="relative h-48 w-48 sm:h-64 sm:w-64">
              <Image 
                src="/assets/images/logo.png" 
                alt="Sicamon Atelier Logo"
                fill
                sizes="(max-width: 768px) 192px, 256px"
                className="object-contain dark:invert drop-shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all duration-700"
              />
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-zinc-900 dark:text-white sm:text-7xl lg:text-8xl font-display leading-none mb-8 italic">
            {t("title")}
          </h2>
          <p className="mt-8 text-xl leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-medium italic">
            {t("description")}
          </p>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link 
              href="/" 
              className="w-full sm:w-auto btn-premium px-14 py-5"
            >
              {t("cta.gallery")}
            </Link>
            <Link 
              href="/contact" 
              className="w-full sm:w-auto btn-secondary px-14 py-5"
            >
              {t("cta.contact")}
            </Link>
          </div>
          <p className="mt-16 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-700 font-bold">
            {t("footer")}
          </p>
        </div>
      </Container>
    </section>
  );
}
