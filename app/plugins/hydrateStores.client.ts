import { useAppStore } from '~~/layers/core/app/stores/app'

export default defineNuxtPlugin(() => {
  const appStore = useAppStore()
  appStore.hydrate()
})
