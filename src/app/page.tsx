import { getAllPosts } from '@/lib/content'
import PostList from '@/components/post/post-list'
import { HOME_POSTS_COUNT, SITE_CONFIG } from '@/lib/constants'
import Link from 'next/link'

export default function HomePage() {
  const posts = getAllPosts().slice(0, HOME_POSTS_COUNT)

  return (
    <div>
      <section className="mb-12">
        <h1 className="mb-2 text-3xl font-bold">{SITE_CONFIG.title}</h1>
        <p className="text-muted">{SITE_CONFIG.description}</p>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">최근 글</h2>
          <Link href="/posts" className="text-sm text-accent dark:text-accent-dark hover:underline">
            전체 보기 →
          </Link>
        </div>
        <PostList posts={posts} />
      </section>
    </div>
  )
}
