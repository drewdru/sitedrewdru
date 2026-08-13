import type { Toast } from '@nuxt/ui/runtime/composables/useToast.js'

export const setupGameBridge = (params: {
  t: (text: string) => string
  showToast: (toast: Partial<Toast>) => Toast
  setIsShowMainMenu: (value: boolean) => void
}) => {
  window.__godotWebGameBridgeSetMenuVisibility = (value: boolean) => {
    params.setIsShowMainMenu(value)
  }
  window.__godotWebGameBridgeNotify = (key: string) => {
    params.showToast({
      title: params.t('Notification'),
      description: params.t(key),
      color: 'error',
      icon: 'i-lucide-circle-alert'
    })
  }
}
