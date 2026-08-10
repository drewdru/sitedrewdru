import type { SignalBodySchema } from '~~/shared/schemas/games/rooms/webrtc/p2p/signal'

export const fetchSendP2PSignal = async (gameId: string, roomId: string, body: SignalBodySchema): Promise<void> => {
  const response = await fetch(`/api/v1/games/${gameId}/rooms/${roomId}/webrtc/p2p/signal`, {
    method: 'POST',
    body: JSON.stringify(body),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  await validateFetchResponse(response)
}
