<template>
  <UModal
    v-model:open="open"
    fullscreen
    class="bg-[bg]/40 backdrop-blur-sm"
    :ui="{
      body: 'flex flex-row'
    }"
  >
    <template #body>
      <slot name="previos" />
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
          class="size-full object-contain cursor-zoom-out"
          loading="lazy"
          @click="open = false"
        />
      </Motion>
      <slot name="next" />
    </template>
    <template #footer>
      <MDC
        v-if="alt"
        :value="alt"
      />
      &nbsp;
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
}>()

const open = defineModel<boolean>('open', {
  default: false
})
</script>
