<template>
  <NuxtUIProseA
    v-bind="{
      ...$attrs,
      ...props,
      target: isExternal ? '_blank' : props.target
    }"
  >
    <slot />
  </NuxtUIProseA>
</template>

<script setup lang="ts">
import NuxtUIProseA from '@nuxt/ui/components/prose/A.vue'
import type { ProseAProps, ProseASlots } from '@nuxt/ui'

const props = defineProps<ProseAProps>()
defineSlots<ProseASlots>()

const isExternal = computed(() =>
  /^https?:\/\//.test(props.href ?? '')
)
</script>
