import { createEventStream } from 'h3'
import { constants } from 'node:http2'

import { clients } from '~~/server/utils/webrtc/clients'

import { errorSchema } from '~~/shared/schemas/errors'
import type { SseConnectionPing, SseConnectionReplaced } from '~~/shared/types/sse/connection'

export default defineEventHandler(async (event) => {
  const stream = createEventStream(event)
  const oldStream = clients.get(event.context.visitor.publicId)
  if (oldStream) {
    await safeAwait(
      oldStream.push(JSON.stringify({
        type: 'sse.replaced'
      } satisfies SseConnectionReplaced)),
      undefined
    )
    await safeAwait(oldStream.close(), undefined)
  }

  clients.set(event.context.visitor.publicId, stream)
  const pingInterval = setInterval(async () => {
    await safeAwait(stream.push(JSON.stringify({
      type: 'sse.ping'
    } satisfies SseConnectionPing)), undefined)
  }, 15000)
  stream.onClosed(() => {
    clearInterval(pingInterval)
    if (clients.get(event.context.visitor.publicId) === stream) {
      clients.delete(event.context.visitor.publicId)
    }
  })
  return stream.send()
})

defineRouteMeta({
  openAPI: {
    tags: ['API / v1 / sse / events'],
    summary: 'Subscribe to SSE',
    description: 'Response SSE stream'
  }
})

defineApiMeta(
  'GET /api/v1/sse/events',
  {
    responses: {
      [constants.HTTP_STATUS_OK]: {
        content: {
          'text/event-stream': {
            schema: {
              description: 'Server-Sent Events stream',
              type: 'string',
              example: `event: ping\ndata:\n\n`
            }
          }
        }
      },
      [constants.HTTP_STATUS_INTERNAL_SERVER_ERROR]: zodToOpenApiSchema(errorSchema)
    }
  }
)
