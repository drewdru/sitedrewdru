<template>
  <NuxtImg
    :class="[
      'object-contain cursor-zoom-in',
      imgClass
    ]"
    :srcset="imgSrcset"
    :src="src"
    :alt="alt"
    @click="open = true"
  />
  <UModal
    v-model:open="open"
    fullscreen
    class="bg-[bg]/40 backdrop-blur-sm cursor-zoom-out"
  >
    <template #content>
      <Motion
        :initial="{ scale: 0.15 }"
        :animate="{ scale: 1 }"
        :transition="{
          type: 'spring',
          stiffness: 260,
          damping: 25
        }"
        class="size-full"
      >
        <NuxtImg
          :src="src"
          class="size-full object-contain"
          @click="open=false"
        />
      </Motion>
    </template>
  </UModal>
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
}>()

const img = useImage()

const size = {
  sm: (typeof props.size === 'number' ? props.size : props.size?.sm) ?? 100,
  md: (typeof props.size === 'number' ? props.size : props.size?.md) ?? 100,
  lg: (typeof props.size === 'number' ? props.size : props.size?.lg) ?? 100,
  xl: (typeof props.size === 'number' ? props.size : props.size?.xl) ?? 100
}
const imgSrcset = props.src
  ? img.getSizes(props.src, {
    sizes: `sm:${size.sm}px md:${size.md}px lg:${size.lg}px xl:${size.xl}px`,
    modifiers: { fit: 'cover', format: 'webp', quality: props.quality ?? 80 }
  }).srcset
  : undefined
const open = ref(false)
</script>
