import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: '소개',
}

export default function AboutPage() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>소개</h1>
      <p>
        안녕하세요, {SITE_CONFIG.author}입니다.
      </p>
      <p>
        개발하면서 배운 것들을 기록하고 공유하는 블로그입니다.
        주로 백엔드 개발, 시스템 아키텍처, DevOps에 관한 글을 씁니다.
      </p>
    </div>
  )
}
