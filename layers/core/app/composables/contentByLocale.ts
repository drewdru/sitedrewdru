import type { Collections } from '@nuxt/content'

export const useContentByLocale = (
  collection: keyof Collections,
  slug: string,
  locale: Ref<string>,
  options?: {
    fallbackLocale?: string
  }
) => {
  const fallbackLocale = options?.fallbackLocale ?? 'en'
  return useAsyncData(
    `${collection}-${slug}-${locale.value}`,
    async () => {
      const current = await queryCollection(collection)
        .path(`/${collection}/${locale.value}/${slug}`)
        .first()

      if (current || locale.value === fallbackLocale) {
        return current
      }

      return await queryCollection(collection)
        .path(`/${collection}/${fallbackLocale}/${slug}`)
        .first()
    },
    {
      watch: [locale]
    }
  )
}
