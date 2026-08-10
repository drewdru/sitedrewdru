import { constants } from 'node:http2'

import { redis } from '~~/server/utils/redis'
import { errorSchema } from '~~/shared/schemas/errors'
import type { WebRtcP2PSignal } from '~~/shared/types/sse/webrtc'
import { signalBodySchema } from '~~/shared/schemas/games/rooms/webrtc/p2p/signal'
import { roomPathSchema } from '~~/shared/schemas/games/path'
import type { P2PRoom } from '~~/server/types/p2p/room'

export default defineEventHandler(async (event) => {
  const { gameId, roomId } = await validateRouterParams(event, roomPathSchema)
  const { toPeerRole, signal } = await validateRequestBody(event, signalBodySchema)

  const roomString = await safeAwait(redis.get(getRoomKey(gameId, roomId)), undefined)
  const room = safeJsonParse<P2PRoom>(roomString)
  const recieverId = room?.[toPeerRole]
  if (!recieverId) {
    throw notFoundError('ROOM_NOT_FOUND')
  }
  if (recieverId === event.context.visitor.id) {
    throw conflictError('SELF_SENDED_MESSAGE')
  }
  const sender = Object.entries(room).find(entity => entity[1] === event.context.visitor.id)
  if (!sender) {
    throw notFoundError('ROOM_NOT_FOUND')
  }
  const [peerRole, _] = sender

  try {
    await redis.publish(
      `webrtc:p2p:signal:${recieverId}`,
      JSON.stringify({
        type: 'webrtc.p2p.signal',
        data: {
          gameId,
          roomId,
          peerRole,
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
    params: zodToOpenApiSchema(roomPathSchema),
    body: zodToOpenApiSchema(signalBodySchema),
    responses: {
      [constants.HTTP_STATUS_NO_CONTENT]: undefined,
      [constants.HTTP_STATUS_INTERNAL_SERVER_ERROR]: zodToOpenApiSchema(errorSchema),
      [constants.HTTP_STATUS_NOT_FOUND]: zodToOpenApiSchema(errorSchema)
    }
  }
)
