import type { SignalMessageSchema } from '~~/shared/schemas/games/rooms/webrtc/p2p/signal'
import type { WebRtcConnection } from '../../../types/webRtcManager'

export const handleIceSignal = async (
  connection: WebRtcConnection,
  signal: Extract<SignalMessageSchema, { kind: 'ice' }>
): Promise<void> => {
  if (!connection.peerConnection.remoteDescription) {
    connection.iceQueue.push(signal.data)
    return
  }
  try {
    await connection.peerConnection.addIceCandidate(signal.data)
  } catch (error) {
    console.error(error)
  }
}
