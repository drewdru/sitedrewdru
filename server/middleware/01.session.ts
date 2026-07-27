import { randomBytes } from 'node:crypto'

import { safeJsonParse } from '~~/shared/utils/stringTransform'
import { forbiddenError } from '../utils/errors'

const getSessionData = async (
  sid: string | undefined,
  requestTime: number,
  rateLimitMs: number,
  maxRequestTries: number
) => {
  if (!sid) {
    throw forbiddenError('Invalid session')
  }
  const sidStringData = await redis.get(sid)
  const sessionData = safeJsonParse<H3EventContext['sessionData']>(sidStringData)
  if (!sessionData) {
    throw forbiddenError('Invalid session')
  }
  if (requestTime > sessionData!.lastRequestTime + rateLimitMs) {
    sessionData!.badTries++
  }
  if (sessionData!.badTries > maxRequestTries) {
    await redis.del(sid!)
    throw forbiddenError('Invalid session')
  }
  return sessionData
}

export default defineEventHandler({
  onBeforeResponse: async (event) => {
    if (
      !event.path.startsWith('/api/v')
      || event.node.res.statusCode < 200
      || event.node.res.statusCode >= 300
    ) {
      return
    }
    const badTries = Math.max(0, (event.context.sessionData?.badTries ?? 0) - 1)
    await redis.set(
      event.context.sessionId,
      JSON.stringify({
        lastRequestTime: event.context.requestTime,
        badTries
      } satisfies H3EventContext['sessionData']),
      'KEEPTTL',
      'XX'
    )
  },
  handler: async (event) => {
    const config = useRuntimeConfig()
    let sid = getCookie(event, 'sid')
    if (event.path.startsWith('/api/v')) {
      event.context.sessionData = await getSessionData(
        sid,
        event.context.requestTime,
        config.defaultRateLimitMs,
        config.defaultMaxRequestTries
      )
      event.context.sessionId = sid!
      return
    }

    if (
      !!sid
      || event.method !== 'GET'
      || event.path.startsWith('/api')
      || event.path.startsWith('/_')
      || [
        ...(config.isDebug ? [] : ['/docs']),
        '/docs/_openapi.json',
        '/robots.txt',
        '/sitemap_index.xml',
        '/sitemap.xml'
      ].includes(event.path)
    ) {
      return
    }

    sid = randomBytes(32).toString('hex')
    setCookie(event, 'sid', sid, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: config.sessionMaxAgeSeconds
    })
    await redis.set(
      sid,
      JSON.stringify({
        lastRequestTime: event.context.requestTime,
        badTries: 0
      } satisfies H3EventContext['sessionData']),
      'EX',
      config.sessionMaxAgeSeconds,
      'NX'
    )
  }
})
