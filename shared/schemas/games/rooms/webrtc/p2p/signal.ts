import { z } from 'zod/v4'

const rtcSessionDescriptionInitSchema = z.object({
  type: z.enum(['offer', 'answer', 'pranswer', 'rollback']),
  sdp: z.string().max(262144).optional()
})

export const sessionSignalSchema = z.object({
  kind: z.literal('session'),
  data: rtcSessionDescriptionInitSchema
})

const webRtcIceCandidateSchema = z.object({
  candidate: z.string().max(65535).optional(),
  sdpMid: z.string().max(255).nullable().optional(),
  sdpMLineIndex: z.number().int().min(0).max(65535).nullable().optional(),
  usernameFragment: z.string().min(4).max(256).nullable().optional()
})

export const iceSignalSchema = z.object({
  kind: z.literal('ice'),
  data: webRtcIceCandidateSchema
})

export const signalMessageSchema = z.discriminatedUnion('kind', [
  sessionSignalSchema,
  iceSignalSchema
])
export type SignalMessageSchema = z.infer<typeof signalMessageSchema>

export const signalBodySchema = z.object({
  toPeerRole: z.string().max(64),
  signal: signalMessageSchema
})
export type SignalBodySchema = z.infer<typeof signalBodySchema>
