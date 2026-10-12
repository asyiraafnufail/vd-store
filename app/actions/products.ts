'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/app/lib/supabase/server'
import { Database } from '@/app/lib/supabase'
import {
  VALID_BRANDS,
  VALID_CONDITIONS,
  VALID_QUALITIES,
  VALID_WARRANTIES,
  VALIDATION_MESSAGES,
  isValidBrand,
  isValidCondition,
  isValidQuality,
  isValidWarranty,
} from '@/app/lib/constants/validation'

type Product = Database['public']['Tables']['products']['Insert']
type ProductUpdate = Database['public']['Tables']['products']['Update']

// Fetch all products
export async function getProducts() {
  const supabase = await createClient()
  console.log('📦 Fetching products from Supabase...')

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('❌ getProducts error:', error)
    throw new Error(error.message)
  }

  console.log('✅ getProducts returned:', data?.length || 0, 'products')
  return data
}

// Fetch single product
export async function getProductById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('products').select('*').eq('id', id)

  if (error) throw new Error(error.message)
  if (!data || data.length === 0) throw new Error('Produk tidak ditemukan')
  return data[0]
}

// Create product
export async function createProduct(product: Product) {
  validateProduct(product)
  const supabase = await createClient()
  const { data, error } = await supabase.from('products').insert(product).select()

  if (error) throw new Error(error.message)
  if (!data || data.length === 0) throw new Error('Gagal membuat produk')

  // Revalidate cache
  revalidatePath('/')
  revalidatePath('/admin/products')

  return data[0]
}

function validateProduct(product: Product) {
  if (!isValidBrand(product.brand)) throw new Error(VALIDATION_MESSAGES.BRAND_INVALID)
  if (!isValidCondition(product.condition)) throw new Error(VALIDATION_MESSAGES.CONDITION_INVALID)
  if (!isValidQuality(product.quality)) throw new Error(VALIDATION_MESSAGES.QUALITY_INVALID)
  if (!isValidWarranty(product.warranty)) throw new Error(VALIDATION_MESSAGES.WARRANTY_INVALID)
  if (product.price <= 0) throw new Error(VALIDATION_MESSAGES.PRICE_INVALID)
  if (product.price_max && product.price_max < product.price) throw new Error(VALIDATION_MESSAGES.PRICE_MAX_INVALID)
  if (!product.image) throw new Error(VALIDATION_MESSAGES.PHOTO_REQUIRED)
  if (!product.wa_link.startsWith('https://wa.me/')) throw new Error('WA link tidak valid')
}

// Update product
export async function updateProduct(id: string, product: ProductUpdate) {
  validateProductUpdate(product)
  const supabase = await createClient()

  // Filter out undefined values - Supabase doesn't like undefined
  const updateData: any = {}
  Object.entries(product).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      updateData[key] = value
    }
  })

  // Always set updated_at
  updateData.updated_at = new Date().toISOString()

  console.log('🔄 Updating product:', id, 'with data:', updateData)

  const { error: updateError } = await supabase
    .from('products')
    .update(updateData)
    .eq('id', id)

  if (updateError) {
    console.error('❌ Update error:', updateError)
    throw new Error(`Update error: ${updateError.message}`)
  }

  console.log('✅ Update successful, fetching updated data...')

  // Verify update was successful by fetching the updated product
  const { data: updatedData, error: fetchError } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)

  if (fetchError) {
    console.error('❌ Fetch error:', fetchError)
    throw new Error(`Verification error: ${fetchError.message}`)
  }

  if (!updatedData || updatedData.length === 0) {
    console.error('❌ No data returned after update')
    throw new Error('Produk dengan ID ini tidak ditemukan')
  }

  console.log('✅ Updated product:', updatedData[0])

  // Revalidate cache
  revalidatePath('/')
  revalidatePath('/admin/products')

  return updatedData[0]
}

function validateProductUpdate(product: ProductUpdate) {
  if (product.brand && !isValidBrand(product.brand)) throw new Error(VALIDATION_MESSAGES.BRAND_INVALID)
  if (product.condition && !isValidCondition(product.condition)) throw new Error(VALIDATION_MESSAGES.CONDITION_INVALID)
  if (product.quality && !isValidQuality(product.quality)) throw new Error(VALIDATION_MESSAGES.QUALITY_INVALID)
  if (product.warranty && !isValidWarranty(product.warranty)) throw new Error(VALIDATION_MESSAGES.WARRANTY_INVALID)
  if (product.price !== undefined && product.price <= 0) throw new Error(VALIDATION_MESSAGES.PRICE_INVALID)
  if (product.price_max && product.price && product.price_max < product.price) throw new Error(VALIDATION_MESSAGES.PRICE_MAX_INVALID)
  if (product.wa_link && !product.wa_link.startsWith('https://wa.me/')) throw new Error('WA link tidak valid')
}

// Delete product
export async function deleteProduct(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('products').delete().eq('id', id)

  if (error) throw new Error(error.message)

  // Revalidate cache
  revalidatePath('/')
  revalidatePath('/admin/products')
}

// Upload photo to bucket 'photos'
export async function uploadProductPhoto(file: File, productId?: string) {
  const supabase = await createClient()

  // Validate MIME type
  const { ALLOWED_MIME_TYPES, MAX_PHOTO_SIZE_BYTES } = await import('@/app/lib/constants/validation')
  if (!ALLOWED_MIME_TYPES.includes(file.type as any)) {
    throw new Error(VALIDATION_MESSAGES.PHOTO_MIME)
  }

  // Validate file size (5 MB)
  if (file.size > MAX_PHOTO_SIZE_BYTES) {
    throw new Error(VALIDATION_MESSAGES.PHOTO_SIZE)
  }

  const ext = file.type.split('/')[1]
  const randomId = Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10)
  const fileName = `products/${productId || randomId}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error } = await supabase.storage.from('photos').upload(fileName, file)

  if (error) throw new Error(error.message)

  // Get public URL
  const { data } = supabase.storage.from('photos').getPublicUrl(fileName)
  return data.publicUrl
}

// Delete photo from bucket 'photos'
export async function deleteProductPhoto(imageUrl: string) {
  const supabase = await createClient()

  // Extract file path from public URL
  const urlParts = imageUrl.split('/photos/')
  if (!urlParts[1]) return

  const filePath = `photos/${urlParts[1]}`

  const { error } = await supabase.storage.from('photos').remove([filePath])

  if (error) throw new Error(error.message)
}
