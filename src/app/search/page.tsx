import type { Metadata } from 'next'
import { getSearchIndex } from '@/lib/content'
import SearchInput from '@/components/search/search-input'

export const metadata: Metadata = {
  title: '검색',
}

export default function SearchPage() {
  const searchIndex = getSearchIndex()

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">검색</h1>
      <SearchInput searchIndex={searchIndex} />
    </div>
  )
}
