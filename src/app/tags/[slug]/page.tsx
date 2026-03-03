import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllTags, getPostsByTag } from '@/lib/content'
import PostList from '@/components/post/post-list'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllTags().map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  return { title: `#${slug}` }
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params
  const posts = getPostsByTag(slug)

  if (posts.length === 0) notFound()

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">#{slug}</h1>
      <PostList posts={posts} />
    </div>
  )
}
