'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';
import { LineArt } from '@/components/ui/LineArt';
import { RevealLines } from '@/components/ui/Reveal';
import type { GalleryPhoto, ThisWeekContent } from '@/lib/types';

function ParallaxPhoto({ photo, progress }: { photo: GalleryPhoto; progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], [photo.speed, -photo.speed]);
  return (
    <motion.div
      className="absolute overflow-hidden rounded"
      style={{
        left: `${photo.x}%`,
        top: `${photo.y}%`,
        width: `${photo.w}%`,
        aspectRatio: photo.wide ? '360 / 280' : '4 / 5',
        y,
      }}
    >
      <Image src={photo.src} alt={photo.alt} fill sizes="25vw" className="object-cover" />
    </motion.div>
  );
}

/** Instagram-style collage of the week, with parallax on desktop. */
export function ThisWeek({ content, instagramUrl }: { content: ThisWeekContent; instagramUrl: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  return (
    <section ref={ref} className="border-t border-charcoal/25">
      <div className="relative mx-auto max-w-[1440px] px-4 py-24 md:px-12 lg:aspect-[1440/860] lg:p-0">
        <div className="lg:absolute lg:top-[14%] lg:left-12">
          <RevealLines lines={content.title} className="font-display text-[clamp(2.75rem,5.5vw,5rem)] leading-[0.95]" />
          <a
            href={instagramUrl}
            className="mt-4 inline-block py-2 text-[15px] underline underline-offset-4 hover:text-stone"
          >
            {content.followLabel}
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 lg:hidden">
          {content.photos.slice(0, 4).map((photo) => (
            <div key={photo.src} className="relative aspect-[4/5] overflow-hidden rounded">
              <Image src={photo.src} alt={photo.alt} fill sizes="50vw" className="object-cover" />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 max-lg:hidden">
          {content.photos.map((photo) => (
            <ParallaxPhoto key={photo.src} photo={photo} progress={scrollYProgress} />
          ))}
          <LineArt name="hearts" className="absolute top-[64%] left-[52%] w-[7%]" />
          <LineArt name="steam" className="absolute top-[64%] left-[82%] w-[8%]" delay={0.3} />
        </div>
      </div>
    </section>
  );
}
