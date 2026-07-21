<template>
  <div class="min-h-screen flex flex-col">
    <UHeader>
      <template #left>
        <AppLogo :full="true" />
      </template>

      <template #right>
        <ULocaleSelect
          variant="ghost"
          :model-value="locale"
          :locales="(locales as Locale<any>[])"
          :ui="{
            trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
          }"
          @update:model-value="setLocale($event as typeof locale)"
        />
        <UColorModeButton />

        <UButton
          to="https://github.com/drewdru/sitedrewdru"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>

    <USeparator>
      <AppLogo class="h-4 w-auto text-toned" />
    </USeparator>

    <UFooter>
      <template #left>
        <p class="text-sm text-toned">
          Drew Dru © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton
          to="https://github.com/drewdru/sitedrewdru"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </div>
</template>

<script setup lang="ts">
import type { Locale } from '@nuxt/ui'
import AppLogo from '~~/layers/uikit/app/components/AppLogo/index.vue'

const { locale, setLocale, locales } = useI18n()
useHead({
  htmlAttrs: { lang: locale.value },
  titleTemplate: 'Drew Dru - %s'
})
</script>
