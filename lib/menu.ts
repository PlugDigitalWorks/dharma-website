import type { Menu } from '@/lib/types';

/** Categories shown on the site, in data order. */
export function visibleCategories(menu: Menu) {
  return menu.categories.filter((category) => !category.hidden && category.items.length > 0);
}
