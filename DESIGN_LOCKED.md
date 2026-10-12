# Design Locked — VD Phone Store
> **STATUS: LOCKED — 2026-10-12**
>
> Semua keputusan desain sudah finalized. Jangan ubah tanpa persetujuan eksplisit.
> File ini berisi ringkas keputusan design yang sudah diimplementasi.

## Locked Design Decisions

### 1. Product Card Layout
- **Type:** Horizontal (flex-row)
- **Photo Container:** 
  - Aspect ratio: 4:5
  - Responsive width: `clamp(7rem, 30vw, 13rem)`
  - Inner box: border 1px, borderRadius 10px (--radius-md), background --color-surface
  - Centered flex display
- **Info Section:** flex-col, flex-1, gap clamp(0.5rem, 2vw, 0.75rem)
- **Text Colors:** 
  - Brand name: --color-text-primary
  - Kondisi (Baru/Second): --color-text-secondary
  - Storage/Garansi: --color-text-muted
  - Badge: --color-text-muted (same as storage)
- **Typography:** All sizes use clamp() for responsive scaling
- **Grid:** 1 column, max-width 768px (mobile-first responsive)

### 2. Hero Section
- **Layout:** 2 kolom desktop (flex-col md:flex-row)
  - Mobile: kolom tunggal, foto atas (order-1), teks bawah (order-2)
  - Desktop: foto kanan (order-2), teks kiri (order-1)
- **Foto:** 3:4 aspect ratio, `w-64 sm:w-80 md:w-[28rem] lg:w-[32rem]`
- **Teks Kiri:** max-w-lg, eyebrow amber kecil, headline besar, subtext, 2 tombol
- **Tombol:** --radius-md, amber untuk primary, transparent border untuk secondary

### 3. Sections & Dividers
- **Background:** Semua #FFFFFF (putih)
- **Dividers:** `border-top: 1px solid var(--color-border)` (#E2E2E2) antar section
- **No gradient, no glow, no decorative shadows**
- **Padding:** Mobile `py-14 px-4`, Desktop `md:py-20 md:px-8`

### 4. Color Palette (LOCKED)
```
Primary:      #1A1A2E (navy) — hero, footer, admin header
Accent:       #F5A623 (amber) — CTA, nomor langkah, highlight
Surface:      #FAFAFA (light)
Border:       #E2E2E2 (divider)
Text Primary: #111118 (heading)
Text Muted:   #A1A1AA (label kecil)
```

### 5. Typography
- **Font:** Montserrat via next/font/google, weights 400 500 600 700
- **Sizes:** All using clamp() for responsive scale
  - Hero headline: clamp(2.25rem, 6vw, 4rem)
  - Section heading: clamp(1.25rem, 3vw, 1.5rem)
  - Card title: clamp(0.9375rem, 2vw, 1rem)
  - Body: clamp(0.8125rem, 1.5vw, 0.9375rem)

### 6. Radius
```
--radius-sm:   4px  (badge, label)
--radius-md:   10px (button, card)
--radius-lg:   18px (modal, hero card)
```

### 7. CTA Text
- **Product card button:** "Tanya Produk" (tidak boleh diubah)
- **Hero button:** "Lihat Katalog", "Hubungi Kami"

### 8. Badge Display
- Rendered sebagai `<p>` text element, bukan pill/badge component
- Styling sama dengan storage/garansi (--color-text-muted)
- Posisi: di bawah storage/garansi line

### 9. Admin Panel Colors
- **Header:** navy background (--color-primary)
- **Buttons:** amber (--color-accent)
- **Cards/Form:** border 1px, surface background, radius-md

---

## What Changed to Lock

| File | Change |
|---|---|
| `app/lib/constants/validation.ts` | Created — centralize all validation rules |
| `app/actions/products.ts` | Updated to use validation constants |
| `app/components/ProductForm.tsx` | Updated to use validation constants |
| `design.md` | Added LOCKED header + detailed specs |
| `PRD.md` | Added LOCKED header |
| `ARCHITECTURE.md` | Created — full system documentation |

---

## Rules (WAJIB DIIKUTI)

1. ✅ Tidak ada emoji di UI
2. ✅ Semua tombol pakai radius-md (10px)
3. ✅ Amber hanya untuk CTA + nomor langkah
4. ✅ Navy hanya untuk hero + footer
5. ✅ Section tengah background putih, dibedakan border-top
6. ✅ Label pakai teks, bukan pill berwarna
7. ✅ Tombol CTA produk: "Tanya Produk" (pasti)
8. ✅ Max 3 warna per komponen
9. ✅ Ruang putih adalah elemen desain
10. ✅ Nama produk tanpa storage di card title
11. ✅ Harga bisa range (price_max)
12. ✅ Gap harga ke tombol CTA: clamp(0.625rem, 2.5vw, 0.875rem)

---

## How to Maintain Lock

1. **New feature?** Check design.md rules dulu
2. **Color change?** Update globals.css variables, bukan inline styles baru
3. **Typography?** Use clamp(), jangan hardcode px
4. **Component baru?** Follow ProductCard pattern (responsive grid, clamp, CSS vars)
5. **Validation ubah?** Edit validation.ts, update VALIDATION_MESSAGES, import di action/form
6. **Button/CTA ubah?** Update CTA_TEXT atau VALIDATION_MESSAGES, jangan hardcode

---

## Verification Checklist

- [x] globals.css — semua var(_) defined, Montserrat imported
- [x] ProductCard — horizontal layout, 4:5 foto, clamp() responsive, CSS vars
- [x] ProductForm — grid 2 col, clamp() typography, validation dari constants
- [x] page.tsx — hero 2 col, white bg, border divider, clamp()
- [x] admin/layout — navy header, amber button
- [x] Catalog — 1 col grid, responsive padding
- [x] middleware — proteksi /admin, redirect login
- [x] validation.ts — centralized enums, helpers, messages

---

> **Last Updated:** 2026-10-12 10:16:44 UTC
> **By:** Design Lock Protocol
> **Next Review:** Jika ada request perubahan design atau logic
