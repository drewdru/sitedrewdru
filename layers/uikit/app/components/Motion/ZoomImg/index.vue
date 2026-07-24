<template>
  <MotionZoomImgPreview
    :src="src"
    :size="size"
    :img-class="imgClass"
    :alt="alt"
    :quality="quality"
    :lazy="lazy"
    @open="open = true"
  />
  <MotionZoomImgModal
    v-model:open="open"
    :src="src"
    :alt="alt"
  />
</template>

<script setup lang="ts">
defineProps<{
  src: string
  size?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  } | number
  imgClass?: string
  alt?: string
  quality?: number
  lazy?: boolean
}>()

const open = ref(false)
</script>
