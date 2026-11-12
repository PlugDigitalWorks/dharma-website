# Dharma Specialty Coffee — dharmacoffee.uk

Next.js App Router + TypeScript + Tailwind CSS v4. Single-page site for Dharma in Richmond, London, with Motion animations, Lenis smooth scroll and Base UI (tabs, dialogs, forms).

## Local development

npm install
npm run dev

## Production

npm run build

Static export is generated in `out/`. See `README-CLOUDFLARE.md` for the Cloudflare Workers deploy.

## Where things live

| Path | What |
| --- | --- |
| `lib/types.ts` | Domain types — the contract between the UI and the data source |
| `lib/api/index.ts` | **Data access layer.** `getSite()`, `getMenu()`, `getHomeContent()`, `getEnquiryForms()` |
| `lib/api/enquiry.ts` | Browser-side calls: `submitEnquiry()` |
| `data/*.ts` | **Mock data** (site info, menu, page copy, form copy) |
| `components/sections/*` | Page sections (Hero, WhatWeDo, MenuSection, WalkingClub, Visit, ThisWeek) |
| `components/layout/*` | Header, footer, smooth scroll |
| `components/ui/*` | Buttons, line art, logo, reveal animations, open status, enquiry dialog |
| `lib/hours.ts` | Opening hours: grouping, labels, live open/closed status |
| `lib/structured-data.ts` | schema.org JSON-LD, built from the same data |
| `app/globals.css` | Theme tokens (colours, fonts, easing) |

## Data and the future API

Everything on the page — business details, opening hours, menu, copy, images — comes from `data/` **through** `lib/api/`. Components never import `data/` directly.

To connect the API, replace the body of each function in `lib/api/` with a `fetch` that returns the same type (each has a `TODO(api)` note). Nothing else needs to change.

- Getters run at build time (static export). Anything that must be live, such as menu availability, can be fetched in the browser with the same functions.
- `submitEnquiry()` is a mock: it validates, waits and reports success. **Nothing is sent or stored yet.**
- Menu prices are numbers in major units (`11.25` = £11.25) and are formatted by `lib/format.ts`.
- Opening hours follow schema.org `OpeningHoursSpecification`. All hour labels on the page are derived from them.

## Cookies and Google Tag Manager

`lib/consent.ts` and `components/consent/CookieConsent.tsx` handle consent (UK GDPR / PECR):

- Google Tag Manager (`GTM-N82CWXW4`) is **only loaded after the visitor accepts** analytics or marketing cookies.
- Google Consent Mode v2 defaults to `denied` (set in `app/layout.tsx` before anything runs) and is updated with the visitor's choice, so GA4 and Google Ads tags in GTM follow it.
- Non-Google tags added in GTM (e.g. Meta Pixel) must have **"Require additional consent"** set to `ad_storage` in GTM, otherwise they ignore the choice.
- Visitors can change their choice from **Cookie settings** in the footer or on `/cookies`. Withdrawing consent clears `_ga`, `_gcl`, `_fbp` cookies and reloads.
- If new kinds of tracking are added, update `/cookies` (`app/cookies/page.tsx`) and bump `CONSENT_VERSION` so everyone is asked again.

## SEO

- Title, description and Open Graph come from `data/site.ts`.
- JSON-LD (`lib/structured-data.ts`): Organization, WebSite, Menu and one `CafeOrCoffeeShop` per shop (Richmond + `branches`), all from the same data the page shows.
- `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts` generate `robots.txt`, `sitemap.xml`, `manifest.webmanifest`.
- All visible menu categories are in the HTML (hidden tabs use `keepMounted`), so search engines see the whole menu.
- `public/_headers` sets cache and security headers on Cloudflare.
