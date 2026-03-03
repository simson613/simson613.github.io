'use client'

import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import Link from 'next/link'
import type { SearchIndexEntry } from '@/lib/content'

interface SearchInputProps {
  searchIndex: SearchIndexEntry[]
}

export default function SearchInput({ searchIndex }: SearchInputProps) {
  const [query, setQuery] = useState('')

  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: ['title', 'summary', 'tags'],
        threshold: 0.3,
      }),
    [searchIndex]
  )

  const results = query.length > 1 ? fuse.search(query) : []

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요..."
        aria-label="검색"
        className="w-full rounded-lg border border-border dark:border-border-dark bg-transparent px-4 py-3 text-sm outline-none focus:border-accent dark:focus:border-accent-dark"
        autoFocus
      />
      {query.length > 1 && (
        <div className="mt-6">
          <p className="mb-4 text-sm text-muted">{results.length}개의 결과</p>
          <div className="space-y-4">
            {results.map(({ item }) => (
              <Link
                key={item.slug}
                href={`/posts/${item.slug}`}
                className="block rounded-lg border border-border dark:border-border-dark p-4 hover:border-accent dark:hover:border-accent-dark transition-colors"
              >
                <h3 className="mb-1 font-semibold">{item.title}</h3>
                <p className="text-sm text-muted line-clamp-2">{item.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
