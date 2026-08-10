<i18n locale="en" lang="yaml" src="~~/layers/dev/app/components/DevPages/Projects/locales/en.yml" />

<i18n locale="ru" lang="yaml" src="~~/layers/dev/app/components/DevPages/Projects/locales/ru.yml" />

<template>
  <DevPagesProjects />
</template>

<script setup lang="ts">
const { t } = useI18n()
useSeoMeta({
  title: t('ProjectsPageTitle'),
  ogTitle: t('ProjectsPageTitle'),
  description: t('ProjectsPageDescription'),
  ogDescription: t('ProjectsPageDescription'),
  twitterDescription: t('ProjectsPageDescription')
})
</script>
