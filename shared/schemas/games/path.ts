import { z } from 'zod/v4'

export const gamesPathSchema = z.object({
  gameId: z.coerce.string().min(1).max(32).meta({
    description: 'Game Id',
    example: 'pong'
  })
})

export const roomPathSchema = gamesPathSchema.extend({
  roomId: z.coerce.string().min(8).max(8).meta({
    description: 'Room Id',
    example: '12ABC00D'
  })
})
