import type { H3Event } from 'h3'
import type { ZodType, z } from 'zod/v4'

export async function validateRequestBody<T extends ZodType>(
  event: H3Event,
  schema: T
): Promise<z.infer<T>> {
  const { data, error } = await readValidatedBody(event, schema.safeParse)

  if (error) {
    const errors: Record<string, string> = {}

    for (const issue of error.issues) {
      const field = issue.path.join('.')

      if (field && !errors[field]) {
        errors[field] = issue.message
      }
    }

    throw Errors.validation('Invalid request body', { error, errors })
  }

  return data
}
