import type { ServerSentEvents } from '~~/shared/types/sse'

type SseHandlerMap = {
  [E in ServerSentEvents as E['type']]:
  (message: E) => Promise<void>
}

export const useSseHandlers = () => {
  const sseHandlers = {
    'sse.ping': async () => {},
    'sse.replaced': async () => {},
    'webrtc.p2p.peer_joined': async () => {},
    'webrtc.p2p.signal': async () => {}
  } satisfies SseHandlerMap

  return <T extends ServerSentEvents['type']>(type: T) => {
    return sseHandlers[type] as (
      message: Extract<ServerSentEvents, { type: T }>
    ) => Promise<void>
  }
}
