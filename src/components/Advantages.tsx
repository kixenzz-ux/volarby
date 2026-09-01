import Image from "next/image";
import { advantages, siteImages, type Advantage } from "@/lib/site";

function Icon({ type }: { type: Advantage["icon"] }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (type === "quality") {
    // Гаечный ключ
    return (
      <svg {...common}>
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.1-2.1 2.6-2.6z" />
      </svg>
    );
  }
  if (type === "assortment") {
    // Канистра / ассортимент
    return (
      <svg {...common}>
        <rect x="4" y="8" width="12" height="12" rx="1.5" />
        <path d="M16 11h2.5a1.5 1.5 0 0 1 1.5 1.5V18a2 2 0 0 1-2 2h-2" />
        <path d="M7 8V5.5A1.5 1.5 0 0 1 8.5 4h3A1.5 1.5 0 0 1 13 5.5V8" />
        <path d="M8 13h4" />
      </svg>
    );
  }
  // Экономия топлива — глобус
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
    </svg>
  );
}

export default function Advantages() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-3xl font-extrabold uppercase tracking-tight text-accent sm:text-4xl">
        Преимущества наших моторных масел
      </h2>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        {/* Баннер */}
        <div className="relative h-52 w-full overflow-hidden sm:h-72 md:h-80">
          <Image
            src={siteImages.advantagesBanner}
            alt="Автомагистраль на закате — масла VOLAR в дороге"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/45 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent" />
        </div>

        {/* Карточки */}
        <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-3">
          {advantages.map((a) => (
            <div
              key={a.title}
              className="rounded-xl border border-border bg-surface p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-accent hover:shadow-md"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-accent text-white">
                <Icon type={a.icon} />
              </div>
              <h3 className="mt-5 text-base font-bold uppercase leading-snug tracking-wide text-accent">
                {a.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {a.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
