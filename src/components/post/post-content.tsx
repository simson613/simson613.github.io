import { useMDXComponent } from 'next-contentlayer2/hooks'

interface PostContentProps {
  code: string
}

export default function PostContent({ code }: PostContentProps) {
  const MDXContent = useMDXComponent(code)

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <MDXContent />
    </div>
  )
}
