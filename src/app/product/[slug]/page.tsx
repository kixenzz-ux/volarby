import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products, relatedProducts } from "@/lib/catalog";
import { company } from "@/lib/site";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  return {
    title: product ? `${product.name} — VOLAR.by` : "Товар — VOLAR.by",
    description: product?.description || undefined,
  };
}

export default async function ProductPage(
  props: PageProps<"/product/[slug]">,
) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedProducts(product);

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
        /{" "}
        <Link
          href={`/catalog/${product.categorySlug}`}
          className="hover:text-accent"
        >
          {product.category}
        </Link>{" "}
        / <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-white shadow-sm">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-8"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted">
              нет фото
            </div>
          )}
        </div>

        <div>
          <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
            {product.category}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight">
            {product.name}
          </h1>
          {product.article && (
            <p className="mt-2 text-sm text-muted">Артикул: {product.article}</p>
          )}

          {product.description && (
            <p className="mt-4 text-muted">{product.description}</p>
          )}

          {product.specs.length > 0 && (
            <div className="mt-6 overflow-hidden rounded-lg border border-border shadow-sm">
              <table className="w-full text-sm">
                <tbody>
                  {product.specs.map((s, i) => (
                    <tr
                      key={i}
                      className="border-b border-border last:border-0 even:bg-surface-2/50"
                    >
                      <td className="px-4 py-3 text-muted">{s.label}</td>
                      <td className="px-4 py-3 text-right font-semibold">
                        {s.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-8 rounded-lg border border-border bg-surface p-5 shadow-sm">
            <p className="text-sm font-medium text-muted">
              Для заказа и уточнения цены:
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {company.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/[^\d+]/g, "")}`}
                  className="rounded-md bg-accent px-5 py-2.5 font-semibold text-white shadow-sm transition-colors hover:bg-accent/90"
                >
                  {p}
                </a>
              ))}
              <a
                href={`mailto:${company.email}`}
                className="rounded-md border border-border px-5 py-2.5 font-semibold transition-colors hover:border-accent hover:text-accent"
              >
                {company.email}
              </a>
            </div>
          </div>

          <a
            href={product.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-muted underline-offset-2 hover:text-accent hover:underline"
          >
            Источник на volar.by ↗
          </a>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-extrabold tracking-tight">
            Похожие товары
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
