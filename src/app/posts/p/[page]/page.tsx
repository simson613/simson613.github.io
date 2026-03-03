import { notFound } from 'next/navigation'
import { getAllPosts } from '@/lib/content'
import PostList from '@/components/post/post-list'
import Pagination from '@/components/ui/pagination'
import { POSTS_PER_PAGE } from '@/lib/constants'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ page: string }>
}

export const metadata: Metadata = {
  title: '글 목록',
}

export function generateStaticParams() {
  const totalPosts = getAllPosts().length
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

  if (totalPages <= 1) {
    return [{ page: '2' }]
  }

  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }))
}

export default async function PostsPaginatedPage({ params }: PageProps) {
  const { page } = await params
  const pageNum = parseInt(page, 10)

  if (isNaN(pageNum) || pageNum < 2) notFound()

  const allPosts = getAllPosts()
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)

  if (pageNum > totalPages) notFound()

  const start = (pageNum - 1) * POSTS_PER_PAGE
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE)

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">글 목록</h1>
      <PostList posts={posts} />
      <Pagination currentPage={pageNum} totalPages={totalPages} basePath="/posts" />
    </div>
  )
}
