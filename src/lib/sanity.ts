import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = import.meta.env.SANITY_PROJECT_ID || 'q427jo03'
const dataset = import.meta.env.SANITY_DATASET || 'production'

console.log('[Sanity] Config:', { projectId, dataset })

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export async function getPosts() {
  console.log('[Sanity] Fetching posts...')
  try {
    // First, fetch all posts regardless of status to debug
    const allPosts = await client.fetch(`
      *[_type == 'post'] | order(publishedAt desc) {
        _id,
        title,
        slug,
        status,
        excerpt,
        publishedAt,
        mainImage,
        categories[]->,
        tags,
        author->
      }
    `)
    console.log('[Sanity] All posts in dataset:', allPosts.length, 'posts')
    console.log('[Sanity] Post statuses:', allPosts.map((p: any) => ({ title: p.title, status: p.status })))
    
    // Filter for published posts
    const publishedPosts = allPosts.filter((p: any) => p.status === 'published')
    console.log('[Sanity] Published posts:', publishedPosts.length, 'posts')
    return publishedPosts
  } catch (error) {
    console.error('[Sanity] Error fetching posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string) {
  console.log('[Sanity] Fetching post by slug:', slug)
  try {
    const post = await client.fetch(`
      *[_type == 'post' && slug.current == $slug && status == 'published'][0] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        mainImage,
        categories[]->,
        tags,
        author->,
        body
      }
    `, { slug })
    console.log('[Sanity] Post fetched:', post ? 'found' : 'not found')
    return post
  } catch (error) {
    console.error('[Sanity] Error fetching post:', error)
    return null
  }
}

export async function getCategories() {
  return await client.fetch(`
    *[_type == 'category'] | order(title asc) {
      _id,
      title,
      slug,
      description
    }
  `)
}

export async function getAuthors() {
  return await client.fetch(`
    *[_type == 'author'] | order(name asc) {
      _id,
      name,
      slug,
      bio,
      image
    }
  `)
}

export async function getSeries() {
  return await client.fetch(`
    *[_type == 'series'] | order(order asc, title asc) {
      _id,
      title,
      slug,
      description,
      coverImage,
      order
    }
  `)
}

export async function getSeriesBySlug(slug: string) {
  return await client.fetch(`
    *[_type == 'series' && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      coverImage,
      order
    }
  `, { slug })
}

export async function getPostsBySeries(seriesId: string) {
  return await client.fetch(`
    *[_type == 'post' && status == 'published' && series._ref == $seriesId] | order(publishedAt asc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      mainImage,
      categories[]->,
      tags,
      author->
    }
  `, { seriesId })
}

export async function getPostsByCategory(categorySlug: string) {
  console.log('[Sanity] Fetching posts by category:', categorySlug)
  try {
    const posts = await client.fetch(`
      *[_type == 'post' && status == 'published' && $categorySlug in categories[].slug.current] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        mainImage,
        categories[]->,
        tags,
        author->
      }
    `, { categorySlug })
    console.log('[Sanity] Posts by category:', posts.length, 'posts')
    
    // If the query returns 0, try alternative approach
    if (posts.length === 0) {
      console.log('[Sanity] Trying alternative category query...')
      const allPosts = await client.fetch(`
        *[_type == 'post' && status == 'published'] | order(publishedAt desc) {
          _id,
          title,
          slug,
          excerpt,
          publishedAt,
          mainImage,
          categories[]->,
          tags,
          author->
        }
      `)
      const filtered = allPosts.filter((p: any) => 
        p.categories?.some((c: any) => c.slug.current === categorySlug)
      )
      console.log('[Sanity] Filtered posts:', filtered.length)
      return filtered
    }
    
    return posts
  } catch (error) {
    console.error('[Sanity] Error fetching posts by category:', error)
    return []
  }
}

export async function getPostsByTag(tag: string) {
  return await client.fetch(`
    *[_type == 'post' && status == 'published' && $tag in tags] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      mainImage,
      categories[]->,
      tags,
      author->
    }
  `, { tag })
}

export async function getPostsByAuthor(authorId: string) {
  return await client.fetch(`
    *[_type == 'post' && status == 'published' && author._ref == $authorId] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      mainImage,
      categories[]->,
      tags,
      author->
    }
  `, { authorId })
}
