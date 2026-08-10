import { constants } from 'node:http2'

import { roomPathSchema } from '~~/shared/schemas/games/path'
import { safeAwait } from '~~/shared/utils/safeAwait'
import { errorSchema } from '~~/shared/schemas/errors'
import type { WebRtcP2PPeerJoined } from '~~/shared/types/sse/webrtc'

import { redis } from '~~/server/utils/redis'
import { conflictError, notFoundError } from '~~/server/utils/errors'
import { getRoomKey } from '~~/server/utils/services/games/rooms'
import type { P2PRoom } from '~~/server/types/p2p/room'
import { safeJsonParse } from '~~/shared/utils/stringTransform'

export default defineEventHandler(async (event) => {
  const { gameId, roomId } = await validateRouterParams(event, roomPathSchema)

  const exists = await safeAwait(redis.exists(getRoomKey(gameId, roomId)), undefined)
  if (!exists) {
    throw notFoundError('ROOM_NOT_FOUND')
  }

  const roomString = await safeAwait(redis.get(getRoomKey(gameId, roomId)), undefined)
  const room = safeJsonParse<P2PRoom>(roomString)
  if (!room) {
    throw notFoundError('ROOM_NOT_FOUND')
  }
  if (room.client) {
    throw conflictError('ROOM_IS_FULL')
  }
  if (room.host === event.context.visitor.id) {
    throw conflictError('ROOM_IS_YOURS')
  }

  try {
    await redis.set(
      getRoomKey(gameId, roomId),
      JSON.stringify({
        ...room,
        client: event.context.visitor.id
      } satisfies P2PRoom),
      'EX',
      600
    )
    await redis.publish(
      `webrtc:p2p:signal:${room.host}`,
      JSON.stringify({
        type: 'webrtc.p2p.peer_joined',
        data: { gameId, roomId, peerRole: 'client' }
      } satisfies WebRtcP2PPeerJoined)
    )
    setResponseStatus(event, constants.HTTP_STATUS_NO_CONTENT)
  } catch {
    throw internalServerError()
  }
})

defineRouteMeta({
  openAPI: {
    tags: ['API / v1 / games / {gameId} / rooms / {roomId}'],
    summary: 'Join game room',
    description: 'Connect visitor to game room. Inform host that someone joined.'
  }
})

defineApiMeta(
  'POST /api/v1/games/{gameId}/rooms/{roomId}/join',
  {
    params: zodToOpenApiSchema(roomPathSchema),
    responses: {
      [constants.HTTP_STATUS_NO_CONTENT]: undefined,
      [constants.HTTP_STATUS_INTERNAL_SERVER_ERROR]: zodToOpenApiSchema(errorSchema),
      [constants.HTTP_STATUS_NOT_FOUND]: zodToOpenApiSchema(errorSchema),
      [constants.HTTP_STATUS_CONFLICT]: zodToOpenApiSchema(errorSchema)
    }
  }
)
