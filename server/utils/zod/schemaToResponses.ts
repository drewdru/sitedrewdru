import type { z } from 'zod/v4'
import type { OpenAPIV3 } from 'openapi-types'

export const schemaToResponses = (
  responses?: Record<number, OpenAPIV3.ResponseObject | z.core.JSONSchema.BaseSchema | undefined>
): OpenAPIV3.ResponsesObject | undefined => {
  if (!responses) {
    return undefined
  }

  return Object.fromEntries(
    Object.entries(responses).map(
      ([status, schema]) => {
        return [
          status,
          {
            description:
              Number(status) >= 200 && Number(status) < 300
                ? 'Success'
                : 'Error',
            content: schema?.content as {
              [media: string]: OpenAPIV3.MediaTypeObject
            } | undefined ?? {
              'application/json': {
                schema: schema as OpenAPIV3.SchemaObject
              }
            }
          }
        ]
      }
    )
  )
}
