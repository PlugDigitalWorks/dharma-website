import Image from 'next/image';
import { ButtonLink } from '@/components/ui/Button';
import { EnquiryDialog } from '@/components/ui/EnquiryDialog';
import { LineArt } from '@/components/ui/LineArt';
import { OpenStatus } from '@/components/ui/OpenStatus';
import { FadeUp, RevealLines } from '@/components/ui/Reveal';
import { dayRangeLabel, formatTime, groupHours } from '@/lib/hours';
import type { EnquiryFormConfig, EnquiryKind, SiteInfo, VisitContent } from '@/lib/types';

const row =
  'grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-6 border-t border-charcoal/25 py-5 md:grid-cols-[240px_1fr] lg:grid-cols-[150px_1fr] xl:grid-cols-[240px_1fr]';

export function Visit({
  content,
  site,
  forms,
}: {
  content: VisitContent;
  site: SiteInfo;
  forms: Record<EnquiryKind, EnquiryFormConfig>;
}) {
  const details = [
    { label: 'Address', value: `${site.address.street}\n${site.address.locality} ${site.address.postcode}` },
    ...groupHours(site.openingHours).map((g) => ({
      label: dayRangeLabel(g.days),
      value: `${formatTime(g.opens)} to ${formatTime(g.closes)}`,
    })),
    { label: 'Good to know', value: content.goodToKnow.join('\n') },
  ];

  return (
    <section
      id="visit"
      className="mx-auto grid max-w-[1440px] gap-14 px-4 py-28 md:px-12 md:py-40 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 xl:grid-cols-[560px_1fr] xl:gap-24"
    >
      <FadeUp className="arch relative aspect-[560/760] overflow-hidden">
        <Image
          src={content.image.src}
          alt={content.image.alt}
          fill
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover"
        />
      </FadeUp>

      <div className="flex flex-col gap-12 self-center">
        <div>
          <p className="mb-5 text-xs font-semibold tracking-[0.14em] text-stone">{content.eyebrow}</p>
          <RevealLines lines={content.title} className="font-display text-[clamp(2.75rem,5.5vw,5rem)] leading-[0.95]" />
          <OpenStatus hours={site.openingHours} timeZone={site.timeZone} className="mt-6 text-[15px] text-stone" />
        </div>

        <dl>
          {details.map((d) => (
            <div key={d.label} className={row}>
              <dt className="text-[15px] text-stone">{d.label}</dt>
              <dd className="leading-relaxed whitespace-pre-line">{d.value}</dd>
            </div>
          ))}
          <div className="flex flex-wrap gap-3 border-t border-charcoal/25 pt-8">
            <ButtonLink href={site.mapsUrl} target="_blank" rel="noreferrer">
              {content.directionsLabel}
            </ButtonLink>
            <EnquiryDialog form={forms.event} variant="outline">
              {content.eventCta}
            </EnquiryDialog>
          </div>
        </dl>

        <div className="grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-3 border-t border-charcoal/25 pt-7 md:flex md:gap-6">
          <LineArt name="shopfront" className="w-16 shrink-0 md:w-24" strokeWidth={1.6} />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold tracking-[0.14em] text-stone">{content.comingSoon.eyebrow}</p>
            <p className="mt-1 font-display text-2xl md:text-3xl">{content.comingSoon.title}</p>
          </div>
          <EnquiryDialog form={forms.twickenham} variant="link" className="col-start-2 shrink-0 justify-self-start">
            {content.comingSoon.cta}
          </EnquiryDialog>
        </div>
      </div>
    </section>
  );
}
