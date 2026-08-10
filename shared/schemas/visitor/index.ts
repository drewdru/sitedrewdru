import { z } from 'zod/v4'

export const responseGetSelfSchema = z.object({
  name: z.string(),
  contact: z.string()
})
export type ResponseGetSelfSchema = z.infer<typeof responseGetSelfSchema>
