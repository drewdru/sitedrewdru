import type { SignalMessageSchema } from '~~/shared/schemas/games/rooms/webrtc/p2p/signal'

export interface WebRtcP2PPeerJoined {
  type: 'webrtc.p2p.peer_joined'
  data: {
    gameId: string
    roomId: string
    peerRole: string
  }
}

export interface WebRtcP2PSignal {
  type: 'webrtc.p2p.signal'
  data: {
    gameId: string
    roomId: string
    peerRole: string
    signal: SignalMessageSchema
  }
}
