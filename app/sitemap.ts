import type { MetadataRoute } from 'next';
import { getSite } from '@/lib/api';

export const dynamic = 'force-static';

/** Build time: the site is a static export, so content changes only on a new build. */
const lastModified = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSite();
  return [
    { url: site.url, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/cookies`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
