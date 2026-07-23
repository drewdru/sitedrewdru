<i18n locale="en" lang="yaml" src="./locales/en.yml" />

<i18n locale="ru" lang="yaml" src="./locales/ru.yml" />

<template>
  <div class="home text-left">
    <h3 class="text-center">
      {{ t('Welcome') }}
    </h3>
    <ProseBlockquote>
      <div class="flex flex-row gap-4 not-italic">
        <Kyusha />
        <pre class="font-mono text-mono text-base text-center overflow-auto">
&nbsp;
{{ t('GladToSeeYou') }}
{{ t('BeGentlePettingKyusha') }}
&nbsp;</pre>
      </div>
    </ProseBlockquote>
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
const { data: pageContent } = await useContentByLocale('about', 'home', locale)
</script>
