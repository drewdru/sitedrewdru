export interface WebRtcConnection {
  gameId: string
  roomId: string
  peerRole: string
  ownerRole: string
  peerConnection: RTCPeerConnection
  state: RTCPeerConnectionState
  reconnectAttempt: number
  reconnectTimer?: ReturnType<typeof setTimeout>
  closed: boolean
  iceQueue: RTCIceCandidateInit[]
  dataChannels: {
    game?: RTCDataChannel
  }
  onDataChannel?: (connection: WebRtcConnection, channel: RTCDataChannel) => void
}

export interface WebRtcManagerInitConnectionOptions {
  gameId: string
  roomId: string
  peerRole: string
  ownerRole: string
  dataChannels?: {
    game?: RTCDataChannelInit
  }
  onDataChannel?: (connection: WebRtcConnection, channel: RTCDataChannel) => void
}
