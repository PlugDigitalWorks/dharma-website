'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { Fragment, useRef } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { LineArt } from '@/components/ui/LineArt';
import { EASE_OUT_SOFT, RevealLines } from '@/components/ui/Reveal';
import type { WalkingClubContent } from '@/lib/types';

export function WalkingClub({ content }: { content: WalkingClubContent }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const walkerLeft = useTransform(scrollYProgress, [0.15, 0.85], ['-5%', '55%']);
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section
      id="walking-club"
      ref={ref}
      className="relative grid overflow-hidden bg-charcoal text-chalk lg:min-h-[920px] lg:grid-cols-[40%_1fr]"
    >
      <div className="relative z-10 flex flex-col justify-center gap-8 px-4 pt-24 pb-16 md:px-12 lg:pb-40">
        <p className="text-xs font-semibold tracking-[0.14em] text-chalk/60">{content.eyebrow}</p>
        <RevealLines lines={content.title} className="font-display text-[clamp(3rem,5.2vw,5.5rem)] leading-[0.92]" />
        <p className="leading-relaxed text-chalk/80">
          {content.lines.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && (
                <>
                  <br className="hidden sm:block" />{' '}
                </>
              )}
              {line}
            </Fragment>
          ))}
        </p>
        <ButtonLink href={content.cta.href} target="_blank" rel="noreferrer" tone="dark" className="self-start">
          {content.cta.label}
        </ButtonLink>
        <div className="relative mt-4 lg:hidden">
          <LineArt name="walking-club" className="ml-auto w-28 translate-y-2" />
          <div className="h-px bg-chalk/80" />
        </div>
      </div>

      <div className="relative min-h-[70vh] overflow-hidden">
        <motion.div className="absolute -inset-y-[8%] inset-x-0" style={{ y: imageY }}>
          <Image
            src={content.image.src}
            alt={content.image.alt}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-4 bottom-20 z-20 md:inset-x-12 max-lg:hidden">
        <motion.div className="absolute bottom-0 w-36" style={{ left: walkerLeft }}>
          <LineArt name="walking-club" className="w-full translate-y-2" />
        </motion.div>
        <motion.div
          className="h-px origin-left bg-chalk"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE_OUT_SOFT }}
        />
      </div>
    </section>
  );
}
