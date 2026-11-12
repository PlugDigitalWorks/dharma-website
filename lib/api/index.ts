/**
 * Data access layer — content getters.
 *
 * Every page and component gets its data through `lib/api/*`, never by
 * importing `data/*` directly. Right now these return the mock data; when the
 * API is ready, replace each body with a `fetch` that returns the same type
 * (see the TODOs) and nothing else in the app has to change.
 *
 * The site is a static export (`output: 'export'`), so these run at build
 * time. Anything that must be live (e.g. menu availability) can later be
 * fetched in the browser with the same functions.
 *
 * Browser-side calls (form submissions) live in `lib/api/enquiry.ts` so the
 * mock content is not shipped to the client bundle.
 */
import { enquiryForms } from '@/data/enquiry';
import { home } from '@/data/home';
import { menu } from '@/data/menu';
import { site } from '@/data/site';
import type { EnquiryFormConfig, EnquiryKind, HomeContent, Menu, SiteInfo } from '@/lib/types';

/** Business details: address, hours, links, navigation. */
export async function getSite(): Promise<SiteInfo> {
  // TODO(api): return fetchJson<SiteInfo>('/site');
  return site;
}

/** Menu categories and items. */
export async function getMenu(): Promise<Menu> {
  // TODO(api): return fetchJson<Menu>('/menu');
  return menu;
}

/** Copy and imagery for the home page sections. */
export async function getHomeContent(): Promise<HomeContent> {
  // TODO(api): return fetchJson<HomeContent>('/content/home');
  return home;
}

/** Copy for the enquiry dialogs (Twickenham waitlist, event booking). */
export async function getEnquiryForms(): Promise<Record<EnquiryKind, EnquiryFormConfig>> {
  // TODO(api): return fetchJson('/content/enquiry-forms');
  return enquiryForms;
}
