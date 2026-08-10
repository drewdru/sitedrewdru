import { randomBytes } from 'node:crypto'
import { constants } from 'node:http2'

import { errorSchema } from '~~/shared/schemas/errors'
import { gamesPathSchema } from '~~/shared/schemas/games/path'
import { createRoomResponseSchema } from '~~/shared/schemas/games/rooms/create'

import { redis } from '~~/server/utils/redis'
import { getRoomKey } from '~~/server/utils/services/games/rooms'
import type { P2PRoom } from '~~/server/types/p2p/room'

export default defineEventHandler(async (event) => {
  const { gameId } = await validateRouterParams(event, gamesPathSchema)
  try {
    let roomId: string
    do {
      roomId = randomBytes(4).toString('hex').toUpperCase()
    } while (
      await redis.exists(getRoomKey(gameId, roomId))
    )
    await redis.set(
      getRoomKey(gameId, roomId),
      JSON.stringify({
        host: event.context.visitor.id
      } satisfies P2PRoom),
      'EX',
      600
    )
    setResponseStatus(event, constants.HTTP_STATUS_CREATED)
    return { roomId }
  } catch {
    throw internalServerError()
  }
})

defineRouteMeta({
  openAPI: {
    tags: ['API / v1 / games / {gameId} / rooms'],
    summary: 'Create game room',
    description: 'Returns roomId'
  }
})

defineApiMeta(
  'POST /api/v1/games/{gameId}/rooms',
  {
    params: zodToOpenApiSchema(gamesPathSchema),
    responses: {
      [constants.HTTP_STATUS_CREATED]: zodToOpenApiSchema(createRoomResponseSchema),
      [constants.HTTP_STATUS_INTERNAL_SERVER_ERROR]: zodToOpenApiSchema(errorSchema)
    }
  }
)
