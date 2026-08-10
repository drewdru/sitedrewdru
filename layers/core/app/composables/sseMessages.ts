import type { ServerSentEvents } from '~~/shared/types/sse'
import { useWebRtcStore } from '../stores/webRtc'

type SseHandlerMap = {
  [E in ServerSentEvents as E['type']]:
  (message: E) => Promise<void>
}

export const useSseHandlers = (t: (text: string, namedValue?: Record<string, unknown>) => string) => {
  const toast = useToast()
  const webRtcStore = useWebRtcStore()
  const sseHandlers = {
    'sse.ping': async () => {},
    'sse.replaced': async () => {},
    'webrtc.p2p.peer_joined': async (message) => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        await webRtcStore.connect(message.data)
      } catch (error) {
        console.error(error)
        toast.add({
          title: t('Error'),
          description: t('ErrorOnConnectWithPeer', { peerRole: message.data.peerRole }),
          color: 'error',
          icon: 'i-lucide-circle-alert'
        })
      }
    },
    'webrtc.p2p.signal': async (message) => {
      try {
        await webRtcStore.handleSignal(message.data)
      } catch (error) {
        console.error(error)
        toast.add({
          title: t('Error'),
          description: t('ErrorOnConnectWithPeer', { peerRole: message.data.peerRole }),
          color: 'error',
          icon: 'i-lucide-circle-alert'
        })
      }
    }
  } satisfies SseHandlerMap

  return <T extends ServerSentEvents['type']>(type: T) => {
    return sseHandlers[type] as (
      message: Extract<ServerSentEvents, { type: T }>
    ) => Promise<void>
  }
}
