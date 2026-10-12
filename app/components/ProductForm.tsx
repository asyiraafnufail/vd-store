'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { uploadProductPhoto } from '@/app/actions/products'
import { getWANumber } from '@/app/lib/settings'
import { VALID_BRANDS, VALID_CONDITIONS, VALID_QUALITIES, VALID_WARRANTIES, VALIDATION_MESSAGES } from '@/app/lib/constants/validation'
import type { Database } from '@/app/lib/supabase'

type Product = Database['public']['Tables']['products']['Row']
type ProductInput = Database['public']['Tables']['products']['Insert']

interface ProductFormProps {
  initialData?: Product
  onSubmit: (data: ProductInput) => Promise<void>
  isLoading?: boolean
}

const brands = VALID_BRANDS
const conditions = VALID_CONDITIONS
const qualities = VALID_QUALITIES
const warranties = VALID_WARRANTIES

const formatPrice = (price: number) => price.toLocaleString('id-ID')

export function ProductForm({ initialData, onSubmit, isLoading }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductInput>({
    name: initialData?.name || '',
    brand: initialData?.brand || '',
    storage: initialData?.storage || '',
    condition: initialData?.condition || 'Baru',
    quality: initialData?.quality || 'Brand New',
    warranty: initialData?.warranty || 'Resmi',
    price: initialData?.price || 0,
    price_max: initialData?.price_max || undefined,
    image: initialData?.image || '',
    badge: initialData?.badge || '',
    wa_link: initialData?.wa_link || '',
  })

  const [photoPreview, setPhotoPreview] = useState<string | null>(initialData?.image || null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Auto-generate WA link saat nama berubah
  useEffect(() => {
    if (formData.name && formData.name.trim()) {
      const waNumber = getWANumber()
      const waLink = `https://wa.me/${waNumber}?text=Halo%20VD%20Phone%20Store%2C%20saya%20tertarik%20dengan%20${encodeURIComponent(formData.name)}`
      setFormData((prev) => ({ ...prev, wa_link: waLink }))
    }
  }, [formData.name])

  async function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setError('')
    setUploading(true)

    try {
      const url = await uploadProductPhoto(file)
      setFormData((prev) => ({ ...prev, image: url }))
      setPhotoPreview(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal upload foto')
    } finally {
      setUploading(false)
    }
  }

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>, field: 'price' | 'price_max') {
    const value = e.target.value.replace(/\./g, '')
    const numValue = value === '' ? 0 : parseInt(value)
    setFormData((prev) => ({ ...prev, [field]: numValue }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!formData.image) {
      setError(VALIDATION_MESSAGES.PHOTO_REQUIRED)
      return
    }

    if (!formData.name) {
      setError(VALIDATION_MESSAGES.NAME_REQUIRED)
      return
    }

    if (!formData.brand) {
      setError(VALIDATION_MESSAGES.BRAND_INVALID)
      return
    }

    if (formData.price <= 0) {
      setError(VALIDATION_MESSAGES.PRICE_INVALID)
      return
    }

    try {
      await onSubmit(formData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal simpan produk')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      {/* Foto */}
      <div
        className="rounded-lg p-6 border"
        style={{
          background: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        <label className="block text-sm font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
          Foto Produk *
        </label>
        <div className="flex gap-6">
          <div className="flex-shrink-0">
            {photoPreview ? (
              <div className="relative w-32 h-40 rounded-lg overflow-hidden" style={{ background: 'var(--color-surface-alt)' }}>
                <Image src={photoPreview} alt="Preview" fill className="object-cover" />
              </div>
            ) : (
              <div
                className="w-32 h-40 rounded-lg flex items-center justify-center text-sm"
                style={{ background: 'var(--color-surface-alt)', color: 'var(--color-text-muted)' }}
              >
                Pilih foto
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoSelect} disabled={uploading || isLoading} className="hidden" />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || isLoading}
              className="px-4 py-2 rounded-md font-medium transition-colors duration-200 mb-2"
              style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}
            >
              {uploading ? 'Uploading...' : 'Pilih Foto'}
            </button>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              JPEG, PNG, WebP • Max 5 MB
            </p>
          </div>
        </div>
      </div>

      {/* Grid 2 kolom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nama */}
        <div className="rounded-lg p-6 border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Nama Produk *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            required
            disabled={isLoading}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-border)' }}
            placeholder="Contoh: iPhone 15 128GB"
          />
        </div>

        {/* Brand */}
        <div className="rounded-lg p-6 border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Brand *
          </label>
          <select
            value={formData.brand}
            onChange={(e) => setFormData((prev) => ({ ...prev, brand: e.target.value }))}
            required
            disabled={isLoading}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <option value="">Pilih brand</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Storage */}
        <div className="rounded-lg p-6 border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Storage *
          </label>
          <input
            type="text"
            value={formData.storage}
            onChange={(e) => setFormData((prev) => ({ ...prev, storage: e.target.value }))}
            required
            disabled={isLoading}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-border)' }}
            placeholder="Contoh: 128GB"
          />
        </div>

        {/* Kondisi */}
        <div className="rounded-lg p-6 border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Kondisi *
          </label>
          <select
            value={formData.condition}
            onChange={(e) => setFormData((prev) => ({ ...prev, condition: e.target.value }))}
            required
            disabled={isLoading}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-border)' }}
          >
            {conditions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Quality */}
        <div className="rounded-lg p-6 border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Kualitas *
          </label>
          <select
            value={formData.quality}
            onChange={(e) => setFormData((prev) => ({ ...prev, quality: e.target.value }))}
            required
            disabled={isLoading}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-border)' }}
          >
            {qualities.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>

        {/* Garansi */}
        <div className="rounded-lg p-6 border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Garansi *
          </label>
          <select
            value={formData.warranty}
            onChange={(e) => setFormData((prev) => ({ ...prev, warranty: e.target.value }))}
            required
            disabled={isLoading}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-border)' }}
          >
            {warranties.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        {/* Harga */}
        <div className="rounded-lg p-6 border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Harga *
          </label>
          <input
            type="text"
            value={formData.price ? formatPrice(formData.price) : ''}
            onChange={(e) => handlePriceChange(e, 'price')}
            required
            disabled={isLoading}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-border)' }}
            placeholder="Contoh: 6.200.000"
          />
          <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            Format: 1.000.000
          </p>
        </div>

        {/* Harga Max */}
        <div className="rounded-lg p-6 border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Harga Max (opsional)
          </label>
          <input
            type="text"
            value={formData.price_max ? formatPrice(formData.price_max) : ''}
            onChange={(e) => handlePriceChange(e, 'price_max')}
            disabled={isLoading}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-border)' }}
            placeholder="Untuk range harga"
          />
        </div>

        {/* Badge */}
        <div className="rounded-lg p-6 border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Badge (opsional)
          </label>
          <input
            type="text"
            value={formData.badge || ''}
            onChange={(e) => setFormData((prev) => ({ ...prev, badge: e.target.value || undefined }))}
            disabled={isLoading}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-border)' }}
            placeholder="Contoh: Terlaris"
          />
        </div>

        {/* WA Link */}
        <div className="rounded-lg p-6 border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
            WA Link (auto-generate)
          </label>
          <input
            type="text"
            value={formData.wa_link}
            disabled={true}
            className="w-full px-4 py-2 border rounded-md text-xs"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-alt)', color: 'var(--color-text-secondary)' }}
            title={formData.wa_link}
          />
          <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            Auto-generate dari nama produk
          </p>
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isLoading || uploading}
          className="px-6 py-3 rounded-md font-semibold transition-colors duration-200 disabled:opacity-50"
          style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}
        >
          {isLoading ? 'Menyimpan...' : 'Simpan Produk'}
        </button>
      </div>
    </form>
  )
}
