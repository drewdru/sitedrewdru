import { clients } from '../clients'

export const onWebRtcP2PSignal = async (visitorPublicId: string, message: string) => {
  const stream = clients.get(visitorPublicId)
  if (!stream) {
    return
  }
  await stream.push({
    event: 'message',
    data: message
  })
}
