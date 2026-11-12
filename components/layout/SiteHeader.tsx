'use client';

import { Dialog } from '@base-ui/react/dialog';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { LineArt } from '@/components/ui/LineArt';
import { Logo } from '@/components/ui/Logo';
import { EASE_OUT_SOFT } from '@/components/ui/Reveal';
import type { Link } from '@/lib/types';

export function SiteHeader({ nav, orderUrl }: { nav: Link[]; orderUrl: string }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40));

  const visit = nav.find((l) => l.href === '#visit');
  const primary = nav.filter((l) => l !== visit);

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${scrolled ? 'bg-chalk/85 backdrop-blur-md' : 'bg-transparent'}`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT_SOFT }}
    >
      <div className="mx-auto grid h-18 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-4 md:px-12">
        <nav aria-label="Main" className="hidden gap-8 text-[15px] lg:flex">
          {primary.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-stone">
              {link.label}
            </a>
          ))}
        </nav>

        <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Dialog.Trigger className="min-h-11 min-w-11 cursor-pointer justify-self-start text-left text-[15px] lg:hidden">
            Menu
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop className="fixed inset-0 z-50 bg-charcoal/30 transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0" />
            <Dialog.Popup className="fixed inset-0 z-50 flex flex-col bg-chalk px-6 pt-6 pb-10 transition-[opacity,transform] duration-500 ease-out-soft data-ending-style:opacity-0 data-starting-style:translate-y-4 data-starting-style:opacity-0">
              <div className="flex items-center justify-between">
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <Logo className="w-28" />
                <Dialog.Close className="min-h-11 cursor-pointer text-[15px]">Close</Dialog.Close>
              </div>
              <LineArt name="pendant-lamps" trigger="mount" className="mx-auto mt-6 w-40" duration={1.2} />
              <nav aria-label="Mobile" className="mt-auto flex flex-col gap-3">
                {nav.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-5xl leading-tight"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <ButtonLink href={orderUrl} className="mt-10 w-full">
                Order online
              </ButtonLink>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>

        <a href="#top" aria-label="Dharma, back to top" className="justify-self-center py-3">
          <Logo className="w-24 md:w-36" />
        </a>

        <div className="flex items-center justify-self-end gap-6 text-[15px]">
          {visit && (
            <a href={visit.href} className="hidden hover:text-stone lg:inline">
              {visit.label}
            </a>
          )}
          <ButtonLink href={orderUrl} className="min-h-10 px-5 text-sm whitespace-nowrap">
            Order<span className="max-sm:hidden">&nbsp;online</span>
          </ButtonLink>
        </div>
      </div>
    </motion.header>
  );
}
