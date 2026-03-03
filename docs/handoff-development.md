# Handoff: Development

## What Was Done

Picked up the partially-built blog project, identified and fixed build issues, and got `pnpm build` passing with all 25 static pages generated.

## Issues Found and Fixed

### 1. Sitemap — `output: 'export'` incompatibility
- **Problem:** `src/app/sitemap.ts` used Next.js metadata convention (`MetadataRoute.Sitemap`), which doesn't work with `output: 'export'` — requires `export const dynamic = 'force-static'`.
- **Fix:** Converted to a route handler at `src/app/sitemap.xml/route.ts` with `dynamic = 'force-static'`, generating raw XML.

### 2. ESLint — Circular structure error
- **Problem:** `eslint.config.mjs` used `FlatCompat` with `next/core-web-vitals` and `next/typescript`, causing "Converting circular structure to JSON" at build time.
- **Fix:** Rewrote to native ESLint flat config with `@typescript-eslint` plugin directly, no `FlatCompat`.

### 3. Pagination route — Empty `generateStaticParams` with `output: 'export'`
- **Problem:** `/posts/page/[page]` route returned empty array from `generateStaticParams` (only 2 posts, 12 per page = 1 page = no page 2+). Next.js 15 with `output: 'export'` treats empty array as "missing" the function.
- **Fix:** Always return at least `[{ page: '2' }]` as a fallback. Also renamed route from `/posts/page/[page]` to `/posts/p/[page]` to avoid potential naming conflicts.

### 4. Contentlayer warnings — YAML files matched
- **Problem:** `categories.yaml` and `series.yaml` in `content/` triggered warnings about unrecognized document types.
- **Fix:** Added `contentDirExclude: ['categories.yaml', 'series.yaml']` to `contentlayer.config.ts`.

### 5. Missing `robots.txt`
- **Fix:** Added `public/robots.txt`.

## What's Built

| Feature | Status | Notes |
|---------|--------|-------|
| Home page | ✅ | Latest 10 posts |
| Post list + pagination | ✅ | 12 per page, `/posts/p/[page]` |
| Post detail | ✅ | MDX rendering, series nav, tags, category |
| Categories | ✅ | List + detail pages |
| Tags | ✅ | Tag cloud + filtered post lists |
| Series | ✅ | List + ordered post navigation |
| Search | ✅ | Client-side Fuse.js |
| Dark mode | ✅ | next-themes with system detection |
| RSS feed | ✅ | `/feed.xml` |
| Sitemap | ✅ | `/sitemap.xml` |
| Code highlighting | ✅ | Shiki via rehype-pretty-code (dual theme) |
| 404 page | ✅ | Custom not-found |
| About page | ✅ | Placeholder content |
| TypeScript | ✅ | Strict mode, no errors |
| Static export | ✅ | `output: 'export'`, 25 pages |

## Build Output

```
25 static pages generated
Total First Load JS: ~102-112 kB per page
```

## Known Limitations

- ESLint warning: "Next.js plugin was not detected" — cosmetic only, lint rules still work
- Pagination fallback generates `/posts/p/2` even when only 1 page exists (renders 404 via `notFound()`)
- No favicon yet (`public/favicon.ico` missing)
- `robots.txt` sitemap URL points to example.com — update with real domain via `NEXT_PUBLIC_SITE_URL`

## Next Steps

- Add favicon
- Set up Vercel deployment
- Add more content
- Consider adding Pretendard + JetBrains Mono fonts (per architecture spec)
- Add tests (vitest configured but no tests written yet)
