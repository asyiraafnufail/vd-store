'use client'

import Image from 'next/image'
import { ADMIN_WA_NUMBER } from '@/app/lib/constants/validation'
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

function generateWALink(product: Product): string {
  const message = `Halo VD Phone Store, saya tertarik dengan ${product.name}, ${product.storage}, Garansi ${product.warranty}`
  return `https://wa.me/${ADMIN_WA_NUMBER}?text=${encodeURIComponent(message)}`
}

export default function ProductCard({ product }: { product: Product }) {
  const waLink = generateWALink(product)
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
      {/* Foto Container — Box dalam Card */}
      <div
        className="relative flex-shrink-0 flex items-center justify-center"
        style={{
          width: 'clamp(7rem, 30vw, 13rem)',
          aspectRatio: '4/5',
          padding: 'clamp(0.5rem, 2vw, 0.75rem)',
          background: 'var(--color-surface)',
        }}
      >
        <div
          className="relative w-full h-full"
          style={{
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
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
            style={{
              fontSize: 'clamp(0.625rem, 2.5vw, 0.75rem)',
              color: 'var(--color-text-primary)',
            }}
          >
            {product.brand}
          </span>

          {/* Nama */}
          <h3
            className="font-semibold leading-snug"
            style={{
              fontSize: 'clamp(0.9375rem, 3.8vw, 1.5rem)',
              color: 'var(--color-text-primary)',
            }}
          >
            {product.name}
          </h3>

          {/* Kondisi */}
          <span
            className="font-semibold tracking-widest uppercase"
            style={{
              fontSize: 'clamp(0.625rem, 2.5vw, 0.75rem)',
              color: conditionColor[product.condition],
            }}
          >
            {product.condition}
          </span>

          {/* Quality */}
          <span
            className="font-medium uppercase"
            style={{
              fontSize: 'clamp(0.625rem, 2.5vw, 0.75rem)',
              color: 'var(--color-text-primary)',
            }}
          >
            {product.quality}
          </span>

          {/* Storage + Garansi */}
          <p
            style={{
              fontSize: 'clamp(0.625rem, 2.5vw, 0.75rem)',
              color: 'var(--color-text-primary)',
            }}
          >
            {product.storage} — Garansi {product.warranty}
          </p>

          {/* Badge */}
          {product.badge && (
            <p
              style={{
                fontSize: 'clamp(0.625rem, 2.5vw, 0.75rem)',
                color: 'var(--color-text-primary)',
              }}
            >
              {product.badge}
            </p>
          )}
        </div>

        {/* Harga + CTA */}
        <div
          className="flex flex-col"
          style={{ gap: 'clamp(0.625rem, 2.5vw, 0.875rem)' }}
        >
          <p
            className="font-bold leading-tight"
            style={{
              fontSize: 'clamp(0.8125rem, 3.5vw, 1.25rem)',
              color: 'var(--color-text-primary)',
            }}
          >
            {(product as any).price_max
              ? `${fmt(product.price)} — ${fmt((product as any).price_max)}`
              : fmt(product.price)}
          </p>

          <a
            href={waLink}
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
