import { Container } from "@/components/Container";

export default function PrivacyPage() {
  return (
    <Container className="mt-32 pb-24">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold font-display tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Privacy Policy
        </h1>
        <div className="mt-10 prose prose-zinc dark:prose-invert">
          <p>Last updated: March 25, 2026</p>
          <h2>1. Data Collection</h2>
          <p>
            Skillio is designed with privacy in mind. We do not sell your personal communication data.
          </p>
          <h2>2. Personal Information</h2>
          <p>
            We may collect minimal personal information such as your email address when you create an account to sync your settings across devices.
          </p>
          <h2>3. Usage Data</h2>
          <p>
            We collect anonymized usage data to improve the app&apos;s functionality and accessibility.
          </p>
          <h2>4. Data Security</h2>
          <p>
            We use industry-standard security measures to protect your information.
          </p>
          <h2>5. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal data. Contact us to exercise these rights.
          </p>
          <h2>6. Third-Party Services</h2>
          <p>
            Skillio may use third-party services for analytics or cloud storage. These services have their own privacy policies.
          </p>
          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@skillio.com.
          </p>
        </div>
      </div>
    </Container>
  );
}
