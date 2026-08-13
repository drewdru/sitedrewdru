import type { Toast } from '@nuxt/ui/runtime/composables/useToast.js'
import { installServiceWorker } from '../../serviceWorker'

const GODOT_CONFIG = {
  executable: '/games/Pong/Pong'
}
const GODOT_THREADS_ENABLED = false

export const initGamePong = (params: {
  t: (text: string) => string
  showToast: (toast: Partial<Toast>) => Toast
  isGameLoading: Ref<boolean>
  setIsShowMainMenu: (value: boolean) => void
}) => {
  const script = document.createElement('script')
  script.src = '/games/Pong/Pong.js'
  document.head.appendChild(script)

  script.onload = async () => {
    // @ts-expect-error Engine loads here
    const engine = new Engine(GODOT_CONFIG)

    // @ts-expect-error Engine loads here
    const missing = Engine.getMissingFeatures({
      threads: GODOT_THREADS_ENABLED
    })

    if (missing.length !== 0) {
      if (GODOT_CONFIG['ensureCrossOriginIsolationHeaders'] && 'serviceWorker' in navigator) {
        await installServiceWorker(engine, params.t, params.showToast)
      } else {
        const missingMsg = 'Error\nThe following features required to run Godot projects on the Web are missing:\n'
        console.error(missingMsg + missing.join('\n'))
        params.showToast({
          title: params.t('Error'),
          description: `${params.t('YouBrowserNotSupportSomeFeatures')}: ${missing.join(',')}`,
          color: 'error',
          icon: 'i-lucide-circle-alert'
        })
      }
    } else {
      try {
        await engine.startGame()
        params.isGameLoading.value = false
        params.setIsShowMainMenu(true)
      } catch (error) {
        console.error(error)
        params.showToast({
          title: params.t('Error'),
          description: params.t('SomethingWentWrong'),
          color: 'error',
          icon: 'i-lucide-circle-alert'
        })
      }
    }
  }
}
