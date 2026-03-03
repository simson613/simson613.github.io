import TagBadge from './tag-badge'
import type { Tag } from '@/lib/content'

interface TagCloudProps {
  tags: Tag[]
}

export default function TagCloud({ tags }: TagCloudProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <TagBadge key={tag.slug} tag={tag.slug} count={tag.count} />
      ))}
    </div>
  )
}
