import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://dharmacoffee.uk'),
  title: 'Dharma Coffee — Something good is brewing',
  description: 'Our new website is brewing. Say hello to Dharma Coffee in Richmond, London.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Dharma Coffee', description: 'Something good is brewing. Our new website is coming soon.', url: 'https://dharmacoffee.uk', type: 'website' },
  icons: { icon: '/dharma-logo.webp' },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
