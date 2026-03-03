import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'

import remarkGfm from 'remark-gfm'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    updatedAt: { type: 'date', required: false },
    summary: { type: 'string', required: true },
    category: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    series: { type: 'string', required: false },
    seriesOrder: { type: 'number', required: false },
    published: { type: 'boolean', default: true },
    ogImage: { type: 'string', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath.replace('posts/', ''),
    },
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post._raw.flattenedPath.replace('posts/', '')}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  contentDirExclude: ['categories.yaml', 'series.yaml'],
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: {
            dark: 'github-dark',
            light: 'github-light',
          },
        },
      ],
    ],
  },
})
