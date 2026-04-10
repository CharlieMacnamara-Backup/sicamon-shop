"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

/**
 * Sicamon Dark Mode Toggle - Method Based Approach [Next.js 16 LTS]
 * Resolves hydration mismatches and aligns with Tailwind 4 selector strategy.
 */
export function ThemeToggle() {
  const t = useTranslations("ThemeToggle");
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Hydration safety: only show the toggle once the client is mounted
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
    );
  }

  // Method-based toggle: directly interact with the next-themes state
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={handleToggle}
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-900 transition-all hover:bg-zinc-100 border border-zinc-200/50 shadow-sm dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900 dark:border-zinc-800/50 active:scale-90"
      aria-label={t(`themeToggle.${resolvedTheme === 'dark' ? 'light' : 'dark'}`)}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-teal-500" />
    </button>
  );
}
