"use client";

import { Container } from "./Container";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="pointer-events-none fixed top-0 left-0 right-0 z-50 flex flex-none flex-col">
      <div className="h-20 pt-6">
        <Container className="pointer-events-auto">
          <div className={cn(
            "flex gap-4 items-center glass rounded-full px-6 py-2 border-zinc-200/50 dark:border-zinc-700/30",
            "shadow-sm transition-shadow hover:shadow-md"
          )}>
            <div className="flex flex-1">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-purple-600 text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                  S
                </div>
                <span className="text-xl font-bold font-display text-zinc-900 dark:text-white tracking-tight">
                  Skillio
                </span>
              </Link>
            </div>
            <div className="flex flex-1 justify-end md:justify-center">
              <nav className="hidden md:block">
                <ul className="flex gap-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  <NavItem href="#how-it-works">How it Works</NavItem>
                  <NavItem href="#features">Features</NavItem>
                  <NavItem href="#get-started">Pricing</NavItem>
                </ul>
              </nav>
            </div>
            <div className="flex justify-end items-center flex-1">
               <Link href="#get-started" className="hidden sm:block text-sm font-bold px-5 py-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 transition-colors shadow-md">
                 Get Started
               </Link>
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
        className="relative block px-3 py-2 transition hover:text-indigo-600 dark:hover:text-indigo-400"
      >
        {children}
      </Link>
    </li>
  );
}
