<template>
  <NuxtImg
    :class="[
      'object-contain cursor-zoom-in',
      imgClass
    ]"
    :sizes="`sm:${size.sm}px md:${size.md}px lg:${size.lg}px xl:${size.xl}px`"
    :modifiers="{ fit: 'cover', format: 'webp', quality: props.quality ?? 80 }"
    :src="src"
    :alt="alt"
    :loading="lazy"
    @click="$emit('open')"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
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

const size = computed(() => ({
  sm: (typeof props.size === 'number' ? props.size : props.size?.sm) ?? 100,
  md: (typeof props.size === 'number' ? props.size : props.size?.md) ?? 100,
  lg: (typeof props.size === 'number' ? props.size : props.size?.lg) ?? 100,
  xl: (typeof props.size === 'number' ? props.size : props.size?.xl) ?? 100
}))

defineEmits<{ (e: 'open'): void }>()
</script>
