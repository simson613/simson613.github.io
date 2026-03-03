# Architecture — Blog Project

## 1. Tech Stack

### Framework: Next.js 15 (App Router)

Next.js is the obvious choice for a content-heavy blog that needs SSG, good SEO, and image optimization out of the box. App Router gives us RSC (React Server Components) for zero-JS content pages and built-in metadata API for SEO. No other framework matches this combination for a blog use case.

- **Next.js 15** — App Router, RSC, SSG via `generateStaticParams`
- **React 19** — Server Components for content rendering

### Styling: Tailwind CSS v4

Utility-first CSS that ships only what's used. Perfect for a solo developer — no bikeshedding on class names, fast iteration, built-in dark mode support via `dark:` variant. v4 uses CSS-first configuration.

### Content Management: Local Markdown + Contentlayer2

File-based content. Markdown files live in the repo under `content/`. No external CMS dependency, no API to break, version-controlled content, works offline.

**Contentlayer2** (community fork, actively maintained) transforms Markdown/MDX into type-safe JSON at build time. Gives us:
- TypeScript-generated types for posts, categories, series
- Build-time validation of frontmatter
- Fast Hot Module Reload for content changes

### Markdown Processing

- **unified/remark/rehype** ecosystem (via Contentlayer2)
- **rehype-pretty-code** + **Shiki** — syntax highlighting at build time (zero client JS), language-specific themes
- **remark-gfm** — GitHub Flavored Markdown (tables, footnotes, strikethrough)
- **rehype-slug** + **rehype-autolink-headings** — auto-generated heading IDs for TOC

### Search: Fuse.js (Client-side)

For a personal blog with ~hundreds of posts max, client-side fuzzy search is sufficient. Fuse.js is lightweight (~5KB gzipped), works on a pre-built search index generated at build time. No server needed.

### Dark Mode: next-themes

Handles system preference detection, manual toggle, and avoids FOUC (flash of unstyled content) with a script injection strategy. De facto standard for Next.js dark mode.

### Hosting: Vercel

Next.js creator's platform. Zero-config deployment, automatic preview deploys on PR, edge CDN, image optimization API built-in. Free tier is more than sufficient for a personal blog.

### Analytics: None (add later if needed)

Start without analytics. If needed later, Vercel Analytics or Plausible (privacy-friendly) can be added in an afternoon.

---

## 2. Folder Structure

```
blog/
├── PROJECT.md
├── WORKFLOW.md
├── REQUIREMENTS.md
├── roles/
├── docs/
│
├── content/                      # Markdown content (git-tracked)
│   ├── posts/
│   │   ├── my-first-post.mdx
│   │   └── payment-refactoring-1.mdx
│   ├── categories.yaml           # Category definitions
│   └── series.yaml               # Series definitions
│
├── public/
│   ├── images/                   # Post images
│   ├── og/                       # Open Graph images
│   ├── robots.txt
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout (fonts, theme provider, nav)
│   │   ├── page.tsx              # Home — latest posts + hero
│   │   ├── posts/
│   │   │   ├── page.tsx          # Post list with pagination
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Post detail
│   │   ├── categories/
│   │   │   ├── page.tsx          # All categories
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Posts by category
│   │   ├── tags/
│   │   │   ├── page.tsx          # Tag cloud
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Posts by tag
│   │   ├── series/
│   │   │   ├── page.tsx          # All series
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Series detail with post list
│   │   ├── search/
│   │   │   └── page.tsx          # Search page
│   │   ├── about/
│   │   │   └── page.tsx          # About page
│   │   ├── feed.xml/
│   │   │   └── route.ts          # RSS feed (Route Handler)
│   │   ├── sitemap.ts            # Dynamic sitemap generation
│   │   └── not-found.tsx         # 404 page
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── nav.tsx
│   │   │   └── theme-toggle.tsx
│   │   ├── post/
│   │   │   ├── post-card.tsx
│   │   │   ├── post-list.tsx
│   │   │   ├── post-content.tsx
│   │   │   ├── toc.tsx           # Table of contents
│   │   │   └── series-nav.tsx    # Prev/next in series
│   │   ├── search/
│   │   │   └── search-input.tsx
│   │   ├── tag/
│   │   │   ├── tag-badge.tsx
│   │   │   └── tag-cloud.tsx
│   │   └── ui/
│   │       ├── pagination.tsx
│   │       └── category-badge.tsx
│   │
│   ├── lib/
│   │   ├── content.ts            # Content querying helpers (sort, filter, paginate)
│   │   ├── search-index.ts       # Build-time search index generation
│   │   ├── constants.ts          # Site metadata, nav links, config
│   │   └── utils.ts              # Date formatting, slug helpers
│   │
│   └── styles/
│       └── globals.css           # Tailwind imports + custom prose styles
│
├── contentlayer.config.ts        # Contentlayer schema definitions
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── prettier.config.mjs
├── vitest.config.ts
├── .env.example
├── .gitignore
└── package.json
```

---

## 3. Data Models

### Post Frontmatter

```typescript
interface Post {
  title: string
  slug: string                    // auto-generated from filename
  date: string                    // ISO 8601 (e.g., '2026-03-01')
  updatedAt?: string              // ISO 8601, shown if different from date
  summary: string                 // Used for meta description + post cards
  category: string                // Slug reference to category
  tags: string[]                  // Array of tag slugs
  series?: string                 // Slug reference to series
  seriesOrder?: number            // Position within series (1-based)
  published: boolean              // Draft toggle — false = hidden from build
  ogImage?: string                // Custom OG image path, fallback to auto-generated
}
```

Example frontmatter:

```yaml
---
title: '결제 시스템 리팩토링 1편 — 문제 정의'
date: '2026-02-15'
summary: '레거시 결제 시스템의 구조적 문제를 분석하고 리팩토링 방향을 정한 과정'
category: architecture
tags: [java, spring, refactoring]
series: payment-refactoring
seriesOrder: 1
published: true
---
```

### Category (categories.yaml)

```typescript
interface Category {
  slug: string                    // URL-safe identifier
  name: string                    // Display name (한국어)
  description: string             // Short description
}
```

```yaml
- slug: backend
  name: Backend
  description: '서버 개발, API 설계, 데이터베이스'
- slug: architecture
  name: Architecture
  description: '시스템 설계, 패턴, 의사결정'
- slug: career
  name: Career
  description: '커리어, 회고, 성장'
- slug: devops
  name: DevOps
  description: 'CI/CD, 인프라, 배포'
```

### Series (series.yaml)

```typescript
interface Series {
  slug: string
  title: string                   // Display title (한국어)
  description: string
}
```

### Tag

Tags are not pre-defined. They are extracted from post frontmatter at build time. Contentlayer2 collects all unique tags and generates tag pages dynamically.

```typescript
interface Tag {
  slug: string
  name: string                    // Same as slug (tags are lowercase kebab-case)
  count: number                   // Number of posts with this tag
}
```

---

## 4. API Design (Data Fetching Strategy)

This is a **fully static blog**. There are no runtime API endpoints. All data is resolved at build time.

### Build-Time Data Flow

```
content/posts/*.mdx
        ↓
  Contentlayer2 (build)
        ↓
  Type-safe JSON (.contentlayer/generated/)
        ↓
  Imported directly in page components
```

### Page Data Fetching

| Page | Data Source | Strategy |
|------|-----------|----------|
| Home | All published posts, sorted by date, limit 10 | Static (SSG) |
| Post List | All published posts, paginated (12 per page) | `generateStaticParams` for page numbers |
| Post Detail | Single post by slug | `generateStaticParams` for all slugs |
| Category Page | Posts filtered by category | `generateStaticParams` for all category slugs |
| Tag Page | Posts filtered by tag | `generateStaticParams` for all tag slugs |
| Series Page | Posts filtered by series, ordered by seriesOrder | `generateStaticParams` for all series slugs |
| Search | Pre-built Fuse.js index (JSON) loaded client-side | Client-side, search index generated at build time |
| RSS Feed | All published posts | Route Handler, returns XML |
| Sitemap | All slugs | Next.js `sitemap.ts` convention |

### Content Query Helpers (`src/lib/content.ts`)

```typescript
// All functions operate on the build-time generated data
function getAllPosts(): Post[]                              // sorted by date desc, published only
function getPostBySlug(slug: string): Post | undefined
function getPostsByCategory(categorySlug: string): Post[]
function getPostsByTag(tag: string): Post[]
function getPostsBySeries(seriesSlug: string): Post[]      // sorted by seriesOrder
function getAllTags(): Tag[]                                // with counts
function getSearchIndex(): SearchIndexEntry[]               // title + summary + slug
```

### RSS Feed (`src/app/feed.xml/route.ts`)

Route Handler that generates RSS 2.0 XML from all published posts. Runs at build time with `export const dynamic = 'force-static'`.

---

## 5. Key Decisions

### Why Contentlayer2 over raw MDX/next-mdx-remote?

Contentlayer2 gives us **type-safe content** with zero boilerplate. Without it, we'd manually parse frontmatter, validate fields, generate types, and wire up MDX compilation. Contentlayer2 does all of that declaratively. The generated types catch content errors at build time, not runtime.

The tradeoff: it's a build-time dependency that adds complexity. But for a Markdown-heavy blog, the DX improvement is worth it.

### Why SSG over SSR or ISR?

Content changes only when the author pushes a commit. There's no user-generated content, no real-time data. Full SSG means:
- Every page is a static HTML file on a CDN
- Zero server costs
- Sub-100ms TTFB globally
- No cold starts, no serverless functions for content

Rebuild happens on `git push` via Vercel's automatic deploy. For ~hundreds of posts, build time stays under 60 seconds.

### Why client-side search over Algolia/server search?

The blog will have at most a few hundred posts. A pre-built JSON search index (title + summary + tags) will be ~50-100KB. Fuse.js handles this instantly client-side. No API key management, no third-party dependency, no cost.

### Why Tailwind over CSS Modules or styled-components?

For a solo-developer blog, Tailwind is fastest to iterate with. No context-switching between files, built-in responsive utilities, purged CSS means tiny bundles. Dark mode via `dark:` prefix integrates cleanly with next-themes.

### Why YAML for categories/series instead of deriving from posts?

Categories and series have metadata (names, descriptions) that don't belong in post frontmatter. A YAML file is the simplest structured data format that Contentlayer2 can reference-validate against. It also lets us define category order, descriptions for category pages, and series metadata independently of whether any posts exist yet.

### Pagination: Page-based, not infinite scroll

Page-based pagination is better for SEO (each page is a distinct URL), better for accessibility, and simpler to implement with SSG (`/posts/page/2`). Infinite scroll adds client-side complexity for no real benefit on a personal blog.

### Image Strategy

- Post images stored in `public/images/` and referenced via standard Markdown `![alt](/images/...)` 
- Next.js `<Image>` component used in components (post cards, about page) for automatic optimization
- OG images: static files in `public/og/`, referenced in frontmatter. Auto-generation can be added later with `next/og` (ImageResponse API) if needed.

### Fonts

Use `next/font/google` to self-host fonts. Recommended: **Pretendard** (loaded via `next/font/local`) for Korean body text + **JetBrains Mono** for code blocks. Both are free and optimized for their use cases.
