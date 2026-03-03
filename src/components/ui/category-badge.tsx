import Link from 'next/link'

interface CategoryBadgeProps {
  slug: string
  name: string
}

export default function CategoryBadge({ slug, name }: CategoryBadgeProps) {
  return (
    <Link
      href={`/categories/${slug}`}
      className="inline-block rounded-md bg-accent/10 px-3 py-1 text-xs font-medium text-accent dark:text-accent-dark hover:bg-accent/20 transition-colors"
    >
      {name}
    </Link>
  )
}
