<i18n locale="en" lang="yaml" src="~/components/BlogPages/Home/locales/en.yml" />

<i18n locale="ru" lang="yaml" src="~/components/BlogPages/Home/locales/ru.yml" />

<template></template>

<script setup lang="ts">
const { t } = useI18n()
definePageMeta({
  layout: 'infinity-loading'
})
useSeoMeta({
  title: t('HomePageTitle'),
  ogTitle: t('HomePageTitle'),
  description: t('HomePageDescription'),
  ogDescription: t('HomePageDescription'),
  twitterDescription: t('HomePageDescription')
})
const localePath = useLocalePath()
onMounted(() => {
  navigateTo(localePath('/welcome'), { external: true })
})
</script>
