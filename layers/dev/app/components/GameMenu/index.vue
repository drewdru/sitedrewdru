<template>
  <UModal :open="isShowMainMenu">
    <template #header>
      <button class="sr-only" />
      <div class="flex flex-row w-full justify-between">
        <div class="flex-1">
          <slot name="back" />
        </div>
        <h2 class="flex-1 text-center text-highlighted font-semibold">
          <slot name="title" />
        </h2>
        <div class="flex-1">
          <slot name="close" />
        </div>
      </div>
    </template>
    <template #body>
      <AnimatedLoader :loading="!isRealtimeConnected">
        <UBreadcrumb
          :items="breadcrumbs"
          class="mb-2"
        >
          <template #item="{ active, item }">
            <UButton
              variant="link"
              :icon="item.icon"
              :disabled="active"
              @click="() => changePage(item.name)"
            >
              {{ item.label }}
            </UButton>
          </template>
        </UBreadcrumb>
        <div class="w-full">
          <component
            v-bind="{ ...(current?.props ?? {}), gameId, menuPath: currentPath }"
            :is="current?.component"
            @change-page="changePage"
          />
        </div>
      </AnimatedLoader>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'
import { useSseStore } from '~~/layers/core/app/stores/sse'
import { useGameMainMenuStore } from '../../stores/mainMenu'
import type { GameMenuPage } from '../../types/gameMenu'

const props = defineProps<{
  gameId: string
  menu: Record<string, GameMenuPage>
  initPath?: string
}>()

const sseStore = useSseStore()
const { isRealtimeConnected } = storeToRefs(sseStore)
const gameMainMenuStore = useGameMainMenuStore()
const { isShowMainMenu } = storeToRefs(gameMainMenuStore)
const menuKeys = Object.keys(props.menu)
const currentPath = ref(menuKeys.includes(props.initPath ?? '') ? (props.initPath ?? '') : (menuKeys.at(0) ?? ''))
const current = computed(() => props.menu[currentPath.value])
const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const parts = currentPath.value.split('.')

  return parts.map((_, index) => {
    const path = parts.slice(0, index + 1).join('.')
    const page = props.menu[path]
    return {
      ...(page?.breadcrumb ?? {}),
      disabled: path === currentPath.value
    }
  })
})

const changePage = (path: string | undefined) => {
  if (!path || !props.menu[path]) {
    return
  }
  currentPath.value = path
}
</script>
