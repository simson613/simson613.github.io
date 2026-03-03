# Code Review

**Date:** 2026-03-03
**Reviewer:** Reviewer Agent
**Status:** ✅ Needs Minor Fixes

## Summary

The codebase is well-structured, follows the architecture spec closely, and the build passes with 25 static pages. Code conventions are mostly followed — no semicolons, single quotes, 2-space indent, kebab-case files, PascalCase components. TypeScript strict mode is on with no `any`. The main concerns are: a potential XSS vector in RSS/sitemap XML generation, missing `search-index.ts` from the architecture, no tests at all, a `new Date()` in Footer that breaks static export determinism, and the `PostContent` component likely needs `'use client'`.

---

## Issues

### 🔴 Critical

**1. XSS in RSS feed — unsanitized post data in XML**
- `src/app/feed.xml/route.ts:12-17`
- Post titles use `<![CDATA[...]]>` but if a title contains `]]>` it breaks out of CDATA. More importantly, `post.slug` is interpolated raw into `<link>` and `<guid>` — a malicious slug could inject XML.
- **Fix:** Escape XML entities (`&`, `<`, `>`, `"`, `'`) in all interpolated values, or use a library.

**2. XSS in sitemap — same pattern**
- `src/app/sitemap.xml/route.ts`
- All URLs built via string interpolation without XML escaping.

**3. `PostContent` may need `'use client'` directive**
- `src/components/post/post-content.tsx`
- `useMDXComponent` is a hook (uses React state/effects internally). This component has no `'use client'` directive. If Next.js treats it as a Server Component, it will fail at runtime.
- **Verify:** Check if `next-contentlayer2/hooks` re-exports work in RSC. If not, add `'use client'`.

### 🟡 Warning

**4. `new Date()` in Footer breaks static determinism**
- `src/components/layout/footer.tsx:6`
- `new Date().getFullYear()` is evaluated at build time for static export. This is fine functionally but means the year is baked in. If the site isn't rebuilt in January, the copyright year is stale. Not a bug per se, but worth noting — this is a common pattern that's acceptable.

**5. No `search-index.ts` module — architecture drift**
- Architecture spec lists `src/lib/search-index.ts` as a separate module for build-time search index generation. Currently the search index logic lives in `src/lib/content.ts` (`getSearchIndex()`). Minor drift but should match or update the spec.

**6. Missing `postcss.config.mjs` from architecture spec**
- `postcss.config.mjs` exists but isn't listed in the architecture folder structure. Minor — Tailwind v4 requires it.

**7. `getCategories()` and `getSeriesList()` use sync `fs.readFileSync` with no error handling**
- `src/lib/content.ts:59-68`
- If `categories.yaml` or `series.yaml` is missing or malformed, the build crashes with an unhelpful error. Should wrap in try/catch with a clear error message.
- Also uses `yaml.load(raw) as Category[]` — unsafe cast. `yaml.load` returns `unknown`; should validate the shape.

**8. `getPublishedPosts()` is called repeatedly without caching**
- `src/lib/content.ts:24-28`
- Every helper function calls `getPublishedPosts()` which re-filters and re-sorts every time. At build time this is fine for ~hundreds of posts, but it's wasteful. A simple module-level memoization would be cleaner.

**9. No tests written**
- Vitest is configured but zero test files exist. PROJECT.md specifies 80%+ coverage for utilities/logic.
- At minimum, `lib/content.ts`, `lib/utils.ts`, and key components should have tests.

**10. `@tailwindcss/typography` not in dependencies**
- Multiple components use `prose prose-neutral dark:prose-invert` classes (Tailwind Typography plugin). This plugin isn't listed in `package.json`. With Tailwind v4 this might be handled differently — verify it's working or add the dependency.

### 🔵 Suggestion

**11. Fonts not set up per architecture spec**
- Architecture recommends Pretendard + JetBrains Mono via `next/font`. Currently no custom fonts — browser defaults are used. This affects the visual quality significantly for a Korean blog.

**12. Missing `<meta>` for RSS feed autodiscovery**
- `src/app/layout.tsx` has no `<link rel="alternate" type="application/rss+xml">` in the head. RSS readers can't auto-detect the feed.
- Add to metadata: `alternates: { types: { 'application/rss+xml': '/feed.xml' } }`

**13. Search input lacks `aria-label` or visible `<label>`**
- `src/components/search/search-input.tsx:27`
- The input has a `placeholder` but no associated label — screen readers won't announce it properly.
- **Fix:** Add `aria-label="검색"` or a visually-hidden `<label>`.

**14. Pagination links lack `aria-current="page"` for current page**
- `src/components/ui/pagination.tsx`
- Active page is visually styled but not semantically marked for assistive technology.

**15. `Toc` component doesn't handle SSR gracefully**
- `src/components/post/toc.tsx`
- Headings are passed as props (good), but `document.getElementById` in `useEffect` could fail if heading IDs don't match. No fallback.

**16. Consider adding `rel="noopener noreferrer"` for external links**
- Not currently an issue (all links are internal), but the prose styles for markdown `<a>` tags don't distinguish internal/external links. When users write markdown with external links, they'll lack `rel` attributes.

**17. `Fuse` instance recreated on every parent re-render if `searchIndex` reference changes**
- `src/components/search/search-input.tsx:15-21`
- `useMemo` depends on `searchIndex` which is passed as a prop from a Server Component. In practice this is fine since the prop is stable, but worth noting.

**18. Missing `.env.example`**
- Architecture spec mentions `.env.example` should be committed. Currently missing. Should contain `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.

**19. `lint-staged` config missing**
- `package.json` has husky but no `lint-staged` config (not in `package.json` or as a separate file). Pre-commit hook won't work as described in PROJECT.md.

---

## Checklist

- [x] TypeScript strict mode, no `any`
- [x] Naming conventions followed (kebab-case files, PascalCase components, camelCase functions)
- [x] No unused imports/variables (from visual inspection)
- [x] Components are focused and small
- [ ] No hardcoded values that should be config — `SITE_CONFIG.url` defaults to `localhost:3000` ✅, but `robots.txt` has hardcoded `example.com` (noted in handoff)
- [ ] Error handling present — YAML loading has none (issue #7)
- [ ] Accessibility basics — missing labels (#13), missing `aria-current` (#14)
- [ ] No security issues — XSS in XML generation (#1, #2)
- [ ] Tests exist — none written (#9)
- [ ] `.env.example` committed (#18)
- [ ] `lint-staged` configured (#19)
