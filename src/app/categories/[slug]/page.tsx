import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategories, getPostsByCategory } from '@/lib/content'
import PostList from '@/components/post/post-list'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = getCategories().find((c) => c.slug === slug)
  if (!category) return {}
  return { title: category.name }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = getCategories().find((c) => c.slug === slug)

  if (!category) notFound()

  const posts = getPostsByCategory(slug)

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">{category.name}</h1>
      <p className="mb-8 text-muted">{category.description}</p>
      <PostList posts={posts} />
    </div>
  )
}
