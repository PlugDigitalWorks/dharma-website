import type { MetadataRoute } from 'next';
import { getSite } from '@/lib/api';

export const dynamic = 'force-static';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const site = await getSite();
  return {
    id: '/',
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    lang: 'en-GB',
    start_url: '/',
    scope: '/',
    display: 'browser',
    background_color: '#efece4',
    theme_color: '#efece4',
    categories: ['food', 'lifestyle'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
