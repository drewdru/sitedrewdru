import type { z } from 'zod/v4'
import type { OpenAPIV3 } from 'openapi-types'

export const schemaToResponses = (
  responses?: Record<number, z.core.JSONSchema.BaseSchema | undefined>
): OpenAPIV3.ResponsesObject | undefined => {
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
              schema: schema as OpenAPIV3.SchemaObject
            }
          }
        }
      ]
    )
  )
}
