import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getSeriesList, getPostsBySeries } from '@/lib/content'
import { formatDate } from '@/lib/utils'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getSeriesList().map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const series = getSeriesList().find((s) => s.slug === slug)
  if (!series) return {}
  return { title: series.title }
}

export default async function SeriesDetailPage({ params }: PageProps) {
  const { slug } = await params
  const series = getSeriesList().find((s) => s.slug === slug)

  if (!series) notFound()

  const posts = getPostsBySeries(slug)

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">{series.title}</h1>
      <p className="mb-8 text-muted">{series.description}</p>
      <ol className="space-y-3">
        {posts.map((post, i) => (
          <li key={post.slug}>
            <Link
              href={post.url}
              className="group flex items-start gap-3 rounded-lg border border-border dark:border-border-dark p-4 hover:border-accent dark:hover:border-accent-dark transition-colors"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-medium text-accent">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted">{formatDate(post.date)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
