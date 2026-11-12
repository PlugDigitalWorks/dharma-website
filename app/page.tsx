import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Hero } from '@/components/sections/Hero';
import { MenuSection } from '@/components/sections/MenuSection';
import { ThisWeek } from '@/components/sections/ThisWeek';
import { Visit } from '@/components/sections/Visit';
import { WalkingClub } from '@/components/sections/WalkingClub';
import { WhatWeDo } from '@/components/sections/WhatWeDo';
import { getHomeContent, getMenu, getSite } from '@/lib/api';
import { siteJsonLd } from '@/lib/structured-data';

export default async function HomePage() {
  const [site, menu, content] = await Promise.all([getSite(), getMenu(), getHomeContent()]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(siteJsonLd(site, menu)).replace(/</g, '\\u003c'),
        }}
      />
      <SiteHeader nav={site.nav} orderUrl={site.orderUrl} />
      <main>
        <Hero content={content.hero} />
        <WhatWeDo content={content.whatWeDo} />
        <MenuSection content={content.menu} menu={menu} orderUrl={site.orderUrl} />
        <WalkingClub content={content.walkingClub} />
        <Visit content={content.visit} site={site} />
        <ThisWeek content={content.thisWeek} instagramUrl={site.instagram.url} />
      </main>
      <SiteFooter site={site} content={content.footer} />
    </>
  );
}
