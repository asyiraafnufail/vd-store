# Design System — VD Phone Store

## Filosofi
Elegant, minimalist, colorful-tapi-terkontrol.  
Satu warna aksen dominan. Warna kedua hanya untuk state/badge.  
Ruang putih banyak. Tipografi tegas. Tidak ramai.

---

## Color Palette (LOCKED)

### Primary — Deep Navy
```
--color-primary:     #1A1A2E   /* background gelap, header */
--color-primary-mid: #16213E   /* card dark, section alt */
--color-primary-soft:#0F3460   /* hover state, divider */
```

### Accent — Amber Gold ⚡
```
--color-accent:      #F5A623   /* CTA button, badge, highlight */
--color-accent-hover:#E09612   /* button hover */
--color-accent-soft: #FFF3DC   /* accent bg ringan di light mode */
```

### Neutral
```
--color-surface:     #FAFAFA   /* background halaman (light) */
--color-surface-alt: #F2F2F2   /* card background, section stripe */
--color-border:      #E0E0E0   /* divider, card border */
```

### Text
```
--color-text-primary:   #1A1A2E   /* heading */
--color-text-secondary: #555770   /* subtext, keterangan */
--color-text-muted:     #9B9BAD   /* placeholder, label kecil */
--color-text-on-dark:   #FAFAFA   /* teks di atas primary bg */
--color-text-on-accent: #1A1A2E   /* teks di atas accent (gelap agar terbaca) */
```

### Status / Badge
```
--color-badge-hot:   #E8443A   /* "Terlaris" — merah tegas */
--color-badge-low:   #2ECC71   /* "Stok Terbatas" — hijau */
--color-success:     #2ECC71
--color-error:       #E8443A
```

---

## Kontras WCAG AA (verified)
| Pasangan | Rasio | Status |
|---|---|---|
| `#FAFAFA` on `#1A1A2E` | ~16:1 | ✅ AAA |
| `#1A1A2E` on `#F5A623` | ~8.2:1 | ✅ AAA |
| `#1A1A2E` on `#FAFAFA` | ~16:1 | ✅ AAA |
| `#555770` on `#FAFAFA` | ~7:1 | ✅ AA |

---

## Typography (LOCKED)

```
Font utama:  'Inter', system-ui, sans-serif
Font aksen:  (tidak pakai font dekoratif — keep clean)
```

### Scale
```
--text-xs:   0.75rem  / 12px   — label, badge
--text-sm:   0.875rem / 14px   — body kecil, keterangan
--text-base: 1rem     / 16px   — body utama
--text-lg:   1.125rem / 18px   — sub-heading
--text-xl:   1.25rem  / 20px   — card title
--text-2xl:  1.5rem   / 24px   — section heading
--text-3xl:  1.875rem / 30px   — page heading (mobile hero)
--text-4xl:  2.25rem  / 36px   — hero heading (desktop)
--text-5xl:  3rem     / 48px   — hero max
```

### Weight
```
Regular: 400  — body
Medium:  500  — label, nav
Semibold:600  — card title, price
Bold:    700  — heading utama
```

---

## Spacing Scale (Tailwind 4 default, locked)
```
4px  → 1 unit   (gap kecil)
8px  → 2 units
16px → 4 units  (padding card)
24px → 6 units  (gap antar elemen)
32px → 8 units  (section padding mobile)
48px → 12 units (section padding desktop)
64px → 16 units (hero padding)
```

---

## Border Radius
```
--radius-sm:  6px    — badge, chip
--radius-md:  12px   — card
--radius-lg:  20px   — modal, hero card
--radius-full: 9999px — pill button, avatar
```

---

## Shadow
```
--shadow-card: 0 2px 12px rgba(0,0,0,0.08)
--shadow-hover: 0 8px 24px rgba(0,0,0,0.14)
--shadow-cta:  0 4px 16px rgba(245,166,35,0.35)   /* glow amber di tombol */
```

---

## Komponen Utama

### Button — CTA Utama
```
bg: #F5A623  |  text: #1A1A2E  |  radius: 9999px
padding: 14px 32px  |  font-weight: 600
hover: bg #E09612, shadow glow amber
```

### Button — Secondary (outline)
```
border: 2px solid #F5A623  |  text: #F5A623  |  bg: transparent
hover: bg #FFF3DC
```

### Product Card
```
bg: #FFFFFF  |  border: 1px solid #E0E0E0  |  radius: 12px
shadow: shadow-card  |  hover: shadow-hover, translateY(-2px)
Foto: aspect-ratio 4/3, object-fit cover
Harga: font-semibold, color #1A1A2E, text-xl
Badge: pill, text-xs, font-medium
```

### Badge "Terlaris"
```
bg: #E8443A  |  text: #FAFAFA  |  radius: 9999px  |  padding: 2px 10px
```

### Badge "Stok Terbatas"
```
bg: #2ECC71  |  text: #1A1A2E  |  radius: 9999px  |  padding: 2px 10px
```

---

## Animasi
```
Transition default: 200ms ease
Hover card: transform translateY(-2px), 200ms ease
Scroll reveal: opacity 0→1, translateY 16px→0, 400ms ease (CSS @keyframes)
Tidak pakai JS animation library — CSS only
```

---

## Layout Grid
```
Mobile:  1 kolom, max-width 100%, padding 16px
Tablet:  2 kolom katalog, padding 24px
Desktop: 3–4 kolom katalog, max-width 1280px, margin auto
```

---

## Implementasi (Tailwind 4 CSS vars)

Tambahkan ke `app/globals.css`:
```css
@layer base {
  :root {
    --color-primary:      #1A1A2E;
    --color-primary-mid:  #16213E;
    --color-primary-soft: #0F3460;
    --color-accent:       #F5A623;
    --color-accent-hover: #E09612;
    --color-accent-soft:  #FFF3DC;
    --color-surface:      #FAFAFA;
    --color-surface-alt:  #F2F2F2;
    --color-border:       #E0E0E0;
    --color-text-primary:   #1A1A2E;
    --color-text-secondary: #555770;
    --color-text-muted:     #9B9BAD;
    --color-text-on-dark:   #FAFAFA;
    --color-text-on-accent: #1A1A2E;
    --color-badge-hot:    #E8443A;
    --color-badge-low:    #2ECC71;
    --radius-sm:   6px;
    --radius-md:   12px;
    --radius-lg:   20px;
    --radius-full: 9999px;
    --shadow-card:  0 2px 12px rgba(0,0,0,0.08);
    --shadow-hover: 0 8px 24px rgba(0,0,0,0.14);
    --shadow-cta:   0 4px 16px rgba(245,166,35,0.35);
  }
}
```

---

## Aturan Penggunaan Warna (LOCKED — jangan ubah tanpa diskusi)

1. **Amber hanya untuk aksen** — CTA, badge, highlight harga. Bukan background section besar.
2. **Navy hanya untuk header/hero/footer** — bukan semua section.
3. **Merah & hijau hanya untuk badge/status** — bukan dekorasi.
4. **Maksimal 3 warna per komponen** — surface + text + satu aksen.
5. **Ruang putih adalah elemen desain** — jangan isi semua space.
