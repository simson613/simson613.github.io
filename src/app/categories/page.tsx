import type { Metadata } from 'next'
import Link from 'next/link'
import { getCategories, getPostsByCategory } from '@/lib/content'

export const metadata: Metadata = {
  title: '카테고리',
}

export default function CategoriesPage() {
  const categories = getCategories()

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">카테고리</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((category) => {
          const postCount = getPostsByCategory(category.slug).length
          return (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="rounded-lg border border-border dark:border-border-dark p-4 hover:border-accent dark:hover:border-accent-dark transition-colors"
            >
              <h2 className="mb-1 font-semibold">{category.name}</h2>
              <p className="mb-2 text-sm text-muted">{category.description}</p>
              <p className="text-xs text-muted">{postCount}개의 글</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
