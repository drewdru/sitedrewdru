import type { SignalMessageSchema } from '~~/shared/schemas/webrtc/p2p/signal'

export interface WebRtcP2PPeerJoined {
  type: 'webrtc.p2p.peer_joined'
  data: {
    gameId: string
    roomId: string
    peerId: string
  }
}

export interface WebRtcP2PSignal {
  type: 'webrtc.p2p.signal'
  data: {
    signal: SignalMessageSchema
  }
}
