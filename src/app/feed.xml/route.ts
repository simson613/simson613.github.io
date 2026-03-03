import { getAllPosts } from '@/lib/content'
import { SITE_CONFIG } from '@/lib/constants'

export const dynamic = 'force-static'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function GET() {
  const posts = getAllPosts()

  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(`${SITE_CONFIG.url}/posts/${post.slug}`)}</link>
      <description>${escapeXml(post.summary)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${escapeXml(`${SITE_CONFIG.url}/posts/${post.slug}`)}</guid>
    </item>`
    )
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_CONFIG.title)}</title>
    <link>${escapeXml(SITE_CONFIG.url)}</link>
    <description>${escapeXml(SITE_CONFIG.description)}</description>
    <language>${escapeXml(SITE_CONFIG.language)}</language>
    <atom:link href="${escapeXml(`${SITE_CONFIG.url}/feed.xml`)}" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
