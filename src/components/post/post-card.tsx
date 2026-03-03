import Link from 'next/link'
import type { Post } from 'contentlayer/generated'
import { formatDate } from '@/lib/utils'
import TagBadge from '@/components/tag/tag-badge'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="border-b border-border dark:border-border-dark py-6 last:border-0">
      <Link href={post.url} className="group">
        <h3 className="mb-1 text-lg font-semibold group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
          {post.title}
        </h3>
      </Link>
      <p className="mb-2 text-sm text-muted">{formatDate(post.date)}</p>
      <p className="mb-3 text-sm text-muted line-clamp-2">{post.summary}</p>
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
    </article>
  )
}
