'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { LineArt } from '@/components/ui/LineArt';
import { EASE_OUT_SOFT, RevealLines } from '@/components/ui/Reveal';
import type { HeroContent } from '@/lib/types';

function useIsDesktop() {
  const [desktop, setDesktop] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return desktop;
}

const displayClass = 'font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.92]';

/**
 * Scroll-driven opening: an arched window onto the counter grows to fill the
 * screen while the headline parts to either side.
 */
export function Hero({ content }: { content: HeroContent }) {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLDivElement>(null);
  const desktop = useIsDesktop();
  const reduced = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const [box, setBox] = useState({ w: 1440, h: 900, titleBottom: 0 });

  useEffect(() => {
    const measure = () => {
      const s = stage.current?.getBoundingClientRect();
      const t = title.current?.getBoundingClientRect();
      if (s) setBox({ w: s.width, h: s.height, titleBottom: t ? t.bottom - s.top : 0 });
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (stage.current) observer.observe(stage.current);
    if (title.current) observer.observe(title.current);
    return () => observer.disconnect();
  }, [desktop]);

  // Arch geometry: starts as a window, ends as the full viewport.
  const gap = box.h * (desktop ? 0.04 : 0.03);
  const archH = desktop ? box.h * 0.7 : Math.max(box.h - box.titleBottom - 28 - gap, 240);
  const archW = desktop ? box.w * 0.36 : Math.min(box.w - 32, archH * 0.78);

  const width = useTransform(p, [0, 0.6], [archW, box.w]);
  const height = useTransform(p, [0, 0.6], [archH, box.h]);
  const bottom = useTransform(p, [0, 0.6], [gap, 0]);
  const radius = useTransform(p, [0, 0.6], [archW / 2, 0]);
  const imageScale = useTransform(p, [0, 0.6], [1.15, 1]);
  const leftX = useTransform(p, [0, 0.45], ['0vw', '-30vw']);
  const rightX = useTransform(p, [0, 0.45], ['0vw', '30vw']);
  const titleOpacity = useTransform(p, [0, 0.35], [1, 0]);
  const chromeOpacity = useTransform(p, [0, 0.12], [1, 0]);
  const shade = useTransform(p, [0.55, 0.8], [0, 0.4]);
  const insideOpacity = useTransform(p, [0.62, 0.82], [0, 1]);
  const insideY = useTransform(p, [0.62, 0.82], [40, 0]);

  return (
    <section ref={section} id="top" className={reduced ? 'relative' : 'relative h-[260vh]'} aria-label="Welcome">
      <div ref={stage} className="sticky top-0 h-svh overflow-hidden">
        <motion.div
          className="absolute left-1/2 z-10 -translate-x-1/2 overflow-hidden"
          style={{ width, height, bottom, borderTopLeftRadius: radius, borderTopRightRadius: radius }}
        >
          <motion.div
            className="absolute inset-0"
            initial={reduced ? false : { clipPath: 'inset(100% 0 0 0)' }}
            animate={{ clipPath: 'inset(0% 0 0 0)' }}
            transition={{ duration: 1.4, delay: 0.3, ease: EASE_OUT_SOFT }}
          >
            <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
              <Image src={content.image.src} alt={content.image.alt} fill preload sizes="100vw" className="object-cover" />
            </motion.div>
          </motion.div>
          <motion.div className="absolute inset-0 bg-charcoal" style={{ opacity: shade }} />
          <motion.div
            className="absolute inset-x-4 bottom-10 flex flex-col gap-6 text-chalk md:inset-x-12 md:bottom-14 md:flex-row md:items-end md:justify-between"
            style={{ opacity: insideOpacity, y: insideY }}
          >
            <p className="font-display text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.92]">
              {content.insideTitle[0]}
              <br />
              {content.insideTitle[1]}
            </p>
            <p className="max-w-xs text-base leading-relaxed text-chalk/85">{content.insideText}</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute left-1/2 z-20 w-[min(15vw,220px)] -translate-x-1/2 max-lg:hidden"
          style={{ opacity: chromeOpacity, top: 'calc(26vh - min(15vw,220px) * 0.82)' }}
        >
          <LineArt name="pendant-lamps" trigger="mount" delay={0.9} />
        </motion.div>
        <motion.div
          className="absolute z-20 w-[min(12vw,170px)] max-lg:hidden"
          style={{ opacity: chromeOpacity, left: 'calc(50% + 15vw)', bottom: '1vh' }}
        >
          <LineArt name="dog" trigger="mount" delay={1.4} />
        </motion.div>

        <motion.div
          ref={title}
          className="absolute z-0 max-lg:inset-x-4 max-lg:top-24 lg:top-[30vh] lg:left-12"
          style={{ x: leftX, opacity: titleOpacity }}
        >
          <RevealLines
            as="h1"
            trigger="mount"
            delay={0.5}
            lines={desktop ? content.titleDesktop : content.titleMobile}
            srSuffix={content.srSuffix}
            className={displayClass}
          />
        </motion.div>
        {desktop && (
          <motion.div
            className="absolute top-[48vh] right-12 z-0 text-right"
            style={{ x: rightX, opacity: titleOpacity }}
          >
            <RevealLines as="p" trigger="mount" delay={0.74} lines={content.subtitleDesktop} className={displayClass} />
          </motion.div>
        )}

        <motion.p
          className="absolute bottom-12 left-12 max-w-[22rem] text-[15px] leading-relaxed text-stone max-lg:hidden"
          style={{ opacity: chromeOpacity }}
        >
          {content.intro}
        </motion.p>
        <motion.span
          className="absolute right-12 bottom-12 text-xs font-semibold tracking-[0.14em] text-stone max-lg:hidden"
          style={{ opacity: chromeOpacity }}
        >
          {content.scrollHint}
        </motion.span>
      </div>
    </section>
  );
}
