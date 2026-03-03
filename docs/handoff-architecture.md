# Handoff: Architecture → Development

## What Was Done

Designed the full technical architecture for the portfolio blog. All decisions are documented in `docs/architecture.md`.

## Summary of Decisions

| Area | Decision |
|------|----------|
| Framework | Next.js 15 (App Router, RSC, full SSG) |
| Styling | Tailwind CSS v4 + dark mode via next-themes |
| Content | Local MDX files + Contentlayer2 (type-safe, build-time) |
| Syntax Highlighting | Shiki via rehype-pretty-code (build-time, zero JS) |
| Search | Fuse.js client-side on pre-built index |
| Hosting | Vercel (free tier) |
| Pagination | Page-based (SEO-friendly, SSG-compatible) |
| Fonts | Pretendard (Korean body) + JetBrains Mono (code) |

## What the Developer Needs to Know

1. **No database, no API.** Everything is static. Content lives in `content/posts/*.mdx` and is compiled at build time by Contentlayer2.
2. **Categories and series are defined in YAML** (`content/categories.yaml`, `content/series.yaml`). Tags are auto-extracted from post frontmatter.
3. **Follow PROJECT.md strictly** — no semicolons, single quotes, pnpm, strict TypeScript, kebab-case files.
4. **Folder structure is defined** in architecture.md §2. Follow it.
5. **All pages are SSG.** Use `generateStaticParams` for dynamic routes. The only client-side interactivity is search and theme toggle.

## Open Questions

None. All decisions are made. Developer should proceed with scaffolding.
