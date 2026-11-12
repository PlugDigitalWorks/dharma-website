import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { CookieConsent } from '@/components/consent/CookieConsent';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { consentAndTagManagerScript } from '@/lib/consent';
import { getSite } from '@/lib/api';
import './globals.css';

const goodly = localFont({
  src: [
    { path: './fonts/Goodly-Regular.woff', weight: '400' },
    { path: './fonts/Goodly-Medium.woff', weight: '500' },
    { path: './fonts/Goodly-Semibold.woff', weight: '600' },
  ],
  variable: '--font-goodly',
  display: 'swap',
});

const ralmone = localFont({
  src: './fonts/Ralmone.woff2',
  variable: '--font-ralmone',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    metadataBase: new URL(site.url),
    title: site.seoTitle,
    description: site.description,
    alternates: { canonical: '/' },
    appleWebApp: { title: site.shortName, statusBarStyle: 'default' },
    openGraph: {
      title: site.seoTitle,
      description: site.description,
      siteName: site.name,
      locale: 'en_GB',
      url: site.url,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: site.seoTitle, description: site.description },
  };
}

export const viewport: Viewport = { themeColor: '#efece4' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${goodly.variable} ${ralmone.variable}`}>
      <head>
        {/* Consent Mode defaults + Google Tag Manager, first thing in <head> (see lib/consent.ts). */}
        <script dangerouslySetInnerHTML={{ __html: consentAndTagManagerScript }} />
      </head>
      <body>
        <SmoothScroll />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
