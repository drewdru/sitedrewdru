import { editSchema, guestbookMessageResponseSchema } from '~~/shared/schemas/guestbook/messages'

import { defineApiMeta } from '~~/server/utils/api-meta'
import { validateRequestBody } from '~~/server/utils/validators/body'
import { zodToOpenApiSchema } from '~~/server/utils/zod/zodToOpenApi'
import { validateRecaptcha } from '~~/server/utils/services/google/recaptcha'
import { notFoundError } from '~~/server/utils/errors'
import { tryAwaitOrDefault } from '~~/shared/utils/tryAwaitOrDefault'

export default defineEventHandler(async (event) => {
  const { id, message, captcha } = await validateRequestBody(event, editSchema)
  await validateRecaptcha(event, captcha)
  const data = await tryAwaitOrDefault(prisma.guestbookMessage.update({
    where: {
      id,
      visitorId: event.context.visitor.id
    },
    data: {
      message
    }
  }), 'error')
  if (data === 'error') {
    throw internalServerError()
  }
  if (!data) {
    throw notFoundError()
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
