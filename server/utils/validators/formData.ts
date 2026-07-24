import type { H3Event } from 'h3'
import type { ZodType, z } from 'zod/v4'

export async function validateFormData<T extends ZodType>(
  event: H3Event,
  schema: T
): Promise<z.infer<T>> {
  const contentType = getHeader(event, 'content-type') || ''
  let formData: Record<string, string | File> = {}

  if (contentType.includes('multipart/form-data')) {
    const form = await readMultipartFormData(event)

    if (form) {
      for (const field of form) {
        if (!field.name) continue

        if (field.filename) {
          formData[field.name] = new File(
            [new Uint8Array(field.data)],
            field.filename,
            { type: field.type || 'application/octet-stream' }
          )
        } else {
          formData[field.name] = field.data?.toString() || ''
        }
      }
    }
  } else {
    formData = await readBody(event)
  }

  const { data, error } = schema.safeParse(formData)

  if (error) {
    const errors: Record<string, string> = {}

    for (const issue of error.issues) {
      const field = issue.path.join('.')

      if (field && !errors[field]) {
        errors[field] = issue.message
      }
    }

    throw Errors.validation('Invalid form data', { error, errors })
  }

  return data
}
