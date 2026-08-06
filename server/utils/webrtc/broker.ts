import { redis } from '../redis'
import { onWebRtcP2PSignal } from './handlers/p2pSignal'

const subscriber = redis.duplicate()

const handlers = {
  'webrtc:p2p:signal:*': onWebRtcP2PSignal
} satisfies Record<string, (visitorPublicId: string, message: string) => Promise<void>>
type HandlerKeys = keyof typeof handlers

const onMessage = async (
  pattern: HandlerKeys,
  channel: string,
  message: string
) => {
  const handler = handlers[pattern]
  if (!handler) {
    return
  }
  const visitorPublicId = channel.slice(pattern.length - 1)
  await safeAwait(handler(visitorPublicId, message), undefined)
}

let initialized = false
export const initWebRtcBroker = async () => {
  if (initialized) {
    return
  }
  initialized = true

  subscriber.on('error', (error) => {
    console.error('[WebRTC Redis subscriber]', error)
  })
  subscriber.on('pmessage', onMessage)
  await subscriber.psubscribe(...Object.keys(handlers))
}
