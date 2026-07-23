import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', () => {
  const isHydrated = ref<boolean>(false)
  function hydrate() {
    isHydrated.value = true
  }
  return {
    isHydrated,
    hydrate
  }
})
