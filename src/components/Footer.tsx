import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="mt-32 flex-none">
      <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
              <a href="#how-it-works" className="transition hover:text-indigo-600 dark:hover:text-indigo-400">Features</a>
              <a href="/privacy" className="transition hover:text-indigo-600 dark:hover:text-indigo-400">Privacy Policy</a>
              <a href="/terms" className="transition hover:text-indigo-600 dark:hover:text-indigo-400">Terms of Service</a>
            </div>
            <p className="text-sm text-zinc-400 dark:text-zinc-500">
              © 2026 Skillio App. Empowering voices everywhere.
            </p>
          </div>
        </Container>
      </div>
    </footer>
  )
}
