import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug, getPostsBySeries, getSeriesList } from '@/lib/content'
import { formatDate } from '@/lib/utils'
import PostContent from '@/components/post/post-content'
import SeriesNav from '@/components/post/series-nav'
import TagBadge from '@/components/tag/tag-badge'
import CategoryBadge from '@/components/ui/category-badge'
import { getCategories } from '@/lib/content'
import { SITE_CONFIG } from '@/lib/constants'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      url: `${SITE_CONFIG.url}/posts/${slug}`,
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const categories = getCategories()
  const category = categories.find((c) => c.slug === post.category)

  const seriesList = post.series ? getSeriesList() : []
  const series = post.series ? seriesList.find((s) => s.slug === post.series) : undefined
  const seriesPosts = post.series ? getPostsBySeries(post.series) : []

  return (
    <article>
      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-bold">{post.title}</h1>
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.updatedAt && (
            <span>(수정: {formatDate(post.updatedAt)})</span>
          )}
          {category && <CategoryBadge slug={category.slug} name={category.name} />}
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </header>

      {series && (
        <SeriesNav series={series} posts={seriesPosts} currentSlug={post.slug} />
      )}

      <PostContent code={post.body.code} />
    </article>
  )
}
