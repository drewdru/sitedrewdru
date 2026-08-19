<template>
  <div class="flex flex-col gap-4">
    <UButton
      v-for="value in menu"
      :key="value.path"
      :ui="{
        base: 'text-center whitespace-pre-line'
      }"
      v-bind="{ ...(value.buttonProps ?? {}) }"
      @click="gameMainMenuStore.navigate(value.path)"
    >
      <span class="w-full">{{ value.label }}</span>
    </UButton>
  </div>
</template>

<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import { useGameMainMenuStore } from '../../../stores/mainMenu'

const gameMainMenuStore = useGameMainMenuStore()
defineProps<{
  menu: {
    path: string
    label: string
    buttonProps: ButtonProps
  }[]
}>()
defineEmits<{
  (e: 'changePage', value: string): void
}>()
</script>
