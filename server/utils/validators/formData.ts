import type { H3Event } from 'h3'
import type { ZodType, z } from 'zod/v4'

import { formatZodErrors } from '../zod/formatErrors'
import { validationError } from '../errors'

type FormDataValue = string | {
  filename: string
  type?: string
  data: Buffer
}

async function readFormData(event: H3Event): Promise<Record<string, FormDataValue>> {
  const contentType = getHeader(event, 'content-type') || ''

  if (!contentType.includes('multipart/form-data')) {
    return await readBody(event)
  }

  const form = await readMultipartFormData(event)

  const data: Record<string, FormDataValue> = {}

  for (const field of form ?? []) {
    if (!field.name) {
      continue
    }

    if (field.filename) {
      data[field.name] = {
        filename: field.filename,
        type: field.type,
        data: field.data
      }
    } else {
      data[field.name] = field.data?.toString() ?? ''
    }
  }

  return data
}

export async function validateFormData<T extends ZodType>(
  event: H3Event,
  schema: T
): Promise<z.infer<T>> {
  const formData = await readFormData(event)

  const { data, error } = schema.safeParse(formData)

  if (error) {
    throw validationError('VALIDATION_ERROR', formatZodErrors(error))
  }

  return data
}
