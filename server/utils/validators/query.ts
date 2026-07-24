import type { H3Event } from 'h3'
import type { ZodType, z } from 'zod/v4'

export async function validateRequestQuery<T extends ZodType>(
  event: H3Event,
  schema: T
): Promise<z.infer<T>> {
  const query = getQuery(event)
  const { data, error } = schema.safeParse(query)

  if (error) {
    const errors: Record<string, string> = {}

    for (const issue of error.issues) {
      const field = issue.path.join('.')

      if (field && !errors[field]) {
        errors[field] = issue.message
      }
    }

    throw Errors.validation('Invalid query parameters', { error, errors })
  }

  return data
}
