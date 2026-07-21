<i18n locale="en" lang="yaml" src="~/components/BlogPages/About/locales/en.yml" />

<i18n locale="ru" lang="yaml" src="~/components/BlogPages/About/locales/ru.yml" />

<template>
  <BlogPagesAbout />
</template>

<script setup lang="ts">
const { t } = useI18n()
definePageMeta({
  layout: 'blog'
})
useSeoMeta({
  title: t('AboutPageTitle'),
  ogTitle: t('AboutPageTitle'),
  description: t('AboutPageDescription'),
  ogDescription: t('AboutPageDescription'),
  twitterDescription: t('AboutPageDescription')
})
</script>
