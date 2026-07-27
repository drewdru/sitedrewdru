import { z } from 'zod/v4'

import { GuestbookMessageSchema } from '~~/shared/generated/schemas/models'
import { paginationSchema } from '~~/shared/schemas/pagination'
import { DEFAULT_PAGE_SIZE, querySchema } from '~~/shared/schemas/guestbook/messages'

import { defineApiMeta } from '~~/server/utils/api-meta'
import { validateRequestQuery } from '~~/server/utils/validators/query'
import { zodToOpenApiSchema } from '~~/server/utils/zod/zodToOpenApi'

export default defineCachedEventHandler(
  async (event) => {
    const { page, pageSize } = await validateRequestQuery(event, querySchema)
    const [messages, total] = await prisma.$transaction([
      prisma.guestbookMessage.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.guestbookMessage.count()
    ])
    const totalPages = Math.ceil(total / pageSize)
    return {
      data: messages,
      pagination: {
        page,
        pageSize,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    }
  },
  {
    maxAge: 5,
    staleMaxAge: 10,
    name: `guestbook_messages`,
    getKey: (event) => {
      const query = getQuery(event)
      const page = Number(query.page ?? 1)
      const pageSize = Number(query.pageSize ?? DEFAULT_PAGE_SIZE)
      return [
        `page:${page}`,
        `pageSize:${pageSize}`
      ].join(':')
    }
  }
)

defineRouteMeta({
  openAPI: {
    tags: ['API / v1 / guestbook / messages'],
    summary: 'Get guestbook messages',
    description: 'Returns messages for guestbook'
  }
})

defineApiMeta(
  'GET /api/v1/guestbook/messages',
  {
    query: zodToOpenApiSchema(querySchema),
    responses: {
      200: zodToOpenApiSchema(z.object({
        data: z.array(GuestbookMessageSchema),
        pagination: paginationSchema
      }))
    }
  }
)
