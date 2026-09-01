import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categories,
  getCategory,
  productsByCategory,
} from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps<"/catalog/[slug]">) {
  const { slug } = await props.params;
  const category = getCategory(slug);
  return {
    title: category
      ? `${category.title} — VOLAR.by`
      : "Категория — VOLAR.by",
  };
}

export default async function CategoryPage(
  props: PageProps<"/catalog/[slug]">,
) {
  const { slug } = await props.params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = productsByCategory(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/" className="hover:text-accent">
          Главная
        </Link>{" "}
        /{" "}
        <Link href="/catalog" className="hover:text-accent">
          Каталог
        </Link>{" "}
        / <span className="text-foreground">{category.title}</span>
      </nav>

      <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h1 className="text-3xl font-extrabold tracking-tight">
          {category.title}
        </h1>
        <p className="mt-2 text-muted">{items.length} товаров</p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
