'use client'

import Image from 'next/image'
import type { Product } from '../data/products'

const fmt = (n: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n)

const conditionColor: Record<Product['condition'], string> = {
  Baru: 'var(--color-primary)',
  Second: 'var(--color-text-secondary)',
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article
      className="bg-white h-full flex flex-row overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
      style={{
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-card)',
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-hover)')
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)')
      }
    >
      {/* Foto */}
      <div
        className="relative flex-shrink-0"
        style={{
          width: 'clamp(7rem, 30vw, 13rem)',
          aspectRatio: '4/5',
          background: 'var(--color-surface-alt)',
        }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 30vw, 208px"
        />
      </div>

      {/* Info */}
      <div
        className="flex flex-col flex-1 justify-between"
        style={{
          padding: 'clamp(0.75rem, 3vw, 1.25rem)',
          gap: 'clamp(0.5rem, 2vw, 0.75rem)',
        }}
      >
        <div
          className="flex flex-col"
          style={{ gap: 'clamp(0.125rem, 0.8vw, 0.25rem)' }}
        >
          {/* Merek */}
          <span
            className="font-medium tracking-widest uppercase"
            style={{ fontSize: 'clamp(0.625rem, 2.5vw, 0.75rem)', color: 'var(--color-text-muted)' }}
          >
            {product.brand}
          </span>

          {/* Nama */}
          <h3
            className="font-semibold leading-snug"
            style={{ fontSize: 'clamp(0.9375rem, 3.8vw, 1.5rem)', color: 'var(--color-text-primary)' }}
          >
            {product.name}
          </h3>

          {/* Kondisi */}
          <span
            className="font-semibold tracking-widest uppercase"
            style={{ fontSize: 'clamp(0.625rem, 2.5vw, 0.75rem)', color: conditionColor[product.condition] }}
          >
            {product.condition}
          </span>

          {/* Quality */}
          <span
            className="font-medium uppercase"
            style={{ fontSize: 'clamp(0.625rem, 2.5vw, 0.75rem)', color: 'var(--color-text-muted)' }}
          >
            {product.quality}
          </span>

          {/* Storage + Garansi */}
          <p
            style={{ fontSize: 'clamp(0.625rem, 2.5vw, 0.75rem)', color: 'var(--color-text-muted)' }}
          >
            {product.storage} — Garansi {product.warranty}
          </p>
        </div>

        {/* Harga + CTA */}
        <div
          className="flex flex-col"
          style={{ gap: 'clamp(0.375rem, 1.5vw, 0.5rem)' }}
        >
          <p
            className="font-bold leading-none"
            style={{ fontSize: 'clamp(0.9375rem, 4vw, 1.5rem)', color: 'var(--color-text-primary)' }}
          >
            {fmt(product.price)}
          </p>

          <a
            href={product.waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center font-bold transition-colors duration-200"
            style={{
              background: 'var(--color-accent)',
              color: 'var(--color-text-on-accent)',
              borderRadius: 'var(--radius-md)',
              padding: 'clamp(0.5rem, 2vw, 0.625rem) 0',
              fontSize: 'clamp(0.625rem, 2.5vw, 0.875rem)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              boxShadow: 'var(--shadow-cta)',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                'var(--color-accent-hover)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                'var(--color-accent)')
            }
          >
            Tanya Produk
          </a>
        </div>
      </div>
    </article>
  )
}
