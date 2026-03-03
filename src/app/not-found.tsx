import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="mb-4 text-6xl font-bold">404</h1>
      <p className="mb-8 text-muted">페이지를 찾을 수 없습니다.</p>
      <Link
        href="/"
        className="rounded-md bg-accent px-4 py-2 text-white hover:bg-accent/90 transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  )
}
