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
      className="bg-white flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
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
        className="relative w-full"
        style={{ aspectRatio: '4/3', background: 'var(--color-surface-alt)' }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        {/* Merek */}
        <span
          className="text-xs font-medium tracking-widest uppercase"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {product.brand}
        </span>

        {/* Nama */}
        <h3
          className="font-semibold leading-snug"
          style={{ fontSize: '1rem', color: 'var(--color-text-primary)' }}
        >
          {product.name}
        </h3>

        {/* Kondisi */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: conditionColor[product.condition] }}
          >
            {product.condition}
          </span>
          {product.quality && (
            <>
              <span style={{ color: 'var(--color-border)' }}>·</span>
              <span
                className="text-xs font-medium uppercase"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {product.quality}
              </span>
            </>
          )}
        </div>

        {/* Storage + Garansi */}
        <p
          className="text-xs"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {product.storage} &nbsp;—&nbsp; Garansi {product.warranty}
        </p>

        {/* Harga */}
        <p
          className="font-bold mt-2"
          style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)' }}
        >
          {fmt(product.price)}
        </p>

        {/* CTA */}
        <a
          href={product.waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center justify-center font-bold transition-colors duration-200"
          style={{
            background: 'var(--color-accent)',
            color: 'var(--color-text-on-accent)',
            borderRadius: 'var(--radius-md)',
            padding: '11px 0',
            fontSize: '0.8125rem',
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
    </article>
  )
}
