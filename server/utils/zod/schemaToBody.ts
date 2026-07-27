import type { z } from 'zod/v4'
import type { OpenAPIV3 } from 'openapi-types'

export const schemaToRequestBody = (
  schema?: z.core.JSONSchema.BaseSchema
): OpenAPIV3.RequestBodyObject | undefined => {
  if (!schema) {
    return undefined
  }

  return {
    required: true,
    content: {
      'application/json': {
        schema: schema as OpenAPIV3.SchemaObject
      }
    }
  }
}
