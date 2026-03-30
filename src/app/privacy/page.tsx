import Link from "next/link";
import { Container } from "@/components/Container";

export default function PrivacyPage() {
  return (
    <div className="relative isolate min-h-full">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[50%] top-0 h-[800px] w-[800px] -translate-x-[50%] rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-[600px] w-[600px] bg-sky-500/5 blur-3xl rounded-full" />
      </div>

      <Container className="pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div className="max-w-3xl">
          <Link 
            href="/" 
            className="group mb-12 inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-teal-600 transition-colors"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Home
          </Link>

          <header className="mb-16">
            <h1 className="text-4xl font-bold font-display tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl lg:text-6xl mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl">
              We believe communication is a fundamental right. We protect your data as fiercely as we champion your voice.
            </p>
            <div className="mt-8 flex items-center gap-2 text-sm text-zinc-400 dark:text-zinc-500 bg-white/50 dark:bg-zinc-900/50 w-fit px-4 py-2 rounded-full border border-zinc-100 dark:border-zinc-800 backdrop-blur-sm">
               <span>Effective: March 30, 2026</span>
            </div>
          </header>

          <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-teal-600 dark:prose-h2:text-teal-500 prose-h2:mt-12 prose-h2:mb-6 prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-400">
            <h2>1. Data Collection</h2>
            <p>
              Skillio is designed with privacy at its core. We understand the sensitive nature of communication data and implement strict protocols to ensure your information remains yours. We do not sell, rent, or trade your personal communication data with third parties.
            </p>
            
            <h2>2. Personal Information</h2>
            <p>
              We collect minimal personal information, typically limited to your email address when you create an account. This is used solely to facilitate cross-device synchronization and account security.
            </p>

            <h2>3. Usage Data</h2>
            <p>
              To improve accessibility and performance, we collect anonymized usage metrics. This data helps us identify common friction points and enhance the sensory experience for all users.
            </p>

            <h2>4. Data Security</h2>
            <p>
              Your data is encrypted both in transit and at rest using industry-standard protocols. We continuously audit our infrastructure to protect against unauthorized access.
            </p>

            <h2>5. Your Rights</h2>
            <p>
              You maintain full ownership of your data. You have the right to export, correct, or permanently delete your account and all associated information at any time via the app settings.
            </p>

            <h2>6. Third-Party Services</h2>
            <p>
              We may utilize trusted third-party providers for secure cloud storage or essential analytics. Each provider is strictly vetted to ensure they meet our privacy standards.
            </p>

            <h2>7. Contact Us</h2>
            <p>
              For any privacy-related inquiries, please reach out directly to our team at <span className="text-teal-600 dark:text-teal-500 font-medium underline decoration-teal-500/20 underline-offset-4">privacy@skillio.com</span>.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
