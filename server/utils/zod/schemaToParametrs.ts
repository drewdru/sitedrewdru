import type { z } from 'zod/v4'
import type { OpenAPIV3 } from 'openapi-types'

export const schemaObjectToParameters = (
  schema?: z.core.JSONSchema.BaseSchema,
  location: 'query' | 'path' = 'query'
): OpenAPIV3.ParameterObject[] => {
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
      schema: property as OpenAPIV3.SchemaObject
    })
  )
}
