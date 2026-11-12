import type { MetadataRoute } from 'next';
import { getSite } from '@/lib/api';

export const dynamic = 'force-static';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const site = await getSite();
  return {
    name: site.name,
    short_name: site.shortName,
    start_url: '/',
    display: 'browser',
    background_color: '#efece4',
    theme_color: '#efece4',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
