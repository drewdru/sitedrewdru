import { editSchema, guestbookMessageResponseSchema } from '~~/shared/schemas/guestbook/messages'

import { defineApiMeta } from '~~/server/utils/api-meta'
import { validateRequestBody } from '~~/server/utils/validators/body'
import { zodToOpenApiSchema } from '~~/server/utils/zod/zodToOpenApi'
import { validateRecaptcha } from '~~/server/utils/services/google/recaptcha'

export default defineEventHandler(async (event) => {
  const { id, message, captcha } = await validateRequestBody(event, editSchema)
  await validateRecaptcha(event, captcha)
  const data = await prisma.guestbookMessage.update({
    where: {
      id,
      visitorId: event.context.visitor.id
    },
    data: {
      message
    }
  })
  if (!data) {
    throw forbiddenError('FORBIDDEN_ERROR')
  }
  setResponseStatus(event, 204)
  return {
    ...data,
    editable: data.visitorId === `#${event.context.visitor.id.slice(0, 8)}`
  }
})

defineRouteMeta({
  openAPI: {
    tags: ['API / v1 / guestbook / messages'],
    summary: 'Edit guestbook message',
    description: 'Update a guestbook message'
  }
})

defineApiMeta(
  'PATCH /api/v1/guestbook/messages',
  {
    body: zodToOpenApiSchema(editSchema),
    responses: {
      201: zodToOpenApiSchema(guestbookMessageResponseSchema)
    }
  }
)
