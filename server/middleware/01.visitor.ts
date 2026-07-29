import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

import { TWO_YEARS_IN_SCEOND } from '~~/shared/utils/constats/time'
import { safeJsonParse } from '~~/shared/utils/stringTransform'
import { forbiddenError } from '../utils/errors'

const generateVisitorData = (secret: string) => {
  const visitorId = randomBytes(32).toString('base64url')
  const signature = createHmac('sha256', secret)
    .update(`v1:${visitorId}`)
    .digest('base64url')
  return { visitorId, signature }
}

const getVisitorId = (
  visitor: string | undefined,
  secret: string
) => {
  if (!visitor) {
    throw forbiddenError('INVALID_SESSION')
  }
  const [visitorId, signature] = visitor.split('.')

  if (!visitorId || !signature) {
    throw forbiddenError('INVALID_SESSION')
  }

  const expected = createHmac('sha256', secret)
    .update(`v1:${visitorId}`)
    .digest('base64url')

  if (
    !timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expected)
    )
  ) {
    throw forbiddenError('INVALID_SESSION')
  }

  return visitorId
}

const getVisitorData = async (
  visitor: string | undefined,
  requestTime: number,
  rateLimitMs: number,
  maxRequestTries: number,
  visitorDataMaxAgeSeconds: number,
  secret: string
) => {
  const visitorId = getVisitorId(visitor, secret)
  const visitorStringData = await redis.get(visitorId)
  let visitorData = safeJsonParse<H3EventContext['visitor']['data']>(visitorStringData)
  visitorData ??= {
    lastRequestTime: Date.now(),
    badTries: 0
  }
  if (visitorData.banned) {
    throw forbiddenError('INVALID_SESSION')
  }
  if (requestTime > visitorData.lastRequestTime + rateLimitMs) {
    visitorData.badTries++
  }
  if (visitorData!.badTries > maxRequestTries) {
    await redis.set(
      visitorId,
      JSON.stringify({
        ...visitorData,
        banned: true,
        reason: 'rate-limit'
      } satisfies H3EventContext['visitor']['data']),
      'EX',
      visitorDataMaxAgeSeconds,
    )
    throw forbiddenError('INVALID_SESSION')
  }
  return { id: visitorId, data: visitorData }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  let visitor = getCookie(event, 'visitor')
  if (event.path.startsWith('/api/v')) {
    event.context.visitor = await getVisitorData(
      visitor,
      event.context.requestTime,
      config.rateLimit.defaultLimitMs,
      config.rateLimit.defaultMaxRequestTries,
      config.rateLimit.visitorDataMaxAgeSeconds,
      config.secret,
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
    ? { domain: config.domain }
    : {}),
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: TWO_YEARS_IN_SCEOND
  })
  await redis.set(
    visitorData.visitorId,
    JSON.stringify({
      lastRequestTime: event.context.requestTime,
      badTries: 0
    } satisfies H3EventContext['visitor']['data']),
    'EX',
    config.rateLimit.visitorDataMaxAgeSeconds,
  )
})
