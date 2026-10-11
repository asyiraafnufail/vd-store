'use client'

import { useState } from 'react'
import type { Product } from '../data/products'
import { brands, conditions } from '../data/products'
import ProductCard from './ProductCard'

export default function Catalog({ products }: { products: Product[] }) {
  const [brand, setBrand] = useState('Semua')
  const [cond, setCond] = useState('Semua')

  const filtered = products.filter(
    (p) =>
      (brand === 'Semua' || p.brand === brand) &&
      (cond === 'Semua' || p.condition === cond),
  )

  return (
    <section id="katalog" className="py-14 md:py-20 px-4 md:px-8 w-full max-w-6xl mx-auto">
      <h2
        className="font-bold text-center mb-2"
        style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', color: 'var(--color-text-primary)' }}
      >
        Katalog
      </h2>
      <p
        className="text-center mb-10 text-sm"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        iPhone dan Samsung — baru maupun second
      </p>

      {/* Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-4">
        {brands.map((b) => (
          <FilterBtn
            key={b}
            label={b}
            active={brand === b}
            onClick={() => setBrand(b)}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {conditions.map((c) => (
          <FilterBtn
            key={c}
            label={c}
            active={cond === c}
            onClick={() => setCond(c)}
          />
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p
          className="text-center py-20 text-sm"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Tidak ada produk untuk filter ini.
        </p>
      )}
    </section>
  )
}

function FilterBtn({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="transition-all duration-150 font-medium"
      style={{
        fontSize: '0.8125rem',
        padding: '7px 20px',
        borderRadius: 'var(--radius-md)',
        border: active
          ? '1.5px solid var(--color-primary)'
          : '1.5px solid var(--color-border)',
        background: active ? 'var(--color-primary)' : 'transparent',
        color: active
          ? 'var(--color-text-on-dark)'
          : 'var(--color-text-secondary)',
        letterSpacing: '0.02em',
      }}
    >
      {label}
    </button>
  )
}
