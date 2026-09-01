import Link from "next/link";
import { categories, products } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Каталог масел — VOLAR.by",
  description: "Полный каталог моторных, гидравлических и индустриальных масел.",
};

export default function CatalogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/" className="hover:text-accent">
          Главная
        </Link>{" "}
        / <span className="text-foreground">Каталог</span>
      </nav>

      <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h1 className="text-3xl font-extrabold tracking-tight">Каталог</h1>
        <p className="mt-2 text-muted">
          {products.length} товаров в {categories.length} категориях
        </p>

        {/* Category chips */}
        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/catalog/${c.slug}`}
              className="rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {c.title}{" "}
              <span className="text-xs text-muted/70">({c.count})</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}

