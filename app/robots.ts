import type { MetadataRoute } from 'next';
import { getSite } from '@/lib/api';

export const dynamic = 'force-static';

/** Everything is public. Search and AI assistants may crawl it so they can recommend the shops. */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await getSite();
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
