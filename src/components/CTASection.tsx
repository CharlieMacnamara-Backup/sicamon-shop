"use client";

import Link from "next/link";
import * as React from "react";
import { Container } from "./Container";
import { logger } from "@/lib/logger";

export function CTASection() {
  React.useEffect(() => {
    logger.logResource("CTASection", "mounted");
    return () => logger.logResource("CTASection", "disposed");
  }, []);

  return (
    <section id="get-started" className="relative py-24 overflow-hidden">
       {/* Background gradient */}
      <div className="absolute inset-0 bg-indigo-600 dark:bg-indigo-950" />
      <div className="absolute inset-0 bg-linear-to-br from-indigo-500/50 to-purple-600/50" />
      
      <Container className="relative">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl font-display">
            Communicate on your terms.
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-100">
            Communicate with confidence. Join thousands of users. Lifetime access for £30.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="#" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 font-bold rounded-full shadow-xl hover:bg-zinc-50 transition-all hover:scale-105 active:scale-95"
              onClick={() => logger.logEvent("CTASection", "App Store link clicked")}
            >
              Download on the App Store
            </Link>
            <Link 
              href="#" 
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-white border-2 border-white/30 font-bold rounded-full hover:bg-white/10 transition-all"
              onClick={() => logger.logEvent("CTASection", "Demo link clicked")}
            >
              Schedule a Demo
            </Link>
          </div>
          <p className="mt-6 text-sm text-indigo-200">
            Available for iOS and iPadOS. Android version coming soon.
          </p>
        </div>
      </Container>
    </section>
  );
}
