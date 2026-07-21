<i18n locale="en" lang="yaml" src="./locales/en.yml" />

<i18n locale="ru" lang="yaml" src="./locales/ru.yml" />

<template>
  <div class="home text-left">
    <h3 class="home text-center">
      {{ t('AboutPageTitle') }}
    </h3>
    <template v-if="pageContent">
      <ContentRenderer
        class="mt-4"
        :value="pageContent"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const { data: pageContent } = await useContentByLocale('about', 'me', locale)
</script>
