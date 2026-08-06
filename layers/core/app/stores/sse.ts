import { defineStore } from 'pinia'
import type { ServerSentEvents } from '~~/shared/types/sse/index'

type SseBroadcastMessage
  = | {
    type: 'leader:heartbeat'
    timestamp: number
  }
  | {
    type: 'sse:event'
    data: string
  }

export const useSseStore = defineStore('sseStore', () => {
  const getHandler = useSseHandlers()
  const isLeader = ref(false)
  const isConnected = ref(false)

  let eventSource: EventSource | null = null
  let broadcastChannel: BroadcastChannel | null = null
  let heartbeatTimer: ReturnType<typeof setInterval> | null = null
  let monitorTimer: ReturnType<typeof setInterval> | null = null
  let lastHeartbeat = 0

  function init() {
    if (broadcastChannel) {
      return
    }

    broadcastChannel = new BroadcastChannel('app-sse')
    broadcastChannel.onmessage = (event: MessageEvent<SseBroadcastMessage>) => {
      const message = event.data
      switch (message.type) {
        case 'leader:heartbeat':
          lastHeartbeat = message.timestamp
          break
        case 'sse:event':
          handleEvent(message.data)
          break
        default:
          break
      }
    }

    lastHeartbeat = Date.now()
    startLeaderMonitor()
    tryBecomeLeader()
  }

  async function tryBecomeLeader() {
    if (!broadcastChannel || isLeader.value) {
      return
    }

    await navigator.locks.request(
      'app-sse-leader',
      {
        mode: 'exclusive',
        ifAvailable: true
      },
      async (lock) => {
        if (!lock || isLeader.value) {
          return
        }

        isLeader.value = true
        startSse()

        await new Promise<void>((resolve) => {
          const stop = () => {
            resolve()
          }
          window.addEventListener('beforeunload', stop, {
            once: true
          })
        })
      }
    )
  }

  function startSse() {
    eventSource = new EventSource('/api/v1/sse/events')
    eventSource.onopen = () => {
      isConnected.value = true
    }
    eventSource.onerror = () => {
      isConnected.value = false
    }
    eventSource.onmessage = (event) => {
      broadcastEvent(event.data)
    }
    startHeartbeat()
  }

  function broadcastEvent(data: string) {
    handleEvent(data)
    broadcastChannel?.postMessage({
      type: 'sse:event',
      data
    } satisfies SseBroadcastMessage)
  }

  function handleEvent(data: string) {
    const message = safeJsonParse<ServerSentEvents>(data)
    if (!message?.type) {
      return
    }
    const handler = getHandler(message.type)
    if (!handler) {
      return
    }
    handler(message)
  }

  function startHeartbeat() {
    heartbeatTimer = setInterval(() => {
      broadcastChannel?.postMessage({
        type: 'leader:heartbeat',
        timestamp: Date.now()
      } satisfies SseBroadcastMessage)
    }, 3000)
  }

  function startLeaderMonitor() {
    monitorTimer = setInterval(() => {
      if (isLeader.value) {
        return
      }
      const timeout = Date.now() - lastHeartbeat
      if (timeout > 10000) {
        tryBecomeLeader()
      }
    }, 3000)
  }

  function destroy() {
    eventSource?.close()
    eventSource = null
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer)
    }
    if (monitorTimer) {
      clearInterval(monitorTimer)
    }
    broadcastChannel?.close()
    broadcastChannel = null
  }

  return {
    init,
    destroy,
    isLeader,
    isConnected
  }
})
