import type { Menu, SiteInfo } from '@/lib/types';

const absolute = (site: SiteInfo, src: string) => (src.startsWith('http') ? src : `${site.url}${src}`);

/** schema.org CafeOrCoffeeShop JSON-LD, built from the same data the page renders. */
export function cafeJsonLd(site: SiteInfo, menu: Menu) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: site.name,
    url: site.url,
    image: `${site.url}/opengraph-image.jpg`,
    email: site.email,
    servesCuisine: ['Coffee', 'Breakfast', 'Brunch'],
    priceRange: '££',
    acceptsReservations: false,
    description: `Independent specialty coffee shop and brunch kitchen in ${site.address.locality}, London.${site.roaster ? ` Coffee from ${site.roaster}.` : ''}`,
    ...(site.foundingDate && { foundingDate: site.foundingDate }),
    ...(site.founder && { founder: { '@type': 'Person', name: site.founder } }),
    hasMenu: {
      '@type': 'Menu',
      url: site.orderUrl,
      hasMenuSection: menu.categories.map((category) => ({
        '@type': 'MenuSection',
        name: category.label,
        hasMenuItem: category.items.map((item) => ({
          '@type': 'MenuItem',
          name: item.name,
          ...(item.description && { description: item.description }),
          ...(item.image && { image: absolute(site, item.image.src) }),
          offers: { '@type': 'Offer', price: item.price.toFixed(2), priceCurrency: menu.currency },
        })),
      })),
    },
    potentialAction: { '@type': 'OrderAction', target: site.orderUrl },
    sameAs: [site.instagram.url],
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      postalCode: site.address.postcode,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: site.openingHours.map((spec) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: spec.days.length === 1 ? spec.days[0] : spec.days,
      opens: spec.opens,
      closes: spec.closes,
    })),
  };
}
