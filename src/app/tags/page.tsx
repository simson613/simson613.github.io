import type { Metadata } from 'next'
import { getAllTags } from '@/lib/content'
import TagCloud from '@/components/tag/tag-cloud'

export const metadata: Metadata = {
  title: '태그',
}

export default function TagsPage() {
  const tags = getAllTags()

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">태그</h1>
      <TagCloud tags={tags} />
    </div>
  )
}
