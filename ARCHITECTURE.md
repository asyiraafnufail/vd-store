# Architecture — VD Phone Store
> **STATUS: LOCKED — 2026-10-12**

## Folder Structure

```
app/
├── (auth)/
│   └── login/
│       └── page.tsx              — Login page, public
├── admin/
│   ├── layout.tsx                — Admin layout (header, nav, logout)
│   ├── dashboard/
│   │   └── page.tsx              — Dashboard, stats
│   └── products/
│       ├── page.tsx              — List produk (table)
│       ├── new/
│       │   └── page.tsx          — Create produk
│       └── [id]/
│           └── edit/
│               └── page.tsx      — Edit produk
├── components/
│   ├── Catalog.tsx               — Katalog publik (filter + grid)
│   ├── ProductCard.tsx           — Card horizontal (foto + info)
│   ├── ProductForm.tsx           — Form create/edit (reusable)
│   └── ...existing
├── actions/
│   ├── auth.ts                   — Login, logout, getUser (server)
│   └── products.ts               — CRUD, upload foto (server)
├── lib/
│   └── supabase/
│       ├── client.ts             — Browser client
│       ├── server.ts             — Server client
│       ├── middleware.ts         — Auth session update
│       ├── database.types.ts     — TypeScript types
│       └── index.ts              — Exports
├── page.tsx                       — Landing page (publik, fetch produk)
├── layout.tsx                     — Root layout
└── globals.css                    — CSS variables + base styles

middleware.ts (root)              — Auth protection, redirect
```

## Data Flow

### Landing Page (Publik)
```
page.tsx → createClient() → supabase.from('products').select()
         → Catalog component → ProductCard (map)
         → User click "Tanya Produk" → WA link open
```

### Admin Flow (Protected)
```
middleware.ts → proteksi /admin/* (redirect ke /login jika no auth)
login/page.tsx → loginWithEmail() → createClient() → supabase.auth.signInWithPassword()
              → redirect /admin/dashboard

/admin/dashboard → getProducts() → stats card

/admin/products → getProducts() → ProductCard list + edit/delete buttons

/admin/products/new → ProductForm → createProduct() → revalidatePath() → redirect /admin/products

/admin/products/[id]/edit → getProductById() → ProductForm (prefill)
                         → updateProduct() → revalidatePath() → redirect /admin/products

/admin/products → delete button → deleteProduct() → revalidatePath()
```

### File Upload
```
ProductForm → handlePhotoSelect() → uploadProductPhoto(file)
           → validate MIME (JPEG/PNG/WebP) + size (5MB)
           → supabase.storage.from('photos').upload()
           → getPublicUrl() → return URL
           → setFormData(prev => ({...prev, image: url}))
```

## Server Actions — `app/actions/`

### auth.ts
- `loginWithEmail(email, password)` → sign in, return auth or error
- `logout()` → sign out, redirect /login
- `getUser()` → current auth user

### products.ts
- `getProducts()` → fetch semua produk, order by created_at
- `getProductById(id)` → fetch single produk
- `createProduct(product)` → validate, insert, revalidatePath
- `updateProduct(id, product)` → validate, update, revalidatePath
- `deleteProduct(id)` → delete, revalidatePath
- `uploadProductPhoto(file)` → validate, upload to bucket 'photos', return public URL
- `deleteProductPhoto(imageUrl)` → delete file dari bucket

**Validasi:**
- Brand: hanya ['Apple', 'Samsung']
- Condition: ['Baru', 'Second']
- Quality: ['Brand New', 'Mulus', 'Normal', 'Bekas Wajar']
- Warranty: ['Resmi', 'Bea Cukai', 'All Operator']
- Price: > 0
- Foto: wajib
- MIME type: image/jpeg, image/png, image/webp
- File size: max 5MB

## Middleware — `middleware.ts` (root)

```
updateSession() → cek user, refresh token
→ if pathname.startsWith('/admin') && !user → redirect /login
→ if pathname === '/login' && user → redirect /admin/dashboard
```

## Database

### Tables
- `products` (15 kolom) — RLS: public read, authenticated write/delete
- `testimonials` (5 kolom) — RLS: public read, authenticated write/delete

### Storage Bucket
- `photos` — public: true, RLS: public read, authenticated write/delete/update
- MIME restrict: image/jpeg, image/png, image/webp
- Max file: 5MB
- Path: `products/<uuid>.<ext>`

## Revalidation (Auto-refresh)

```
create/update/delete product → revalidatePath('/') + revalidatePath('/admin/products')
→ ISR invalid cache → next request fetch fresh dari Supabase
```

## Constraints

- No session storage library (Supabase Auth handle it)
- No client-side state management (useState + context enough)
- No API routes (use server actions)
- No form libraries (plain HTML5 validation)
- No UI component libraries (custom + Tailwind)
