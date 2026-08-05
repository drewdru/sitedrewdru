import { constants } from 'node:http2'

import { responseGetSelfSchema } from '~~/shared/schemas/visitor'

import { defineApiMeta } from '~~/server/utils/api-meta'
import { zodToOpenApiSchema } from '~~/server/utils/zod/zodToOpenApi'

export default defineEventHandler(async (event) => {
  return {
    name: event.context.visitor.data.name,
    contact: event.context.visitor.data.contact
  }
})

defineRouteMeta({
  openAPI: {
    tags: ['API / v1 / visitor'],
    summary: 'Get visitor self data',
    description: 'Response saved visitor data'
  }
})

defineApiMeta(
  'GET /api/v1/visitor',
  {
    responses: {
      [constants.HTTP_STATUS_OK]: zodToOpenApiSchema(responseGetSelfSchema)
    }
  }
)
