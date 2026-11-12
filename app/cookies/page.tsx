import type { Metadata } from 'next';
import { CookieSettingsButton } from '@/components/consent/CookieSettingsButton';
import { Logo } from '@/components/ui/Logo';
import { getSite } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Cookie policy | Dharma',
  description: 'Which cookies dharmacoffee.uk uses and how to change your choice.',
  alternates: { canonical: '/cookies' },
};

const LAST_UPDATED = '12 November 2026';

const rows = [
  {
    kind: 'Essential',
    what: 'Remembers your cookie choice (dharma-cookie-consent, stored in your browser).',
    who: 'Dharma',
    how: '12 months',
  },
  {
    kind: 'Analytics',
    what: 'Counts visits and shows which pages are used, so we can improve the site (for example _ga, _ga_*).',
    who: 'Google Analytics',
    how: 'Up to 2 years',
  },
  {
    kind: 'Marketing',
    what: 'Measures and personalises our adverts on other sites (for example _gcl_*, _fbp).',
    who: 'Google Ads, Meta',
    how: 'Up to 2 years',
  },
];

export default async function CookiesPage() {
  const site = await getSite();
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-12 md:py-24">
      <a href="/" aria-label="Dharma, home" className="inline-block">
        <Logo className="w-28 md:w-36" />
      </a>

      <h1 className="mt-16 font-display text-[clamp(3rem,7vw,5rem)] leading-[0.95]">Cookie policy</h1>
      <p className="mt-4 text-sm text-stone">Last updated {LAST_UPDATED}</p>

      <div className="mt-12 flex flex-col gap-10 text-[17px] leading-relaxed">
        <section>
          <h2 className="font-display text-3xl">The short version</h2>
          <p className="mt-3 text-stone">
            Cookies are small files a website stores in your browser. We only use the ones that are needed for the
            site to work, unless you tell us otherwise. Analytics and marketing cookies stay off until you accept
            them, and you can change your mind at any time.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl">What we use</h2>
          <dl className="mt-4">
            {rows.map((row) => (
              <div key={row.kind} className="grid gap-2 border-t border-charcoal/25 py-5 md:grid-cols-[160px_1fr] md:gap-6">
                <dt className="text-xs font-semibold tracking-[0.14em] text-stone uppercase">{row.kind}</dt>
                <dd>
                  <p>{row.what}</p>
                  <p className="mt-1 text-[15px] text-stone">
                    {row.who} · {row.how}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-[15px] text-stone">
            These tools are managed through Google Tag Manager with Google Consent Mode. Until you accept, they are told
            not to store or read any cookies, and Google may only receive basic, cookieless signals (such as that a page
            was viewed), without identifiers. Once you choose, they follow your choice.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl">Changing your choice</h2>
          <p className="mt-3 text-stone">
            You can turn analytics and marketing cookies on or off whenever you like. When you turn them off, we remove
            the cookies they set on this site. You can also block cookies in your browser settings.
          </p>
          <div className="mt-6">
            <CookieSettingsButton>Cookie settings</CookieSettingsButton>
          </div>
        </section>

        <section>
          <h2 className="font-display text-3xl">Questions</h2>
          <p className="mt-3 text-stone">
            Write to us at{' '}
            <a href={`mailto:${site.email}`} className="text-charcoal underline underline-offset-4">
              {site.email}
            </a>
            . To find out more about cookies and your rights, visit the{' '}
            <a
              href="https://ico.org.uk/for-the-public/online/cookies/"
              target="_blank"
              rel="noreferrer"
              className="text-charcoal underline underline-offset-4"
            >
              Information Commissioner’s Office
            </a>
            .
          </p>
        </section>
      </div>

      <p className="mt-20 border-t border-charcoal/25 pt-8 text-[15px]">
        <a href="/" className="underline underline-offset-4 hover:text-stone">
          Back to {site.shortName}
        </a>
      </p>
    </main>
  );
}
