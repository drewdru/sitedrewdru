<i18n locale="en" lang="yaml" src="~/components/BlogPages/GuestBook/locales/en.yml" />

<i18n locale="ru" lang="yaml" src="~/components/BlogPages/GuestBook/locales/ru.yml" />

<template>
  <BlogPagesGuestBook />
</template>

<script setup lang="ts">
const { t } = useI18n()
definePageMeta({
  layout: 'blog'
})
useSeoMeta({
  title: t('GuestBookPageTitle'),
  ogTitle: t('GuestBookPageTitle'),
  description: t('GuestBookPageDescription'),
  ogDescription: t('GuestBookPageDescription'),
  twitterDescription: t('GuestBookPageDescription')
})
</script>
