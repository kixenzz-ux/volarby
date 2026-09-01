import Link from "next/link";
import { company } from "@/lib/site";

export const metadata = {
  title: "Контакты — VOLAR.by",
};

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/" className="hover:text-accent">
          Главная
        </Link>{" "}
        / <span className="text-foreground">Контакты</span>
      </nav>

      <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h1 className="text-3xl font-extrabold tracking-tight">Контакты</h1>
        <p className="mt-2 text-muted">
          Свяжитесь с нами удобным способом — ответим на вопросы по ассортименту,
          ценам и доставке.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Телефоны
          </h2>
          <ul className="mt-3 space-y-2">
            {company.phones.map((p) => (
              <li key={p}>
                <a
                  href={`tel:${p.replace(/[^\d+]/g, "")}`}
                  className="text-lg font-semibold transition-colors hover:text-accent"
                >
                  {p}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Почта
          </h2>
          <a
            href={`mailto:${company.email}`}
            className="mt-3 block text-lg font-semibold transition-colors hover:text-accent"
          >
            {company.email}
          </a>

          <h2 className="mt-5 text-sm font-semibold uppercase tracking-wide text-muted">
            Режим работы
          </h2>
          <ul className="mt-3 space-y-1 text-muted">
            {company.hours.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
          Реквизиты
        </h2>
        <ul className="mt-3 space-y-1.5 text-sm text-foreground">
          <li className="font-semibold">
            {company.legalName}, УНП {company.unp}
          </li>
          <li className="text-muted">{company.registration}</li>
          <li className="text-muted">{company.address}</li>
          <li className="text-muted">{company.tradeRegister}</li>
        </ul>
      </div>
    </div>
  );
}

