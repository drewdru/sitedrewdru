import { GuestbookMessageSchema } from '~~/shared/generated/schemas/models'
import { bodySchema } from '~~/shared/schemas/guestbook/messages'

import { defineApiMeta } from '~~/server/utils/api-meta'
import { validateRequestBody } from '~~/server/utils/validators/body'
import { zodToOpenApiSchema } from '~~/server/utils/zod/zodToOpenApi'

export default defineEventHandler(async (event) => {
  const { name, message, contact } = await validateRequestBody(event, bodySchema)

  const data = await prisma.guestbookMessage.create({
    data: {
      name,
      message,
      contact
    }
  })
  setResponseStatus(event, 201)
  return data
})

defineRouteMeta({
  openAPI: {
    tags: ['API / v1 / guestbook / messages'],
    summary: 'Create guestbook message',
    description: 'Creates a new guestbook message'
  }
})

defineApiMeta(
  'POST /api/v1/guestbook/messages',
  {
    body: zodToOpenApiSchema(bodySchema),
    responses: {
      201: zodToOpenApiSchema(GuestbookMessageSchema)
    }
  }
)
