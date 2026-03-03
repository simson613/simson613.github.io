import type { Post } from 'contentlayer/generated'
import PostCard from './post-card'

interface PostListProps {
  posts: Post[]
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return <p className="py-8 text-center text-muted">글이 없습니다.</p>
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
