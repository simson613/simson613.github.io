import type { Metadata } from 'next'
import Link from 'next/link'
import { getSeriesList, getPostsBySeries } from '@/lib/content'

export const metadata: Metadata = {
  title: '시리즈',
}

export default function SeriesListPage() {
  const seriesList = getSeriesList()

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">시리즈</h1>
      <div className="space-y-4">
        {seriesList.map((series) => {
          const posts = getPostsBySeries(series.slug)
          return (
            <Link
              key={series.slug}
              href={`/series/${series.slug}`}
              className="block rounded-lg border border-border dark:border-border-dark p-4 hover:border-accent dark:hover:border-accent-dark transition-colors"
            >
              <h2 className="mb-1 font-semibold">{series.title}</h2>
              <p className="mb-2 text-sm text-muted">{series.description}</p>
              <p className="text-xs text-muted">{posts.length}편</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
