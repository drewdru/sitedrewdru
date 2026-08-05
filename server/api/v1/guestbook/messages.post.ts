import { bodySchema, guestbookMessageResponseSchema } from '~~/shared/schemas/guestbook/messages'

import { defineApiMeta } from '~~/server/utils/api-meta'
import { validateRequestBody } from '~~/server/utils/validators/body'
import { zodToOpenApiSchema } from '~~/server/utils/zod/zodToOpenApi'
import { validateRecaptcha } from '~~/server/utils/services/google/recaptcha'

export default defineEventHandler(async (event) => {
  const { name, message, contact, captcha } = await validateRequestBody(event, bodySchema)
  await validateRecaptcha(event, captcha)
  try {
    const data = await prisma.guestbookMessage.create({
      data: {
        name,
        message,
        contact,
        visitorId: event.context.visitor.id
      }
    })
    setResponseStatus(event, 201)
    return {
      ...data,
      editable: data.visitorId === `#${event.context.visitor.id.slice(0, 8)}`
    }
  } catch {
    throw internalServerError()
  }
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
      201: zodToOpenApiSchema(guestbookMessageResponseSchema)
    }
  }
)
