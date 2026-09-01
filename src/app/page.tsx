import Link from "next/link";
import { categories, products } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";
import Advantages from "@/components/Advantages";
import { company } from "@/lib/site";

export default function Home() {
  const popular = products.slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
              Оптом от производителя
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
              Масла, которые{" "}
              <span className="text-accent">работают на вас</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted">
              Моторные, гидравлические, трансмиссионные и индустриальные масла.
              Оптимальные решения для двигателей и промышленного оборудования.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/catalog"
                className="rounded-md bg-accent px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-accent/90"
              >
                Онлайн-каталог
              </Link>
              <Link
                href="/contacts"
                className="rounded-md border border-border bg-surface px-6 py-3 font-semibold transition-colors hover:border-accent hover:text-accent"
              >
                Связаться
              </Link>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
              {[
                { n: `${products.length}`, l: "товаров" },
                { n: `${categories.length}`, l: "категорий" },
                { n: "ТУ BY", l: "и ГОСТ" },
                { n: "24/7", l: "заявки" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl font-extrabold text-foreground">
                    {s.n}
                  </div>
                  <div className="mt-0.5 text-xs uppercase tracking-wide text-muted">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category quick grid */}
          <div className="grid grid-cols-2 gap-3">
            {categories.slice(0, 6).map((c) => (
              <Link
                key={c.slug}
                href={`/catalog/${c.slug}`}
                className="group rounded-lg border border-border bg-background p-5 transition-all hover:border-accent hover:shadow-sm"
              >
                <div className="font-semibold leading-snug transition-colors group-hover:text-accent">
                  {c.title}
                </div>
                <div className="mt-1 text-sm text-muted">{c.count} товаров</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              Категории
            </h2>
            <p className="mt-1 text-muted">Выберите тип масла</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/catalog/${c.slug}`}
              className="group flex items-center justify-between rounded-lg border border-border bg-surface p-5 shadow-sm transition-all hover:border-accent hover:shadow-md"
            >
              <div>
                <div className="font-semibold transition-colors group-hover:text-accent">
                  {c.title}
                </div>
                <div className="text-sm text-muted">{c.count} товаров</div>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-2 text-accent transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Advantages */}
      <Advantages />

      {/* Popular products */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                Популярные товары
              </h2>
              <p className="mt-1 text-muted">Часто заказывают</p>
            </div>
            <Link
              href="/catalog"
              className="text-sm font-semibold text-accent hover:underline"
            >
              Весь каталог →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {popular.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Contacts CTA */}
      <section className="border-t border-border bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Нужна консультация по подбору масла?
            </h2>
            <p className="mt-3 text-background/70">
              Позвоните или напишите — подскажем подходящий продукт, условия
              оплаты, доставки и самовывоза.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-sm text-background/70">
              {company.hours.map((h) => (
                <span
                  key={h}
                  className="rounded-full border border-background/20 px-3 py-1"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {company.phones.map((p) => (
              <a
                key={p}
                href={`tel:${p.replace(/[^\d+]/g, "")}`}
                className="rounded-lg bg-accent px-5 py-4 text-center text-lg font-bold text-white transition-colors hover:bg-accent/90"
              >
                {p}
              </a>
            ))}
            <a
              href={`mailto:${company.email}`}
              className="rounded-lg border border-background/25 px-5 py-4 text-center text-lg font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              {company.email}
            </a>
            <Link
              href="/contacts"
              className="rounded-lg border border-background/25 px-5 py-4 text-center text-lg font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              Все контакты →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}


