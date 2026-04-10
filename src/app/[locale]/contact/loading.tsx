import { Container } from "@/components/ui/Container";

export default function ContactLoading() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen pt-32 pb-24 animate-pulse">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="h-16 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-2xl mb-12" />
          <div className="h-48 w-full bg-zinc-200 dark:bg-zinc-800 rounded-[3rem] mb-12" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-[3rem]" />
            <div className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-[3rem]" />
          </div>
        </div>
      </Container>
    </div>
  );
}
