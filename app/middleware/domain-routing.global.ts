import { SUBDOMAIN_ROUTES, type Subdomain } from '~~/layers/core/app/composables/subdomainUrl'

export default defineNuxtRouteMiddleware((to) => {
  const url = useRequestURL()
  const subdomain = url.hostname.split('.').at(0) ?? ''

  const prefix = SUBDOMAIN_ROUTES[subdomain as Subdomain]
  if (!prefix) {
    return
  }

  const localePath = useLocalePath()
  const i18n = useNuxtApp().$i18n as { locale?: { value?: string }, getLocale?: () => string } | undefined
  const locale = i18n?.locale?.value || i18n?.getLocale?.() || 'en'

  const normalized = to.fullPath.startsWith(`/${locale}`)
    ? to.fullPath.slice(`${locale}`.length + 1) || '/'
    : to.fullPath

  if (normalized.startsWith(prefix)) {
    return
  }
  return navigateTo(localePath(`${prefix}${normalized}`), { replace: true })
})
