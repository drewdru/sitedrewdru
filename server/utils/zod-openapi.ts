import { z } from 'zod/v4'

export function zodToOpenApiSchema(
  schema: z.ZodType
) {
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

function schemaObjectToParameters(
  schema?: z.core.JSONSchema.BaseSchema,
  location: 'query' | 'path' = 'query'
) {
  if (schema?.type !== 'object') {
    return []
  }

  const properties = schema.properties ?? {}
  const required = schema.required ?? []

  return Object.entries(properties).map(
    ([name, property]) => ({
      name,
      in: location,
      required: required.includes(name),
      schema: property
    })
  )
}

function schemaToRequestBody(
  schema?: z.core.JSONSchema.BaseSchema
) {
  if (!schema) {
    return undefined
  }

  return {
    required: true,
    content: {
      'application/json': {
        schema
      }
    }
  }
}

function schemaToResponses(
  responses?: Record<number, z.core.JSONSchema.BaseSchema>
) {
  if (!responses) {
    return undefined
  }

  return Object.fromEntries(
    Object.entries(responses).map(
      ([status, schema]) => [
        status,
        {
          description:
            Number(status) >= 200 && Number(status) < 300
              ? 'Success'
              : 'Error',
          content: {
            'application/json': {
              schema
            }
          }
        }
      ]
    )
  )
}

export interface ApiMetaInput {
  query?: z.core.JSONSchema.BaseSchema
  params?: z.core.JSONSchema.BaseSchema
  body?: z.core.JSONSchema.BaseSchema
  responses?: Record<number, z.core.JSONSchema.BaseSchema>
}
export function normalizeApiMeta(
  meta: ApiMetaInput
): ApiMeta {
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
    result.requestBody
      = schemaToRequestBody(meta.body)
  }

  if (meta.responses) {
    result.responses
      = schemaToResponses(meta.responses)
  }

  return result
}
