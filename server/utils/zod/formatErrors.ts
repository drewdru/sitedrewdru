import type { z } from 'zod/v4'

export const formatZodErrors = (error: z.ZodError) => ({
  errorCode: error.issues[0]?.code,
  errors: error.issues.map((issue) => ({
    name: issue.path.length ? issue.path.join('.') : undefined,
    message: issue.code
  }))
})
