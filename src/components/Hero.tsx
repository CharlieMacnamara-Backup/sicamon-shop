"use client";

import { Link } from "@/i18n/routing";
import * as React from "react";
import { Container } from "./ui/Container";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <div className="relative pt-20 pb-8 lg:pt-32 lg:pb-12">
      <Container>
        <div className="text-center max-w-4xl mx-auto lg:col-span-12">
          <h1>
            <span className="block text-xs font-bold tracking-[0.3em] text-zinc-400 uppercase font-display mb-6">
              {t("badge")}
            </span>
            <span className="mt-4 block text-5xl tracking-tighter font-medium sm:text-7xl xl:text-9xl font-display leading-none italic">
              <span className="block text-zinc-900 dark:text-white">{t("titlePrefix")}</span>
            </span>
          </h1>
          <p className="mt-8 text-lg text-zinc-600 dark:text-zinc-400 sm:text-2xl leading-relaxed max-w-2xl mx-auto italic font-medium">
            {t("description")}
          </p>
          <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center px-6 sm:px-0">
            <Link 
              href="#gallery" 
              className="btn-premium px-14 py-5"
            >
              {t("cta.gallery")}
            </Link>
            <Link 
              href="/contact" 
              className="btn-secondary px-14 py-5"
            >
              {t("cta.contact")}
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
