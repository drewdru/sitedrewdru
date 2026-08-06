import type { OpenAPIV3 } from 'openapi-types'
import { z } from 'zod/v4'
import { schemaObjectToParameters } from './schemaToParametrs'
import { schemaToRequestBody } from './schemaToBody'
import { schemaToResponses } from './schemaToResponses'

export const zodToOpenApiSchema = (
  schema: z.ZodType
) => {
  const jsonSchema = z.toJSONSchema(schema, {
    io: 'input',
    unrepresentable: 'any',
    override: (ctx) => {
      if (ctx.zodSchema._zod?.def?.type === 'date') {
        ctx.jsonSchema.type = 'string'
        ctx.jsonSchema.format = 'date-time'
      }
      if (ctx.zodSchema._zod?.def?.type === 'bigint') {
        ctx.jsonSchema.type = 'string'
        ctx.jsonSchema.pattern = '^[0-9]+$'
      }
    }
  })

  delete jsonSchema.$schema

  return jsonSchema
}

export interface ApiMetaInput {
  query?: z.core.JSONSchema.BaseSchema
  params?: z.core.JSONSchema.BaseSchema
  body?: z.core.JSONSchema.BaseSchema
  responses?: Record<number, OpenAPIV3.ResponseObject | z.core.JSONSchema.BaseSchema | undefined>
  security?: OpenAPIV3.SecurityRequirementObject[]
}

export const normalizeApiMeta = (
  meta: ApiMetaInput
): ApiMeta => {
  const result: ApiMeta = {}

  if (meta.query) {
    result.parameters = [
      ...(result.parameters ?? []),
      ...schemaObjectToParameters(
        meta.query,
        'query'
      )
    ]
  }

  if (meta.params) {
    result.parameters = [
      ...(result.parameters ?? []),
      ...schemaObjectToParameters(
        meta.params,
        'path'
      )
    ]
  }

  if (meta.body) {
    result.requestBody = schemaToRequestBody(meta.body)
  }

  if (meta.responses) {
    result.responses = schemaToResponses(meta.responses)
  }

  if (meta.security) {
    result.security = meta.security
  }

  return result
}
