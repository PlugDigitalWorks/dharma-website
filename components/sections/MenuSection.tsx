'use client';

import { Tabs } from '@base-ui/react/tabs';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { ButtonLink } from '@/components/ui/Button';
import { EASE_OUT_SOFT, RevealLines } from '@/components/ui/Reveal';
import { formatPrice } from '@/lib/format';
import type { Menu, MenuItem, MenuSectionContent } from '@/lib/types';

function MenuCard({ item, index, currency }: { item: MenuItem; index: number; currency: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.li
      initial={reduced ? false : { opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index, 6) * 0.07, duration: 0.9, ease: EASE_OUT_SOFT }}
      className="group w-[64vw] max-w-72 shrink-0 snap-start lg:w-auto lg:max-w-none"
    >
      <div className="arch relative aspect-[3/4] overflow-hidden bg-chalk/5">
        {item.image && (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(min-width: 1024px) 20vw, 64vw"
            className="object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-105"
          />
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl">{item.name}</h3>
        <span className="text-sm whitespace-nowrap">{formatPrice(item.price, currency)}</span>
      </div>
      {item.note && (
        <p className="mt-1 text-xs font-semibold tracking-[0.14em] text-chalk/60 uppercase">{item.note}</p>
      )}
      {item.description && (
        <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-chalk/70">{item.description}</p>
      )}
    </motion.li>
  );
}

export function MenuSection({
  content,
  menu,
  orderUrl,
}: {
  content: MenuSectionContent;
  menu: Menu;
  orderUrl: string;
}) {
  if (!menu.categories.length) return null;
  return (
    <section id="menu" className="bg-charcoal text-chalk">
      <div className="mx-auto max-w-[1440px] px-4 py-28 md:px-12 md:py-40">
        <Tabs.Root defaultValue={menu.categories[0].id}>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-5 text-xs font-semibold tracking-[0.14em] text-chalk/60">{content.eyebrow}</p>
              <RevealLines lines={content.title} className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.95]" />
            </div>
            <div className="flex gap-3">
              <ButtonLink href={orderUrl} tone="dark" variant="outline">
                {content.fullMenuLabel}
              </ButtonLink>
              <ButtonLink href={orderUrl} tone="dark">
                {content.orderLabel}
              </ButtonLink>
            </div>
          </div>

          <Tabs.List className="relative -mx-4 mt-14 flex gap-8 overflow-x-auto border-b border-chalk/20 px-4 text-[15px] whitespace-nowrap [scrollbar-width:none] md:mx-0 md:px-0">
            {menu.categories.map((category) => (
              <Tabs.Tab
                key={category.id}
                value={category.id}
                className="min-h-12 cursor-pointer text-chalk/60 transition-colors hover:text-chalk data-active:text-chalk"
              >
                {category.label}
                <span className="ml-2 text-xs text-chalk/40">{category.items.length}</span>
              </Tabs.Tab>
            ))}
            <Tabs.Indicator className="absolute bottom-0 left-(--active-tab-left) h-px w-(--active-tab-width) bg-chalk transition-all duration-500 ease-out-soft" />
          </Tabs.List>

          {menu.categories.map((category) => (
            <Tabs.Panel key={category.id} value={category.id}>
              <ul className="-mx-4 mt-12 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-x-6 lg:gap-y-14 lg:overflow-visible lg:px-0 lg:pb-0">
                {category.items.map((item, i) => (
                  <MenuCard key={item.id} item={item} index={i} currency={menu.currency} />
                ))}
              </ul>
            </Tabs.Panel>
          ))}
        </Tabs.Root>
      </div>
    </section>
  );
}
