import Image from "next/image";
import Link from "next/link";
import { categories, products } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";
import { categoryImage, siteImages } from "@/lib/site";

export const metadata = {
  title: "Каталог масел — VOLAR.by",
  description:
    "Полный каталог моторных, гидравлических и индустриальных масел.",
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

      <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
        <div className="relative h-40 w-full sm:h-52">
          <Image
            src={siteImages.catalogBanner}
            alt="Моторное масло переливается из канистры"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-transparent" />
          <h1 className="absolute bottom-5 left-6 text-3xl font-extrabold tracking-tight text-background drop-shadow sm:text-4xl">
            Каталог
          </h1>
        </div>

        <div className="p-6">
          <p className="text-muted">
            {products.length} товаров в {categories.length} категориях
          </p>

          {/* Category chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/catalog/${c.slug}`}
                className="flex items-center gap-2 rounded-full border border-border bg-background py-1 pl-1 pr-4 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full bg-white">
                  <Image
                    src={categoryImage(c.slug)}
                    alt=""
                    fill
                    aria-hidden
                    sizes="28px"
                    className="object-contain p-0.5"
                  />
                </span>
                {c.title}{" "}
                <span className="text-xs text-muted/70">({c.count})</span>
              </Link>
            ))}
          </div>
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
