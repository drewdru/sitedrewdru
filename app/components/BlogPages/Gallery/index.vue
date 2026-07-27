<i18n locale="en" lang="yaml" src="./locales/en.yml" />

<i18n locale="ru" lang="yaml" src="./locales/ru.yml" />

<template>
  <div class="gallery text-left">
    <UContainer>
      <h3 class="text-center mb-4">
        {{ t('GalleryPageTitle') }}
      </h3>
      <p class="mb-4">
        {{ t('GalleryPageDescription') }}
      </p>
    </UContainer>
    <ImageGroup
      :gallery="gallery"
      :categories="categories"
    />
  </div>
</template>

<script setup lang="ts">
import type { GalleryCategory } from '~~/layers/uikit/app/components/ImageGroup/types'
import { gallery } from './constants'

const { t } = useI18n()

const categories = computed(() => [
  {
    key: 'all',
    label: t('All')
  },
  {
    key: 'myArt',
    label: t('MyArt')
  },
  {
    key: 'drawnForMe',
    label: t('DrawnForMe')
  }
] as GalleryCategory[])
</script>
