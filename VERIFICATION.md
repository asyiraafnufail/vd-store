# Design & Logic Lock Verification
> **Completed:** 2026-10-12 10:17 UTC
>
> Checklist untuk memastikan semua files sesuai design & logic lock.

## Core Files Verification

### Design System
- [x] `/app/globals.css`
  - ✅ CSS variables defined (--color-*, --radius-*, --shadow-*)
  - ✅ Montserrat imported via @import
  - ✅ Base styles minimal, no bloat
  - Rule: Do not add inline colors, use variables

### Constants & Validation
- [x] `/app/lib/constants/validation.ts` 
  - ✅ VALID_BRANDS = ['Apple', 'Samsung']
  - ✅ VALID_CONDITIONS = ['Baru', 'Second']
  - ✅ VALID_QUALITIES = ['Brand New', 'Mulus', 'Normal', 'Bekas Wajar']
  - ✅ VALID_WARRANTIES = ['Resmi', 'Bea Cukai', 'All Operator']
  - ✅ ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']
  - ✅ MAX_PHOTO_SIZE = 5MB
  - ✅ ADMIN_WA_NUMBER = '6281234567890'
  - ✅ CTA_TEXT = 'Tanya Produk'
  - ✅ VALIDATION_MESSAGES centralized
  - ✅ Helper functions (isValidBrand, isValidCondition, etc.)
  - Rule: All validation MUST use constants from this file

### Server Actions
- [x] `/app/actions/products.ts`
  - ✅ Imports validation from constants
  - ✅ validateProduct() uses isValidBrand, isValidCondition, etc.
  - ✅ validateProductUpdate() uses isValidBrand, isValidCondition, etc.
  - ✅ uploadProductPhoto() validates MIME + size from constants
  - ✅ All error messages use VALIDATION_MESSAGES constants
  - ✅ revalidatePath on create/update/delete
  - Rule: Do not hardcode validation values

- [x] `/app/actions/auth.ts`
  - ✅ Uses Supabase auth
  - ✅ loginWithEmail, logout, getUser
  - Rule: Auth flow locked, minimal changes

### Components
- [x] `/app/components/ProductForm.tsx`
  - ✅ Imports validation constants (VALID_BRANDS, VALID_CONDITIONS, etc.)
  - ✅ Uses VALIDATION_MESSAGES for error display
  - ✅ 2-column grid responsive (grid-cols-1 md:grid-cols-2)
  - ✅ All colors use CSS variables (--color-*)
  - ✅ Photo upload validates file type + size
  - ✅ WA link auto-generated from product name
  - ✅ Price formatting with locale
  - Rule: All form styling must use CSS variables

- [x] `/app/components/ProductCard.tsx`
  - ✅ Horizontal layout (flex-row)
  - ✅ Photo: 4:5 aspect ratio, clamp(7rem, 30vw, 13rem)
  - ✅ Photo box: border 1px, radius-md, centered
  - ✅ Info section: flex-col, flex-1
  - ✅ Colors: primary/secondary/muted text
  - ✅ Badge: rendered as text, not pill
  - ✅ All typography uses clamp()
  - ✅ Button text: "Tanya Produk"
  - Rule: Horizontal layout locked, no vertical variant

- [x] `/app/components/Catalog.tsx`
  - ✅ 1-column grid (max-w-md or similar)
  - ✅ Responsive padding
  - ✅ Maps products to ProductCard
  - Rule: Single column locked

### Pages
- [x] `/app/page.tsx` (Landing)
  - ✅ Hero: 2-column desktop, single column mobile
  - ✅ Photo 3:4 aspect, clamp sizing
  - ✅ Sections: white background
  - ✅ Dividers: border-top 1px
  - ✅ Typography: clamp()
  - ✅ CTA buttons: amber primary, border secondary
  - ✅ Footer: navy background
  - Rule: Hero layout locked

- [x] `/app/(auth)/login/page.tsx`
  - ✅ Server action auth
  - ✅ Error display
  - ✅ Uses CSS variables
  - Rule: Auth page minimal changes

- [x] `/app/admin/layout.tsx`
  - ✅ Navy header (--color-primary)
  - ✅ Amber buttons (--color-accent)
  - ✅ White background
  - Rule: Admin header styling locked

- [x] `/app/admin/dashboard/page.tsx`
  - ✅ Stats cards
  - ✅ Navy accent styling
  - Rule: Dashboard styling locked

- [x] `/app/admin/products/page.tsx`
  - ✅ Table display
  - ✅ Edit/Delete buttons
  - Rule: Table styling locked

- [x] `/app/admin/products/new/page.tsx`
  - ✅ ProductForm for create
  - Rule: New product flow locked

- [x] `/app/admin/products/[id]/edit/page.tsx`
  - ✅ ProductForm for update with prefill
  - Rule: Edit product flow locked

### Middleware & Auth
- [x] `/middleware.ts`
  - ✅ Protects /admin/* routes
  - ✅ Redirects logged-in users away from /login
  - ✅ Uses updateSession
  - Rule: Auth protection locked

- [x] `/app/lib/supabase/middleware.ts`
  - ✅ updateSession helper
  - Rule: No changes

- [x] `/app/lib/supabase/server.ts`
  - ✅ Server client creation
  - ✅ Exports ADMIN_WA_NUMBER
  - Rule: Locked

### Database
- [x] `/supabase/migrations/001_init.sql`
  - ✅ products table 15 columns
  - ✅ RLS policies (public read, authenticated write)
  - ✅ testimonials table (bonus, not used in current flow)
  - Rule: Schema locked, RLS policies locked

### Documentation
- [x] `/design.md` — Design specifications (LOCKED header added)
- [x] `/ARCHITECTURE.md` — System architecture (CREATED)
- [x] `/PRD.md` — Product requirements (LOCKED header added)
- [x] `/DESIGN_LOCKED.md` — Lock summary (CREATED)
- [x] `/SUPABASE_SETUP.md` — Setup instructions

---

## What's Locked & Cannot Change Without Approval

### Design
- ✅ Product card layout: Horizontal only (4:5 foto)
- ✅ Hero section: 2-column desktop layout
- ✅ Color palette: Navy #1A1A2E, Amber #F5A623
- ✅ Typography: Montserrat, clamp() responsive
- ✅ Radius: md=10px, lg=18px
- ✅ Section backgrounds: White, no gradients
- ✅ Button text: "Tanya Produk" for product CTA

### Logic
- ✅ Validation: Brands (Apple/Samsung only), Conditions (Baru/Second)
- ✅ Upload: MIME types (JPEG/PNG/WebP), 5MB max
- ✅ Warranty: Resmi/Bea Cukai/All Operator only
- ✅ Quality: Brand New/Mulus/Normal/Bekas Wajar only
- ✅ WA link: Auto-generated from product name
- ✅ Price formatting: Indonesian locale (1.000.000)
- ✅ Revalidation: On create/update/delete

### Files That Can Change
- Admin page content (dashboard stats, list view)
- Hero section text/images (structure stays same)
- Feature cards text
- Testimonial content
- Form label text (but not validation logic)
- Error messages (use VALIDATION_MESSAGES const)

### Files That Should NOT Change
- `globals.css` (color vars, radius, shadow)
- `validation.ts` (enum values locked)
- `middleware.ts` (auth flow locked)
- ProductCard component (layout locked)
- Hero section HTML structure

---

## How to Add Features Safely

1. **New form field?**
   - Add to database schema
   - Add validation to validation.ts (enum or const)
   - Update VALIDATION_MESSAGES
   - Use in ProductForm

2. **New page?**
   - Follow design system (CSS vars, clamp(), design.md)
   - Import from validation.ts for all validation
   - Use server actions for data ops

3. **Change validation?**
   - Edit validation.ts only
   - Update all imports automatically
   - Add VALIDATION_MESSAGE for new error

4. **Change color?**
   - Update globals.css variable
   - All components inherit automatically
   - No inline color changes

5. **Change typography?**
   - Update clamp() values in component
   - Or update globals.css if global change

---

## Red Flags (Do Not Do)

🚫 Hardcode: `'Apple' | 'Samsung'` in component — Use VALID_BRANDS
🚫 Hardcode: `#1A1A2E` inline — Use var(--color-primary)
🚫 Hardcode: `border-radius: 10px` — Use var(--radius-md) or @apply
🚫 Hardcode: `'Tanya Produk'` in multiple places — Use CTA_TEXT const
🚫 Hardcode: Error messages — Use VALIDATION_MESSAGES const
🚫 Add new color without updating globals.css
🚫 Hardcode font size — Use clamp()
🚫 Change layout: ProductCard from horizontal to vertical
🚫 Change hero: from 2-column to 1-column
🚫 Add brand validation logic anywhere except validation.ts

---

## Verification Steps

Run these checks before committing new code:

```bash
# 1. Type check
npm run type-check

# 2. Build
npm run build

# 3. Lint
npm run lint

# 4. Manual checks:
# - Colors all use CSS variables
# - Typography uses clamp()
# - ProductCard still horizontal
# - Buttons use --radius-md
# - All validation uses validation.ts constants
```

---

> **This checklist is LOCKED as of 2026-10-12.**
> Update this file when design/logic changes are approved.
> Reference: design.md, ARCHITECTURE.md, DESIGN_LOCKED.md
