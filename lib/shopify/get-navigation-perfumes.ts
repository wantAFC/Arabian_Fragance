"use server";

import type { Locale } from "@/i18n-config";
import { isPerfume } from "@/lib/shop/catalogs";
import { getShopifyProducts } from "@/lib/shopify/get-products";

export type NavigationPerfume = {
  id: string;
  handle: string;
  name: string;
  image: string;
};

const NAVIGATION_PERFUME_FALLBACK_IMAGE =
  "/assets/images/shop/product-fallback.png";

const FEATURED_HANDLES = new Set([
  "honey-musk",
  "amber-amber",
  "oud-eden",
  "amor",
  "jamila",
]);

export async function getNavigationPerfumes(
  locale: Locale,
): Promise<NavigationPerfume[]> {
  const products = await getShopifyProducts(locale);

  return products
    .filter(
      (product) => isPerfume(product) && FEATURED_HANDLES.has(product.slug),
    )
    .map((product) => ({
      id: product.id,
      handle: product.slug,
      name: product.name,
      image:
        product.images?.[0] ||
        product.image ||
        NAVIGATION_PERFUME_FALLBACK_IMAGE,
    }));
}
