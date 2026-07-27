import type { H3Event } from 'h3'
import type { ZodType, z } from 'zod/v4'
import { formatZodErrors } from '../zod/formatErrors'
import { validationError } from '../errors'

export async function validateRequestQuery<T extends ZodType>(
  event: H3Event,
  schema: T
): Promise<z.infer<T>> {
  const { data, error } = await getValidatedQuery(event, schema.safeParse)
  if (error) {
    throw validationError('Invalid query parameters', formatZodErrors(error))
  }
  return data
}
