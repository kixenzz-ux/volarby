import catalog from "@/data/catalog.json";

export type Spec = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  article: string;
  category: string;
  categorySlug: string;
  image: string;
  imageWidth: number | null;
  imageHeight: number | null;
  sourceUrl: string;
  specs: Spec[];
  description: string;
};

export type Category = {
  slug: string;
  title: string;
  count: number;
};

export type SiteFunction = {
  name: string;
  text: string;
  link: string;
};

export type Contacts = {
  phones: string[];
  email: string;
};

type Catalog = {
  categories: Category[];
  products: Product[];
  functions: SiteFunction[];
  contacts: Contacts;
};

const data = catalog as Catalog;

export const categories = data.categories;
export const products = data.products;
export const siteFunctions = data.functions;
export const contacts = data.contacts;

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(slug: string): Product[] {
  return products.filter((p) => p.categorySlug === slug);
}

export function relatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, limit);
}
