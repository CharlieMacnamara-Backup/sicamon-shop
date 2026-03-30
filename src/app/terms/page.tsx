import Link from "next/link";
import { Container } from "@/components/Container";

export default function TermsPage() {
  return (
    <div className="relative isolate min-h-full">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[50%] top-0 h-[800px] w-[800px] -translate-x-[50%] rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute left-0 bottom-0 h-[600px] w-[600px] bg-purple-500/5 blur-3xl rounded-full" />
      </div>

      <Container className="pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div className="max-w-3xl">
          <Link 
            href="/" 
            className="group mb-12 inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-indigo-600 transition-colors"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Home
          </Link>

          <header className="mb-16">
            <h1 className="text-4xl font-bold font-display tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl lg:text-6xl mb-6">
              Terms & Conditions
            </h1>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl">
              By using Skillio, you join a community built on respect, inclusion, and the empowerment of every voice.
            </p>
            <div className="mt-8 flex items-center gap-2 text-sm text-zinc-400 dark:text-zinc-500 bg-white/50 dark:bg-zinc-900/50 w-fit px-4 py-2 rounded-full border border-zinc-100 dark:border-zinc-800 backdrop-blur-sm">
               <span>Last Revised: March 30, 2026</span>
            </div>
          </header>

          <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-indigo-600 dark:prose-h2:text-indigo-500 prose-h2:mt-12 prose-h2:mb-6 prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-400">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using Skillio, you agree to be bound by these Terms. If you do not agree to all the terms and conditions, you may not use the application.
            </p>
            
            <h2>2. Description of Service</h2>
            <p>
              Skillio provides tools for Augmentative and Alternative Communication (AAC), social skills training, and emotional regulation. We reserve the right to modify or discontinue features at our discretion to better serve the community.
            </p>

            <h2>3. User Responsibilities</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials. You agree to use the app in a way that respects the rights of others and complies with all applicable local and international laws.
            </p>

            <h2>4. Intellectual Property</h2>
            <p>
              The Skillio name, logo, and all original content are the exclusive property of Skillio App. You are granted a limited, non-exclusive license to use the app for personal, non-commercial purposes.
            </p>

            <h2>5. Limitation of Liability</h2>
            <p>
              Skillio is provided on an &quot;as is&quot; and &quot;as available&quot; basis. While we strive for 100% uptime and accuracy, we cannot guarantee the service will be error-free or uninterrupted.
            </p>

            <h2>6. Governing Law</h2>
            <p>
              These terms are governed by the laws of the jurisdiction in which the company is registered, without regard to its conflict of law provisions.
            </p>

            <h2>7. Contact Information</h2>
            <p>
              For support or legal inquiries, please contact us at <span className="text-indigo-600 dark:text-indigo-500 font-medium underline decoration-indigo-500/20 underline-offset-4">support@skillio.com</span>.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
