import { z } from 'zod/v4'

import { GuestbookMessageSchema } from '~~/shared/generated/schemas/models'
import { paginationSchema } from '~~/shared/schemas/pagination'

export const DEFAULT_PAGE_SIZE = 10
export const querySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1).meta({
    description: 'A page number',
    example: 1
  }),
  pageSize: z.coerce.number().int().min(10).max(100).optional().default(DEFAULT_PAGE_SIZE).meta({
    description: 'Page size',
    example: 10
  })
})

export const bodySchema = z.object({
  name: z.string().trim().min(1).max(25).meta({
    description: 'Message author name',
    example: 'Anonymous'
  }),
  contact: z.string().trim().max(50).optional().meta({
    description: 'Message author contact',
    example: 'Anonymous'
  }),
  message: z.string().trim().min(1).max(500).meta({
    description: 'Guestbook message text',
    example: 'Hello from my guestbook!'
  }),
  captcha: z.string().trim().max(4096).optional().meta({
    description: 'Captcha token',
    example: '123qweasd'
  })
})
export type BodySchema = z.infer<typeof bodySchema>

export const editSchema = bodySchema.pick({
  message: true,
  captcha: true
}).extend({
  id: z.uuidv7()
})
export type EditSchema = z.infer<typeof editSchema>

export const guestbookMessageResponseSchema = GuestbookMessageSchema.extend({
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  editable: z.boolean()
})
export type GuestbookMessageResponseSchema = z.infer<typeof guestbookMessageResponseSchema>

export const responseGetSchema = z.object({
  data: z.array(guestbookMessageResponseSchema),
  pagination: paginationSchema
})
export type ResponseGetSchema = z.infer<typeof responseGetSchema>
