# Next.js Config Lock
> **STATUS: LOCKED — 2026-10-12**
>
> Critical configuration settings. Do not change without explicit approval.

## Locked Settings

```typescript
{
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      { protocol: 'https', hostname: 'oqypdeajxexlocexyjjw.supabase.co', pathname: '/storage/v1/object/public/**' }
    ]
  },
  experimental: {
    agentFeedback: true
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css"
      }
    }
  }
}
```

## What NOT to Add

🚫 `cacheComponents: true` — conflicts with dynamic routes (Supabase)
🚫 `partialPrefetching: true` — requires cacheComponents
🚫 `revalidate` export — use revalidatePath() in server actions instead
🚫 `export const dynamic = 'force-dynamic'` — page is already dynamic via Supabase fetch

## Why These Settings

- **images:** Cloudinary + Supabase Storage support, SVG allowed for icons
- **experimental.agentFeedback:** Agent system enabled
- **turbopack.rules:** Tailwind CSS support in Turbopack

## If Prerender Errors Occur

**Problem:** "encountered the unstable value X while prerendering"

**Solution:** Data fetch = automatic dynamic. Do NOT add dynamic export. Let Supabase call make it dynamic implicitly.

**Check:**
- Page calls `supabase.from().select()` → automatically dynamic ✅
- Component uses `Date.now()` in render → move to server action or use Math.random()
- No static export (`revalidate`, `dynamic` segment config) needed

## Verification

```bash
npm run build  # Should pass without prerender warnings
npm run dev    # Should start without config errors
```

> Locked 2026-10-12. Reference: next.config.ts
