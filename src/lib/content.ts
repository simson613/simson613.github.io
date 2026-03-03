import { allPosts, type Post } from 'contentlayer/generated'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

export interface Category {
  slug: string
  name: string
  description: string
}

export interface Series {
  slug: string
  title: string
  description: string
}

export interface Tag {
  slug: string
  name: string
  count: number
}

function getPublishedPosts(): Post[] {
  return allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getAllPosts(): Post[] {
  return getPublishedPosts()
}

export function getPostBySlug(slug: string): Post | undefined {
  return getPublishedPosts().find((post) => post.slug === slug)
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return getPublishedPosts().filter((post) => post.category === categorySlug)
}

export function getPostsByTag(tag: string): Post[] {
  return getPublishedPosts().filter((post) => post.tags.includes(tag))
}

export function getPostsBySeries(seriesSlug: string): Post[] {
  return getPublishedPosts()
    .filter((post) => post.series === seriesSlug)
    .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0))
}

export function getAllTags(): Tag[] {
  const tagMap = new Map<string, number>()
  for (const post of getPublishedPosts()) {
    for (const tag of post.tags) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1)
    }
  }
  return Array.from(tagMap.entries())
    .map(([slug, count]) => ({ slug, name: slug, count }))
    .sort((a, b) => b.count - a.count)
}

export function getCategories(): Category[] {
  const filePath = path.join(process.cwd(), 'content', 'categories.yaml')
  const raw = fs.readFileSync(filePath, 'utf-8')
  return yaml.load(raw) as Category[]
}

export function getSeriesList(): Series[] {
  const filePath = path.join(process.cwd(), 'content', 'series.yaml')
  const raw = fs.readFileSync(filePath, 'utf-8')
  return yaml.load(raw) as Series[]
}

export interface SearchIndexEntry {
  slug: string
  title: string
  summary: string
  tags: string[]
}

export function getSearchIndex(): SearchIndexEntry[] {
  return getPublishedPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    tags: post.tags,
  }))
}
