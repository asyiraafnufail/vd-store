/**
 * Validation Constants — VD Phone Store
 * LOCKED — 2026-10-12
 *
 * Semua enum, brand, kondisi, kualitas, garansi, batas ukuran file
 * didefinisikan di sini. Jangan ubah tanpa diskusi eksplisit.
 *
 * Usage di:
 * - app/actions/products.ts (validasi saat create/update)
 * - app/components/ProductForm.tsx (select options)
 * - app/lib/supabase/server.ts (seed data, RLS context)
 */

/* ============== Brands — Apple & Samsung Only ============== */
export const VALID_BRANDS = ['Apple', 'Samsung'] as const;
export type ValidBrand = (typeof VALID_BRANDS)[number];

/* ============== Conditions — Baru / Second ============== */
export const VALID_CONDITIONS = ['Baru', 'Second'] as const;
export type ValidCondition = (typeof VALID_CONDITIONS)[number];

/* ============== Quality Grades ============== */
export const VALID_QUALITIES = [
  'Brand New',
  'Mulus',
  'Normal',
  'Bekas Wajar',
] as const;
export type ValidQuality = (typeof VALID_QUALITIES)[number];

/* ============== Warranty Types ============== */
export const VALID_WARRANTIES = [
  'Resmi',
  'Bea Cukai',
  'All Operator',
] as const;
export type ValidWarranty = (typeof VALID_WARRANTIES)[number];

/* ============== Photo Upload ============== */
export const MAX_PHOTO_SIZE_MB = 5;
export const MAX_PHOTO_SIZE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;
export type AllowedMimeType = (typeof ALLOWED_MIME_TYPES)[number];

export const MIME_EXTENSIONS: Record<AllowedMimeType, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

/* ============== Admin Contact ============== */
export const ADMIN_WA_NUMBER = '6281234567890';

/* ============== UI Text (LOCKED) ============== */
export const CTA_TEXT = 'Tanya Produk' as const;

/* ============== Validation Messages ============== */
export const VALIDATION_MESSAGES = {
  BRAND_INVALID: 'Brand hanya Apple atau Samsung',
  CONDITION_INVALID: 'Kondisi hanya Baru atau Second',
  QUALITY_INVALID: 'Kualitas tidak valid',
  WARRANTY_INVALID: 'Garansi tidak valid',
  PRICE_INVALID: 'Harga harus lebih dari 0',
  PRICE_MAX_INVALID: 'Harga max harus lebih dari harga normal',
  PHOTO_REQUIRED: 'Foto produk wajib diupload',
  PHOTO_SIZE: `Ukuran foto maksimal ${MAX_PHOTO_SIZE_MB}MB`,
  PHOTO_MIME: 'Format foto hanya JPEG, PNG, atau WebP',
  NAME_REQUIRED: 'Nama produk wajib diisi',
  STORAGE_REQUIRED: 'Penyimpanan wajib diisi',
} as const;

/* ============== Helpers ============== */

export function isValidBrand(brand: string): brand is ValidBrand {
  return VALID_BRANDS.includes(brand as ValidBrand);
}

export function isValidCondition(condition: string): condition is ValidCondition {
  return VALID_CONDITIONS.includes(condition as ValidCondition);
}

export function isValidQuality(quality: string): quality is ValidQuality {
  return VALID_QUALITIES.includes(quality as ValidQuality);
}

export function isValidWarranty(warranty: string): warranty is ValidWarranty {
  return VALID_WARRANTIES.includes(warranty as ValidWarranty);
}

export function isValidMimeType(mimeType: string): mimeType is AllowedMimeType {
  return ALLOWED_MIME_TYPES.includes(mimeType as AllowedMimeType);
}

export function getFileExtension(mimeType: AllowedMimeType): string {
  return MIME_EXTENSIONS[mimeType];
}
