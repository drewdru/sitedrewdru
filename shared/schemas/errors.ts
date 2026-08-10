import { z } from 'zod/v4'

export const errorSchema = z.object({
  statusCode: z.number(),
  statusMessage: z.string(),
  data: z.object({
    timestamp: z.string(),
    errorCode: z.string(),
    errors: z.array(z.object({
      name: z.string().optional(),
      message: z.string()
    })).optional()
  })
})
