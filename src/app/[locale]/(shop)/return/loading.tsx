import { Container } from "@/components/ui/Container";

export default function ReturnLoading() {
  return (
    <Container className="pt-24 sm:pt-32 pb-20 sm:pb-24 text-center animate-pulse">
      <div className="mb-8 sm:mb-12 flex justify-center">
        <div className="w-20 h-20 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
      </div>
      <div className="h-12 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded-xl mx-auto mb-6 sm:mb-8" />
      <div className="h-6 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded-lg mx-auto mb-10 sm:mb-12" />
      <div className="glass p-8 sm:p-12 rounded-3xl max-w-lg mx-auto h-40" />
    </Container>
  );
}

