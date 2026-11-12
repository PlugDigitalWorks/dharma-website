'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

export const EASE_OUT_SOFT = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts its children when they scroll into view. */
export function FadeUp({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, duration: 0.9, ease: EASE_OUT_SOFT }}
    >
      {children}
    </motion.div>
  );
}

const tags = { h1: motion.h1, h2: motion.h2, p: motion.p } as const;

/** Headline whose lines slide up from behind a mask, one after another. */
export function RevealLines({
  lines,
  className,
  delay = 0,
  trigger = 'view',
  as = 'h2',
  srSuffix,
}: {
  lines: readonly string[];
  className?: string;
  delay?: number;
  trigger?: 'view' | 'mount';
  as?: keyof typeof tags;
  /** Extra text for screen readers only. */
  srSuffix?: string;
}) {
  const reduced = useReducedMotion();
  const Tag = tags[as];
  return (
    <Tag
      className={className}
      initial={reduced ? 'shown' : 'hidden'}
      {...(trigger === 'mount'
        ? { animate: 'shown' }
        : { whileInView: 'shown', viewport: { once: true, amount: 0.5 } })}
    >
      {lines.map((line, i) => [
        i > 0 && ' ',
        <span key={i} className="-mb-[0.18em] block pb-[0.18em] [clip-path:inset(-0.6em_-0.3em_0_-0.3em)]">
          <motion.span
            className="block"
            variants={{
              hidden: { y: '140%' },
              shown: { y: 0, transition: { delay: delay + i * 0.12, duration: 1, ease: EASE_OUT_SOFT } },
            }}
          >
            {line}
          </motion.span>
        </span>,
      ])}
      {srSuffix && <span className="sr-only"> {srSuffix}</span>}
    </Tag>
  );
}
