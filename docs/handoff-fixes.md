# Handoff — Review Fixes

**Date:** 2026-03-03
**Developer:** Developer Agent

## Summary

All 11 review issues have been addressed across 12 commits on the `dev` branch. Build passes successfully.

## Changes

### 🔴 Critical

1. **XSS in RSS feed & sitemap** — Added `escapeXml()` helper in both `feed.xml/route.ts` and `sitemap.xml/route.ts` that escapes `&`, `<`, `>`, `"`, `'`. All interpolated values now go through this function. CDATA wrappers removed in favor of proper escaping.

2. **PostContent 'use client'** — Added `'use client'` directive to `src/components/post/post-content.tsx`. The component uses `useMDXComponent` hook which requires client-side rendering.

### 🟡 Warning

3. **YAML error handling** — Refactored `getCategories()` and `getSeriesList()` in `src/lib/content.ts` to use a shared `loadYamlArray<T>()` helper with:
   - try/catch wrapping file read + YAML parse
   - Array type validation
   - Shape validation (checks required keys exist on each item)
   - Returns empty array on failure with `console.error` logging

4. **@tailwindcss/typography** — Installed `@tailwindcss/typography` and added `@plugin '@tailwindcss/typography'` to `globals.css`. Prose classes now work correctly.

5. **lint-staged** — Added `lint-staged` config to `package.json` and created `.husky/pre-commit` hook. Runs ESLint + Prettier on staged `.ts/.tsx` files, Prettier on other files.

6. **.env.example** — Created with `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.

### 🔵 Suggestion

7. **Fonts** — Set up Pretendard (via `pretendard` npm package, dynamic subset CSS) as the body font and JetBrains Mono (via `next/font/google`) as the code font. Added CSS custom properties in `@theme` block.

8. **RSS autodiscovery** — Added `alternates.types` with `application/rss+xml` to root layout metadata.

9. **Accessibility** — Added `aria-label="검색"` to search input. Added `aria-current="page"` to active pagination link.

10. **robots.txt** — Replaced static `public/robots.txt` (hardcoded `example.com`) with dynamic `src/app/robots.txt/route.ts` that uses `SITE_CONFIG.url`.

## Build Status

✅ `pnpm build` passes — all pages generated successfully.

## Not Addressed

- **Tests** — Not in the fix list (issue #9 in review). Zero test files still exist.
- **search-index.ts architecture drift** — Not in the fix list (issue #5 in review).
- **Footer `new Date()`** — Reviewer noted this is acceptable pattern.
- **Memoization of `getPublishedPosts()`** — Not in the fix list (issue #8 in review).
