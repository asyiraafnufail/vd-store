# Design System — VD Phone Store
> **STATUS: LOCKED** — Jangan ubah nilai apapun di file ini tanpa diskusi eksplisit. Setiap perubahan harus diimplementasi serentak di globals.css dan semua komponen.

## Background Layout (LOCKED)

```
Hero:                 #FFFFFF — putih, layout 2 kolom (teks kiri, foto kanan)
Semua section tengah: #FFFFFF — putih, dibedakan border-top 1px #E2E2E2
Footer:               #1A1A2E — navy
```

Tidak ada background gelap atau gradient di konten. Putih konsisten dari hero sampai atas footer.

### Hero Layout
- 2 kolom di desktop: kiri teks + CTA (max-w-lg), kanan foto HP
- Mobile: kolom tunggal, teks dulu (atas), foto di bawah — `flex-col md:flex-row`
- Foto: `w-72 sm:w-96 md:w-[28rem] lg:w-[32rem]`, aspect-ratio 3/4
- Teks kiri: eyebrow kecil amber, headline besar tegas, subtext singkat, 2 tombol
- Tidak ada gradient, tidak ada glow, tidak ada dekorasi

### Responsive Padding (semua section)
```
Mobile:  py-14 px-4
Desktop: md:py-20 md:px-8
Hero:    py-16 md:py-24 px-6 md:px-12 lg:px-20
```

### Font Size — semua heading pakai clamp()
```
Section heading:  clamp(1.25rem, 3vw, 1.5rem)
Hero headline:    clamp(2.25rem, 6vw, 4rem)
CTA heading:      clamp(1.5rem, 4vw, 2.25rem)
Step number:      clamp(1.75rem, 4vw, 2.25rem)
```

---

## Color Palette (LOCKED)

### Primary — Deep Navy
```
--color-primary:     #1A1A2E   /* background gelap, header, footer */
--color-primary-mid: #16213E   /* section alt gelap */
--color-primary-soft:#0F3460   /* gradient, hover dark */
```

### Accent — Amber Gold
```
--color-accent:      #F5A623   /* CTA button, highlight harga, underline aktif */
--color-accent-hover:#E09612   /* button hover */
--color-accent-soft: #FFF8EC   /* bg section ringan berbasis amber */
```

### Neutral
```
--color-surface:     #FAFAFA   /* background halaman */
--color-surface-alt: #F4F4F4   /* section stripe */
--color-border:      #E2E2E2   /* divider, card border */
```

### Text
```
--color-text-primary:   #111118   /* heading */
--color-text-secondary: #52525B   /* body, keterangan */
--color-text-muted:     #A1A1AA   /* label kecil, placeholder */
--color-text-on-dark:   #F8F8F8   /* teks di atas navy */
--color-text-on-accent: #111118   /* teks di atas amber */
```

### Status
```
--color-new:    #1A1A2E   /* label "Baru" — navy solid */
--color-second: #52525B   /* label "Second" — abu netral */
```

---

## Kontras WCAG AA
| Pasangan | Rasio | Status |
|---|---|---|
| #F8F8F8 on #1A1A2E | ~15.8:1 | AAA |
| #111118 on #F5A623 | ~8.1:1  | AAA |
| #111118 on #FAFAFA | ~19.5:1 | AAA |
| #52525B on #FAFAFA | ~7.0:1  | AA  |

---

## Typography (LOCKED)

```
Font utama:  'Montserrat', system-ui, sans-serif
Font body:   'Montserrat', system-ui, sans-serif
```

Montserrat dimuat via next/font/google — subsets latin, weights 400 500 600 700.

### Scale
```
12px  — label kecil, caption
14px  — body kecil, keterangan
16px  — body utama
18px  — sub-heading
20px  — card title
24px  — section heading
30px  — page heading mobile
36px  — hero heading desktop
48px  — hero heading max
```

### Weight
```
400  — body
500  — label, nav, filter button
600  — card title, harga, sub-heading
700  — heading utama, CTA
800  — hero headline
```

---

## Border Radius
```
--radius-sm:   4px    — label kondisi/tipe
--radius-md:   10px   — card produk
--radius-lg:   18px   — hero card, modal
--radius-full: 9999px — pill button, filter aktif
```

---

## Shadow
```
--shadow-card:  0 1px 8px rgba(0,0,0,0.07)
--shadow-hover: 0 6px 24px rgba(0,0,0,0.12)
--shadow-cta:   0 4px 14px rgba(245,166,35,0.30)
```

---

## Komponen Utama

### Button — CTA Utama
```
bg: #F5A623  |  text: #111118  |  radius: var(--radius-md) = 10px
padding: 13px 32px  |  font-weight: 700  |  letter-spacing: 0.02em  |  text-transform: uppercase  |  font-size: 13px
hover: bg #E09612, shadow-cta
```

### Button — Secondary (outline)
```
border: 1.5px solid #F5A623  |  text: #F5A623  |  bg: transparent  |  radius: var(--radius-md) = 10px
hover: bg #FFF8EC
```

### Filter Button
```
default: border 1.5px solid #E2E2E2, text #52525B, bg transparent, radius: var(--radius-md) = 10px
active:  bg #1A1A2E, text #F8F8F8, border #1A1A2E
font-weight: 500  |  font-size: 13px
```

### Product Card
```
bg: #FFFFFF  |  border: 1px solid #E2E2E2  |  radius: var(--radius-md) = 10px
shadow: shadow-card  |  hover: shadow-hover, translateY(-2px)
Foto: aspect-ratio 4/3, object-fit cover, bg #F4F4F4
Padding info: 20px
Urutan info:
  1. Merek — text-xs uppercase tracking-widest, color #A1A1AA
  2. Nama produk — font-weight 600, 16px, color #111118 (tanpa storage di nama, misal "iPhone 15")
  3. Kondisi — text-xs uppercase font-weight 600, "BARU" navy, "SECOND" abu
  4. Kualitas opsional — text-xs uppercase font-weight 500, color #A1A1AA (hanya untuk second)
  5. Storage + garansi — text-xs, color #A1A1AA
  6. Harga — font-weight 700, 20px, color #111118
  7. CTA "Tanya Produk" — full-width, radius 10px, amber
```

### Label Kondisi/Tipe
```
Bukan pill berwarna. Pakai teks uppercase kecil dengan font-weight 600.
"BARU" — color: #1A1A2E
"SECOND" — color: #52525B
Kualitas (Mulus/Normal/Bekas Wajar): text-xs uppercase, color #A1A1AA, dipisah dot
```

---

## Animasi
```
Transition default: 200ms ease
Hover card: translateY(-2px), 200ms ease
Scroll reveal: opacity 0 ke 1, translateY 12px ke 0, 350ms ease — CSS @keyframes, tanpa JS lib
```

---

## Layout Grid
```
Mobile:  1 kolom, padding 16px
Tablet:  2 kolom, padding 24px
Desktop: 3-4 kolom, max-width 1280px, margin auto, padding 32px
```

---

## CSS Variables (globals.css)
```css
:root {
  --color-primary:      #1A1A2E;
  --color-primary-mid:  #16213E;
  --color-primary-soft: #0F3460;
  --color-accent:       #F5A623;
  --color-accent-hover: #E09612;
  --color-accent-soft:  #FFF8EC;
  --color-surface:      #FAFAFA;
  --color-surface-alt:  #F4F4F4;
  --color-border:       #E2E2E2;
  --color-text-primary:   #111118;
  --color-text-secondary: #52525B;
  --color-text-muted:     #A1A1AA;
  --color-text-on-dark:   #F8F8F8;
  --color-text-on-accent: #111118;
  --radius-sm:   4px;
  --radius-md:   10px;
  --radius-lg:   18px;
  --radius-full: 9999px;
  --shadow-card:  0 1px 8px rgba(0,0,0,0.07);
  --shadow-hover: 0 6px 24px rgba(0,0,0,0.12);
  --shadow-cta:   0 4px 14px rgba(245,166,35,0.30);
}
```

---

## Aturan (LOCKED — wajib diikuti di setiap implementasi)

1. **Tidak ada emoji di UI** — ikon boleh pakai SVG atau karakter Unicode netral.
2. **Semua tombol pakai `--radius-md` (10px)** — tidak ada pill, tidak ada `--radius-sm` untuk tombol.
3. **Amber hanya untuk CTA, nomor langkah, dan accent line** — bukan background section.
4. **Navy hanya untuk hero dan footer** — semua section tengah background `#FFFFFF`.
5. **Section tengah dibedakan dengan `border-top: 1px solid #E2E2E2`** — bukan background berbeda.
6. **Label produk (Baru/Second/Garansi) pakai teks uppercase** — bukan pill berwarna.
7. **Teks tombol CTA produk: "Tanya Produk"** — bukan "Tanya Harga" atau varian lain.
8. **Maksimal 3 warna per komponen** — surface + text + satu aksen.
9. **Ruang putih adalah elemen desain** — jangan isi semua space.
10. **Nama produk di card tanpa storage** — tulis "iPhone 15", bukan "iPhone 15 128GB". Storage muncul di baris keterangan tersendiri.
