import Link from "next/link";
import { categories } from "@/lib/catalog";
import { company } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
      {/* Top utility bar */}
      <div className="border-b border-border bg-foreground text-background">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-1.5 text-xs">
          <span className="opacity-80">Оптовые поставки масел по Беларуси</span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {company.phones.map((p) => (
              <a
                key={p}
                href={`tel:${p.replace(/[^\d+]/g, "")}`}
                className="font-medium transition-opacity hover:opacity-70"
              >
                {p}
              </a>
            ))}
            <a
              href={`mailto:${company.email}`}
              className="hidden font-medium transition-opacity hover:opacity-70 sm:block"
            >
              {company.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-accent text-lg font-black text-white">
            V
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-xl font-extrabold tracking-tight">
              VOLAR<span className="text-accent">.by</span>
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
              масла оптом
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link href="/" className="transition-colors hover:text-accent">
            Главная
          </Link>
          <Link href="/catalog" className="transition-colors hover:text-accent">
            Каталог
          </Link>
          <Link
            href="/contacts"
            className="transition-colors hover:text-accent"
          >
            Контакты
          </Link>
        </nav>

        <Link
          href="/catalog"
          className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent/90"
        >
          Смотреть каталог
        </Link>
      </div>

      {/* Category strip */}
      <div className="border-t border-border bg-surface-2/60">
        <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 py-2.5 text-[13px] font-medium text-muted">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/catalog/${c.slug}`}
              className="whitespace-nowrap transition-colors hover:text-accent"
            >
              {c.title}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

