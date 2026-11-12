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
