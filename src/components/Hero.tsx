import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";

export function Hero() {
  return (
    <div className="relative pt-20 pb-8 lg:pt-32 lg:pb-12">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1>
              <span className="block text-sm font-semibold tracking-wide text-teal-600 uppercase dark:text-teal-400 font-display">
                Communicate Your Way
              </span>
              <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl font-display">
                <span className="block text-zinc-900 dark:text-zinc-100">Find your voice with</span>
                <span className="block gradient-text">Skillio</span>
              </span>
            </h1>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Connect with the world on your terms. Skillio combines customizable communication boards with tools for emotional regulation and social practice, providing support for every interaction.
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
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6">
             {/* Decorative blob background */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-teal-500/10 blur-3xl rounded-full -z-10" />
            
            <div className="relative mx-auto w-4/5 sm:w-2/3 md:w-1/2 lg:w-4/5 xl:w-2/3 card-soft overflow-hidden p-2">
              <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl flex items-center justify-center overflow-hidden border border-zinc-100 dark:border-zinc-800">
                <Image 
                  src="/assets/images/samples/aac.png" 
                  alt="Skillio AAC Interface" 
                  width={1170}
                  height={2532}
                  quality={100}
                  sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 40vw"
                  className="w-full h-auto object-contain bg-zinc-50 dark:bg-zinc-900"
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
