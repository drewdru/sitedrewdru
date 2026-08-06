import { useAppStore } from '~~/layers/core/app/stores/app'
import { useSseStore } from '~~/layers/core/app/stores/sse'
import { useVisitorStore } from '~~/layers/core/app/stores/visitor'

export default defineNuxtPlugin(() => {
  const appStore = useAppStore()
  appStore.hydrate()

  const sseStore = useSseStore()
  const visitorStore = useVisitorStore()
  visitorStore.hydrate(sseStore.init)
})
