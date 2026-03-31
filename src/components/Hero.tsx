"use client";

import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { Container } from "./Container";
import { logger } from "@/lib/logger";

export function Hero() {
  React.useEffect(() => {
    logger.logResource("Hero", "mounted");
    return () => logger.logResource("Hero", "disposed");
  }, []);

  return (
    <div className="relative pt-20 pb-8 lg:pt-32 lg:pb-12">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1>
              <span className="block text-sm font-bold tracking-widest text-teal-600 uppercase dark:text-teal-400 font-display">
                Communication on your terms
              </span>
              <span className="mt-2 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl font-display leading-[1.1]">
                <span className="block text-zinc-900 dark:text-zinc-100">Unlock connection for</span>
                <span className="block gradient-text">Every Mind</span>
              </span>
            </h1>
            <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 sm:mt-6 sm:text-xl lg:text-lg xl:text-xl leading-relaxed">
              Unlock connection. Customizable tools for speech, regulation, and social interaction. Mastery for everyone.
            </p>
            <div className="mt-10 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <div className="flex flex-col sm:flex-row gap-5">
                <Link 
                  href="#get-started" 
                  className="btn-premium"
                  onClick={() => logger.logEvent("Hero", "CTA clicked: Get Started")}
                >
                  Get Started for £30
                </Link>
                <Link 
                  href="#how-it-works" 
                  className="inline-flex items-center justify-center px-8 py-3 font-semibold text-zinc-700 bg-white border border-zinc-200 rounded-full hover:bg-zinc-50 transition-all dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800 shadow-sm active:scale-95"
                  onClick={() => logger.logEvent("Hero", "CTA clicked: See How it Works")}
                >
                  See How it Works
                </Link>
              </div>
              <p className="mt-4 text-xs font-medium text-zinc-400 dark:text-zinc-500 italic">
                One-time purchase. Lifetime access.
              </p>
            </div>
          </div>
          <div className="mt-16 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6">
             {/* Decorative blob background */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-teal-500/5 blur-3xl rounded-full -z-10 dark:bg-teal-500/10" />
            
            <div className="relative mx-auto w-4/5 sm:w-2/3 md:w-1/2 lg:w-4/5 xl:w-2/3 card-soft overflow-hidden p-2 group hover:shadow-md">
              <div className="bg-zinc-50 dark:bg-black rounded-3xl flex items-center justify-center overflow-hidden border border-zinc-100 dark:border-zinc-800/50">
                <Image 
                  src="/assets/images/samples/aac.png" 
                  alt="Skillio Sensory-Safe AAC Interface on iPad" 
                  width={1170}
                  height={2532}
                  quality={100}
                  sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 40vw"
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
