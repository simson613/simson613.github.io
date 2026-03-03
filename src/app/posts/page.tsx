import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/content'
import PostList from '@/components/post/post-list'
import Pagination from '@/components/ui/pagination'
import { POSTS_PER_PAGE } from '@/lib/constants'

export const metadata: Metadata = {
  title: '글 목록',
}

export default function PostsPage() {
  const allPosts = getAllPosts()
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  const posts = allPosts.slice(0, POSTS_PER_PAGE)

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">글 목록</h1>
      <PostList posts={posts} />
      <Pagination currentPage={1} totalPages={totalPages} basePath="/posts" />
    </div>
  )
}
