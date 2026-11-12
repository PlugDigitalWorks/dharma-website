'use client';

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { LineArt } from '@/components/ui/LineArt';
import { Logo } from '@/components/ui/Logo';
import { OpenStatus } from '@/components/ui/OpenStatus';
import { EASE_OUT_SOFT } from '@/components/ui/Reveal';
import { dayRangeLabel, formatTime, groupHours } from '@/lib/hours';
import type { FooterContent, SiteInfo } from '@/lib/types';

const heading = 'mb-3 text-xs font-semibold tracking-[0.14em] text-chalk/50';

/** The shop dog that trots along the wordmark, following the pointer. */
function WordmarkDog() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [width, setWidth] = useState(0);
  const [pets, setPets] = useState(0);
  const petTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const lastTouch = useRef(0);

  const x = useSpring(0, { stiffness: 45, damping: 16, mass: 1.2 });
  const facing = useSpring(1, { stiffness: 300, damping: 30 });
  const bob = useTransform(x, (v) => -(Math.abs(Math.sin(v / 16)) * 7));
  const tilt = useTransform(x, (v) => Math.sin(v / 16) * 3);
  const dogWidth = Math.max(width * 0.085, 56);
  const left = useTransform(x, (v) => v - dogWidth / 2);
  const clamp = (v: number) => Math.min(Math.max(v, dogWidth / 2), width - dogWidth / 2);
  const home = width - dogWidth / 2 - width * 0.01;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (width) x.jump(width - Math.max(width * 0.085, 56) / 2 - width * 0.01);
  }, [width, x]);

  // On touch screens the dog wanders on its own when nobody is playing with it.
  useEffect(() => {
    if (reduced || !inView || !width || !window.matchMedia('(hover: none)').matches) return;
    const id = setInterval(() => {
      if (Date.now() - lastTouch.current < 5000) return;
      x.set(clamp(dogWidth / 2 + Math.random() * (width - dogWidth)));
    }, 3200);
    return () => clearInterval(id);
  }, [reduced, inView, width, dogWidth]);

  // Turn around when changing direction, and press the letters it walks over.
  useMotionValueEvent(x, 'change', (v) => {
    const velocity = x.getVelocity();
    if (Math.abs(velocity) > 30) facing.set(velocity > 0 ? 1 : -1);
    const letters = ref.current?.querySelectorAll<SVGPathElement>('#Name > path');
    const offset = ref.current?.getBoundingClientRect().left ?? 0;
    letters?.forEach((letter) => {
      const box = letter.getBoundingClientRect();
      letter.classList.toggle('is-pressed', v + offset >= box.left - 6 && v + offset <= box.right + 6);
    });
  });

  const follow = (e: PointerEvent) => {
    if (!reduced && ref.current) x.set(clamp(e.clientX - ref.current.getBoundingClientRect().left));
  };

  return (
    <motion.div
      ref={ref}
      className="footer-wordmark relative mt-16 touch-pan-y md:mt-24"
      onPointerMove={(e) => e.pointerType === 'mouse' && follow(e)}
      onPointerDown={(e) => {
        if (e.pointerType !== 'mouse') {
          lastTouch.current = Date.now();
          follow(e);
        }
      }}
      onPointerLeave={(e) => e.pointerType === 'mouse' && x.set(home)}
      initial={reduced ? false : { y: '40%', opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.2, ease: EASE_OUT_SOFT }}
    >
      {width > 0 && (
        <motion.div
          className="absolute bottom-[calc(100%-0.6%)] z-10"
          style={{ left, width: dogWidth, y: bob, rotate: tilt }}
        >
          <AnimatePresence>
            {pets > 0 && (
              <motion.div
                key={pets}
                className="pointer-events-none absolute -top-[70%] left-1/2 w-[90%] -translate-x-1/2 text-postbox"
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: -10, scale: 1 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: EASE_OUT_SOFT }}
              >
                <LineArt name="hearts" trigger="mount" duration={0.6} strokeWidth={2.5} />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            type="button"
            aria-label="Pet the shop dog"
            className="block w-full cursor-pointer"
            style={{ scaleX: facing }}
            whileTap={{ scale: 0.92 }}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => {
              lastTouch.current = Date.now();
              setPets((n) => n + 1);
              clearTimeout(petTimer.current);
              petTimer.current = setTimeout(() => setPets(0), 1400);
            }}
          >
            <LineArt name="dog" strokeWidth={2} />
          </motion.button>
        </motion.div>
      )}
      <Logo className="w-full" />
    </motion.div>
  );
}

export function SiteFooter({ site, content }: { site: SiteInfo; content: FooterContent }) {
  const hours = groupHours(site.openingHours);
  return (
    <footer className="relative overflow-hidden bg-charcoal text-chalk">
      <div className="mx-auto max-w-[1440px] px-4 pt-20 pb-8 md:px-12 md:pt-28">
        <div className="flex flex-col gap-8 border-b border-chalk/15 pb-14 md:flex-row md:items-end md:justify-between md:pb-20">
          <p className="font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95]">
            {content.title[0]}
            <br />
            {content.title[1]}
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={site.orderUrl} tone="dark">
              Order online
            </ButtonLink>
            <ButtonLink href={site.mapsUrl} target="_blank" rel="noreferrer" tone="dark" variant="outline">
              {content.directionsLabel}
            </ButtonLink>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 text-[15px] leading-relaxed text-chalk/85 md:grid-cols-4 md:py-16">
          <div className="col-span-2 md:col-span-1">
            <p className={heading}>VISIT</p>
            <p>
              {site.address.street}
              <br />
              {site.address.locality} {site.address.postcode}
            </p>
            <OpenStatus hours={site.openingHours} timeZone={site.timeZone} className="mt-3 text-sm text-chalk/60" />
          </div>
          <div>
            <p className={heading}>HOURS</p>
            <p>
              {hours.map((g, i) => (
                <span key={g.days[0]}>
                  {i > 0 && <br />}
                  {dayRangeLabel(g.days, g.days.length > 1)} {formatTime(g.opens, true)} to {formatTime(g.closes, true)}
                </span>
              ))}
            </p>
          </div>
          <div>
            <p className={heading}>SAY HELLO</p>
            <p className="flex flex-col max-md:-my-2">
              <a href={`mailto:${site.email}`} className="hover:text-chalk/60 max-md:py-2">
                Email us
              </a>
              <a href={site.instagram.url} className="hover:text-chalk/60 max-md:py-2">
                Instagram
              </a>
            </p>
          </div>
          <nav aria-label="Footer" className="col-span-2 md:col-span-1">
            <p className={heading}>EXPLORE</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-1 md:flex-col">
              {site.nav.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-chalk/60 max-md:py-2">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <WordmarkDog />

        <div className="mt-8 flex flex-col gap-2 text-xs text-chalk/50 sm:flex-row sm:justify-between">
          <p>{content.copyright}</p>
          <a
            href={content.poweredBy.href}
            className="self-start underline underline-offset-4 hover:text-chalk max-sm:py-2"
          >
            {content.poweredBy.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
