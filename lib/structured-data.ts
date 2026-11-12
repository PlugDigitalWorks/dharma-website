import { visibleCategories } from '@/lib/menu';
import type { Address, GeoPoint, Menu, OpeningHoursSpec, SiteInfo } from '@/lib/types';

const absolute = (site: SiteInfo, src: string) => (src.startsWith('http') ? src : `${site.url}${src}`);

const postalAddress = (address: Address) => ({
  '@type': 'PostalAddress',
  streetAddress: address.street,
  addressLocality: address.locality,
  postalCode: address.postcode,
  addressCountry: address.country,
});

const geoCoordinates = (geo?: GeoPoint) =>
  geo && { geo: { '@type': 'GeoCoordinates', latitude: geo.latitude, longitude: geo.longitude } };

const openingHours = (specs: OpeningHoursSpec[]) =>
  specs.map((spec) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: spec.days.length === 1 ? spec.days[0] : spec.days,
    opens: spec.opens,
    closes: spec.closes,
  }));

/**
 * schema.org JSON-LD graph, built from the same data the page renders:
 * the organisation, the website, the shared menu and one CafeOrCoffeeShop per shop.
 */
export function siteJsonLd(site: SiteInfo, menu: Menu) {
  const org = `${site.url}/#organization`;
  const menuId = `${site.url}/#menu`;
  const image = `${site.url}/opengraph-image.jpg`;

  const shop = (
    id: string,
    name: string,
    address: Address,
    mapsUrl: string,
    hours: OpeningHoursSpec[],
    geo?: GeoPoint,
  ) => ({
    '@type': 'CafeOrCoffeeShop',
    '@id': `${site.url}/#${id}`,
    name: `${site.name}, ${name}`,
    url: `${site.url}/#visit`,
    image,
    email: site.email,
    priceRange: '££',
    servesCuisine: ['Coffee', 'Bakery'],
    acceptsReservations: false,
    address: postalAddress(address),
    ...geoCoordinates(geo),
    hasMap: mapsUrl,
    openingHoursSpecification: openingHours(hours),
    hasMenu: { '@id': menuId },
    parentOrganization: { '@id': org },
    potentialAction: { '@type': 'OrderAction', target: site.orderUrl },
  });

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': org,
        name: site.name,
        alternateName: site.shortName,
        url: site.url,
        logo: `${site.url}/icons/icon-512.png`,
        image,
        email: site.email,
        description: site.description,
        ...(site.foundingDate && { foundingDate: site.foundingDate }),
        ...(site.founder && { founder: { '@type': 'Person', name: site.founder } }),
        sameAs: [site.instagram.url],
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: 'en-GB',
        publisher: { '@id': org },
      },
      {
        '@type': 'Menu',
        '@id': menuId,
        url: site.orderUrl,
        inLanguage: 'en-GB',
        hasMenuSection: visibleCategories(menu).map((category) => ({
          '@type': 'MenuSection',
          name: category.label,
          hasMenuItem: category.items.map((item) => ({
            '@type': 'MenuItem',
            name: item.name,
            ...(item.description && { description: item.description }),
            ...(item.image && { image: absolute(site, item.image.src) }),
            ...(menu.showPrices && {
              offers: { '@type': 'Offer', price: item.price.toFixed(2), priceCurrency: menu.currency },
            }),
          })),
        })),
      },
      shop('richmond', site.locationName, site.address, site.mapsUrl, site.openingHours, site.geo),
      ...site.branches.map((b) => shop(b.id, b.name, b.address, b.mapsUrl, b.openingHours, b.geo)),
    ],
  };
}
