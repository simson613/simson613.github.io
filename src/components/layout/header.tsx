import Link from 'next/link'
import Nav from './nav'
import ThemeToggle from './theme-toggle'
import { SITE_CONFIG } from '@/lib/constants'

export default function Header() {
  return (
    <header className="border-b border-border dark:border-border-dark">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold">
          {SITE_CONFIG.title}
        </Link>
        <div className="flex items-center gap-4">
          <Nav />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
