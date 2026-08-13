import { fetchSendP2PSignal } from '~~/layers/dev/app/utils/api/games/rooms/sendSignal'
import type { WebRtcConnection } from '../../types/webRtcManager'

export const clearReconnectTimer = (connection: WebRtcConnection): void => {
  if (connection.reconnectTimer) {
    clearTimeout(connection.reconnectTimer)
    connection.reconnectTimer = undefined
  }
}

export const restartIce = async (connection: WebRtcConnection): Promise<void> => {
  if (connection.closed || connection.reconnectAttempt > 10) {
    connection.closed = true
    return
  }
  try {
    const offer = await connection.peerConnection.createOffer({ iceRestart: true })
    await connection.peerConnection.setLocalDescription(offer)
    if (!connection.peerConnection.localDescription) {
      throw new Error(
        'Local description was not created'
      )
    }
    try {
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
    } catch (error) {
      connection.closed = true
      throw error
    }
  } catch {
    scheduleReconnect(connection)
  }
}

export const scheduleReconnect = (connection: WebRtcConnection): void => {
  if (connection.closed || connection.reconnectTimer) {
    return
  }
  const delay = Math.min(1000 * Math.pow(2, connection.reconnectAttempt), 30000)
  connection.reconnectTimer = setTimeout(() => {
    connection.reconnectTimer = undefined
    if (connection.closed) {
      return
    }
    connection.reconnectAttempt++
    restartIce(connection)
  }, delay)
}
