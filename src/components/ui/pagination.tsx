import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="mt-8 flex justify-center gap-2" aria-label="페이지네이션">
      {currentPage > 1 && (
        <Link
          href={currentPage === 2 ? basePath : `${basePath}/p/${currentPage - 1}`}
          className="rounded-md border border-border dark:border-border-dark px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          ← 이전
        </Link>
      )}
      {pages.map((page) => (
        <Link
          key={page}
          href={page === 1 ? basePath : `${basePath}/p/${page}`}
          className={`rounded-md border px-3 py-1 text-sm ${
            page === currentPage
              ? 'border-accent bg-accent text-white'
              : 'border-border dark:border-border-dark hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          href={`${basePath}/p/${currentPage + 1}`}
          className="rounded-md border border-border dark:border-border-dark px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          다음 →
        </Link>
      )}
    </nav>
  )
}
