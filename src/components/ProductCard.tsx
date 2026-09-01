import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/catalog";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-sm transition-all hover:border-accent hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-white">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-5 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted">
            нет фото
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-muted">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 border-t border-border p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
          {product.name}
        </h3>
        {product.article && (
          <span className="text-xs text-muted">{product.article}</span>
        )}
        <span className="mt-auto flex items-center gap-1 pt-2 text-sm font-semibold text-accent">
          Подробнее
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

