/**
 * Cookie consent (UK GDPR / PECR) with Google Consent Mode v2 ("advanced").
 *
 * - Google Tag Manager loads on every page, in the initial HTML, right after
 *   the Consent Mode defaults. Every storage signal starts as "denied", so
 *   Google tags (GA4, Google Ads) set no cookies until the visitor accepts.
 * - A returning visitor's saved choice is applied in the same inline script,
 *   before GTM starts, so their tags fire with the right state from the start.
 * - Non-Google tags in GTM (e.g. Meta Pixel) must be given "Require additional
 *   consent" (ad_storage) in GTM, or they will ignore the choice.
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

/**
 * Inline <head> script: Consent Mode defaults, the saved choice (if any) and
 * the Google Tag Manager loader, in that order.
 */
export const consentAndTagManagerScript = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('set','ads_data_redaction',true);
try{
  var c=JSON.parse(localStorage.getItem('${STORAGE_KEY}')||'null');
  if(c&&c.version===${CONSENT_VERSION}&&Date.now()-c.savedAt<=${MAX_AGE_MS}){
    var a=c.analytics?'granted':'denied',m=c.marketing?'granted':'denied';
    gtag('consent','update',{analytics_storage:a,ad_storage:m,ad_user_data:m,ad_personalization:m});
  }
}catch(e){}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');
`;
