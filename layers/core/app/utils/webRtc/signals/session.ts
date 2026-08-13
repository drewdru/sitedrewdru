import type { SignalMessageSchema } from '~~/shared/schemas/games/rooms/webrtc/p2p/signal'
import type { WebRtcConnection } from '../../../types/webRtcManager'
import { fetchSendP2PSignal } from '~~/layers/dev/app/utils/api/games/rooms/sendSignal'

const addIceCandidates = async (connection: WebRtcConnection): Promise<void> => {
  while (connection.iceQueue.length > 0) {
    const candidate = connection.iceQueue.shift()
    if (candidate) {
      await connection.peerConnection.addIceCandidate(candidate)
    }
  }
}

export const handleSessionSignal = async (
  connection: WebRtcConnection,
  signal: Extract<SignalMessageSchema, { kind: 'session' }>
): Promise<void> => {
  await connection.peerConnection.setRemoteDescription({
    type: signal.data.type,
    sdp: signal.data.sdp
  })

  if (signal.data.type === 'offer') {
    const answer = await connection.peerConnection.createAnswer()
    await connection.peerConnection.setLocalDescription(answer)
    if (!connection.peerConnection.localDescription) {
      throw new Error(
        'Local description was not created'
      )
    }
    await addIceCandidates(connection)
    try {
      await fetchSendP2PSignal(
        connection.gameId,
        connection.roomId,
        {
          toPeerRole: connection.peerRole,
          signal: {
            kind: 'session',
            data: {
              type: 'answer',
              sdp: connection.peerConnection.localDescription.sdp
            }
          }
        }
      )
    } catch (error) {
      connection.closed = true
      throw error
    }
    return
  }
  await addIceCandidates(connection)
}
