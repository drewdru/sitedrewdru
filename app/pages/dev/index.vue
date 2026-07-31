<i18n locale="en" lang="yaml" src="~~/layers/dev/app/components/Projects/locales/en.yml" />

<i18n locale="ru" lang="yaml" src="~~/layers/dev/app/components/Projects/locales/ru.yml" />

<template>
  <Projects />
</template>

<script setup lang="ts">
import Projects from '~~/layers/dev/app/components/Projects/index.vue'

const { t } = useI18n()
useSeoMeta({
  title: t('ProjectsPageTitle'),
  ogTitle: t('ProjectsPageTitle'),
  description: t('ProjectsPageDescription'),
  ogDescription: t('ProjectsPageDescription'),
  twitterDescription: t('ProjectsPageDescription')
})
</script>
