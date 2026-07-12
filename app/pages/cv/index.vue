<i18n locale="en" lang="yaml" src="~~/layers/career/app/components/Cv/locales/en.yml" />

<i18n locale="ru" lang="yaml" src="~~/layers/career/app/components/Cv/locales/ru.yml" />

<template>
  <CV />
</template>

<script setup lang="ts">
import CV from '~~/layers/career/app/components/Cv/index.vue'

const { t } = useI18n()
useSeoMeta({
  title: t('CvPageTitle'),
  ogTitle: t('CvPageTitle'),
  description: t('CvPageDescription'),
  ogDescription: t('CvPageDescription'),
  twitterDescription: t('CvPageDescription')
})
</script>
