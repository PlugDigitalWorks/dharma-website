import Image from 'next/image';
import { LineArt } from '@/components/ui/LineArt';
import { RevealLines } from '@/components/ui/Reveal';
import type { WhatWeDoContent } from '@/lib/types';

/** Three cards that stack on top of each other as you scroll (desktop). */
export function WhatWeDo({ content }: { content: WhatWeDoContent }) {
  const last = content.cards.length - 1;
  return (
    <section id="what-we-do" className="mx-auto max-w-[1440px] px-4 pt-32 pb-24 md:px-12 md:pt-40">
      <div className="mb-12 flex items-end justify-between gap-6">
        <RevealLines lines={[content.title]} className="font-display text-5xl md:text-7xl" />
        <span className="hidden text-xs font-semibold tracking-[0.14em] text-stone md:block">{content.eyebrow}</span>
      </div>
      <div className="flex flex-col gap-6 md:gap-0">
        {content.cards.map((card, i) => {
          const dark = card.tone === 'dark';
          return (
            <article
              key={card.id}
              className={`grid overflow-hidden rounded-lg border border-charcoal/25 md:sticky md:h-[520px] md:grid-cols-2 md:shadow-[0_-12px_40px_rgba(0,0,0,0.08)] ${dark ? 'bg-charcoal text-chalk' : 'bg-chalk'} ${i < last ? 'md:mb-[28vh]' : ''}`}
              style={{ top: `calc(104px + ${i * 88}px)` }}
            >
              <div className="flex flex-col justify-between gap-6 p-6 md:gap-10 md:p-12">
                <div>
                  <h3 className="flex items-baseline gap-5">
                    <span className={`text-xs font-semibold tracking-[0.14em] ${dark ? 'text-chalk/60' : 'text-stone'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-4xl md:text-5xl">{card.title}</span>
                  </h3>
                  <p className={`mt-5 max-w-sm leading-relaxed ${dark ? 'text-chalk/75' : 'text-stone'}`}>{card.text}</p>
                </div>
                <LineArt name={card.art} className="w-20 md:w-44" />
              </div>
              <div className="relative aspect-[4/3] md:aspect-auto">
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
