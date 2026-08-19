<template>
  <UModal
    :open="isShowMainMenu"
    :modal="false"
  >
    <template #header>
      <button class="sr-only" />
      <div class="flex flex-row w-full justify-between items-center">
        <div class="flex-1">
          <AppLogo :full="true" />
        </div>
        <h2 class="flex-1 text-center text-highlighted font-semibold">
          <slot name="title" />
        </h2>
        <div class="flex flex-1 justify-end">
          <ULocaleSelect
            variant="ghost"
            :model-value="locale"
            :locales="(locales as Locale<any>[])"
            :ui="{
              trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
            }"
            @update:model-value="setLocale($event as typeof locale)"
          />
        </div>
      </div>
    </template>
    <template #body>
      <AnimatedLoader :loading="!isHydrated">
        <UBreadcrumb
          :items="breadcrumbs"
          class="mb-2"
        >
          <template #item="{ active, item }">
            <UButton
              variant="link"
              :icon="item.icon"
              :disabled="active"
              @click="() => gameMainMenuStore.navigate(item.name)"
            >
              {{ item.label }}
            </UButton>
          </template>
        </UBreadcrumb>
        <div class="w-full">
          <KeepAlive>
            <component
              v-bind="{ ...(current?.props ?? {}), gameId }"
              :is="current?.component"
            />
          </KeepAlive>
        </div>
      </AnimatedLoader>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { BreadcrumbItem, Locale } from '@nuxt/ui'
import { useSseStore } from '~~/layers/core/app/stores/sse'
import { useGameMainMenuStore } from '../../stores/mainMenu'

const props = defineProps<{
  gameId: string
  initPath?: string
}>()
const { locale, setLocale, locales } = useI18n()

const sseStore = useSseStore()
const { isHydrated } = storeToRefs(sseStore)
const gameMainMenuStore = useGameMainMenuStore()
gameMainMenuStore.navigate(props.initPath)

const { isShowMainMenu, menu, currentPath } = storeToRefs(gameMainMenuStore)

const current = computed(() => menu.value?.[currentPath.value])
const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const parts = currentPath.value.split('.')
  return parts.map((_, index) => {
    const path = parts.slice(0, index + 1).join('.')
    const page = menu.value?.[path]
    return {
      ...(page?.breadcrumb ?? {}),
      disabled: path === currentPath.value
    }
  })
})
</script>
