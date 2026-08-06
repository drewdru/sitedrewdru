import { z } from 'zod/v4'

const sessionSignalSchema = z.object({
  kind: z.literal('session'),
  type: z.enum(['offer', 'answer']),
  sdp: z.string().max(64000)
})

const iceSignalSchema = z.object({
  kind: z.literal('ice'),
  media: z.string().max(64),
  index: z.number().int().min(0).max(255),
  name: z.string().max(256).optional()
})

export const signalMessageSchema = z.discriminatedUnion('kind', [
  sessionSignalSchema,
  iceSignalSchema
])

export const signalBodySchema = z.object({
  peerId: z.string().trim().min(9).max(9),
  signal: signalMessageSchema
})
