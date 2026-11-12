/**
 * Cookie consent (UK GDPR / PECR).
 *
 * - Nothing non-essential runs until the visitor chooses. Google Tag Manager is
 *   only loaded once analytics or marketing is granted.
 * - The choice is mirrored to Google Consent Mode v2, so tags inside GTM that
 *   support it (GA4, Google Ads) follow it automatically. Non-Google tags in
 *   GTM (e.g. Meta Pixel) must be given "Require additional consent" in GTM.
 * - Rejecting is as easy as accepting; the choice can be changed any time from
 *   the "Cookie settings" link in the footer.
 */

export const GTM_ID = 'GTM-N82CWXW4';

/** Bump to ask everyone again (e.g. when new kinds of cookies are added). */
const CONSENT_VERSION = 1;
const STORAGE_KEY = 'dharma-cookie-consent';
/** Ask again after 12 months. */
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

export const OPEN_SETTINGS_EVENT = 'dharma:cookie-settings';

export type ConsentChoice = {
  analytics: boolean;
  marketing: boolean;
};

type StoredConsent = ConsentChoice & { version: number; savedAt: number };

export function readConsent(): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as StoredConsent;
    if (stored.version !== CONSENT_VERSION || Date.now() - stored.savedAt > MAX_AGE_MS) return null;
    return { analytics: !!stored.analytics, marketing: !!stored.marketing };
  } catch {
    return null;
  }
}

export function saveConsent(choice: ConsentChoice) {
  try {
    const stored: StoredConsent = { ...choice, version: CONSENT_VERSION, savedAt: Date.now() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Storage blocked: the choice still applies for this visit.
  }
}

/** Google Consent Mode v2 signals for a choice. */
export function consentModeState(choice: ConsentChoice) {
  const v = (granted: boolean) => (granted ? 'granted' : 'denied');
  return {
    analytics_storage: v(choice.analytics),
    ad_storage: v(choice.marketing),
    ad_user_data: v(choice.marketing),
    ad_personalization: v(choice.marketing),
  } as const;
}

/** Opens the cookie settings panel from anywhere (e.g. footer link). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
