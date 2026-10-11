# Panduan Hosting Foto Katalog

Agar foto produk tidak membebani repository dan build website, gunakan **Cloudinary** (free tier sudah cukup).

---

## Mengapa Cloudinary?

- CDN global → gambar loading cepat di mana saja
- Otomatis optimasi format (WebP/AVIF) dan kompresi
- Transformasi URL: resize, crop, kualitas, dsb.
- Free tier: 25 GB storage + 25 GB bandwidth/bulan

---

## Langkah Setup

1. Daftar di https://cloudinary.com
2. Buat **Upload Preset** bernama `vd_store_unsigned` (unsigned) atau upload manual lewat dashboard.
3. Upload foto HP. Usahakan:
   - Format: JPG atau PNG
   - Resolusi: 600x800 px (aspect ratio 4:5 seperti card)
   - Ukuran file: di bawah 200 KB per foto
4. Copy URL publik dari dashboard, contoh:
   ```
   https://res.cloudinary.com/nama-cloud/image/upload/v123456/vd-store/iphone15.jpg
   ```
5. Tempel URL ke `app/data/products.ts` di field `image`.

---

## Cara Optimasi URL

Tambahkan parameter transformasi setelah `/upload/` agar Next.js tidak load gambar terlalu besar:

```
https://res.cloudinary.com/nama-cloud/image/upload/w_600,q_auto,f_auto/vd-store/iphone15.jpg
```

Penjelasan parameter:
- `w_600` → lebar 600px (cukup untuk card)
- `q_auto` → kualitas otomatis
- `f_auto` → format otomatis (WebP/AVIF kalau browser mendukung)

---

## Contoh Data Produk

```ts
{
  id: '1',
  name: 'iPhone 15',
  brand: 'Apple',
  storage: '128GB',
  condition: 'Baru',
  quality: 'Brand New',
  warranty: 'Resmi',
  price: 13_500_000,
  image: 'https://res.cloudinary.com/nama-cloud/image/upload/w_600,q_auto,f_auto/vd-store/iphone15.jpg',
  waLink: msg('iPhone 15 128GB'),
}
```

---

## Alternatif Lain

Jika Cloudinary tidak cocok, alternatif yang juga baik:
- **ImageKit** — mirip Cloudinary, harga lebih murah
- **Uploadcare** — fokus upload + transformasi
- **Supabase Storage** — free tier besar, tapi perlu setup CDN sendiri
- **Vercel Blob** — paling mudah kalau deploy di Vercel

---

## Catatan Penting

- Jangan simpan foto asli di folder `public/products/` kalau jumlahnya banyak.
- SVG placeholder (`iphone15.svg`, dsb.) boleh tetap di repo karena ukurannya sangat kecil.
- Jika suatu saat ingin ganti hosting, cukup ubah URL di `app/data/products.ts`.
