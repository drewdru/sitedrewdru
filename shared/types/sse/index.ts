import type { SseConnectionReplaced, SseConnectionPing } from './connection'
import type { WebRtcP2PPeerJoined, WebRtcP2PSignal } from './webrtc'

export type ServerSentEvents = SseConnectionReplaced
  | SseConnectionPing
  | WebRtcP2PPeerJoined
  | WebRtcP2PSignal
