import { constants } from 'node:http2'

import { bodySchema, guestbookMessageResponseSchema } from '~~/shared/schemas/guestbook/messages'
import { errorSchema } from '~~/shared/schemas/errors'

import { defineApiMeta } from '~~/server/utils/api-meta'
import { validateRequestBody } from '~~/server/utils/validators/body'
import { zodToOpenApiSchema } from '~~/server/utils/zod/zodToOpenApi'
import { validateRecaptcha } from '~~/server/utils/services/google/recaptcha'
import { sendGuestbookMessageToTelegram } from '~~/server/utils/services/telegram/notifications/guestBook/message'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
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
    event.context.visitor.data.name = name
    event.context.visitor.data.contact = contact
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
      [constants.HTTP_STATUS_OK]: zodToOpenApiSchema(guestbookMessageResponseSchema),
      [constants.HTTP_STATUS_INTERNAL_SERVER_ERROR]: zodToOpenApiSchema(errorSchema)
    }
  }
)
