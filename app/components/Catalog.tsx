'use client'

import { useState } from 'react'
import type { Product } from '../data/products'
import { brands, conditions } from '../data/products'
import ProductCard from './ProductCard'

const ITEMS_PER_PAGE = 6

export default function Catalog({ products }: { products: Product[] }) {
  const [brand, setBrand] = useState('Semua')
  const [cond, setCond] = useState('Semua')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = products.filter(
    (p) =>
      (brand === 'Semua' || p.brand === brand) &&
      (cond === 'Semua' || p.condition === cond) &&
      (search === '' || p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.storage.toLowerCase().includes(search.toLowerCase())),
  )

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginatedProducts = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handleFilterChange = () => setPage(1)

  return (
    <section id="katalog" className="py-14 md:py-20 px-4 md:px-8 w-full max-w-6xl mx-auto">
      <h2
        className="font-bold text-center mb-2"
        style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', color: 'var(--color-text-primary)' }}
      >
        Katalog
      </h2>
      <p
        className="text-center mb-8 text-sm"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        iPhone dan Samsung — baru maupun second
      </p>

      {/* Search */}
      <div className="mb-6 max-w-md mx-auto w-full">
        <input
          type="text"
          placeholder="Cari produk (nama, storage)..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          className="w-full px-4 py-2 text-sm rounded-lg border"
          style={{
            borderColor: 'var(--color-border)',
            background: 'var(--color-surface)',
            color: 'var(--color-text-primary)',
          }}
        />
      </div>

      {/* Filter Brand */}
      <div className="flex flex-wrap gap-3 justify-center mb-4">
        {brands.map((b) => (
          <FilterBtn
            key={b}
            label={b}
            active={brand === b}
            onClick={() => {
              setBrand(b)
              handleFilterChange()
            }}
          />
        ))}
      </div>

      {/* Filter Condition */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {conditions.map((c) => (
          <FilterBtn
            key={c}
            label={c}
            active={cond === c}
            onClick={() => {
              setCond(c)
              handleFilterChange()
            }}
          />
        ))}
      </div>

      {/* Grid */}
      {paginatedProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4 md:gap-6 max-w-3xl mx-auto w-full mb-8">
            {paginatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-3 py-2 text-sm rounded-md transition-colors disabled:opacity-50"
                style={{
                  background: page === 1 ? 'var(--color-surface)' : 'var(--color-accent)',
                  color: page === 1 ? 'var(--color-text-muted)' : 'var(--color-text-on-accent)',
                  border: `1px solid ${page === 1 ? 'var(--color-border)' : 'var(--color-accent)'}`,
                }}
              >
                Sebelumnya
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className="w-8 h-8 text-sm rounded-md transition-colors font-medium"
                    style={{
                      background: page === p ? 'var(--color-accent)' : 'var(--color-surface)',
                      color: page === p ? 'var(--color-text-on-accent)' : 'var(--color-text-primary)',
                      border: `1px solid ${page === p ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-3 py-2 text-sm rounded-md transition-colors disabled:opacity-50"
                style={{
                  background: page === totalPages ? 'var(--color-surface)' : 'var(--color-accent)',
                  color: page === totalPages ? 'var(--color-text-muted)' : 'var(--color-text-on-accent)',
                  border: `1px solid ${page === totalPages ? 'var(--color-border)' : 'var(--color-accent)'}`,
                }}
              >
                Selanjutnya
              </button>
            </div>
          )}
        </>
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
