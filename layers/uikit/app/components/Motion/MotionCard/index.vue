<template>
  <Motion
    :initial="{
      scale: 1.1,
      opacity: 0,
      filter: 'blur(20px)'
    }"
    :animate="{
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)'
    }"
    :transition="{
      duration: 0.6,
      delay
    }"
  >
    <UCard>
      <slot />
    </UCard>
  </Motion>
</template>

<script setup lang="ts">
defineProps({
  delay: {
    type: Number,
    default: 0
  }
})
</script>
