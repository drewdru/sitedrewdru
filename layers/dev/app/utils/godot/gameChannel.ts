import type { Toast } from '@nuxt/ui/runtime/composables/useToast.js'
import type { WebRtcConnection } from '~~/layers/core/app/types/webRtcManager'

export const setupGameChannel = (params: {
  connection: WebRtcConnection
  channel?: RTCDataChannel
  setIsShowMainMenu: (value: boolean) => void
  openPauseMenu: () => void
  t: (text: string) => string
  showToast: (toast: Partial<Toast>) => Toast
  onDisconnected: () => void
}) => {
  if (!params.connection.dataChannels.game && !params.channel) {
    return
  }
  if (params.channel && (params.channel.label !== 'game' || params.connection.dataChannels.game)) {
    params.channel.close()
    return
  }
  if (params.channel) {
    params.connection.dataChannels.game = params.channel
  }
  if (!params.connection.dataChannels.game) {
    return
  }

  window.__godotGameNetworkSend = (message: string) => {
    if (params.connection.dataChannels.game?.readyState !== 'open') {
      return
    }
    params.connection.dataChannels.game.send(message)
  }

  params.connection.dataChannels.game.onopen = () => {
    window.__godotWebGameBridgeStartOnline?.(params.connection.ownerRole)
    params.openPauseMenu()
  }

  params.connection.dataChannels.game.onclose = () => {
    window.__godotWebGameBridgePause?.()
    params.connection.dataChannels.game = undefined
    params.showToast({
      title: params.t('Disconnected'),
      description: params.t('GameIsEnded'),
      color: 'info',
      icon: 'i-lucide-circle-alert'
    })
    params.onDisconnected()
  }

  params.connection.dataChannels.game.onerror = (error) => {
    console.error('Godot game channel error:', error)
  }

  params.connection.dataChannels.game.onmessage = (event) => {
    if (typeof event.data !== 'string') {
      return
    }
    window.__godotGameNetworkOnMessage?.(event.data)
  }
}
