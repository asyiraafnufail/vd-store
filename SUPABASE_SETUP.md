# Setup Supabase untuk VD Store

## Step 1: Jalankan SQL Migration

1. Login ke https://app.supabase.com/project/oqypdeajxexlocexyjjw
2. Buka **SQL Editor** → **New Query**
3. Copy-paste isi file `/supabase/migrations/001_init.sql`
4. Klik **Run** atau Ctrl+Enter

Migration akan membuat:
- Tabel `products`
- Tabel `testimonials`
- RLS policies untuk kedua tabel (public read, authenticated write/delete)
- RLS policies untuk bucket `photos`

## Step 2: Setup Storage Bucket Restrictions (Manual via Dashboard)

1. Buka **Storage** → klik bucket **photos**
2. Klik **Settings** di pojok kanan atas
3. Scroll ke **Allowed MIME types**
4. Isikan: `image/jpeg,image/png,image/webp`
5. Scroll ke **Max file size**
6. Isikan: `5242880` (5 MB dalam bytes)
7. Klik **Save**

## Step 3: Verify Setup

Jalankan check koneksi:
```bash
node -e "
import('@supabase/supabase-js').then(async (m) => {
  const client = m.createClient(
    'https://oqypdeajxexlocexyjjw.supabase.co',
    'sb_publishable_03eWuBEu80l8Dn1FWwYcrQ_GpLAT2uz'
  );
  const { data, error } = await client.from('products').select('count');
  console.log(error ? '❌ Error: ' + error.message : '✅ Tabel products siap');
});
"
```

## Step 4: Seed Data (Optional)

Kalau ingin demo data di tabel `products`, jalankan:
```bash
npm run dev
# Buka http://localhost:3000/api/seed (endpoint akan dibuat di step 2)
```

## Env Vars yang Diperlukan

Sudah ada di `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://oqypdeajxexlocexyjjw.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_03eWuBEu80l8Dn1FWwYcrQ_GpLAT2uz
```

Untuk server-side operations, tambahkan ke `.env.local`:
```env
SUPABASE_SERVICE_ROLE_KEY=<dapatkan dari Supabase Dashboard → Settings → API Keys → service_role>
```

---

Done. Project terhubung ke Supabase setelah jalankan Step 1 & 2.
