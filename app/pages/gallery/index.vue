<i18n locale="en" lang="yaml" src="~/components/BlogPages/Gallery/locales/en.yml" />

<i18n locale="ru" lang="yaml" src="~/components/BlogPages/Gallery/locales/ru.yml" />

<template>
  <BlogPagesGallery />
</template>

<script setup lang="ts">
const { t } = useI18n()
definePageMeta({
  layout: 'blog'
})
useSeoMeta({
  title: t('GalleryPageTitle'),
  ogTitle: t('GalleryPageTitle'),
  description: t('GalleryPageDescription'),
  ogDescription: t('GalleryPageDescription'),
  twitterDescription: t('GalleryPageDescription')
})
</script>
