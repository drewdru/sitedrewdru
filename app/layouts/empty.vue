<template>
  <div class="min-h-screen flex flex-col bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--ui-bg)_60%,transparent),color-mix(in_srgb,var(--ui-bg-accented)_60%,transparent))]">
    <UMain>
      <slot />
    </UMain>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
useHead({
  htmlAttrs: { lang: locale.value },
  titleTemplate: 'Drew Dru - %s'
})
</script>
