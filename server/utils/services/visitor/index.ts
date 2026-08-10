import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

import { safeJsonParse } from '~~/shared/utils/stringTransform'
import { forbiddenError } from '../../errors'

export const generateVisitorData = (secret: string) => {
  const visitorId = randomBytes(32).toString('base64url')
  const signature = createHmac('sha256', secret)
    .update(`v1:${visitorId}`)
    .digest('base64url')
  return { visitorId, signature }
}

export const getVisitorId = (
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

export const getVisitorData = async (
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
    badTries: 0,
    badRecaptchaTries: 0
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
      visitorDataMaxAgeSeconds
    )
    throw forbiddenError('INVALID_SESSION')
  }
  return {
    id: visitorId,
    publicId: `#${visitorId.slice(0, 8)}`,
    data: visitorData
  }
}
