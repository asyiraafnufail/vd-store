'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ProductForm } from '@/app/components/ProductForm'
import { createProduct } from '@/app/actions/products'
import type { Database } from '@/app/lib/supabase'

type ProductInput = Database['public']['Tables']['products']['Insert']

export default function NewProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(data: ProductInput) {
    setIsLoading(true)
    try {
      await createProduct(data)
      router.push('/admin/products')
    } catch (err) {
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            Tambah Produk
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            Buat produk baru di katalog
          </p>
        </div>
        <Link
          href="/admin/products"
          className="px-4 py-2 rounded-md font-medium transition-colors duration-200 border"
          style={{
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-primary)',
            background: 'var(--color-surface)',
          }}
        >
          Kembali
        </Link>
      </div>

      <ProductForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  )
}
