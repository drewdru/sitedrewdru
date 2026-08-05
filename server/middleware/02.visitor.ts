import { TWO_YEARS_IN_SCEOND } from '~~/shared/utils/constats/time'
import { generateVisitorData, getVisitorData } from '../utils/services/visitor'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const visitor = getCookie(event, 'visitor')
  if (event.path.startsWith('/api/v')) {
    event.context.visitor = await getVisitorData(
      visitor,
      event.context.requestTime,
      config.rateLimit.defaultLimitMs,
      config.rateLimit.defaultMaxRequestTries,
      config.rateLimit.visitorDataMaxAgeSeconds,
      config.secret
    )
    return
  }

  const isInternalPath = event.path.startsWith('/api')
    || event.path.startsWith('/_')
    || [
      ...(config.isDebug ? [] : ['/docs']),
      '/docs/_openapi.json',
      '/robots.txt',
      '/sitemap_index.xml',
      '/sitemap.xml'
    ].includes(event.path)
  if (!!visitor || event.method !== 'GET' || isInternalPath) {
    return
  }
  const visitorData = generateVisitorData(config.secret)
  setCookie(event, 'visitor', `${visitorData.visitorId}.${visitorData.signature}`, {
    ...(config.environment === 'production'
      ? { secure: true, sameSite: 'lax', domain: config.domain }
      : {}),
    httpOnly: true,
    path: '/',
    maxAge: TWO_YEARS_IN_SCEOND
  })
  await redis.set(
    visitorData.visitorId,
    JSON.stringify({
      lastRequestTime: event.context.requestTime,
      badTries: 0,
      badRecaptchaTries: 0
    } satisfies H3EventContext['visitor']['data']),
    'EX',
    config.rateLimit.visitorDataMaxAgeSeconds
  )
})
