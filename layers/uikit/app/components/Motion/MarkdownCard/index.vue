<template>
  <MotionCard :delay="delay">
    <MDC
      v-if="content"
      :value="content"
    />
  </MotionCard>
</template>

<script setup lang="ts">
defineProps({
  delay: {
    type: Number,
    default: 0
  },
  content: {
    type: String,
    default: ''
  }
})
</script>
