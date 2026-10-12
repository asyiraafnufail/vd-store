# PRD — VD Phone Store
> **STATUS: LOCKED — 2026-10-12** — Fitur core finalized. Jangan ubah requirements tanpa diskusi.
Landing page katalog HP second untuk **VD Phone Store**. Target: tampilkan produk, bangun kepercayaan, dorong kontak (WhatsApp). Dilengkapi admin panel terpisah untuk mengelola data produk, foto, dan autentikasi via Supabase.

---

## Pengguna

### Pengunjung (Publik)
- Pembeli HP second usia 18–40
- Mobile-first (mayoritas akses via HP)
- Butuh info harga, kondisi, garansi cepat

### Admin
- Pemilik toko / staf yang ditunjuk
- Masuk lewat halaman `/login` menggunakan email + password (Supabase Auth)
- Setelah login diarahkan ke `/admin/dashboard`

---

## Halaman Publik

### 1. Hero
- Nama toko + tagline singkat
- CTA utama: "Lihat Katalog" (scroll ke produk)
- Sub-CTA: "Hubungi via WhatsApp"
- Background: gambar/gradient gelap premium

### 2. Keunggulan (3–4 poin)
- Harga Terjangkau
- Garansi Toko
- Kondisi Teruji
- Pengiriman Cepat

### 3. Katalog Produk
- Grid card HP: foto, nama, storage, kondisi, harga
- Filter: merek (semua, Samsung, iPhone, Xiaomi, dll)
- Badge: "Terlaris", "Stok Terbatas"
- CTA per card: "Tanya Harga" → WhatsApp deeplink

### 4. Cara Beli
- 3 langkah: Pilih HP → Hubungi → Terima HP
- Visual step-by-step sederhana

### 5. Testimoni
- 3–5 review pelanggan (nama, foto avatar, teks)
- Rating bintang

### 6. CTA Akhir
- Banner hubungi WhatsApp
- Nomor WA + tombol

### 7. Footer
- Nama toko, sosmed, copyright

---

## Data Produk

Sumber data produk adalah **Supabase Postgres**, bukan hardcode. Aplikasi publik mengambil data dari tabel `products` dengan row-level security read-only untuk pengunjung.

```ts
type Product = {
  id: string
  name: string      // "iPhone 13 128GB"
  brand: string     // "Apple" | "Samsung"
  storage: string   // "128GB"
  condition: string // "Baru" | "Second"
  quality: string   // "Mulus" | "Normal" | "Brand New"
  warranty: string  // "Resmi" | "Bea Cukai" | "All Operator"
  price: number     // IDR
  price_max?: number // IDR opsional
  image: string     // URL publik Supabase Storage bucket `photo`
  badge?: string    // "Terlaris" | "Stok Terbatas"
  wa_link: string  // wa.me deeplink
  created_at: string
  updated_at: string
}
```

### Tabel `products`
| Kolom | Tipe | Catatan |
|-------|------|---------|
| id | uuid (PK) | default gen_random_uuid() |
| name | text | not null |
| brand | text | not null, enum check |
| storage | text | not null |
| condition | text | not null |
| quality | text | not null |
| warranty | text | not null |
| price | integer | not null |
| price_max | integer | nullable |
| image | text | URL publik foto (not null) |
| badge | text | nullable |
| wa_link | text | not null |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |

### Tabel `testimonials` (opsional fase awal, P2)
| Kolom | Tipe | Catatan |
|-------|------|---------|
| id | uuid (PK) | default gen_random_uuid() |
| name | text | not null |
| avatar | text | URL foto nullable |
| text | text | not null |
| rating | integer | 1–5 |
| created_at | timestamptz | default now() |

---

## Admin Panel

### Autentikasi
- Framework: **Supabase Auth**
- Metode: email + password
- Tidak ada registrasi publik; akun admin dibuat manual di Supabase Dashboard atau seeding khusus
- Middleware Next.js memproteksi semua rute di bawah `/admin/*`
- Pengguna yang belum login mengakses `/admin/*` akan diarahkan ke `/login`
- Pengguna yang sudah login mengakses `/login` diarahkan ke `/admin/dashboard`

### Rute Admin
| Rute | Fungsi |
|------|--------|
| `/login` | Halaman login admin |
| `/admin/dashboard` | Ringkasan produk dan statistik singkat |
| `/admin/products` | Daftar produk (CRUD) |
| `/admin/products/new` | Tambah produk baru |
| `/admin/products/[id]/edit` | Edit produk |

### Halaman Login (`/login`)
- Form email + password
- Tombol "Masuk"
- Error handling: email/password salah, network error
- Loading state saat submit
- Redirect otomatis ke `/admin/dashboard` setelah login sukses

### Halaman Dashboard (`/admin/dashboard`)
- Jumlah total produk
- Jumlah produk kondisi Baru / Second
- Link cepat ke halaman produk
- Tombol logout

### Halaman Manajemen Produk
- Tabel daftar produk dengan kolom: foto, nama, brand, storage, harga, kondisi, aksi
- Aksi: edit, hapus (dengan konfirmasi)
- Tombol "Tambah Produk"
- Form produk mencakup semua field pada tabel `products`
- Upload foto langsung ke Supabase Storage bucket `photo`
- Preview foto setelah dipilih / diupload
- Validasi client-side sebelum submit

---

## Supabase Storage Bucket: `photo`

### Kebijakan Bucket
- Nama bucket: `photo`
- Public: true (URL publik untuk ditampilkan di katalog)
- Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`
- Max file size: **5 MB**
- Object path convention: `products/<uuid_or_slug>.<ext>`
- Hanya user yang terautentikasi (admin) bisa upload, update, dan delete object
- Pengunjung publik hanya bisa membaca (download/get public URL)

### Kebijakan SQL (contoh)
```sql
-- Enable RLS
alter bucket photo enable row level security;

-- Select: public read
create policy "Public can view product photos"
on storage.objects for select
using (bucket_id = 'photo');

-- Insert: authenticated users only
create policy "Admin can upload product photos"
on storage.objects for insert
with check (bucket_id = 'photo');

-- Delete: authenticated users only
create policy "Admin can delete product photos"
on storage.objects for delete
using (bucket_id = 'photo');
```

---

## Fitur

| Fitur | Prioritas | Catatan |
|---|---|---|
| Tampil katalog produk | P0 | Ambil dari Supabase, grid responsive |
| Filter merek | P0 | Client component |
| WA deeplink per produk | P0 | Buka WA langsung |
| Login admin (Supabase Auth) | P0 | Halaman `/login` |
| Dashboard admin | P0 | `/admin/dashboard` |
| CRUD produk admin | P0 | `/admin/products/*` |
| Upload foto ke bucket `photo` | P0 | Restrict MIME & size 5 MB |
| Middleware proteksi rute admin | P0 | Redirect ke `/login` |
| Animasi scroll sederhana | P1 | CSS, bukan JS |
| SEO metadata | P1 | `metadata` export Next.js |
| Dark mode | P2 | CSS `prefers-color-scheme` |
| Search produk | P2 | Fase berikutnya |
| Manajemen testimoni via admin | P2 | Tabel `testimonials` |
| Checkout/payment | ❌ | Di luar scope |

---

## Stack
- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- TypeScript
- Supabase (Auth + Postgres + Storage)
- Deploy: Vercel

---

## Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # server-only, untuk seeding atau edge case
```

---

## SEO
- `title`: "VD Phone Store – HP Second Berkualitas"
- `description`: "Beli HP second terpercaya. Harga terjangkau, kondisi teruji, garansi toko."
- OG image: foto hero toko
- `robots.txt` allow all

---

## Performa Target
- LCP < 2.5s
- CLS < 0.1
- Gambar: `next/image` dengan `priority` di hero
- Query produk: cache / revalidate sesuai kebutuhan admin

---

## Non-Fungsional
- Mobile-first responsive (320px – 1440px)
- Aksesibel: alt text semua gambar, kontras WCAG AA
- Auth: password kuat disimpan oleh Supabase Auth
- Storage: batasan MIME type dan ukuran file di bucket `photo`
