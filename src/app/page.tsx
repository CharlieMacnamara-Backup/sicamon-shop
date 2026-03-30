import { Hero } from "@/components/Hero";
import { ProductShowcase } from "@/components/ProductShowcase";
import { CTASection } from "@/components/CTASection";
import { Container } from "@/components/Container";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />
      
      <Container id="features">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 rounded-3xl glass border-indigo-100 dark:border-indigo-900/30">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-bold font-display mb-2">Beautifully Simple</h3>
            <p className="text-zinc-500 dark:text-zinc-400">Designed with modern aesthetics that make communication delightful and less intimidating.</p>
          </div>
          <div className="p-8 rounded-3xl glass border-purple-100 dark:border-purple-900/30">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold font-display mb-2">Fast & Responsive</h3>
            <p className="text-zinc-500 dark:text-zinc-400">Zero lag time between thought and expression. Speed is our top priority for accessibility.</p>
          </div>
          <div className="p-8 rounded-3xl glass border-teal-100 dark:border-teal-900/30">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-bold font-display mb-2">Universal Design</h3>
            <p className="text-zinc-500 dark:text-zinc-400">Built for everyone. Highly customizable to meet diverse physical and cognitive needs.</p>
          </div>
        </div>
      </Container>

      <ProductShowcase />
      
      <CTASection />
    </div>
  );
}


