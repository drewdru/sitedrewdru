import { constants } from 'node:http2'

import { editSchema, guestbookMessageResponseSchema } from '~~/shared/schemas/guestbook/messages'
import { errorSchema } from '~~/shared/schemas/errors'
import { safeAwait } from '~~/shared/utils/safeAwait'

import { defineApiMeta } from '~~/server/utils/api-meta'
import { validateRequestBody } from '~~/server/utils/validators/body'
import { zodToOpenApiSchema } from '~~/server/utils/zod/zodToOpenApi'
import { validateRecaptcha } from '~~/server/utils/services/google/recaptcha'
import { notFoundError } from '~~/server/utils/errors'
import { sendGuestbookMessageToTelegram } from '~~/server/utils/services/telegram/notifications/guestBook/message'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { id, message, captcha } = await validateRequestBody(event, editSchema)
  await validateRecaptcha(event, captcha)
  const data = await safeAwait(
    prisma.guestbookMessage.update({
      where: {
        id,
        visitorId: event.context.visitor.id
      },
      data: {
        message
      }
    }),
    'error' as const
  )
  if (data === 'error') {
    throw internalServerError()
  }
  if (!data) {
    throw notFoundError()
  }
  await safeAwait(sendGuestbookMessageToTelegram({
    adminId: config.telegram.adminId,
    contact: data.contact ?? '',
    message: data.message,
    messageId: data.id,
    name: data.name,
    visitorId: event.context.visitor.id
  }), undefined)
  setResponseStatus(event, constants.HTTP_STATUS_OK)
  return {
    ...data,
    editable: data.visitorId === event.context.visitor.publicId
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
      [constants.HTTP_STATUS_OK]: zodToOpenApiSchema(guestbookMessageResponseSchema),
      [constants.HTTP_STATUS_INTERNAL_SERVER_ERROR]: zodToOpenApiSchema(errorSchema),
      [constants.HTTP_STATUS_NOT_FOUND]: zodToOpenApiSchema(errorSchema)
    }
  }
)
