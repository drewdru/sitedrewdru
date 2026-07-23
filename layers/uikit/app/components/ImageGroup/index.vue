<i18n locale="en" lang="yaml" src="./locales/en.yml" />

<i18n locale="ru" lang="yaml" src="./locales/ru.yml" />

<template>
  <div class="flex flex-col  gap-2">
    <div class="flex justify-center gap-2">
      <UButton
        v-for="category in categories"
        :key="category.key"
        :variant="selectedCategory === category.key ? 'solid' : 'soft'"
        @click="setCategory(category)"
      >
        {{ category.label }}
      </UButton>
    </div>
    <UScrollArea
      v-slot="{ item }"
      :items="filteredGallery"
      orientation="vertical"
      :virtualize="{
        gap: 16,
        lanes: 3,
        estimateSize: 480
      }"
      class="w-full min-h-[400px] p-4 h-[60vh]"
    >
      <UCard
        :ui="{
          body: 'h-full flex flex-col gap-2'
        }"
        variant="soft"
      >
        <template #default>
          <MotionZoomImg
            v-if="item.type === 'img'"
            :src="item.src"
            :alt="item.alt"
            :size="{ sm: 200, md: 200, xl: 200, lg: 200 }"
            lazy
            img-class="w-full"
          />
          <UButton
            v-else-if="item.type === 'youtube'"
            icon="i-simple-icons-youtube"
            variant="subtle"
            :ui="{
              base: 'flex flex-col'
            }"
            target="_blank"
            :to="item.link"
          >
            <img
              :src="item.src"
              :alt="item.alt"
              img-class="w-full"
            />
          </UButton>
          <div
            v-if="item.label"
            class="w-full text-center"
          >
            {{ item.label }}
          </div>
          <div
            v-else
            class="w-full text-center"
          >
            {{ t('By') }} {{ item.author }}
          </div>
        </template>
      </UCard>
    </UScrollArea>
  </div>
</template>

<script setup lang="ts">
import type { GalleryCategory } from './types'

const props = defineProps<{
  gallery: {
    src: string
    alt: string
    category: string
    type: string
    author: string
    label?: string
    link?: string
  }[]
  categories: GalleryCategory[]
}>()

const { t } = useI18n()
const selectedCategory = ref('all')

const filteredGallery = computed(() => {
  if (selectedCategory.value === 'all') {
    return props.gallery
  }

  return props.gallery.filter(
    art => art.category === selectedCategory.value
  )
})

const setCategory = (category: GalleryCategory) => {
  selectedCategory.value = category.key
}
</script>
