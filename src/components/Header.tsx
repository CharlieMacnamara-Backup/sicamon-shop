"use client";

import { Link } from "@/i18n/routing";
import * as React from "react";
import { Container } from "./ui/Container";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function Header() {
  const t = useTranslations("Header");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-none flex-col">
      <div className="h-20 pt-6">
        <Container className="pointer-events-auto">
          <div className={cn(
            "flex gap-4 items-center glass rounded-full px-4 sm:px-6 pr-1.5 sm:pr-2 pl-5 sm:pl-8 py-2.5 sm:py-3",
            "bg-white/70 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/20 dark:border-zinc-800/50 shadow-2xl"
          )}>
            <div className="flex flex-1">
              <Link 
                href="/" 
                className="flex items-center gap-2 sm:gap-3 group"
              >
                <div className="relative h-12 w-12 sm:h-18 sm:w-18 flex items-center justify-center overflow-hidden transition-all duration-500 transform group-hover:scale-110">
                  <Image 
                    src="/assets/images/logo.png" 
                    alt={t("logoAlt")} 
                    fill
                    sizes="(max-width: 768px) 48px, 72px"
                    className="object-contain dark:invert dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all duration-500"
                  />
                </div>
              </Link>
            </div>
            
            <div className="flex flex-1 justify-center">
              <nav className="block">
                <ul className="flex gap-0.5 sm:gap-2 text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  <NavItem href="/">{t("nav.shop")}</NavItem>
                  <NavItem href="/contact">{t("nav.contact")}</NavItem>
                </ul>
              </nav>
            </div>

            <div className="flex justify-end items-center flex-1 gap-2 sm:gap-4">
               <ThemeToggle />
            </div>
          </div>
        </Container>
      </div>
    </header>
  )
}

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="relative block px-1.5 sm:px-3 py-1 sm:py-2 transition hover:text-zinc-500 dark:hover:text-zinc-400 whitespace-nowrap"
      >
        {children}
      </Link>
    </li>
  );
}
