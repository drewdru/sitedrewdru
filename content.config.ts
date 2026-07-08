import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const newsSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  image: z.string(),
  tag: z.string(),
  locale: z.string()
})

export default defineContentConfig({
  collections: {
    news: defineCollection({
      type: 'page',
      source: 'news/**/*.md',
      schema: newsSchema
    }),
    profile: defineCollection({
      type: 'page',
      source: 'profile/**/*.md'
    })
  }
})
