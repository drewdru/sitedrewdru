<template>
  <MotionZoomImg
    :img-class="'w-full h-20'"
    :src="src"
    :alt="alt"
    :size="{ sm: 100, md: 100, xl: 100, lg: 100 }"
  />
</template>

<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
}>()
</script>
