/**
 * Domain types for everything the site renders.
 *
 * These shapes are the contract between the UI and the data source. Today the
 * data comes from the mock files in `data/`; later the same shapes will come
 * from the API (see `lib/api.ts`). Components only ever see these types.
 */

export type ImageAsset = {
  /** Absolute URL or a path under /public. */
  src: string;
  alt: string;
};

export type Link = {
  label: string;
  href: string;
};

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

/** Mirrors schema.org OpeningHoursSpecification. Times are "HH:mm", Europe/London. */
export type OpeningHoursSpec = {
  days: DayOfWeek[];
  opens: string;
  closes: string;
};

export type Address = {
  street: string;
  locality: string;
  postcode: string;
  country: string;
};

export type GeoPoint = { latitude: number; longitude: number };

/** Another Dharma shop besides the main one. */
export type Branch = {
  id: string;
  name: string;
  address: Address;
  mapsUrl: string;
  geo?: GeoPoint;
  openingHours: OpeningHoursSpec[];
};

export type SiteInfo = {
  name: string;
  shortName: string;
  url: string;
  description: string;
  seoTitle: string;
  email: string;
  timeZone: string;
  currency: string;
  /** Main shop. */
  locationName: string;
  address: Address;
  mapsUrl: string;
  geo?: GeoPoint;
  openingHours: OpeningHoursSpec[];
  orderUrl: string;
  instagram: { handle: string; url: string };
  nav: Link[];
  /** Other shops, shown in the Visit section. */
  branches: Branch[];
  /** Extra facts used in structured data. */
  foundingDate?: string;
  founder?: string;
  roaster?: string;
};

// ── Menu ────────────────────────────────────────────────────────────────────

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  /** Small label above the description, e.g. "Dharma special". */
  note?: string;
  /** Price in major units of `Menu.currency` (e.g. 11.25 = £11.25). */
  price: number;
  image?: ImageAsset;
};

export type MenuCategory = {
  id: string;
  label: string;
  /** Kept in the data but not shown on the site (tab and structured data). */
  hidden?: boolean;
  items: MenuItem[];
};

export type Menu = {
  currency: string;
  /** Show prices on the site. Off for now; prices stay in the data. */
  showPrices: boolean;
  categories: MenuCategory[];
};

// ── Home page content ───────────────────────────────────────────────────────

export type LineArtName =
  | 'hands-cup'
  | 'dog'
  | 'acuka-toast'
  | 'latte-art'
  | 'v60'
  | 'shopfront'
  | 'barista'
  | 'walking-club'
  | 'pendant-lamps'
  | 'takeaway-cup'
  | 'croissant'
  | 'steam'
  | 'hearts'
  | 'underline'
  | 'sparkle';

export type HeroContent = {
  image: ImageAsset;
  /** Desktop: two words left, two words right. Mobile: two lines. */
  titleDesktop: [string, string];
  subtitleDesktop: [string, string];
  titleMobile: [string, string];
  srSuffix: string;
  intro: string;
  scrollHint: string;
  insideTitle: [string, string];
  insideText: string;
};

export type FeatureCard = {
  id: string;
  title: string;
  text: string;
  art: LineArtName;
  image: ImageAsset;
  tone: 'light' | 'dark';
};

export type WhatWeDoContent = {
  title: string;
  eyebrow: string;
  cards: FeatureCard[];
};

export type MenuSectionContent = {
  eyebrow: string;
  title: [string, string];
  fullMenuLabel: string;
  orderLabel: string;
};

export type WalkingClubContent = {
  eyebrow: string;
  title: [string, string];
  lines: string[];
  cta: Link;
  image: ImageAsset;
};

export type VisitContent = {
  eyebrow: string;
  title: [string, string];
  image: ImageAsset;
  goodToKnow: string[];
  directionsLabel: string;
  /** Teaser for the other branches. */
  branches: {
    eyebrow: string;
    title: string;
    directionsLabel: string;
  };
};

export type GalleryPhoto = ImageAsset & {
  /** Desktop collage placement, % of the section box. */
  x: number;
  y: number;
  w: number;
  /** Parallax travel in px. */
  speed: number;
  wide?: boolean;
};

export type ThisWeekContent = {
  title: [string, string];
  followLabel: string;
  photos: GalleryPhoto[];
};

export type FooterContent = {
  title: [string, string];
  directionsLabel: string;
  copyright: string;
  poweredBy: Link;
};

export type HomeContent = {
  hero: HeroContent;
  whatWeDo: WhatWeDoContent;
  menu: MenuSectionContent;
  walkingClub: WalkingClubContent;
  visit: VisitContent;
  thisWeek: ThisWeekContent;
  footer: FooterContent;
};

// ── Enquiries ───────────────────────────────────────────────────────────────

export type EnquiryKind = 'twickenham' | 'event';

export type EnquiryField = 'name' | 'email' | 'date' | 'guests' | 'message';

export type EnquiryFormConfig = {
  kind: EnquiryKind;
  title: string;
  intro: string;
  art: LineArtName;
  submit: string;
  done: string;
  fields: EnquiryField[];
  required: EnquiryField[];
};

export type EnquiryPayload = {
  kind: EnquiryKind;
  name?: string;
  email: string;
  date?: string;
  guests?: string;
  message?: string;
};

export type EnquiryResult =
  | { ok: true }
  | { ok: false; errors: Partial<Record<EnquiryField | 'form', string>> };
