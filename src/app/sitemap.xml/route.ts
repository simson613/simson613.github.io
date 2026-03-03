import { getAllPosts, getCategories, getAllTags, getSeriesList } from '@/lib/content'
import { SITE_CONFIG } from '@/lib/constants'

export const dynamic = 'force-static'

export function GET() {
  const posts = getAllPosts()
  const categories = getCategories()
  const tags = getAllTags()
  const series = getSeriesList()

  const staticPages = [
    { loc: SITE_CONFIG.url },
    { loc: `${SITE_CONFIG.url}/posts` },
    { loc: `${SITE_CONFIG.url}/categories` },
    { loc: `${SITE_CONFIG.url}/tags` },
    { loc: `${SITE_CONFIG.url}/series` },
    { loc: `${SITE_CONFIG.url}/about` },
  ]

  const postUrls = posts.map((post) => ({
    loc: `${SITE_CONFIG.url}/posts/${post.slug}`,
    lastmod: new Date(post.updatedAt ?? post.date).toISOString(),
  }))

  const categoryUrls = categories.map((c) => ({
    loc: `${SITE_CONFIG.url}/categories/${c.slug}`,
  }))

  const tagUrls = tags.map((t) => ({
    loc: `${SITE_CONFIG.url}/tags/${t.slug}`,
  }))

  const seriesUrls = series.map((s) => ({
    loc: `${SITE_CONFIG.url}/series/${s.slug}`,
  }))

  const allUrls = [...staticPages, ...postUrls, ...categoryUrls, ...tagUrls, ...seriesUrls]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>${
      'lastmod' in entry ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''
    }
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
