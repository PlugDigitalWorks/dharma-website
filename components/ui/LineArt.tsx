'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { LineArtName } from '@/lib/types';
import { lineArt } from './line-art-paths';

type Props = {
  name: LineArtName;
  className?: string;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
  /** "view": draw when scrolled into view. "mount": draw immediately. */
  trigger?: 'view' | 'mount';
};

/** A hand-drawn illustration that draws itself stroke by stroke. */
export function LineArt({
  name,
  className,
  strokeWidth = 2,
  delay = 0,
  duration = 1.8,
  trigger = 'view',
}: Props) {
  const reduced = useReducedMotion();
  const shape = lineArt[name];
  const count = shape.paths.length;

  return (
    <motion.svg
      viewBox={shape.viewBox}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      initial={reduced ? 'drawn' : 'hidden'}
      {...(trigger === 'mount'
        ? { animate: 'drawn' }
        : { whileInView: 'drawn', viewport: { once: true, amount: 0.4 } })}
    >
      {shape.paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            drawn: {
              pathLength: 1,
              opacity: 1,
              transition: {
                pathLength: { delay: delay + (i / count) * duration * 0.6, duration: duration * 0.4, ease: 'easeInOut' },
                opacity: { delay: delay + (i / count) * duration * 0.6, duration: 0.01 },
              },
            },
          }}
        />
      ))}
      {shape.dots.map(([cx, cy, r], i) => (
        <motion.circle
          key={`dot-${i}`}
          cx={cx}
          cy={cy}
          r={r}
          fill="currentColor"
          stroke="none"
          variants={{
            hidden: { opacity: 0 },
            drawn: { opacity: 1, transition: { delay: delay + duration * 0.9, duration: 0.3 } },
          }}
        />
      ))}
    </motion.svg>
  );
}
