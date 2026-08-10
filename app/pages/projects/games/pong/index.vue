<i18n locale="en" lang="yaml" src="~~/layers/dev/app/components/DevPages/Games/Pong/locales/en.yml" />

<i18n locale="ru" lang="yaml" src="~~/layers/dev/app/components/DevPages/Games/Pong/locales/ru.yml" />

<template>
  <DevPagesGamesPong />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'empty'
})
const { t } = useI18n()
useSeoMeta({
  title: t('PongPageTitle'),
  ogTitle: t('PongPageTitle'),
  description: t('PongPageDescription'),
  ogDescription: t('PongPageDescription'),
  twitterDescription: t('PongPageDescription')
})
</script>
