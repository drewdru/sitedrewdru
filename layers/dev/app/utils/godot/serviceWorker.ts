import type { Toast } from '@nuxt/ui/runtime/composables/useToast.js'

export const installServiceWorker = async (
  engine: any,
  t: (text: string) => string,
  showToast: (toast: Partial<Toast>) => Toast
) => {
  let serviceWorkerRegistrationPromise
  try {
    serviceWorkerRegistrationPromise = navigator.serviceWorker.getRegistration()
  } catch {
    serviceWorkerRegistrationPromise = Promise.reject(new Error('Service worker registration failed.'))
  }
  try {
    await Promise.race([
      serviceWorkerRegistrationPromise.then((registration) => {
        if (registration != null) {
          return Promise.reject(new Error('Service worker already exists.'))
        }
        return registration
      }).then(() => engine.installServiceWorker()),
      new Promise((resolve) => {
        setTimeout(() => resolve(''), 2000)
      })
    ])
    window.location.reload()
  } catch (err) {
    console.error('Error while registering service worker:', err)
    showToast({
      title: t('Error'),
      description: t('SomethingWentWrong'),
      color: 'error',
      icon: 'i-lucide-circle-alert'
    })
  }
}
