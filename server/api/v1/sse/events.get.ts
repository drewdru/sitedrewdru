import { createEventStream } from 'h3'
import { constants } from 'node:http2'

import { clients } from '~~/server/utils/webrtc/clients'
import { errorSchema } from '~~/shared/schemas/errors'

export default defineEventHandler((event) => {
  const stream = createEventStream(event)
  clients.set(event.context.visitor.publicId, stream)
  setInterval(async () => {
    await stream.push({
      event: 'ping',
      data: ''
    })
  }, 15000)
  stream.onClosed(() => {
    clients.delete(event.context.visitor.publicId)
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
