'use client';

import { Switch } from '@base-ui/react/switch';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { EASE_OUT_SOFT } from '@/components/ui/Reveal';
import {
  consentModeState,
  GTM_ID,
  OPEN_SETTINGS_EVENT,
  readConsent,
  saveConsent,
  type ConsentChoice,
} from '@/lib/consent';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/** Removes analytics/ads cookies set on our domain when consent is withdrawn. */
function clearTrackingCookies() {
  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim();
    if (!/^(_ga|_gid|_gat|_gcl|_fbp|_fbc)/.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
    }
  }
}

const pill =
  'inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full px-5 text-[15px] font-medium transition-colors duration-300';

function Toggle({
  label,
  description,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label className="flex items-start justify-between gap-6 border-t border-charcoal/15 py-4">
      <span>
        <span className="block text-[15px] font-medium">{label}</span>
        <span className="mt-1 block text-sm leading-relaxed text-stone">{description}</span>
      </span>
      <Switch.Root
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        className="relative mt-0.5 flex h-6 w-11 shrink-0 cursor-pointer rounded-full bg-charcoal/20 p-0.5 transition-colors duration-300 data-checked:bg-charcoal data-disabled:cursor-default data-disabled:opacity-50"
      >
        <Switch.Thumb className="size-5 rounded-full bg-chalk shadow transition-transform duration-300 ease-out-soft data-checked:translate-x-5" />
      </Switch.Root>
    </label>
  );
}

/**
 * Cookie banner + settings, and the consent-gated Google Tag Manager loader.
 * Consent Mode defaults ("denied") are set in the root layout before anything runs.
 */
export function CookieConsent() {
  const reduced = useReducedMotion();
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [open, setOpen] = useState(false);
  const [manage, setManage] = useState(false);
  const [draft, setDraft] = useState<ConsentChoice>({ analytics: false, marketing: false });

  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      window.gtag?.('consent', 'update', consentModeState(stored));
      setChoice(stored);
    } else {
      setOpen(true);
    }
    const openSettings = () => {
      setDraft(readConsent() ?? { analytics: false, marketing: false });
      setManage(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings);
  }, []);

  function apply(next: ConsentChoice) {
    const previous = choice;
    saveConsent(next);
    window.gtag?.('consent', 'update', consentModeState(next));
    const withdrew = (previous?.analytics && !next.analytics) || (previous?.marketing && !next.marketing);
    if (withdrew) {
      clearTrackingCookies();
      // Tags already running on this page can't be unloaded; a reload starts clean with the new choice.
      window.location.reload();
      return;
    }
    setChoice(next);
    setOpen(false);
    setManage(false);
  }

  const loadTags = !!choice && (choice.analytics || choice.marketing);

  return (
    <>
      {loadTags && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="false"
            aria-labelledby="cookie-title"
            data-lenis-prevent
            className="fixed inset-x-3 bottom-3 z-[60] max-h-[calc(100svh-1.5rem)] overflow-y-auto rounded-lg border border-charcoal/15 bg-chalk p-6 text-charcoal shadow-2xl sm:inset-x-auto sm:right-auto sm:bottom-6 sm:left-6 sm:w-[min(440px,calc(100vw-3rem))] md:p-8"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: EASE_OUT_SOFT }}
          >
            <p id="cookie-title" className="font-display text-3xl leading-tight">
              A few cookies?
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-stone">
              We would like to use analytics and marketing cookies to see how the site is used and to improve our ads.
              They only run if you say yes. See our{' '}
              <a href="/cookies" className="underline underline-offset-4 hover:text-charcoal">
                cookie policy
              </a>
              .
            </p>

            {manage && (
              <div className="mt-5">
                <Toggle
                  label="Essential"
                  description="Remember your cookie choice. Always on."
                  checked
                  disabled
                />
                <Toggle
                  label="Analytics"
                  description="Anonymous visit statistics, such as Google Analytics."
                  checked={draft.analytics}
                  onChange={(analytics) => setDraft((d) => ({ ...d, analytics }))}
                />
                <Toggle
                  label="Marketing"
                  description="Measure and personalise our ads, such as Google Ads or Meta."
                  checked={draft.marketing}
                  onChange={(marketing) => setDraft((d) => ({ ...d, marketing }))}
                />
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {manage ? (
                <>
                  <button
                    type="button"
                    className={`${pill} bg-charcoal text-chalk hover:bg-stone`}
                    onClick={() => apply(draft)}
                  >
                    Save choices
                  </button>
                  <button
                    type="button"
                    className={`${pill} border border-charcoal/60 hover:bg-charcoal hover:text-chalk`}
                    onClick={() => apply({ analytics: true, marketing: true })}
                  >
                    Accept all
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className={`${pill} bg-charcoal text-chalk hover:bg-stone`}
                    onClick={() => apply({ analytics: true, marketing: true })}
                  >
                    Accept all
                  </button>
                  <button
                    type="button"
                    className={`${pill} bg-charcoal text-chalk hover:bg-stone`}
                    onClick={() => apply({ analytics: false, marketing: false })}
                  >
                    Reject all
                  </button>
                  <button
                    type="button"
                    className="min-h-11 cursor-pointer px-2 text-[15px] underline underline-offset-4 hover:text-stone"
                    onClick={() => {
                      setDraft(choice ?? { analytics: false, marketing: false });
                      setManage(true);
                    }}
                  >
                    Manage
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
