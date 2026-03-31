import { Container } from "./Container";
import Image from "next/image";

const featureBlocks = [
  {
    title: 'Your Voice, Your Way',
    description: 'Speak your mind. Build sentences with a tap. Select from customizable symbol grids and expand your vocabulary on the fly.',
    imageSrc: '/assets/images/samples/aac.png',
    imageAlt: 'Skillio AAC Communication Board with customizable grid and symbol support',
    secondaryImages: ['/assets/images/samples/aac-custom-form.png', '/assets/images/samples/synonym.png'],
    align: 'right'
  },
  {
    title: 'Master Breath',
    description: 'Find calm. Follow the motion. Use digital fidgets and breathing guides to stay focused and center your thoughts.',
    imageSrc: '/assets/images/samples/breathing-control.png',
    imageAlt: 'Skillio Breathing Control Visual Tool for sensory regulation',
    secondaryImages: ['/assets/images/samples/fidget-nav.png'],
    align: 'left'
  },
  {
    title: 'Step into the Frame',
    description: 'Match the moment. Align your reflection. Interactive cards for identifying and sharing feelings in a safe space.',
    imageSrc: '/assets/images/samples/emotion card.png',
    imageAlt: 'Skillio Emotion Cards Interface showing interactive social practice',
    secondaryImages: [],
    align: 'right'
  },
  {
    title: 'Master the Studio',
    description: 'Refine your voice. Capture and play back with Echo Studio. Master difficult phrases step by step.',
    imageSrc: '/assets/images/samples/studio.png',
    imageAlt: 'Skillio Echo Studio Recording and Voice Analysis Interface',
    secondaryImages: [],
    align: 'left'
  },
  {
    title: 'Outsmart the Play',
    description: 'Play for connection. Take turns and build social strategies through shared games and activities.',
    imageSrc: '/assets/images/samples/tik-tak-toe.png',
    imageAlt: 'Tik-Tac-Toe Interactive Game',
    secondaryImages: [],
    align: 'right'
  }
];

export function ProductShowcase() {
  return (
    <div id="how-it-works" className="py-24 bg-white dark:bg-zinc-900/50 overflow-hidden sm:py-32">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
          <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight sm:text-4xl font-display dark:text-zinc-100">
            A Complete Toolkit.
          </h2>
          <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400">
            Explore activities and games designed for connection. From everyday conversations to dedicated sound practice and emotional regulation, discover every tool inside.
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
                  <div className="card-soft overflow-hidden p-2 mx-auto w-4/5 sm:w-2/3 md:w-1/2 lg:w-4/5 xl:w-2/3">
                     <div className="rounded-3xl overflow-hidden relative border border-zinc-100 dark:border-zinc-800">
                     <Image 
                        src={feature.imageSrc} 
                        alt={feature.imageAlt}
                        width={1170}
                        height={2532}
                        quality={100}
                        sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 33vw"
                        className="w-full h-auto object-contain bg-zinc-50 dark:bg-zinc-900"
                     />
                     </div>
                  </div>
                  
                  {/* Secondary Floating Images (if any) */}
                  {feature.secondaryImages && feature.secondaryImages.length > 0 && (
                    <div className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 md:-bottom-12 md:-right-12 w-2/5 lg:w-1/2 xl:w-2/5 card-soft overflow-hidden p-1.5 z-10 hidden sm:block">
                      <div className="rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
                      <Image 
                        src={feature.secondaryImages[0]} 
                        alt="Secondary Skillio interface feature showing customization"
                        width={1170}
                        height={2532}
                        quality={100}
                        sizes="(max-width: 1024px) 20vw, 15vw"
                        className="w-full h-auto object-contain bg-zinc-50 dark:bg-zinc-900"
                      />
                      </div>
                    </div>
                  )}
                  {feature.secondaryImages && feature.secondaryImages.length > 1 && (
                    <div className="absolute -top-6 -left-6 sm:-top-10 sm:-left-10 md:-top-12 md:-left-12 w-2/5 lg:w-1/2 xl:w-2/5 card-soft overflow-hidden p-1.5 z-10 hidden sm:block">
                      <div className="rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
                      <Image 
                        src={feature.secondaryImages[1]} 
                        alt="Additional Skillio interface feature showing synonyms"
                        width={1170}
                        height={2532}
                        quality={100}
                        sizes="(max-width: 1024px) 20vw, 15vw"
                        className="w-full h-auto object-contain bg-zinc-50 dark:bg-zinc-900"
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
