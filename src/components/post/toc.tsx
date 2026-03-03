'use client'

import { useEffect, useState } from 'react'

interface TocHeading {
  id: string
  text: string
  level: number
}

export default function Toc({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px' }
    )

    for (const heading of headings) {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="mb-8 rounded-lg border border-border dark:border-border-dark p-4">
      <h2 className="mb-2 text-sm font-semibold">목차</h2>
      <ul className="space-y-1 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}>
            <a
              href={`#${heading.id}`}
              className={`block py-0.5 transition-colors hover:text-accent dark:hover:text-accent-dark ${
                activeId === heading.id
                  ? 'text-accent dark:text-accent-dark font-medium'
                  : 'text-muted'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
