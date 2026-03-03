import Link from 'next/link'
import type { Post } from 'contentlayer/generated'
import type { Series } from '@/lib/content'

interface SeriesNavProps {
  series: Series
  posts: Post[]
  currentSlug: string
}

export default function SeriesNav({ series, posts, currentSlug }: SeriesNavProps) {
  const currentIndex = posts.findIndex((p) => p.slug === currentSlug)

  return (
    <div className="mb-8 rounded-lg border border-border dark:border-border-dark p-4">
      <Link
        href={`/series/${series.slug}`}
        className="mb-2 block text-sm font-semibold hover:text-accent dark:hover:text-accent-dark"
      >
        📚 시리즈: {series.title}
      </Link>
      <ol className="mb-4 space-y-1 text-sm">
        {posts.map((post, i) => (
          <li key={post.slug}>
            {post.slug === currentSlug ? (
              <span className="font-medium text-accent dark:text-accent-dark">
                {i + 1}. {post.title}
              </span>
            ) : (
              <Link href={post.url} className="text-muted hover:underline">
                {i + 1}. {post.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <div className="flex justify-between text-sm">
        {currentIndex > 0 ? (
          <Link
            href={posts[currentIndex - 1].url}
            className="text-accent dark:text-accent-dark hover:underline"
          >
            ← 이전 편
          </Link>
        ) : (
          <span />
        )}
        {currentIndex < posts.length - 1 ? (
          <Link
            href={posts[currentIndex + 1].url}
            className="text-accent dark:text-accent-dark hover:underline"
          >
            다음 편 →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  )
}
