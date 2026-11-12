import type { SiteInfo } from '@/lib/types';

/** MOCK — will come from the API. Read it through `getSite()` in lib/api.ts. */
export const site: SiteInfo = {
  name: 'Dharma Specialty Coffee',
  shortName: 'Dharma',
  url: 'https://dharmacoffee.uk',
  seoTitle: 'Specialty Coffee and Brunch in Richmond | Dharma',
  description:
    'Specialty coffee, brunch and bakes at 3 George Street, Richmond. Slow mornings, a kitchen that cooks from scratch, dogs welcome.',
  email: 'richmond@dharmacoffee.uk',
  timeZone: 'Europe/London',
  currency: 'GBP',
  address: {
    street: '3 George Street',
    locality: 'Richmond',
    postcode: 'TW9 1JY',
    country: 'GB',
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Dharma+Specialty+Coffee+3+George+Street+Richmond+TW9+1JY',
  openingHours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
    { days: ['Sunday'], opens: '09:00', closes: '18:00' },
  ],
  orderUrl: 'https://order.dharmacoffee.uk',
  instagram: {
    handle: 'dharmacoffee.richmond',
    url: 'https://www.instagram.com/dharmacoffee.richmond/',
  },
  nav: [
    { label: 'Menu', href: '#menu' },
    { label: 'Coffee', href: '#what-we-do' },
    { label: 'Walking Club', href: '#walking-club' },
    { label: 'Visit', href: '#visit' },
  ],
  foundingDate: '2021',
  founder: 'Mustafa Perçin',
  roaster: 'Murmuration Coffee Co.',
};
