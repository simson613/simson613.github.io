import { SITE_CONFIG } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="border-t border-border dark:border-border-dark mt-16">
      <div className="mx-auto max-w-3xl px-4 py-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} {SITE_CONFIG.author}. All rights reserved.
      </div>
    </footer>
  )
}
