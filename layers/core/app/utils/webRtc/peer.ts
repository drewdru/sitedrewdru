import { fetchSendP2PSignal } from '~~/layers/dev/app/utils/api/games/rooms/sendSignal'
import type { WebRtcConnection } from '../../types/webRtcManager'

export const createOffer = async (connection: WebRtcConnection): Promise<void> => {
  connection.state = 'connecting'
  const offer = await connection.peerConnection.createOffer()
  await connection.peerConnection.setLocalDescription(offer)
  if (!connection.peerConnection.localDescription) {
    throw new Error('Local description was not created')
  }
  await fetchSendP2PSignal(
    connection.gameId,
    connection.roomId,
    {
      toPeerRole: connection.peerRole,
      signal: {
        kind: 'session',
        data: {
          type: 'offer',
          sdp: connection.peerConnection.localDescription.sdp
        }
      }
    }
  )
}
