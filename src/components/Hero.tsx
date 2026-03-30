import Link from "next/link";
import { Container } from "./Container";

export function Hero() {
  return (
    <div className="relative pt-20 pb-16 lg:pt-32 lg:pb-24">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1>
              <span className="block text-sm font-semibold tracking-wide text-indigo-600 uppercase dark:text-indigo-400 font-display">
                Welcome to the future of AAC
              </span>
              <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl font-display">
                <span className="block text-zinc-900 dark:text-zinc-100">Empowering every</span>
                <span className="block gradient-text">voice with Skillio</span>
              </span>
            </h1>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Skillio combines advanced Augmentative and Alternative Communication (AAC) with interactive social skills training. Build confidence, foster connections, and communicate without limits.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#get-started" className="btn-premium">
                  Get Started for Free
                </Link>
                <Link href="#how-it-works" className="inline-flex items-center justify-center px-8 py-3 font-semibold text-zinc-700 bg-white border border-zinc-200 rounded-full hover:bg-zinc-50 transition-colors dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-700">
                  See How it Works
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
             {/* Decorative blob background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-indigo-500/10 blur-3xl rounded-full -z-10 animate-pulse" />
            
            <div className="relative mx-auto w-full rounded-3xl shadow-2xl overflow-hidden glass border-white/20">
              <div className="aspect-4/3 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                {/* Visual placeholder for the app interface */}
                <div className="grid grid-cols-4 gap-4 p-8 w-full max-w-md">
                   {[...Array(12)].map((_, i) => (
                     <div key={i} className="aspect-square rounded-xl bg-white shadow-sm ring-1 ring-zinc-900/5 flex flex-col items-center justify-center p-2 transition-transform hover:scale-105 dark:bg-zinc-700 dark:ring-white/10">
                        <div className={`w-8 h-8 rounded-full mb-1 ${i % 4 === 0 ? 'bg-orange-400' : i % 4 === 1 ? 'bg-pink-400' : i % 4 === 2 ? 'bg-blue-400' : 'bg-yellow-400'}`} />
                        <div className="h-2 w-10 bg-zinc-200 rounded dark:bg-zinc-600" />
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
