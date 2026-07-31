import { SUBDOMAIN_ROUTES, type Subdomain } from '~~/layers/core/app/composables/subdomainUrl'

export default defineEventHandler((event) => {
  if (event.method !== 'GET') {
    return
  }

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
  if (isInternalPath) {
    return
  }

  const url = getRequestURL(event)
  const subdomain = url.hostname.split('.').at(0) ?? ''
  const prefix = SUBDOMAIN_ROUTES[subdomain as Subdomain]
  if (!prefix) {
    return
  }

  let locale: string
  const localeMatch = event.path.match(
    new RegExp(`^/(${config.locales.join('|')})(/|$)`)
  )
  if (localeMatch) {
    locale = `/${localeMatch[1]}`
  } else {
    const cookieLocale = getCookie(event, 'i18n_redirected')
    locale = config.locales.includes(cookieLocale ?? '')
      ? `/${cookieLocale}`
      : `/${config.locales.at(0) ?? 'en'}`
  }

  const normalizedPath = localeMatch
    ? event.path.slice(locale.length) || '/'
    : event.path || '/'
  if (normalizedPath.startsWith(prefix)) {
    return
  }

  return sendRedirect(
    event,
    `${locale}${prefix}${normalizedPath}${url.search}`,
    302
  )
})