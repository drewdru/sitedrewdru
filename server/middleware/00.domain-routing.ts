import { SUBDOMAIN_ROUTES, type Subdomain } from '~~/layers/core/app/composables/subdomainUrl'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const isInternalPath = event.path.startsWith('/api')
    || event.path.startsWith('/_')
    || [
      ...(config.isDebug ? [] : ['/docs']),
      '/docs/_openapi.json',
      '/robots.txt',
      '/sitemap_index.xml',
      '/sitemap.xml'
    ].includes(event.path)
  if (event.method !== 'GET' || isInternalPath) {
    return
  }

  const url = getRequestURL(event)
  const subdomain = url.hostname.split('.').at(0) ?? ''
  const prefix = SUBDOMAIN_ROUTES[subdomain as Subdomain]
  if (!prefix) {
    return
  }

  const localeMatch = event.path.match(
    new RegExp(`^/(${config.locales.join('|')})(/|$)`)
  )
  const locale = localeMatch ? `/${localeMatch[1]}` : `/${getCookie(event, 'i18n_redirected') || 'en'}`
  const path = localeMatch
    ? event.path.slice(locale.length) || '/'
    : event.path || '/'
  if (path.startsWith(prefix)) {
    return
  }

  return sendRedirect(event, `${locale}${prefix}${path}${url.search}`, 302)
})