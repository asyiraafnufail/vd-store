'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getProducts, deleteProduct } from '@/app/actions/products'
import type { Database } from '@/app/lib/supabase'

type Product = Database['public']['Tables']['products']['Row']

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts()
        setProducts(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal load produk')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Hapus "${name}"?`)) return

    try {
      await deleteProduct(id)
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Gagal hapus produk')
    }
  }

  if (loading)
    return <div className="text-center py-8 text-slate-600">Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            Produk
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            {products.length} produk terdaftar
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 rounded-md font-medium transition-colors duration-200"
          style={{
            background: 'var(--color-accent)',
            color: 'var(--color-text-on-accent)',
          }}
        >
          + Tambah Produk
        </Link>
      </div>

      {error && (
        <div
          className="p-4 rounded-lg text-sm border"
          style={{
            background: '#FEE2E2',
            borderColor: '#FECACA',
            color: '#991B1B',
          }}
        >
          {error}
        </div>
      )}

      {products.length === 0 ? (
        <div
          className="text-center py-12 rounded-lg border-2 border-dashed"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
        >
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
            Belum ada produk
          </p>
          <Link
            href="/admin/products/new"
            className="text-sm font-medium"
            style={{ color: 'var(--color-accent)' }}
          >
            Tambah produk pertama
          </Link>
        </div>
      ) : (
        <div className="rounded-lg overflow-hidden border" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full">
            <thead
              style={{
                background: 'var(--color-primary)',
              }}
            >
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold" style={{ color: 'var(--color-text-on-dark)' }}>
                  Foto
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold" style={{ color: 'var(--color-text-on-dark)' }}>
                  Produk
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold" style={{ color: 'var(--color-text-on-dark)' }}>
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold" style={{ color: 'var(--color-text-on-dark)' }}>
                  Harga
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold" style={{ color: 'var(--color-text-on-dark)' }}>
                  Kondisi
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold" style={{ color: 'var(--color-text-on-dark)' }}>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  style={{
                    borderTop: '1px solid var(--color-border)',
                    background: 'var(--color-surface)',
                  }}
                >
                  <td className="px-6 py-4">
                    <div
                      className="w-12 h-12 rounded-md overflow-hidden"
                      style={{
                        background: 'var(--color-surface-alt)',
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-sm" style={{ color: 'var(--color-text-primary)' }}>
                        {product.name}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                        {product.storage}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: 'var(--color-text-primary)' }}>
                    {product.brand}
                  </td>
                  <td className="px-6 py-4 font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>
                    Rp {product.price.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-md"
                      style={{
                        background: product.condition === 'Baru' ? 'var(--color-primary)' : 'var(--color-surface-alt)',
                        color: product.condition === 'Baru' ? 'var(--color-text-on-dark)' : 'var(--color-text-primary)',
                      }}
                    >
                      {product.condition}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="px-3 py-1 text-xs font-medium rounded-md transition-colors duration-200"
                        style={{
                          background: 'var(--color-accent-soft)',
                          color: 'var(--color-accent)',
                        }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="px-3 py-1 text-xs font-medium rounded-md transition-colors duration-200"
                        style={{
                          background: '#FEE2E2',
                          color: '#DC2626',
                        }}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
