import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/catalog";
import { company, infoLinks } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Image
              src="/site/logo-mark-white.png"
              alt="Логотип VOLAR"
              width={50}
              height={51}
              className="h-9 w-auto"
            />
            <span className="text-lg font-extrabold">VOLAR.by</span>
          </div>
          <p className="text-sm text-background/70">
            Оптовая торговля моторными, гидравлическими и индустриальными
            маслами от производителя.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-background/60">
            Каталог
          </h3>
          <ul className="space-y-2 text-sm">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/catalog/${c.slug}`}
                  className="text-background/70 transition-colors hover:text-accent"
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Информация */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-background/60">
            Информация
          </h3>
          <ul className="space-y-2 text-sm">
            {infoLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-background/70 transition-colors hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Контакты */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-background/60">
            Контакты
          </h3>
          <ul className="space-y-1.5 text-sm text-background/70">
            <li className="font-semibold text-background">
              {company.legalName}, УНП {company.unp}
            </li>
            <li>{company.registration}</li>
            <li>{company.address}</li>
            <li>{company.tradeRegister}</li>
            {company.hours.map((h) => (
              <li key={h}>{h}</li>
            ))}
            <li className="pt-1">
              <a
                href={`mailto:${company.email}`}
                className="transition-colors hover:text-accent"
              >
                {company.email}
              </a>
            </li>
            {company.phones.map((p) => (
              <li key={p}>
                <a
                  href={`tel:${p.replace(/[^\d+]/g, "")}`}
                  className="transition-colors hover:text-accent"
                >
                  {p}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-background/15 py-4 text-center text-xs text-background/60">
        © 2015–{new Date().getFullYear()} VOLAR.by — {company.legalName}.
      </div>
    </footer>
  );
}
