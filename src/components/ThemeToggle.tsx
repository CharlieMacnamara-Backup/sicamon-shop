"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { logger } from "@/lib/logger";

/**
 * Skillio Dark Mode Toggle - Method Based Approach [Next.js 16 LTS]
 * Resolves hydration mismatches and aligns with Tailwind 4 selector strategy.
 */
export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Hydration safety: only show the toggle once the client is mounted
  React.useEffect(() => {
    setMounted(true);
    logger.logResource("ThemeToggle", "mounted (High-Impact Mode)");
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
    );
  }

  // Method-based toggle: directly interact with the next-themes state
  const handleToggle = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    logger.logStateChange("Theme", resolvedTheme, nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      onClick={handleToggle}
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-900 transition-all hover:bg-zinc-100 border border-zinc-200/50 shadow-sm dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900 dark:border-zinc-800/50 active:scale-90"
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-teal-500" />
    </button>
  );
}
