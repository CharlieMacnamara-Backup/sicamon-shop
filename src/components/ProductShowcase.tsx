import { Container } from "./Container";

const features = [
  {
    name: 'Intuitive AAC Grid',
    description: 'A customizable core-vocabulary based grid that evolves with the user. Easy to personalize with images and recorded speech.',
    icon: (props: React.ComponentPropsWithoutRef<'svg'>) => (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 10h1m-1 4h1m4-4h1m-1 4h1m-7 4h12a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    color: 'bg-orange-500',
  },
  {
    name: 'Social Scenarios',
    description: 'Interactive social stories and role-play activities to help bridge the gap between communication and connection.',
    icon: (props: React.ComponentPropsWithoutRef<'svg'>) => (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: 'bg-pink-500',
  },
  {
    name: 'Real-time Progress',
    description: 'Track communication growth with insightful analytics. Identify strengths and areas for more focused practice.',
    icon: (props: React.ComponentPropsWithoutRef<'svg'>) => (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: 'bg-indigo-500',
  },
];

export function ProductShowcase() {
  return (
    <div id="how-it-works" className="py-16 bg-white dark:bg-zinc-900/50 overflow-hidden lg:py-24">
      <Container>
        <div className="relative">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="relative">
              <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight sm:text-4xl font-display dark:text-zinc-100">
                More than just a voice.
              </h2>
              <p className="mt-3 text-lg text-zinc-500 dark:text-zinc-400">
                Skillio is designed for meaningful interaction. Our unique approach merges AAC functionality with actionable social skill coaching.
              </p>

              <dl className="mt-10 space-y-10">
                {features.map((feature) => (
                  <div key={feature.name} className="relative">
                    <dt>
                      <div className={`absolute flex items-center justify-center h-12 w-12 rounded-xl text-white ${feature.color}`}>
                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-semibold text-zinc-900 dark:text-zinc-100">{feature.name}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-zinc-500 dark:text-zinc-400">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
              <div className="absolute left-1/2 -translate-x-1/2 translate-y-16 w-[120%] h-[120%] bg-teal-500/10 blur-3xl rounded-full -z-10" />
              <div className="relative mx-auto w-full px-4 lg:px-0">
                 <div className="rounded-3xl shadow-xl ring-1 ring-zinc-900/5 overflow-hidden glass p-4 aspect-square flex items-center justify-center">
                    <div className="text-center">
                       <span className="text-6xl mb-4 block">🤝</span>
                       <h3 className="text-xl font-bold font-display dark:text-white">Social Interaction View</h3>
                       <p className="text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto mt-2">Connecting people through facilitated conversations and cues.</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
