import { defineStore } from 'pinia'
import type { ServerSentEvents } from '~~/shared/types/sse/index'

type SseBroadcastMessage
  = | {
    type: 'leader:heartbeat'
    timestamp: number
  }
  | {
    type: 'tab:ping'
  }
  | {
    type: 'sse:event'
    message: ServerSentEvents
  }

export const useSseStore = defineStore('sseStore', () => {
  const { $i18n } = useNuxtApp()
  const getHandler = useSseHandlers($i18n.t)
  const isLeader = ref(false)
  const isRealtimeConnected = ref(false)
  const isHydrated = ref(false)

  let eventSource: EventSource | null = null
  let broadcastChannel: BroadcastChannel | null = null
  let heartbeatTimer: ReturnType<typeof setInterval> | null = null
  let monitorTimer: ReturnType<typeof setInterval> | null = null
  let lastHeartbeat = 0
  let hasOtherTabs = false

  function startTimers() {
    if (!monitorTimer) {
      startLeaderMonitor()
    }
    if (isLeader.value && !heartbeatTimer) {
      startHeartbeat()
    }
  }

  function hydrate() {
    if (broadcastChannel) {
      return
    }

    broadcastChannel = new BroadcastChannel('app-sse')
    broadcastChannel.onmessage = (event: MessageEvent<SseBroadcastMessage>) => {
      const message = event.data
      switch (message.type) {
        case 'leader:heartbeat':
          lastHeartbeat = message.timestamp
          isRealtimeConnected.value = true
          break
        case 'tab:ping':
          hasOtherTabs = true
          startTimers()
          break
        case 'sse:event':
          handleEvent(message.message)
          break
        default:
          break
      }
    }

    tryBecomeLeader()
    isHydrated.value = true
  }

  async function tryBecomeLeader() {
    if (!broadcastChannel || isLeader.value) {
      return
    }

    if (!('locks' in navigator) || !window.isSecureContext) {
      isLeader.value = true
      if (hasOtherTabs) {
        startTimers()
      }
      startSse()
      return
    }

    await navigator.locks.request(
      'app-sse-leader',
      {
        mode: 'exclusive',
        ifAvailable: true
      },
      async (lock) => {
        if (!lock) {
          hasOtherTabs = true
          startTimers()
          broadcastChannel?.postMessage({
            type: 'tab:ping'
          } satisfies SseBroadcastMessage)
          return
        }

        isLeader.value = true
        if (hasOtherTabs) {
          startTimers()
        }
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

  function handleSseReplaced() {
    eventSource?.close()
    eventSource = null
    if (!('locks' in navigator) || !window.isSecureContext) {
      isLeader.value = false
      tryBecomeLeader()
    }
  }

  function startSse() {
    eventSource = new EventSource('/api/v1/sse/events')
    eventSource.onopen = () => {
      isRealtimeConnected.value = true
    }
    eventSource.onerror = () => {
      isRealtimeConnected.value = false
    }
    eventSource.onmessage = (event) => {
      const message = safeJsonParse<ServerSentEvents>(event.data)
      if (!message?.type) {
        return
      }
      if (message.type === 'sse.replaced') {
        return handleSseReplaced()
      }
      broadcastEvent(message)
    }
  }

  function broadcastEvent(message: ServerSentEvents) {
    handleEvent(message)
    broadcastChannel?.postMessage({
      type: 'sse:event',
      message
    } satisfies SseBroadcastMessage)
  }

  function handleEvent(message: ServerSentEvents) {
    const handler = getHandler(message.type)
    if (!handler) {
      return
    }
    handler(message)
  }

  function startHeartbeat() {
    if (heartbeatTimer) {
      return
    }
    heartbeatTimer = setInterval(() => {
      if (!isLeader.value || !isRealtimeConnected.value) {
        return
      }
      broadcastChannel?.postMessage({
        type: 'leader:heartbeat',
        timestamp: Date.now()
      } satisfies SseBroadcastMessage)
    }, 3000)
  }

  function startLeaderMonitor() {
    if (monitorTimer) {
      return
    }
    monitorTimer = setInterval(() => {
      if (isLeader.value) {
        return
      }
      const timeout = Date.now() - lastHeartbeat
      if (timeout > 10000) {
        isRealtimeConnected.value = false
        tryBecomeLeader()
      }
    }, 3000)
  }

  function destroy() {
    eventSource?.close()
    eventSource = null
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer)
      heartbeatTimer = null
    }
    if (monitorTimer) {
      clearInterval(monitorTimer)
      monitorTimer = null
    }
    broadcastChannel?.close()
    broadcastChannel = null
  }

  return {
    isHydrated,
    hydrate,
    destroy,
    isLeader,
    isRealtimeConnected
  }
})
