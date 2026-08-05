import { useAppStore } from '~~/layers/core/app/stores/app'
import { useVisitorStore } from '~~/layers/core/app/stores/visitor'

export default defineNuxtPlugin(() => {
  const appStore = useAppStore()
  appStore.hydrate()

  const visitorStore = useVisitorStore()
  visitorStore.hydrate()
})
