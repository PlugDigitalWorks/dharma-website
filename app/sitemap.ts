import type { MetadataRoute } from 'next';
import { getSite } from '@/lib/api';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSite();
  return [{ url: site.url, changeFrequency: 'monthly', priority: 1 }];
}
