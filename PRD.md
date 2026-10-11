# PRD — VD Phone Store

## Tujuan
Landing page katalog HP second untuk **VD Phone Store**. Target: tampilkan produk, bangun kepercayaan, dorong kontak (WhatsApp).

---

## Pengguna
- Pembeli HP second usia 18–40
- Mobile-first (mayoritas akses via HP)
- Butuh info harga, kondisi, garansi cepat

---

## Halaman & Seksi

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
Fase 1: hardcode array produk di `app/data/products.ts`.  
Fase berikutnya: CMS atau Notion API.

```ts
// ponytail: hardcode → upgrade ke CMS saat produk > 30
type Product = {
  id: string
  name: string      // "iPhone 13 128GB"
  brand: string     // "Apple"
  storage: string   // "128GB"
  condition: string // "Mulus" | "Normal" | "Bekas Wajar"
  warranty: string  // "Resmi" | "Bea Cukai" | "All Operator"
  price: number     // IDR
  image: string     // path /public/products/...
  badge?: string    // "Terlaris" | "Stok Terbatas"
  waLink: string    // wa.me deeplink
}
```

---

## Fitur

| Fitur | Prioritas | Catatan |
|---|---|---|
| Tampil katalog produk | P0 | Grid responsive |
| Filter merek | P0 | Client component |
| WA deeplink per produk | P0 | Buka WA langsung |
| Animasi scroll sederhana | P1 | CSS, bukan JS |
| SEO metadata | P1 | `metadata` export Next.js |
| Dark mode | P2 | CSS `prefers-color-scheme` |
| Search produk | P2 | Fase berikutnya |
| Checkout/payment | ❌ | Di luar scope |

---

## Stack
- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- TypeScript
- Deploy: Vercel

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

---

## Non-Fungsional
- Mobile-first responsive (320px – 1440px)
- Aksesibel: alt text semua gambar, kontras WCAG AA
- Tanpa login/auth
