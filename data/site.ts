import type { SiteInfo } from '@/lib/types';

/** MOCK — will come from the API. Read it through `getSite()` in lib/api.ts. */
export const site: SiteInfo = {
  name: 'Dharma Specialty Coffee',
  shortName: 'Dharma',
  url: 'https://dharmacoffee.uk',
  seoTitle: 'Dharma Coffee | Specialty Coffee in Richmond & Twickenham',
  description:
    'Visit Dharma Coffee on George Street in Richmond or at Twickenham Station for specialty coffee and matcha. Try our freshly baked San Sebastián.',
  email: 'richmond@dharmacoffee.uk',
  timeZone: 'Europe/London',
  currency: 'GBP',
  locationName: 'Richmond',
  address: {
    street: '3 George Street',
    locality: 'Richmond',
    postcode: 'TW9 1JY',
    country: 'GB',
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Dharma+Specialty+Coffee+3+George+Street+Richmond+TW9+1JY',
  // From the Google plus code FM5V+VH Richmond.
  geo: { latitude: 51.45969, longitude: -0.30606 },
  openingHours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '17:00',
    },
    { days: ['Sunday'], opens: '09:00', closes: '17:00' },
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
  branches: [
    {
      id: 'twickenham',
      name: 'Twickenham Station',
      // London Road is confirmed; unit number and exact postcode still to confirm.
      // (The Google listing shows a wrong address, E13 0DD; its pin is on Twickenham Station.)
      address: {
        street: 'London Road',
        locality: 'Twickenham',
        postcode: 'TW1 1BD',
        country: 'GB',
      },
      mapsUrl:
        'https://www.google.com/maps/place/Dharma+Coffee+Twickenham/@51.4501566,-0.3307975,17z/data=!3m1!4b1!4m6!3m5!1s0x48760d0016c869d1:0xb31da57f644456cd!8m2!3d51.4501566!4d-0.3307975!16s%2Fg%2F11zxq0nr65',
      // Pin of the Google Maps listing.
      geo: { latitude: 51.45016, longitude: -0.3308 },
      // Same hours as Richmond (Europe/London).
      openingHours: [
        {
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '08:00',
          closes: '17:00',
        },
        { days: ['Sunday'], opens: '09:00', closes: '17:00' },
      ],
    },
  ],
  foundingDate: '2021',
  founder: 'Mustafa Perçin',
  roaster: 'Murmuration Coffee Co.',
};
