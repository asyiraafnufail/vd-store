'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ProductForm } from '@/app/components/ProductForm'
import { getProductById, updateProduct } from '@/app/actions/products'
import type { Database } from '@/app/lib/supabase'

type Product = Database['public']['Tables']['products']['Row']
type ProductInput = Database['public']['Tables']['products']['Insert']

function EditProductPageContent() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductById(productId)
        setProduct(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal load produk')
      } finally {
        setLoading(false)
      }
    }

    if (productId) loadProduct()
  }, [productId])

  async function handleSubmit(data: ProductInput) {
    setIsSubmitting(true)
    try {
      await updateProduct(productId, data)
      router.push('/admin/products')
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Gagal update produk'
      setError(errorMsg)
      setIsSubmitting(false)
    }
  }

  if (loading) return <div className="text-center py-8 text-slate-600">Loading...</div>

  if (error)
    return (
      <div>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-4">{error}</div>
        <Link href="/admin/products" className="text-blue-600 hover:underline">
          Kembali
        </Link>
      </div>
    )

  if (!product) return <div className="text-slate-600">Produk tidak ditemukan</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            Edit Produk
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            {product.name}
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

      <ProductForm initialData={product} onSubmit={handleSubmit} isLoading={isSubmitting} />
    </div>
  )
}

export default function EditProductPage() {
  return (
    <Suspense fallback={<div className="text-center py-8 text-slate-600">Loading...</div>}>
      <EditProductPageContent />
    </Suspense>
  )
}
