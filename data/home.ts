import type { HomeContent } from '@/lib/types';

/** MOCK — page copy and imagery. Read it through `getHomeContent()` in lib/api.ts. */
export const home: HomeContent = {
  hero: {
    image: {
      src: '/images/counter.webp',
      alt: 'The counter at Dharma on George Street, a barista pouring at the espresso machine',
    },
    titleDesktop: ['Good', 'coffee.'],
    subtitleDesktop: ['A little', 'calm.'],
    titleMobile: ['Good coffee.', 'A little calm.'],
    srSuffix: 'Dharma Specialty Coffee in Richmond and Twickenham.',
    intro:
      'A small room on George Street, Richmond. Slow mornings, careful coffee and a kitchen that cooks from scratch.',
    scrollHint: 'SCROLL TO STEP INSIDE',
    insideTitle: ['Come in.', 'Stay a while.'],
    insideText: 'Dogs, prams and laptops welcome. Laptops rest at the weekend.',
  },

  whatWeDo: {
    title: 'What we do',
    eyebrow: 'THREE THINGS, DONE SLOWLY',
    cards: [
      {
        id: 'coffee',
        title: 'Coffee',
        text: 'Murmuration beans from Chichester. Espresso, V60 and matcha, tasted every week.',
        art: 'hands-cup',
        tone: 'light',
        image: {
          src: '/images/card-coffee.webp',
          alt: 'A barista pouring latte art at the counter on George Street',
        },
      },
      {
        id: 'kitchen',
        title: 'Kitchen',
        text: 'Traditional Acuka and Pink Lady, our two Dharma specials, cooked to order.',
        art: 'acuka-toast',
        tone: 'dark',
        image: {
          src: '/images/card-kitchen.webp',
          alt: 'Traditional Acuka and a flat white on the window table',
        },
      },
      {
        id: 'neighbours',
        title: 'Neighbours',
        text: 'Water bowls by the door, coffee for the Mum Club walks and a table for the Cheese Club.',
        art: 'walking-club',
        tone: 'light',
        image: {
          src: '/images/dog-door.webp',
          alt: 'A curly dog waiting by the shop door, a red post box behind',
        },
      },
    ],
  },

  menu: {
    eyebrow: 'THE MENU',
    title: ['Made here,', 'every morning'],
    fullMenuLabel: 'Full menu',
    orderLabel: 'Order online',
  },

  walkingClub: {
    eyebrow: 'THE WALKING CLUB',
    title: ['Coffee first,', 'then the river.'],
    lines: [
      'We pour for The Mum Club Richmond’s walks.',
      'Prams, dogs and friends all welcome.',
      'Follow @themumclubrichmond for the next date.',
    ],
    cta: { label: 'See the next walk', href: 'https://www.instagram.com/themumclubrichmond/' },
    image: {
      src: '/images/towpath-club.webp',
      alt: 'Mums pushing prams with takeaway coffees and a dog along the Thames in Richmond',
    },
  },

  visit: {
    eyebrow: 'VISIT',
    title: ['The window on', 'George Street.'],
    image: {
      src: '/images/facade-day.webp',
      alt: 'Dharma’s shopfront on George Street with its charcoal fascia',
    },
    goodToKnow: ['Dogs welcome inside.', 'LGBTQ+ friendly.'],
    directionsLabel: 'Get directions',
    branches: {
      eyebrow: 'NOW OPEN',
      title: 'A second window at Twickenham Station.',
      directionsLabel: 'Get directions',
    },
  },

  thisWeek: {
    title: ['This week on', 'George Street'],
    followLabel: 'Follow @dharmacoffee.richmond',
    photos: [
      {
        src: '/images/week/pastry-counter.webp',
        alt: 'Croissants, cinnamon swirls and a basque cheesecake in the pastry cabinet',
        x: 43,
        y: 14,
        w: 20.8,
        speed: -60,
      },
      {
        src: '/images/week/flat-white-croissant.webp',
        alt: 'A flat white and a croissant on the window table',
        x: 66,
        y: 7,
        w: 15.3,
        speed: 40,
      },
      {
        src: '/images/week/takeaway-window.webp',
        alt: 'A white and a red Dharma takeaway cup on the window ledge',
        x: 83,
        y: 25,
        w: 14,
        speed: -30,
      },
      {
        src: '/images/week/dog.webp',
        alt: 'A white curly dog waiting by a marble table',
        x: 3.3,
        y: 50,
        w: 18,
        speed: 50,
      },
      {
        src: '/images/week/barista-pour.webp',
        alt: 'A barista pouring latte art into a Dharma cup',
        x: 23.6,
        y: 55,
        w: 25,
        speed: -20,
        wide: true,
      },
      {
        src: '/images/week/riverside.webp',
        alt: 'A Dharma cup and bakery bag by Richmond Bridge',
        x: 66,
        y: 44,
        w: 15.3,
        speed: 70,
      },
    ],
  },

  footer: {
    title: ['See you on', 'George Street.'],
    directionsLabel: 'Get directions',
    copyright: '© 2026 Dharma Specialty Coffee. Dogs welcome.',
    poweredBy: { label: 'Ordering by Runmeal', href: 'https://order.dharmacoffee.uk' },
  },
};
