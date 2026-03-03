import Link from 'next/link'
import { NAV_LINKS } from '@/lib/constants'

export default function Nav() {
  return (
    <nav className="flex flex-wrap gap-4 text-sm">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-muted hover:text-text dark:text-gray-400 dark:hover:text-text-dark transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
