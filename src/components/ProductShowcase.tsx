import { Container } from "./Container";
import Image from "next/image";

const featureBlocks = [
  {
    title: 'Core Vocabulary Grid',
    description: 'Build a communication board that fits you. Add personal photos, choose comfortable colors, and record familiar voices to make every button your own.',
    imageSrc: '/assets/images/samples/aac-custom-form.png',
    imageAlt: 'AAC Custom Form Interface',
    align: 'right'
  },
  {
    title: 'Tools for Calm and Focus',
    description: 'Manage overwhelm the moment it happens. Access built-in breathing guides, emotion cards, and digital fidgets to regain focus and return to a calm state.',
    imageSrc: '/assets/images/samples/breathing-control.png',
    imageAlt: 'Breathing Control Interface',
    secondaryImages: ['/assets/images/samples/emotion card.png', '/assets/images/samples/fidget-nav.png'],
    align: 'left'
  },
  {
    title: 'Interactive Practice',
    description: 'Practice social interactions in a low-pressure environment. Play structured games like Tic-Tac-Toe to build confidence before real-world conversations.',
    imageSrc: '/assets/images/samples/tik-tak-toe.png',
    imageAlt: 'Tic-Tac-Toe Social Game',
    secondaryImages: ['/assets/images/samples/synonym.png'],
    align: 'right'
  }
];

export function ProductShowcase() {
  return (
    <div id="how-it-works" className="py-24 bg-white dark:bg-zinc-900/50 overflow-hidden sm:py-32">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
          <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight sm:text-4xl font-display dark:text-zinc-100">
            More than just a voice.
          </h2>
          <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400">
            Communicate clearly and stay grounded. Skillio provides a customizable communication grid, instant emotional support tools, and interactive activities to help you navigate every interaction.
          </p>
        </div>

        <div className="space-y-24 lg:space-y-32">
          {featureBlocks.map((feature, index) => (
            <div key={feature.title} className={`lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center ${feature.align === 'left' ? '' : 'lg:grid-flow-col-dense'}`}>
              
              <div className={`mt-10 lg:mt-0 ${feature.align === 'left' ? 'lg:col-start-2' : 'lg:col-start-1'}`}>
                <h3 className="text-2xl font-bold font-display text-zinc-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                  {feature.description}
                </p>
              </div>

              <div className={`relative ${feature.align === 'left' ? 'lg:col-start-1' : 'lg:col-start-2'}`}>
                {/* Decorative background blob */}
                <div className={`absolute top-1/2 -translate-y-1/2 w-[120%] h-[120%] blur-3xl rounded-full -z-10 opacity-50 ${index % 3 === 0 ? 'bg-orange-500/20 left-0' : index % 3 === 1 ? 'bg-pink-500/20 right-0' : 'bg-indigo-500/20 left-0'}`} />
                
                <div className="relative">
                  {/* Primary Image */}
                  <div className="card-soft overflow-hidden p-2">
                     <div className="rounded-[1.5rem] overflow-hidden">
                     <Image 
                        src={feature.imageSrc} 
                        alt={feature.imageAlt}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover"
                     />
                     </div>
                  </div>
                  
                  {/* Secondary Floating Images (if any) */}
                  {feature.secondaryImages && feature.secondaryImages.length > 0 && (
                    <div className="absolute -bottom-6 -right-6 w-1/2 card-soft overflow-hidden p-2 z-10 hidden sm:block">
                      <div className="rounded-3xl overflow-hidden">
                      <Image 
                        src={feature.secondaryImages[0]} 
                        alt="Secondary feature"
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover"
                      />
                      </div>
                    </div>
                  )}
                  {feature.secondaryImages && feature.secondaryImages.length > 1 && (
                    <div className="absolute -top-6 -left-6 w-[40%] card-soft overflow-hidden p-2 z-10 hidden sm:block">
                      <div className="rounded-3xl overflow-hidden">
                      <Image 
                        src={feature.secondaryImages[1]} 
                        alt="Additional feature"
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover"
                      />
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
