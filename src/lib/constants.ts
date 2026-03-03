export const SITE_CONFIG = {
  title: 'Dev Blog',
  description: '개발하면서 배운 것들을 기록합니다',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  author: 'Pea',
  language: 'ko',
} as const

export const NAV_LINKS = [
  { href: '/posts', label: '글 목록' },
  { href: '/categories', label: '카테고리' },
  { href: '/tags', label: '태그' },
  { href: '/series', label: '시리즈' },
  { href: '/search', label: '검색' },
  { href: '/about', label: '소개' },
] as const

export const POSTS_PER_PAGE = 12
export const HOME_POSTS_COUNT = 10
