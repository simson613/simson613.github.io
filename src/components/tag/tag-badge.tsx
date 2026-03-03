import Link from 'next/link'

interface TagBadgeProps {
  tag: string
  count?: number
}

export default function TagBadge({ tag, count }: TagBadgeProps) {
  return (
    <Link
      href={`/tags/${tag}`}
      className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-muted hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
    >
      {tag}
      {count !== undefined && <span className="ml-1">({count})</span>}
    </Link>
  )
}
