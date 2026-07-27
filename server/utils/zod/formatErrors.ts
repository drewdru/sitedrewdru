import type { z } from 'zod/v4'

export const formatZodErrors = (error: z.ZodError) => {
  const errors: Record<string, string> = {}
  let errorCode: string | undefined

  for (const issue of error.issues) {
    if (!errorCode) {
      errorCode = issue.code
    }
    const field = issue.path.join('.')
    if (field && !(field in errors)) {
      errors[field] = issue.code
    }
  }
  return { errorCode, errors }
}
