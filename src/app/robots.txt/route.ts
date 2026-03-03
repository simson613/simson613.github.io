import { SITE_CONFIG } from '@/lib/constants'

export const dynamic = 'force-static'

export function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: ${SITE_CONFIG.url}/sitemap.xml
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
