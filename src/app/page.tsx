import { Hero } from "@/components/Hero";
import { ProductShowcase } from "@/components/ProductShowcase";
import { CTASection } from "@/components/CTASection";
import { Container } from "@/components/Container";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-20">
      <Hero />
      
      <Container id="features">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-8">
          <div className="p-8 card-soft">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-bold font-display mb-2">Sensory-Safe Design</h3>
            <p className="text-zinc-500 dark:text-zinc-400">Experience a calm design. Soft colors and clear structure reduce fatigue for all users.</p>
          </div>
          <div className="p-8 card-soft">
            <div className="text-4xl mb-4">🧘</div>
            <h3 className="text-xl font-bold font-display mb-2">Built-in Regulation</h3>
            <p className="text-zinc-500 dark:text-zinc-400">Find peace in the noise. Instant access to breathing guides and digital fidgets to maintain focus.</p>
          </div>
          <div className="p-8 card-soft">
            <div className="text-4xl mb-4">🕹️</div>
            <h3 className="text-xl font-bold font-display mb-2">Practice Made Play</h3>
            <p className="text-zinc-500 dark:text-zinc-400">Build skills through play. Structured activities for safe, pressure-free communication practice.</p>
          </div>
        </div>
      </Container>

      <ProductShowcase />
      
      <CTASection />
    </div>
  );
}


