import { constants } from 'node:http2'

import { redis } from '~~/server/utils/redis'
import { errorSchema } from '~~/shared/schemas/errors'
import type { WebRtcP2PSignal } from '~~/shared/types/sse/webrtc'
import { signalBodySchema } from '~~/shared/schemas/webrtc/p2p/signal'

export default defineEventHandler(async (event) => {
  const { peerId, signal } = await validateRequestBody(event, signalBodySchema)

  if (peerId === event.context.visitor.publicId) {
    throw validationError()
  }
  const exists = await safeAwait(redis.exists(`webrtc:p2p:signal:${peerId}`), undefined)
  if (!exists) {
    throw notFoundError()
  }

  try {
    await redis.publish(
      `webrtc:p2p:signal:${peerId}`,
      JSON.stringify({
        type: 'webrtc.p2p.signal',
        data: {
          signal: signal
        }
      } satisfies WebRtcP2PSignal)
    )
    setResponseStatus(event, constants.HTTP_STATUS_NO_CONTENT)
  } catch {
    throw internalServerError()
  }
})

defineRouteMeta({
  openAPI: {
    tags: ['API / v1 / webrtc / p2p'],
    summary: 'Send signal to peer',
    description: 'Start P2P connection via WebRTC',
    externalDocs: {
      description: 'Implementation details',
      url: 'https://github.com/drewdru/sitedrewdru/blob/main/docs/webrtc/p2p.md'
    }
  }
})

defineApiMeta(
  'POST /api/v1/webrtc/p2p/signal',
  {
    body: zodToOpenApiSchema(signalBodySchema),
    responses: {
      [constants.HTTP_STATUS_NO_CONTENT]: undefined,
      [constants.HTTP_STATUS_INTERNAL_SERVER_ERROR]: zodToOpenApiSchema(errorSchema),
      [constants.HTTP_STATUS_NOT_FOUND]: zodToOpenApiSchema(errorSchema)
    }
  }
)
