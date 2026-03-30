import { Container } from "@/components/Container";

export default function TermsPage() {
  return (
    <Container className="mt-32 pb-24">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold font-display tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Terms & Conditions
        </h1>
        <div className="mt-10 prose prose-zinc dark:prose-invert">
          <p>Last updated: March 25, 2026</p>
          <h2>1. Introduction</h2>
          <p>
            Welcome to Skillio. By using our application, you agree to these terms. Please read them carefully.
          </p>
          <h2>2. Use of the App</h2>
          <p>
            Skillio is designed for communication and social skills training. You must use the app in accordance with local laws and for its intended purpose.
          </p>
          <h2>3. Privacy</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy to understand how we handle your data.
          </p>
          <h2>4. Intellectual Property</h2>
          <p>
            All content, features, and functionality of Skillio are the exclusive property of Skillio App and its licensors.
          </p>
          <h2>5. Limitation of Liability</h2>
          <p>
            Skillio is provided &quot;as is&quot; without any warranties. We are not liable for any damages arising from your use of the app.
          </p>
          <h2>6. Changes to Terms</h2>
          <p>
            We may update these terms from time to time. Your continued use of the app constitutes acceptance of the new terms.
          </p>
          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about these terms, please contact us at support@skillio.com.
          </p>
        </div>
      </div>
    </Container>
  );
}
