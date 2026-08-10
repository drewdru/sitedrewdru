import { z } from 'zod/v4'

export const createRoomResponseSchema = z.object({
  roomId: z.string()
})
export type CreateRoomResponseSchema = z.infer<typeof createRoomResponseSchema>
