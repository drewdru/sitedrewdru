<i18n locale="en" lang="yaml" src="./locales/en.yml" />

<i18n locale="ru" lang="yaml" src="./locales/ru.yml" />

<template>
  <div class="guestbook text-left">
    <h3 class="text-center mb-4">
      {{ t('GuestBookPageTitle') }}
    </h3>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
