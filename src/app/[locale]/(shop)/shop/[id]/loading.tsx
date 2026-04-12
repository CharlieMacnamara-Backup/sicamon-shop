import { Container } from "@/components/ui/Container";

export default function ProductLoading() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen pt-24 sm:pt-32 pb-20 sm:pb-24">
      <Container className="py-12 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="aspect-4/5 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-3xl" />
          <div className="space-y-8 flex flex-col justify-center">
            <div className="h-20 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse" />
            <div className="h-10 w-1/4 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
            <div className="space-y-4">
              <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
            </div>
            <div className="h-16 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
          </div>
        </div>
      </Container>
    </div>
  );
}

